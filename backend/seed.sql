-- =========================================================================
-- DATOS SEMILLA / INICIALES (SEED DATA)
-- SISTEMA SISCOB - RADIO MÓVIL 15 DE ABRIL (TARIJA, BOLIVIA)
-- =========================================================================

-- 1. Insertar Cajas Múltiples de Operación
INSERT INTO cajas (id, nombre, moneda, saldo_anterior, ingresos, egresos, saldo_actual)
VALUES 
    ('c1', 'CAJA GENERAL (EFECTIVO)', 'Bs', 64685.70, 14092.50, 66363.49, 12414.71),
    ('c2', 'CAJA MANTENIMIENTO GPS', 'Bs', 6732.00, 2988.00, 5025.00, 4695.00),
    ('c3', 'CAJA SEGURO Y SOLIDARIDAD', 'Bs', 15200.00, 3100.00, 1800.00, 16500.00),
    ('c4', 'CAJA CERTIFICADO DE APORTACIÓN', 'Bs', 47070.00, 4200.00, 0.00, 51270.00),
    ('c5', 'CAJA CARTERA DE PRÉSTAMOS', 'Bs', 18500.00, 4393.00, 12000.00, 10893.00)
ON CONFLICT (id) DO UPDATE 
SET nombre = EXCLUDED.nombre,
    saldo_anterior = EXCLUDED.saldo_anterior,
    ingresos = EXCLUDED.ingresos,
    egresos = EXCLUDED.egresos,
    saldo_actual = EXCLUDED.saldo_actual;

-- 2. Insertar Catálogo de Conceptos y Obligaciones
INSERT INTO conceptos (id, nombre, tipo, periodicidad, monto, moneda, activo)
VALUES 
    (1, 'Cuota Sostenimiento Mensual', 'Cobro', 'Mes', 400.00, 'Bs', true),
    (2, 'Servicio Monitoreo GPS Satelital', 'Cobro', 'Mes', 80.00, 'Bs', true),
    (3, 'Aporte Publicidad y Radiofrecuencia', 'Cobro', 'Mes', 5.00, 'Bs', true),
    (4, 'Multa Inasistencia Asamblea General', 'Multa', 'Variable', 100.00, 'Bs', true),
    (5, 'Multa Retraso Parada / Turno', 'Multa', 'Variable', 30.00, 'Bs', true),
    (6, 'Certificado de Aportación Nuevo Socio', 'Cobro', 'Única', 700.00, 'Bs', true),
    (7, 'Amortización de Capital Préstamo', 'Amortizacion', 'Mes', 300.00, 'Bs', true),
    (8, 'Interés Préstamo Solidario (1.5%)', 'Interes', 'Mes', 45.00, 'Bs', true)
ON CONFLICT (id) DO UPDATE 
SET nombre = EXCLUDED.nombre,
    monto = EXCLUDED.monto,
    activo = EXCLUDED.activo;

-- 3. Insertar Padrón de Socios y Afiliados
INSERT INTO socios (id, nombres, ap_paterno, ap_materno, ci, celular, fecha_ingreso, estado, categoria, observaciones)
VALUES 
    (20, 'REMBERTO', 'TORRICO', 'VARGAS', '4414561', '7141199', '2017-02-26', 'VIG', 'Propietario', 'Socio activo. Móvil Nro 20.'),
    (178, 'LINO JAIME', 'CONDORI', 'GARCIA', '3013145', '75483109', '2017-08-30', 'VIG', 'Propietario', 'Asignado a turno mañana. Móvil Nro 178.'),
    (4, 'JOAQUIN', 'CHURQUI', 'GARCIA', '4474581', '72910482', '2017-02-26', 'VIG', 'Propietario', 'Socio fundador. Móvil Nro 04.'),
    (1, 'SANTIAGO', 'LLANOS', 'CANAZA', '3829104', '76829102', '2015-10-28', 'VIG', 'Propietario', 'Vehículo interno Nro 01.'),
    (2, 'CARLOS', 'MAXI', 'LA FUENTE', '6184920', '73910284', '2018-01-15', 'VIG', 'Inquilino / Relevo', 'Turno intermedio tarde.'),
    (5, 'WILLIAMS', 'CABRERA', 'ZURITA', '5029148', '71829401', '2019-04-10', 'VIG', 'Propietario', 'Móvil Nro 05 con equipo de radio VHF.'),
    (12, 'FRANZ', 'MAMANI', 'QUISPE', '4192837', '76918234', '2020-06-22', 'MORA', 'Propietario', 'Pendiente regularización cuotas julio y agosto.'),
    (33, 'MARCELO', 'FLORES', 'ROCHA', '5829103', '74910283', '2016-11-05', 'VIG', 'Propietario', 'Móvil Nro 33 al día.')
ON CONFLICT (id) DO UPDATE 
SET nombres = EXCLUDED.nombres,
    ap_paterno = EXCLUDED.ap_paterno,
    ap_materno = EXCLUDED.ap_materno,
    ci = EXCLUDED.ci,
    celular = EXCLUDED.celular,
    estado = EXCLUDED.estado,
    categoria = EXCLUDED.categoria;

-- Ajustar la secuencia de socios para futuros registros
SELECT setval('socios_id_seq', (SELECT MAX(id) FROM socios));

-- 4. Insertar Cuentas por Cobrar (Deudas Asignadas)
INSERT INTO deudas_socio (socio_id, concepto_id, descripcion, periodo, monto, pagado, fecha_vencimiento)
VALUES 
    (20, 1, 'Cuota Sostenimiento Institucional', 'Agosto 2026', 400.00, false, '2026-08-31'),
    (20, 2, 'Mantenimiento GPS Satelital', 'Agosto 2026', 80.00, false, '2026-08-31'),
    (20, 3, 'Aporte Publicidad Mensual', 'Agosto 2026', 5.00, false, '2026-08-31'),
    (20, 4, 'Multa por inasistencia asamblea ordinaria', 'Julio 2026', 100.00, false, '2026-08-15'),
    (178, 1, 'Cuota Sostenimiento Institucional', 'Agosto 2026', 400.00, false, '2026-08-31'),
    (178, 2, 'Mantenimiento GPS Satelital', 'Agosto 2026', 80.00, false, '2026-08-31'),
    (178, 7, 'Amortización cuota préstamo #4', 'Agosto 2026', 300.00, false, '2026-08-20'),
    (4, 1, 'Cuota Sostenimiento Institucional', 'Agosto 2026', 400.00, false, '2026-08-31'),
    (1, 1, 'Cuota Sostenimiento Institucional', 'Agosto 2026', 400.00, true, '2026-08-31'),
    (1, 2, 'Mantenimiento GPS Satelital', 'Agosto 2026', 80.00, true, '2026-08-31'),
    (12, 1, 'Cuota Sostenimiento Retrasada', 'Julio 2026', 400.00, false, '2026-07-31'),
    (12, 1, 'Cuota Sostenimiento Mensual', 'Agosto 2026', 400.00, false, '2026-08-31'),
    (12, 5, 'Multa abandono de parada', 'Agosto 2026', 30.00, false, '2026-08-10')
ON CONFLICT DO NOTHING;

-- 5. Insertar Recibos de Cobranza Oficiales
INSERT INTO recibos (nro_recibo, socio_id, caja_id, total, metodo_pago, cajero, fecha)
VALUES 
    ('REC-2026-0001', 1, 'c1', 485.00, 'Efectivo', 'Daniela (Cajera 01)', NOW() - INTERVAL '2 days'),
    ('REC-2026-0002', 4, 'c1', 400.00, 'QR / Simple', 'Daniela (Cajera 01)', NOW() - INTERVAL '1 day'),
    ('REC-2026-0003', 33, 'c1', 480.00, 'Efectivo', 'Administrador Central', NOW() - INTERVAL '6 hours')
ON CONFLICT (nro_recibo) DO NOTHING;

-- 6. Insertar Egresos y Gastos Registrados
INSERT INTO egresos (nro_boleta, caja_id, categoria, beneficiario, concepto, monto, responsable, fecha)
VALUES 
    ('EGR-2026-11796', 'c2', 'MANTENIMIENTO GPS', 'EMPRESA TRACKING S.R.L.', 'Mantenimiento y conectividad servidores GPS julio', 5025.00, 'Daniela (Cajera 01)', NOW() - INTERVAL '3 days'),
    ('EGR-2026-11797', 'c1', 'DEVOLUCIÓN DE AHORROS', 'EFRAIN RODRIGUEZ', 'Retiro autorizado de fondos para gastos médicos', 275.00, 'Administrador Central', NOW() - INTERVAL '2 days'),
    ('EGR-2026-11798', 'c1', 'ASIGNACIÓN DIRECTORIO', 'RUBEN AGUIRRE', 'Gastos de representación y viáticos reunión intersindical', 275.00, 'Administrador Central', NOW() - INTERVAL '1 day'),
    ('EGR-2026-11799', 'c1', 'PAGO DE SUELDOS', 'CLEMENTE CHURQUI', 'Sueldo sereno y seguridad sede central mes julio', 1600.00, 'Daniela (Cajera 01)', NOW() - INTERVAL '12 hours')
ON CONFLICT (nro_boleta) DO NOTHING;

-- 7. Insertar Bitácora de Auditoría
INSERT INTO auditoria_logs (fecha, operador, rol, tipo_operacion, detalle, estado)
VALUES 
    (NOW() - INTERVAL '3 days', 'admin33', 'admin', 'INICIO_SISTEMA', 'Inicialización y apertura de ejercicio contable mensual', 'EXITOSO'),
    (NOW() - INTERVAL '2 days', 'cajera01', 'cajero', 'COBRO_RECIBO', 'Emisión de recibo oficial REC-2026-0001 socio ID 1', 'EXITOSO'),
    (NOW() - INTERVAL '1 day', 'admin33', 'admin', 'REGISTRO_EGRESO', 'Aprobación de egreso EGR-2026-11798 por viáticos', 'EXITOSO'),
    (NOW() - INTERVAL '5 hours', 'cajera01', 'cajero', 'ARQUEO_CAJA', 'Arqueo de cierre de turno Caja General Efectivo', 'EXITOSO')
ON CONFLICT DO NOTHING;
