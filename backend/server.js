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
  console.log('[SISCOB Backend] Conexión a PostgreSQL (Supabase/Neon) configurada.');
} else {
  console.log('[SISCOB Backend] Modo desarrollo local activo (sin base de datos remota conectada aún).');
}

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    sistema: 'SISCOB - Radio Móvil 15 de Abril',
    version: '1.0.0',
    db_connected: !!pool,
    timestamp: new Date().toISOString()
  });
});

// 2. Socios Endpoint
app.get('/api/socios', async (req, res) => {
  if (pool) {
    try {
      const { rows } = await pool.query('SELECT * FROM socios ORDER BY id ASC');
      return res.json(rows);
    } catch (err) {
      console.error('DB Error:', err);
      return res.status(500).json({ error: 'Error al consultar socios en base de datos.' });
    }
  }
  // Mock response fallback
  res.json({ message: 'Conectado en modo mock local. Configure DATABASE_URL en .env para PostgreSQL.' });
});

// 3. Cobranzas / Transacciones Endpoint
app.post('/api/cobranzas', async (req, res) => {
  const { nroRecibo, socioId, cajaId, total, metodoPago, cajero } = req.body;
  if (!nroRecibo || !total) {
    return res.status(400).json({ error: 'Datos de cobranza incompletos.' });
  }

  if (pool) {
    try {
      const query = `
        INSERT INTO recibos (nro_recibo, socio_id, caja_id, total, metodo_pago, cajero)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
      `;
      const { rows } = await pool.query(query, [nroRecibo, socioId, cajaId, total, metodoPago, cajero]);
      return res.status(201).json({ success: true, recibo: rows[0] });
    } catch (err) {
      console.error('DB Error:', err);
      return res.status(500).json({ error: 'Error al registrar cobranza en base de datos.' });
    }
  }

  res.status(201).json({ success: true, message: 'Cobranza registrada en memoria.', data: req.body });
});

// Start Server (using native node execution, no nodemon)
app.listen(PORT, () => {
  console.log(`[SISCOB API] Servidor activo escuchando en el puerto ${PORT}`);
});