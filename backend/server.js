const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Check if PostgreSQL is configured via DATABASE_URL
let pool = null;
if (process.env.DATABASE_URL) {
  const { Pool } = require('pg');
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  console.log('[SISCOB Backend] Conexión a PostgreSQL (Supabase) configurada.');
} else {
  console.log('[SISCOB Backend] Modo desarrollo local activo (sin base de datos remota conectada aún).');
}

// 1. Health Check (Verifica conexión real a PostgreSQL)
app.get('/api/health', async (req, res) => {
  let dbOk = false;
  let dbError = null;
  if (pool) {
    try {
      await pool.query('SELECT 1');
      dbOk = true;
    } catch (err) {
      dbError = err.message;
    }
  }

  res.json({
    status: 'online',
    sistema: 'SISCOB - Radio Móvil 15 de Abril',
    version: '1.0.0',
    db_configured: !!pool,
    db_connected: dbOk,
    db_error: dbError,
    timestamp: new Date().toISOString()
  });
});

// 2. Socios Endpoints (CRUD)
app.get('/api/socios', async (req, res) => {
  if (pool) {
    try {
      const { rows } = await pool.query('SELECT * FROM socios ORDER BY id ASC');
      // Format to match frontend camelCase
      const formatted = rows.map(s => ({
        id: s.id,
        nombres: s.nombres,
        apPaterno: s.ap_paterno,
        apMaterno: s.ap_materno,
        ci: s.ci,
        celular: s.celular,
        fechaIngreso: s.fecha_ingreso ? s.fecha_ingreso.toISOString().slice(0, 10) : '',
        estado: s.estado,
        categoria: s.categoria,
        observaciones: s.observaciones,
        acciones: [{ id: `10${s.id}`, fecha: s.fecha_ingreso, monto: 0.0, estado: s.estado, categoria: s.categoria }],
        obligaciones: [
          { nombre: "Sostenimiento", monto: 400.0, periodicidad: "Mensual" },
          { nombre: "Mantenimiento GPS", monto: 80.0, periodicidad: "Mensual" }
        ]
      }));
      return res.json(formatted);
    } catch (err) {
      console.error('DB Error socios:', err);
      return res.status(500).json({ error: 'Error al consultar socios en base de datos.', message: err.message });
    }
  }
  res.json([]);
});

app.post('/api/socios', async (req, res) => {
  const { nombres, apPaterno, apMaterno, ci, celular, fechaIngreso, estado, categoria, observaciones } = req.body;
  if (!nombres || !apPaterno) {
    return res.status(400).json({ error: 'Nombres y Apellido Paterno son obligatorios.' });
  }

  if (pool) {
    try {
      const query = `
        INSERT INTO socios (nombres, ap_paterno, ap_materno, ci, celular, fecha_ingreso, estado, categoria, observaciones)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
      `;
      const values = [
        nombres,
        apPaterno,
        apMaterno || '',
        ci || `CI-${Date.now()}`,
        celular || '',
        fechaIngreso || new Date().toISOString().slice(0, 10),
        estado || 'VIG',
        categoria || 'Propietario',
        observaciones || ''
      ];
      const { rows } = await pool.query(query, values);
      const s = rows[0];
      const created = {
        id: s.id,
        nombres: s.nombres,
        apPaterno: s.ap_paterno,
        apMaterno: s.ap_materno,
        ci: s.ci,
        celular: s.celular,
        fechaIngreso: s.fecha_ingreso ? s.fecha_ingreso.toISOString().slice(0, 10) : '',
        estado: s.estado,
        categoria: s.categoria,
        observaciones: s.observaciones,
        acciones: [{ id: `10${s.id}`, fecha: s.fecha_ingreso, monto: 0.0, estado: s.estado, categoria: s.categoria }],
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

  res.status(201).json({ id: Date.now(), ...req.body });
});

app.put('/api/socios/:id', async (req, res) => {
  const { id } = req.params;
  const { nombres, apPaterno, apMaterno, ci, celular, fechaIngreso, estado, categoria, observaciones, vehiculo, placa } = req.body;

  if (pool) {
    try {
      const query = `
        UPDATE socios 
        SET nombres = COALESCE($1, nombres),
            ap_paterno = COALESCE($2, ap_paterno),
            ap_materno = COALESCE($3, ap_materno),
            ci = COALESCE($4, ci),
            celular = COALESCE($5, celular),
            fecha_ingreso = COALESCE($6, fecha_ingreso),
            estado = COALESCE($7, estado),
            categoria = COALESCE($8, categoria),
            observaciones = COALESCE($9, observaciones)
        WHERE id = $10
        RETURNING *
      `;
      const values = [
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

// 3. Cajas Endpoints
app.get('/api/cajas', async (req, res) => {
  if (pool) {
    try {
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
      return res.status(500).json({ error: err.message });
    }
  }
  res.json([]);
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

// Start Server (using native node execution, no nodemon)
app.listen(PORT, () => {
  console.log(`[SISCOB API] Servidor activo escuchando en el puerto ${PORT}`);
});