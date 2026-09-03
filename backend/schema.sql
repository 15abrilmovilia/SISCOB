-- =========================================================================
-- ESQUEMA RELACIONAL POSTGRESQL / SUPABASE
-- SISTEMA SISCOB - RADIO MÓVIL 15 DE ABRIL
-- =========================================================================

-- 1. Tabla de Socios / Afiliados
CREATE TABLE IF NOT EXISTS socios (
    id SERIAL PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    ap_paterno VARCHAR(100) NOT NULL,
    ap_materno VARCHAR(100),
    ci VARCHAR(30) UNIQUE NOT NULL,
    celular VARCHAR(30),
    fecha_ingreso DATE NOT NULL DEFAULT CURRENT_DATE,
    estado VARCHAR(20) NOT NULL DEFAULT 'VIG', -- VIG, MORA, BAJA
    categoria VARCHAR(50) NOT NULL DEFAULT 'Propietario',
    observaciones TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabla de Cajas Múltiples
CREATE TABLE IF NOT EXISTS cajas (
    id VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    moneda VARCHAR(10) NOT NULL DEFAULT 'Bs',
    saldo_anterior NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    ingresos NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    egresos NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    saldo_actual NUMERIC(12, 2) NOT NULL DEFAULT 0.00
);

-- 3. Tabla de Conceptos y Obligaciones (Cuotas y Multas)
CREATE TABLE IF NOT EXISTS conceptos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    tipo VARCHAR(50) NOT NULL, -- Cobro, Amortizacion, Multa, Interes
    periodicidad VARCHAR(30) NOT NULL DEFAULT 'Mes',
    monto NUMERIC(10, 2) NOT NULL,
    moneda VARCHAR(10) NOT NULL DEFAULT 'Bs',
    activo BOOLEAN NOT NULL DEFAULT TRUE
);

-- 4. Tabla de Cuentas por Cobrar (Deudas Asignadas)
CREATE TABLE IF NOT EXISTS deudas_socio (
    id SERIAL PRIMARY KEY,
    socio_id INTEGER REFERENCES socios(id) ON DELETE CASCADE,
    concepto_id INTEGER REFERENCES conceptos(id),
    descripcion VARCHAR(200) NOT NULL,
    periodo VARCHAR(50) NOT NULL,
    monto NUMERIC(10, 2) NOT NULL,
    pagado BOOLEAN NOT NULL DEFAULT FALSE,
    fecha_vencimiento DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Tabla de Transacciones y Cobros (Recibos Emitidos)
CREATE TABLE IF NOT EXISTS recibos (
    id SERIAL PRIMARY KEY,
    nro_recibo VARCHAR(50) UNIQUE NOT NULL,
    socio_id INTEGER REFERENCES socios(id),
    caja_id VARCHAR(20) REFERENCES cajas(id),
    total NUMERIC(12, 2) NOT NULL,
    metodo_pago VARCHAR(50) NOT NULL DEFAULT 'Efectivo',
    cajero VARCHAR(100) NOT NULL,
    fecha TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Tabla de Egresos y Gastos con Comprobante Oficial
CREATE TABLE IF NOT EXISTS egresos (
    id SERIAL PRIMARY KEY,
    nro_boleta VARCHAR(50) UNIQUE NOT NULL,
    caja_id VARCHAR(20) REFERENCES cajas(id),
    categoria VARCHAR(100) NOT NULL,
    beneficiario VARCHAR(150) NOT NULL,
    concepto TEXT NOT NULL,
    monto NUMERIC(12, 2) NOT NULL,
    responsable VARCHAR(100) NOT NULL,
    fecha TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Tabla de Auditoría Inmutable
CREATE TABLE IF NOT EXISTS auditoria_logs (
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    operador VARCHAR(100) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    tipo_operacion VARCHAR(50) NOT NULL,
    detalle TEXT NOT NULL,
    estado VARCHAR(30) NOT NULL DEFAULT 'EXITOSO'
);