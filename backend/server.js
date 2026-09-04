const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Check if PostgreSQL is configured via DATABASE_URL
let pool = null;
const NOMINA_206_SOCIOS = require('./socios_nomina_206.json');
const CONCEPTOS_OFICIALES = require('./conceptos_oficiales.json');
const DEUDAS_SEPTIEMBRE_206 = require('./deudas_septiembre_206.json');

async function seedSociosIfEmpty() {
  if (!pool) return;
  try {
    await pool.query('ALTER TABLE socios ADD COLUMN IF NOT EXISTS nro_movil VARCHAR(20)');
    const { rows } = await pool.query('SELECT COUNT(*) as count FROM socios');
    const count = parseInt(rows[0]?.count || '0');
    if (count === 0) {
      console.log(`[SISCOB Backend] Base de datos vacía. Sembrando automáticamente los ${NOMINA_206_SOCIOS.length} socios de la nómina oficial...`);
      for (const s of NOMINA_206_SOCIOS) {
        await pool.query(`
          INSERT INTO socios (id, nro_movil, nombres, ap_paterno, ap_materno, ci, celular, fecha_ingreso, estado, categoria, observaciones)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          ON CONFLICT (id) DO UPDATE 
          SET nro_movil = EXCLUDED.nro_movil,
              nombres = EXCLUDED.nombres,
              ap_paterno = EXCLUDED.ap_paterno,
              ap_materno = EXCLUDED.ap_materno,
              ci = EXCLUDED.ci,
              celular = EXCLUDED.celular,
              fecha_ingreso = EXCLUDED.fecha_ingreso,
              estado = EXCLUDED.estado,
              categoria = EXCLUDED.categoria,
              observaciones = EXCLUDED.observaciones
        `, [
          s.id,
          s.nroMovil,
          s.nombres,
          s.apPaterno,
          s.apMaterno || '',
          s.ci || `S/C-${s.nroMovil}`,
          s.celular || '',
          s.fechaIngreso || new Date().toISOString().slice(0, 10),
          s.estado || 'VIG',
          s.categoria || 'Propietario',
          s.observaciones || ''
        ]);
      }
      await pool.query("SELECT setval('socios_id_seq', (SELECT GREATEST(MAX(id), 1) FROM socios))");
      console.log(`[SISCOB Backend] ¡${NOMINA_206_SOCIOS.length} socios propietarios sembrados con éxito!`);
    } else {
      console.log(`[SISCOB Backend] Padrón de socios ya cuenta con ${count} registros.`);
    }
  } catch (err) {
    console.error('[SISCOB Backend] Error al verificar o sembrar socios:', err.message);
  }
}

async function seedConceptosYDeudas() {
  if (!pool) return;
  try {
    // 1. Sembrar o actualizar catálogo oficial de 8 conceptos
    const { rows: cRows } = await pool.query('SELECT COUNT(*) as count FROM conceptos');
    const cCount = parseInt(cRows[0]?.count || '0');
    if (cCount === 0 || cCount !== CONCEPTOS_OFICIALES.length) {
      console.log(`[SISCOB Backend] Actualizando catálogo oficial: ${CONCEPTOS_OFICIALES.length} conceptos por caja...`);
      await pool.query('DELETE FROM conceptos');
      for (const c of CONCEPTOS_OFICIALES) {
        await pool.query(`
          INSERT INTO conceptos (id, nombre, tipo, periodicidad, monto, moneda, activo)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT (id) DO UPDATE 
          SET nombre = EXCLUDED.nombre,
              tipo = EXCLUDED.tipo,
              periodicidad = EXCLUDED.periodicidad,
              monto = EXCLUDED.monto,
              activo = EXCLUDED.activo
        `, [c.id, c.nombre, c.tipo, c.periodicidad, c.monto, c.moneda, c.activo]);
      }
      await pool.query("SELECT setval('conceptos_id_seq', (SELECT GREATEST(MAX(id), 1) FROM conceptos))").catch(() => {});
      console.log('[SISCOB Backend] Conceptos oficiales configurados exitosamente.');
    }

    // 2. Generar las 206 cuotas de frecuencia mensual (200 Bs) si deudas_socio está vacía
    const { rows: dRows } = await pool.query('SELECT COUNT(*) as count FROM deudas_socio');
    const dCount = parseInt(dRows[0]?.count || '0');
    if (dCount === 0) {
      console.log(`[SISCOB Backend] Generando ${DEUDAS_SEPTIEMBRE_206.length} cuotas de frecuencia mensual (200 Bs)...`);
      for (const d of DEUDAS_SEPTIEMBRE_206) {
        await pool.query(`
          INSERT INTO deudas_socio (socio_id, concepto_id, descripcion, periodo, monto, pagado, fecha_vencimiento)
          VALUES ($1, $2, $3, $4, $5, false, $6)
        `, [d.socioId, 1, d.descripcion, d.periodo, d.monto, d.fechaVencimiento]);
      }
      await pool.query("SELECT setval('deudas_socio_id_seq', (SELECT GREATEST(MAX(id), 1) FROM deudas_socio))").catch(() => {});
      console.log(`[SISCOB Backend] ¡${DEUDAS_SEPTIEMBRE_206.length} cuotas de 200 Bs generadas en Supabase! (Total: Bs 41,200.00).`);
    }
  } catch (err) {
    console.error('[SISCOB Backend] Error al sembrar conceptos o deudas:', err.message);
  }
}

if (process.env.DATABASE_URL) {
  const { Pool } = require('pg');
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  console.log('[SISCOB Backend] Conexión a PostgreSQL (Supabase) configurada.');
  (async () => {
    await seedSociosIfEmpty();
    await seedConceptosYDeudas();
  })();
} else {
  console.log('[SISCOB Backend] Modo desarrollo local activo (sin base de datos remota conectada aún).');
}

// 1. Health Check (Verifica conexión real a PostgreSQL)
app.get('/api/health', async (req, res) => {
  let dbOk = false;
  let dbError = null;
  let totalSocios = 0;
  let totalConceptos = 0;
  let totalDeudas = 0;
  if (pool) {
    try {
      const [sRes, cRes, dRes] = await Promise.all([
        pool.query('SELECT COUNT(*) as count FROM socios'),
        pool.query('SELECT COUNT(*) as count FROM conceptos'),
        pool.query('SELECT COUNT(*) as count FROM deudas_socio')
      ]);
      dbOk = true;
      totalSocios = parseInt(sRes.rows[0]?.count || '0');
      totalConceptos = parseInt(cRes.rows[0]?.count || '0');
      totalDeudas = parseInt(dRes.rows[0]?.count || '0');
    } catch (err) {
      dbError = err.message;
    }
  }

  res.json({
    status: 'online',
    sistema: 'SISCOB - Radio Móvil 15 de Abril',
    version: '1.2.0',
    db_configured: !!pool,
    db_connected: dbOk,
    total_socios: totalSocios,
    total_conceptos: totalConceptos,
    total_deudas: totalDeudas,
    db_error: dbError,
    timestamp: new Date().toISOString()
  });
});

// 1.1 Catálogo Oficial de Conceptos Económicos
app.get('/api/conceptos', async (req, res) => {
  if (pool) {
    try {
      const { rows } = await pool.query('SELECT * FROM conceptos ORDER BY id ASC');
      if (rows.length > 0) {
        return res.json(rows.map(c => ({
          id: c.id,
          nombre: c.nombre,
          tipo: c.tipo,
          periodicidad: c.periodicidad,
          monto: parseFloat(c.monto) || 0,
          moneda: c.moneda,
          activo: c.activo
        })));
      }
    } catch (err) {
      console.warn('DB Error conceptos:', err.message);
    }
  }
  res.json(CONCEPTOS_OFICIALES);
});

app.post('/api/conceptos/reset', async (req, res) => {
  if (pool) {
    try {
      await pool.query('DELETE FROM conceptos');
      for (const c of CONCEPTOS_OFICIALES) {
        await pool.query(`
          INSERT INTO conceptos (id, nombre, tipo, periodicidad, monto, moneda, activo)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT (id) DO UPDATE 
          SET nombre = EXCLUDED.nombre,
              tipo = EXCLUDED.tipo,
              periodicidad = EXCLUDED.periodicidad,
              monto = EXCLUDED.monto,
              activo = EXCLUDED.activo
        `, [c.id, c.nombre, c.tipo, c.periodicidad, c.monto, c.moneda, c.activo]);
      }
      return res.json({ success: true, count: CONCEPTOS_OFICIALES.length, message: 'Conceptos oficiales actualizados en Supabase.' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  res.json({ success: true, count: CONCEPTOS_OFICIALES.length });
});

// 1.2 Generar Cuota Mensual Frecuencia (200 Bs a todos los móviles)
app.post('/api/deudas/generar-mensual', async (req, res) => {
  if (pool) {
    try {
      await pool.query('DELETE FROM deudas_socio WHERE descripcion LIKE $1', ['%Cuota Frecuencia Mensual%']);
      for (const d of DEUDAS_SEPTIEMBRE_206) {
        await pool.query(`
          INSERT INTO deudas_socio (socio_id, concepto_id, descripcion, periodo, monto, pagado, fecha_vencimiento)
          VALUES ($1, $2, $3, $4, $5, false, $6)
        `, [d.socioId, 1, d.descripcion, d.periodo, d.monto, d.fechaVencimiento]);
      }
      return res.json({ success: true, count: DEUDAS_SEPTIEMBRE_206.length, total: DEUDAS_SEPTIEMBRE_206.length * 200, message: '206 cuotas de frecuencia mensual generadas.' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  res.json({ success: true, count: DEUDAS_SEPTIEMBRE_206.length, total: DEUDAS_SEPTIEMBRE_206.length * 200 });
});

// 2. Socios Endpoints (CRUD)
app.get('/api/socios', async (req, res) => {
  if (pool) {
    try {
      const { rows } = await pool.query('SELECT * FROM socios ORDER BY id ASC');
      // Format to match frontend camelCase
      const formatted = rows.map(s => {
        const movilStr = s.nro_movil || (s.id < 10 && s.id >= 0 ? `0${s.id}` : `${s.id}`);
        return {
          id: s.id,
          nroMovil: movilStr,
          nombres: s.nombres,
          apPaterno: s.ap_paterno,
          apMaterno: s.ap_materno,
          ci: s.ci,
          celular: s.celular,
          fechaIngreso: s.fecha_ingreso ? s.fecha_ingreso.toISOString().slice(0, 10) : '',
          estado: s.estado,
          categoria: s.categoria,
          observaciones: s.observaciones,
          acciones: [{ id: `ACC-${movilStr}`, fecha: s.fecha_ingreso, monto: 0.0, estado: s.estado, categoria: s.categoria }],
          obligaciones: [
            { nombre: "Sostenimiento", monto: 400.0, periodicidad: "Mensual" },
            { nombre: "Mantenimiento GPS", monto: 80.0, periodicidad: "Mensual" }
          ]
        };
      });
      return res.json(formatted);
    } catch (err) {
      console.error('DB Error socios:', err);
      return res.status(500).json({ error: 'Error al consultar socios en base de datos.', message: err.message });
    }
  }
  res.json(NOMINA_206_SOCIOS);
});

// Endpoint explícito para cargar/recargar la nómina oficial de 206 socios propietarios
app.post('/api/socios/cargar-nomina-propietarios', async (req, res) => {
  if (pool) {
    try {
      await pool.query('ALTER TABLE socios ADD COLUMN IF NOT EXISTS nro_movil VARCHAR(20)');
      for (const s of NOMINA_206_SOCIOS) {
        await pool.query(`
          INSERT INTO socios (id, nro_movil, nombres, ap_paterno, ap_materno, ci, celular, fecha_ingreso, estado, categoria, observaciones)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          ON CONFLICT (id) DO UPDATE 
          SET nro_movil = EXCLUDED.nro_movil,
              nombres = EXCLUDED.nombres,
              ap_paterno = EXCLUDED.ap_paterno,
              ap_materno = EXCLUDED.ap_materno,
              ci = EXCLUDED.ci,
              celular = EXCLUDED.celular,
              fecha_ingreso = EXCLUDED.fecha_ingreso,
              estado = EXCLUDED.estado,
              categoria = EXCLUDED.categoria,
              observaciones = EXCLUDED.observaciones
        `, [
          s.id,
          s.nroMovil,
          s.nombres,
          s.apPaterno,
          s.apMaterno || '',
          s.ci || `S/C-${s.nroMovil}`,
          s.celular || '',
          s.fechaIngreso || new Date().toISOString().slice(0, 10),
          s.estado || 'VIG',
          s.categoria || 'Propietario',
          s.observaciones || ''
        ]);
      }
      await pool.query("SELECT setval('socios_id_seq', (SELECT GREATEST(MAX(id), 1) FROM socios))");
      return res.json({ success: true, count: NOMINA_206_SOCIOS.length, message: `${NOMINA_206_SOCIOS.length} socios cargados en Supabase correctamente.` });
    } catch (err) {
      console.error('Error al cargar nómina:', err);
      return res.status(500).json({ error: 'Error al cargar nómina en base de datos', message: err.message });
    }
  }
  res.json({ success: true, count: NOMINA_206_SOCIOS.length, message: 'Nómina cargada en memoria.' });
});

// Endpoint bulk para carga de socios en lote
app.post('/api/socios/bulk', async (req, res) => {
  const { socios: lista } = req.body;
  const data = Array.isArray(lista) ? lista : NOMINA_206_SOCIOS;
  if (pool) {
    try {
      await pool.query('ALTER TABLE socios ADD COLUMN IF NOT EXISTS nro_movil VARCHAR(20)');
      for (const s of data) {
        await pool.query(`
          INSERT INTO socios (id, nro_movil, nombres, ap_paterno, ap_materno, ci, celular, fecha_ingreso, estado, categoria, observaciones)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          ON CONFLICT (id) DO UPDATE 
          SET nro_movil = EXCLUDED.nro_movil,
              nombres = EXCLUDED.nombres,
              ap_paterno = EXCLUDED.ap_paterno,
              ap_materno = EXCLUDED.ap_materno,
              ci = EXCLUDED.ci,
              celular = EXCLUDED.celular,
              fecha_ingreso = EXCLUDED.fecha_ingreso,
              estado = EXCLUDED.estado,
              categoria = EXCLUDED.categoria,
              observaciones = EXCLUDED.observaciones
        `, [
          s.id,
          s.nroMovil || (s.id < 10 && s.id >= 0 ? `0${s.id}` : `${s.id}`),
          s.nombres,
          s.apPaterno,
          s.apMaterno || '',
          s.ci || `S/C-${s.nroMovil || s.id}`,
          s.celular || '',
          s.fechaIngreso || new Date().toISOString().slice(0, 10),
          s.estado || 'VIG',
          s.categoria || 'Propietario',
          s.observaciones || ''
        ]);
      }
      await pool.query("SELECT setval('socios_id_seq', (SELECT GREATEST(MAX(id), 1) FROM socios))");
      return res.json({ success: true, count: data.length, message: `${data.length} socios guardados en Supabase.` });
    } catch (err) {
      console.error('Error en bulk socios:', err);
      return res.status(500).json({ error: err.message });
    }
  }
  res.json({ success: true, count: data.length });
});

app.post('/api/socios', async (req, res) => {
  const { id, customId, nroMovil, nombres, apPaterno, apMaterno, ci, celular, fechaIngreso, estado, categoria, observaciones } = req.body;
  if (!nombres || !apPaterno) {
    return res.status(400).json({ error: 'Nombres y Apellido Paterno son obligatorios.' });
  }

  const assignedId = (id !== undefined && id !== null && id !== '') 
    ? parseInt(id) 
    : ((customId !== undefined && customId !== null && customId !== '') ? parseInt(customId) : null);
  const finalMovil = nroMovil || (customId !== undefined ? `${customId}` : (assignedId !== null ? `${assignedId}` : ''));

  if (pool) {
    try {
      let query;
      let values;
      if (assignedId !== null && !isNaN(assignedId)) {
        query = `
          INSERT INTO socios (id, nro_movil, nombres, ap_paterno, ap_materno, ci, celular, fecha_ingreso, estado, categoria, observaciones)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          ON CONFLICT (id) DO UPDATE 
          SET nro_movil = EXCLUDED.nro_movil,
              nombres = EXCLUDED.nombres,
              ap_paterno = EXCLUDED.ap_paterno,
              ap_materno = EXCLUDED.ap_materno,
              ci = EXCLUDED.ci,
              celular = EXCLUDED.celular,
              fecha_ingreso = EXCLUDED.fecha_ingreso,
              estado = EXCLUDED.estado,
              categoria = EXCLUDED.categoria,
              observaciones = EXCLUDED.observaciones
          RETURNING *
        `;
        values = [
          assignedId,
          finalMovil || (assignedId < 10 && assignedId >= 0 ? `0${assignedId}` : `${assignedId}`),
          nombres,
          apPaterno,
          apMaterno || '',
          ci || `S/C-${assignedId}`,
          celular || '',
          fechaIngreso || new Date().toISOString().slice(0, 10),
          estado || 'VIG',
          categoria || 'Propietario',
          observaciones || ''
        ];
      } else {
        query = `
          INSERT INTO socios (nro_movil, nombres, ap_paterno, ap_materno, ci, celular, fecha_ingreso, estado, categoria, observaciones)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          RETURNING *
        `;
        values = [
          finalMovil,
          nombres,
          apPaterno,
          apMaterno || '',
          ci || `S/C-${Date.now()}`,
          celular || '',
          fechaIngreso || new Date().toISOString().slice(0, 10),
          estado || 'VIG',
          categoria || 'Propietario',
          observaciones || ''
        ];
      }
      const { rows } = await pool.query(query, values);
      const s = rows[0];
      const created = {
        id: s.id,
        nroMovil: s.nro_movil || (s.id < 10 && s.id >= 0 ? `0${s.id}` : `${s.id}`),
        nombres: s.nombres,
        apPaterno: s.ap_paterno,
        apMaterno: s.ap_materno,
        ci: s.ci,
        celular: s.celular,
        fechaIngreso: s.fecha_ingreso ? s.fecha_ingreso.toISOString().slice(0, 10) : '',
        estado: s.estado,
        categoria: s.categoria,
        observaciones: s.observaciones,
        acciones: [{ id: `ACC-${s.nro_movil || s.id}`, fecha: s.fecha_ingreso, monto: 0.0, estado: s.estado, categoria: s.categoria }],
        obligaciones: [
          { nombre: "Sostenimiento", monto: 400.0, periodicidad: "Mensual" },
          { nombre: "Mantenimiento GPS", monto: 80.0, periodicidad: "Mensual" }
        ]
      };
      return res.status(201).json(created);
    } catch (err) {
      console.error('DB Error al crear socio:', err);
      return res.status(500).json({ error: 'Error al registrar socio en Supabase.', message: err.message });
    }
  }

  const mockId = assignedId !== null ? assignedId : Date.now();
  res.status(201).json({ id: mockId, nroMovil: finalMovil || `${mockId}`, ...req.body });
});

app.put('/api/socios/:id', async (req, res) => {
  const { id } = req.params;
  const { nroMovil, nombres, apPaterno, apMaterno, ci, celular, fechaIngreso, estado, categoria, observaciones, vehiculo, placa } = req.body;

  if (pool) {
    try {
      const query = `
        UPDATE socios 
        SET nro_movil = COALESCE($1, nro_movil),
            nombres = COALESCE($2, nombres),
            ap_paterno = COALESCE($3, ap_paterno),
            ap_materno = COALESCE($4, ap_materno),
            ci = COALESCE($5, ci),
            celular = COALESCE($6, celular),
            fecha_ingreso = COALESCE($7, fecha_ingreso),
            estado = COALESCE($8, estado),
            categoria = COALESCE($9, categoria),
            observaciones = COALESCE($10, observaciones)
        WHERE id = $11
        RETURNING *
      `;
      const values = [
        nroMovil,
        nombres,
        apPaterno,
        apMaterno,
        ci,
        celular,
        fechaIngreso,
        estado,
        categoria,
        observaciones,
        id
      ];
      const { rows } = await pool.query(query, values);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Socio no encontrado' });
      }
      const s = rows[0];
      return res.json({
        id: s.id,
        nroMovil: s.nro_movil || (s.id < 10 && s.id >= 0 ? `0${s.id}` : `${s.id}`),
        nombres: s.nombres,
        apPaterno: s.ap_paterno,
        apMaterno: s.ap_materno,
        ci: s.ci,
        celular: s.celular,
        fechaIngreso: s.fecha_ingreso ? s.fecha_ingreso.toISOString().slice(0, 10) : '',
        estado: s.estado,
        categoria: s.categoria,
        observaciones: s.observaciones,
        vehiculo,
        placa
      });
    } catch (err) {
      console.error('DB Error al actualizar socio:', err);
      return res.status(500).json({ error: 'Error al actualizar socio en base de datos.', message: err.message });
    }
  }

  res.json({ id: parseInt(id), ...req.body });
});

app.delete('/api/socios/:id', async (req, res) => {
  if (pool) {
    try {
      await pool.query('DELETE FROM socios WHERE id = $1', [req.params.id]);
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  res.json({ success: true });
});

// 5 Cajas Oficiales de SISCOB
const OFFICIAL_5_CAJAS = [
  { id: "c1", nombre: "CAJA DE FRECUENCIA", saldoAnterior: 0.00, ingresos: 0.00, egresos: 0.00, saldoActual: 0.00 },
  { id: "c2", nombre: "CAJA DE MULTAS E INFRACCIONES", saldoAnterior: 0.00, ingresos: 0.00, egresos: 0.00, saldoActual: 0.00 },
  { id: "c3", nombre: "CAJA NUEVOS SOCIOS", saldoAnterior: 0.00, ingresos: 0.00, egresos: 0.00, saldoActual: 0.00 },
  { id: "c4", nombre: "CAJA PRÉSTAMOS", saldoAnterior: 0.00, ingresos: 0.00, egresos: 0.00, saldoActual: 0.00 },
  { id: "c5", nombre: "CAJA FRECUENCIA INQUILINOS", saldoAnterior: 0.00, ingresos: 0.00, egresos: 0.00, saldoActual: 0.00 }
];

// 3. Cajas Endpoints
app.get('/api/cajas', async (req, res) => {
  if (pool) {
    try {
      // Asegurar que las 5 cajas existan en la tabla de Supabase
      for (const c of OFFICIAL_5_CAJAS) {
        await pool.query(`
          INSERT INTO cajas (id, nombre, saldo_anterior, ingresos, egresos, saldo_actual)
          VALUES ($1, $2, $3, 0, 0, $3)
          ON CONFLICT (id) DO UPDATE 
          SET nombre = $2
        `, [c.id, c.nombre, c.saldoAnterior]).catch(() => {});
      }

      const { rows } = await pool.query('SELECT * FROM cajas ORDER BY id ASC');
      const formatted = rows.map(c => ({
        id: c.id,
        nombre: c.nombre,
        saldoAnterior: parseFloat(c.saldo_anterior) || 0,
        ingresos: parseFloat(c.ingresos) || 0,
        egresos: parseFloat(c.egresos) || 0,
        saldoActual: parseFloat(c.saldo_actual) || 0
      }));
      return res.json(formatted);
    } catch (err) {
      console.warn('DB Warning cajas, devolviendo 5 cajas base:', err.message);
      return res.json(OFFICIAL_5_CAJAS);
    }
  }
  res.json(OFFICIAL_5_CAJAS);
});

// 4. Deudas / Cuentas por cobrar Endpoints
app.get('/api/deudas', async (req, res) => {
  if (pool) {
    try {
      const { rows } = await pool.query('SELECT * FROM deudas_socio ORDER BY id ASC');
      const formatted = rows.map(d => ({
        id: `d${d.id}`,
        dbId: d.id,
        socioId: d.socio_id,
        descripcion: d.descripcion,
        monto: parseFloat(d.monto) || 0,
        pagado: d.pagado,
        periodo: d.periodo,
        fecha: d.created_at ? d.created_at.toISOString().slice(0, 10) : '',
        moneda: 'Bs',
        cantidad: 1
      }));
      return res.json(formatted);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  res.json([]);
});

app.post('/api/deudas', async (req, res) => {
  const { socioId, conceptoId, descripcion, periodo, monto, fechaVencimiento } = req.body;
  if (!socioId || !monto) {
    return res.status(400).json({ error: 'Datos de deuda incompletos.' });
  }

  if (pool) {
    try {
      const query = `
        INSERT INTO deudas_socio (socio_id, concepto_id, descripcion, periodo, monto, pagado, fecha_vencimiento)
        VALUES ($1, $2, $3, $4, $5, false, $6)
        RETURNING *
      `;
      const { rows } = await pool.query(query, [socioId, conceptoId || 1, descripcion || 'Cobro', periodo || 'Actual', monto, fechaVencimiento || null]);
      const d = rows[0];
      return res.status(201).json({
        id: `d${d.id}`,
        dbId: d.id,
        socioId: d.socio_id,
        descripcion: d.descripcion,
        monto: parseFloat(d.monto) || 0,
        pagado: d.pagado,
        periodo: d.periodo
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  res.status(201).json({ id: `d${Date.now()}`, ...req.body, pagado: false });
});

// 5. Egresos Endpoints
app.get('/api/egresos', async (req, res) => {
  if (pool) {
    try {
      const { rows } = await pool.query('SELECT * FROM egresos ORDER BY id DESC');
      const formatted = rows.map(e => ({
        id: e.id,
        nroBoleta: e.nro_boleta,
        cajaId: e.caja_id,
        grupo: e.categoria,
        categoria: e.categoria,
        pagadoA: e.beneficiario,
        descripcion: e.concepto,
        monto: parseFloat(e.monto) || 0,
        usuario: e.responsable,
        fecha: e.fecha ? e.fecha.toISOString().slice(0, 10) : '',
        moneda: 'Bs'
      }));
      return res.json(formatted);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  res.json([]);
});

app.post('/api/egresos', async (req, res) => {
  const { nroBoleta, cajaId, categoria, beneficiario, concepto, monto, responsable } = req.body;
  if (!concepto || !monto) {
    return res.status(400).json({ error: 'Concepto y Monto son requeridos.' });
  }

  if (pool) {
    try {
      const boleta = nroBoleta || `EGR-${Date.now()}`;
      const query = `
        INSERT INTO egresos (nro_boleta, caja_id, categoria, beneficiario, concepto, monto, responsable)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `;
      const { rows } = await pool.query(query, [
        boleta,
        cajaId || 'c1',
        categoria || 'General',
        beneficiario || 'Proveedor',
        concepto,
        monto,
        responsable || 'Admin'
      ]);
      const e = rows[0];
      return res.status(201).json({
        id: e.id,
        nroBoleta: e.nro_boleta,
        cajaId: e.caja_id,
        grupo: e.categoria,
        categoria: e.categoria,
        pagadoA: e.beneficiario,
        descripcion: e.concepto,
        monto: parseFloat(e.monto) || 0,
        usuario: e.responsable,
        fecha: e.fecha ? e.fecha.toISOString().slice(0, 10) : '',
        moneda: 'Bs'
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  res.status(201).json({ id: Date.now(), ...req.body });
});

// 6. Cobranzas / Recibos Endpoint
app.post('/api/cobranzas', async (req, res) => {
  const { nroRecibo, socioId, cajaId, total, metodoPago, cajero, deudaIds } = req.body;
  if (!nroRecibo || !total) {
    return res.status(400).json({ error: 'Datos de cobranza incompletos.' });
  }

  if (pool) {
    try {
      const query = `
        INSERT INTO recibos (nro_recibo, socio_id, caja_id, total, metodo_pago, cajero)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
      `;
      const { rows } = await pool.query(query, [nroRecibo, socioId, cajaId || 'c1', total, metodoPago || 'Efectivo', cajero || 'Cajero']);

      // Si hay deudas canceladas, marcarlas en la base de datos
      if (Array.isArray(deudaIds) && deudaIds.length > 0) {
        const cleanIds = deudaIds.map(id => typeof id === 'string' ? parseInt(id.replace('d', '')) : id).filter(n => !isNaN(n));
        if (cleanIds.length > 0) {
          await pool.query('UPDATE deudas_socio SET pagado = true WHERE id = ANY($1::int[])', [cleanIds]);
        }
      }

      return res.status(201).json({ success: true, recibo: rows[0] });
    } catch (err) {
      console.error('DB Error al registrar cobranza:', err);
      return res.status(500).json({ error: 'Error al registrar cobranza en base de datos.', detail: err.message });
    }
  }

  res.status(201).json({ success: true, message: 'Cobranza registrada en memoria.', data: req.body });
});

// Endpoint para ANULAR / REVERTIR una cobranza errónea
app.post('/api/cobranzas/anular', async (req, res) => {
  const { nroRecibo, deudaIds, monto, cajaId } = req.body;
  if (pool) {
    try {
      if (nroRecibo) {
        await pool.query('DELETE FROM recibos WHERE nro_recibo = $1 OR nro_recibo = $2', [nroRecibo, `REC-${nroRecibo}`]);
      }
      if (Array.isArray(deudaIds) && deudaIds.length > 0) {
        const cleanIds = deudaIds.map(id => typeof id === 'string' ? parseInt(id.replace('d', '')) : id).filter(n => !isNaN(n));
        if (cleanIds.length > 0) {
          await pool.query('UPDATE deudas_socio SET pagado = false WHERE id = ANY($1::int[])', [cleanIds]);
        }
      }
      if (monto && cajaId) {
        await pool.query('UPDATE cajas SET ingresos = GREATEST(0, ingresos - $1), saldo_actual = saldo_actual - $1 WHERE id = $2', [monto, cajaId]);
      }
      return res.json({ success: true, message: 'Cobranza revertida y deudas restauradas.' });
    } catch (err) {
      console.error('Error al anular cobranza:', err);
      return res.status(500).json({ error: err.message });
    }
  }
  res.json({ success: true, message: 'Revertido en memoria.' });
});

// Endpoint para ELIMINAR / ANULAR un egreso
app.delete('/api/egresos/:id', async (req, res) => {
  const { id } = req.params;
  if (pool) {
    try {
      const { rows } = await pool.query('DELETE FROM egresos WHERE id = $1 RETURNING *', [id]);
      if (rows.length > 0) {
        const e = rows[0];
        await pool.query('UPDATE cajas SET egresos = GREATEST(0, egresos - $1), saldo_actual = saldo_actual + $1 WHERE id = $2', [e.monto, e.caja_id || 'c1']);
      }
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  res.json({ success: true });
});

// 7. Usuarios y Roles Endpoints
let memoryUsuarios = [
  { id: 'u1', usuario: 'admin33', password: '123', nombreCompleto: 'Administrador Central (SISCOB)', email: 'admin@radiomovil15deabril.com', celular: '7141199', rolId: 'admin', estado: 'ACTIVO', fechaCreacion: '2025-01-10', ultimoAcceso: '03/09/2026, 11:15' },
  { id: 'u2', usuario: 'cajera01', password: '123', nombreCompleto: 'Daniela Condori Vargas', email: 'daniela.caja@radiomovil15deabril.com', celular: '75483109', rolId: 'cajero', estado: 'ACTIVO', fechaCreacion: '2025-03-15', ultimoAcceso: '03/09/2026, 10:45' },
  { id: 'u3', usuario: 'hacienda15', password: '123', nombreCompleto: 'Rubén Aguirre Méndez', email: 'hacienda@radiomovil15deabril.com', celular: '72910482', rolId: 'hacienda', estado: 'ACTIVO', fechaCreacion: '2025-02-01', ultimoAcceso: '02/09/2026, 18:20' }
];

app.get('/api/usuarios', (req, res) => {
  res.json(memoryUsuarios);
});

app.post('/api/usuarios', (req, res) => {
  const { usuario, password, nombreCompleto, email, celular, rolId, estado } = req.body;
  if (!usuario || !password || !nombreCompleto) {
    return res.status(400).json({ error: 'Usuario, contraseña y nombre completo son obligatorios.' });
  }
  const nuevo = {
    id: `u-${Date.now()}`,
    usuario: usuario.trim().toLowerCase(),
    password,
    nombreCompleto,
    email: email || '',
    celular: celular || '',
    rolId: rolId || 'cajero',
    estado: estado || 'ACTIVO',
    fechaCreacion: new Date().toISOString().split('T')[0],
    ultimoAcceso: 'Sin ingresos registrados'
  };
  memoryUsuarios.push(nuevo);
  res.status(201).json(nuevo);
});

app.put('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const index = memoryUsuarios.findIndex(u => u.id === id || u.usuario === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  memoryUsuarios[index] = { ...memoryUsuarios[index], ...req.body };
  res.json(memoryUsuarios[index]);
});

app.delete('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;
  memoryUsuarios = memoryUsuarios.filter(u => u.id !== id && u.usuario !== id);
  res.json({ success: true });
});

// 8. Puesta a Cero de Producción
app.post('/api/sistema/reset', async (req, res) => {
  const payloadSaldos = req.body || {};
  if (pool) {
    try {
      await pool.query('DELETE FROM deudas_socio');
      await pool.query('DELETE FROM recibos');
      await pool.query('DELETE FROM egresos');
      await pool.query('DELETE FROM socios');
      await pool.query('DELETE FROM auditoria_logs').catch(() => {});
      
      // Reiniciar las 5 cajas oficiales con sus saldos de apertura
      for (const c of OFFICIAL_5_CAJAS) {
        const saldo = typeof payloadSaldos[c.id] === 'number' 
          ? payloadSaldos[c.id] 
          : (parseFloat(payloadSaldos[c.id]) || 0);
        await pool.query(`
          INSERT INTO cajas (id, nombre, saldo_anterior, ingresos, egresos, saldo_actual)
          VALUES ($1, $2, $3, 0, 0, $3)
          ON CONFLICT (id) DO UPDATE 
          SET nombre = $2, saldo_anterior = $3, ingresos = 0, egresos = 0, saldo_actual = $3
        `, [c.id, c.nombre, saldo]).catch(() => {});
      }

      // Reiniciar secuencias autonuméricas para que los nuevos socios inicien en 1
      try {
        await pool.query('ALTER SEQUENCE IF EXISTS socios_id_seq RESTART WITH 1');
        await pool.query('ALTER SEQUENCE IF EXISTS deudas_socio_id_seq RESTART WITH 1');
        await pool.query('ALTER SEQUENCE IF EXISTS recibos_id_seq RESTART WITH 1');
        await pool.query('ALTER SEQUENCE IF EXISTS egresos_id_seq RESTART WITH 1');
      } catch (seqErr) {
        console.warn('Reinicio de secuencias advertencia:', seqErr.message);
      }

      return res.json({ success: true, message: 'Base de datos en Supabase reiniciada a cero con las 5 cajas oficiales.' });
    } catch (err) {
      console.error('Error al reiniciar DB en Supabase:', err);
      return res.status(500).json({ error: 'Error al reiniciar DB en Supabase', detail: err.message });
    }
  }
  res.json({ success: true, message: 'Memoria reiniciada a cero con las 5 cajas oficiales.' });
});

// Start Server (using native node execution, no nodemon)
app.listen(PORT, () => {
  console.log(`[SISCOB API] Servidor activo escuchando en el puerto ${PORT}`);
});