// Datos simulados extraídos de la operación real de QUIPUS 3.5.4

export const INITIAL_SOCIOS = [
  {
    id: 20,
    nombres: "REMBERTO",
    apPaterno: "TORRICO",
    apMaterno: "VARGAS",
    ci: "4414561",
    celular: "7141199",
    placa: "2841-XYZ",
    vehiculo: "Toyota Caldina Blanco",
    fechaIngreso: "2017-02-26",
    estado: "VIG",
    categoria: "Propietario",
    observaciones: "Socio activo sin observaciones disciplinarias",
    acciones: [
      { id: "1120", fecha: "2017-02-26", monto: 0.0, estado: "VIG", categoria: "Propietario" }
    ],
    obligaciones: [
      { nombre: "Sostenimiento", monto: 400.0, periodicidad: "Mensual" },
      { nombre: "Mantenimiento GPS", monto: 80.0, periodicidad: "Mensual" },
      { nombre: "Aporte Publicidad", monto: 5.0, periodicidad: "Mensual" }
    ]
  },
  {
    id: 178,
    nombres: "LINO JAIME",
    apPaterno: "CONDORI",
    apMaterno: "GARCIA",
    ci: "3013145",
    celular: "75483109",
    placa: "3104-BTR",
    vehiculo: "Nissan Sunny Plateado",
    fechaIngreso: "2017-08-30",
    estado: "VIG",
    categoria: "Conductores",
    observaciones: "Asignado a turno mañana",
    acciones: [
      { id: "1108", fecha: "2017-08-30", monto: 0.0, estado: "VIG", categoria: "Conductores" }
    ],
    obligaciones: [
      { nombre: "Sostenimiento", monto: 400.0, periodicidad: "Mensual" },
      { nombre: "Mantenimiento GPS", monto: 80.0, periodicidad: "Mensual" }
    ]
  },
  {
    id: 4,
    nombres: "JOAQUIN",
    apPaterno: "CHURQUI",
    apMaterno: "GARCIA",
    ci: "4474581",
    celular: "72910482",
    placa: "1598-KLA",
    vehiculo: "Toyota Corolla Rojo",
    fechaIngreso: "2017-02-26",
    estado: "VIG",
    categoria: "Propietario",
    observaciones: "Socio fundador",
    acciones: [
      { id: "1004", fecha: "2017-02-26", monto: 0.0, estado: "VIG", categoria: "Propietario" }
    ],
    obligaciones: [
      { nombre: "Sostenimiento", monto: 400.0, periodicidad: "Mensual" },
      { nombre: "Mantenimiento GPS", monto: 80.0, periodicidad: "Mensual" }
    ]
  },
  {
    id: 1,
    nombres: "SANTIAGO",
    apPaterno: "LLANOS",
    apMaterno: "CANAZA",
    ci: "3829104",
    celular: "76829102",
    placa: "1940-LKN",
    vehiculo: "Nissan AD Blanco",
    fechaIngreso: "2015-10-28",
    estado: "VIG",
    categoria: "Conductores",
    observaciones: "Vehículo interno 01",
    acciones: [
      { id: "1001", fecha: "2015-10-28", monto: 350.0, estado: "VIG", categoria: "Conductores" }
    ],
    obligaciones: [
      { nombre: "Pago Frecuencia Mensual", monto: 200.0, periodicidad: "Mensual" },
      { nombre: "Aporte Publicidad", monto: 5.0, periodicidad: "Mensual" }
    ]
  },
  {
    id: 2,
    nombres: "CARLOS",
    apPaterno: "MAXI",
    apMaterno: "LA FUENTE",
    ci: "6184920",
    celular: "73910284",
    placa: "4502-PQR",
    vehiculo: "Suzuki Swift Plomo",
    fechaIngreso: "2018-01-15",
    estado: "VIG",
    categoria: "Inquilino",
    observaciones: "Turno intermedio",
    acciones: [
      { id: "1002", fecha: "2018-01-15", monto: 0.0, estado: "VIG", categoria: "Inquilino" }
    ],
    obligaciones: [
      { nombre: "Sostenimiento", monto: 400.0, periodicidad: "Mensual" }
    ]
  }
];

export const INITIAL_DEUDAS = [
  // Deudas de Remberto Torrico (ID 20)
  { id: "d1", socioId: 20, fecha: "2026-08-01", descripcion: "Ahorro", cantidad: 1, moneda: "Bs", monto: 1.0, pagado: false },
  { id: "d2", socioId: 20, fecha: "2026-08-01", descripcion: "Jefe de linea", cantidad: 1, moneda: "Bs", monto: 3.0, pagado: false },
  { id: "d3", socioId: 20, fecha: "2026-08-01", descripcion: "Sostenimiento", cantidad: 1, moneda: "Bs", monto: 16.0, pagado: false },
  { id: "d4", socioId: 20, fecha: "2026-07-05", descripcion: "Mantenimiento GPS JULIO", cantidad: 1, moneda: "Bs", monto: 36.0, pagado: false },
  { id: "d5", socioId: 20, fecha: "2026-07-27", descripcion: "Sostenimiento por pandemia", cantidad: 1, moneda: "Bs", monto: 10.0, pagado: false },
  { id: "d6", socioId: 20, fecha: "2026-08-01", descripcion: "Derecho de piso", cantidad: 1, moneda: "Bs", monto: 350.0, pagado: false },
  { id: "d7", socioId: 20, fecha: "2026-08-01", descripcion: "CERTIFICADO DE APORTACION", cantidad: 1, moneda: "Bs", monto: 700.0, pagado: false },
  { id: "d8", socioId: 20, fecha: "2026-08-01", descripcion: "MULTA POR INASISTENCIA A MARCHAS", cantidad: 1, moneda: "Bs", monto: 50.0, pagado: false },
  { id: "d9", socioId: 20, fecha: "2026-08-01", descripcion: "Sostenimiento Retrasado", cantidad: 1, moneda: "Bs", monto: 144.0, pagado: false },
  
  // Deudas de Lino Jaime Condori (ID 178)
  { id: "d10", socioId: 178, fecha: "2026-08-01", descripcion: "Interés Préstamo", cantidad: 1, moneda: "Bs", monto: 150.0, pagado: false },
  { id: "d11", socioId: 178, fecha: "2026-08-01", descripcion: "PRESTAMO", cantidad: 1, moneda: "Bs", monto: 1200.0, pagado: false },
  { id: "d12", socioId: 178, fecha: "2026-08-01", descripcion: "Pago Frecuencia Mensual", cantidad: 1, moneda: "Bs", monto: 200.0, pagado: false },
  
  // Deudas de Santiago Llanos (ID 1)
  { id: "d13", socioId: 1, fecha: "2026-08-01", descripcion: "Pago Frecuencia Mensual", cantidad: 1, moneda: "Bs", monto: 200.0, pagado: false },
  { id: "d14", socioId: 1, fecha: "2026-08-01", descripcion: "Aporte Publicidad", cantidad: 1, moneda: "Bs", monto: 5.0, pagado: false }
];

export const INITIAL_CAJAS = [
  { id: "c1", nombre: "CAJA GENERAL", saldoAnterior: 64685.70, ingresos: 14092.50, egresos: 66363.49 },
  { id: "c2", nombre: "CAJA MANTENIMIENTO GPS", saldoAnterior: 6732.00, ingresos: 2988.00, egresos: 5025.00 },
  { id: "c3", nombre: "CAJA SEGURO 2", saldoAnterior: 20.00, ingresos: 0.00, egresos: 0.00 },
  { id: "c4", nombre: "CAJA CERTIFICADO DE APORTACION", saldoAnterior: 47070.00, ingresos: 0.00, egresos: 0.00 },
  { id: "c5", nombre: "CAJA PRESTAMOS", saldoAnterior: 18500.00, ingresos: 4393.00, egresos: 12000.00 }
];

export const INITIAL_EGRESOS = [
  {
    id: 11799,
    fecha: "2026-07-31",
    grupo: "PAGO DE SUELDOS",
    descripcion: "PAGO DE SUELDO A SERENO MES DE JULIO",
    pagadoA: "CLEMENTE CHURQUI",
    monto: 1600.00,
    moneda: "Bs",
    conDocumento: "RESOLUCION DIRECTORIO",
    cajaId: "c1",
    usuario: "DANIELA",
    observaciones: "Pago mensual de seguridad"
  },
  {
    id: 11798,
    fecha: "2026-07-31",
    grupo: "ASIGNACIONES A DIRECTORIO",
    descripcion: "GASTOS DE REPRESENTACION Y REUNIONES",
    pagadoA: "RUBEN AGUIRRE",
    monto: 275.00,
    moneda: "Bs",
    conDocumento: "RECIBO NRO 450",
    cajaId: "c1",
    usuario: "DANIELA",
    observaciones: "Viáticos asamblea regional"
  },
  {
    id: 11797,
    fecha: "2026-07-31",
    grupo: "DEVOLUCION DE AHORRO DE SOCIO",
    descripcion: "RETIRO DE AHORRO PARA GASTOS MEDICOS",
    pagadoA: "(44) EFRAIN RODRIGUEZ",
    monto: 275.00,
    moneda: "Bs",
    conDocumento: "SOLICITUD FIRMADA",
    cajaId: "c1",
    usuario: "DANIELA",
    observaciones: "Aprobado por mesa directiva"
  },
  {
    id: 11796,
    fecha: "2026-07-31",
    grupo: "MANTENIMIENTO GPS",
    descripcion: "MANTENIMIENTO Y PRO GPS SERVIDORES",
    pagadoA: "EMPRESA TRACKING S.R.L.",
    monto: 5025.00,
    moneda: "Bs",
    conDocumento: "FACTURA NRO 8812",
    cajaId: "c2",
    usuario: "DANIELA",
    observaciones: "Pago trimestral soporte técnico"
  }
];

export const INITIAL_PRODUCTOS = [
  { codigo: "1076", descripcion: "PERNO CENTRAL COASTER 3/8X4", unidad: "unidad", precioCompra: 3.4, precioVenta: 5.0, stock: 39, alertaMin: 5 },
  { codigo: "1085", descripcion: "PERNO CARDAN ESTRIADO", unidad: "unidad", precioCompra: 5.0, precioVenta: 7.0, stock: 50, alertaMin: 10 },
  { codigo: "1178", descripcion: "SOPORTE ORIGINAL DE MOTOR", unidad: "unidad", precioCompra: 210.0, precioVenta: 280.0, stock: 4, alertaMin: 2 },
  { codigo: "1004", descripcion: "ACEITE GALON PREMIUM 40", unidad: "galon", precioCompra: 60.0, precioVenta: 77.5, stock: 2, alertaMin: 5 },
  { codigo: "1195", descripcion: "AGUA DESTILADA DESTIOL", unidad: "litro", precioCompra: 1.8, precioVenta: 2.5, stock: 33, alertaMin: 10 }
];

export const ALL_SYSTEM_MODULES = [
  { id: 'dashboard', label: 'Dashboard General', descripcion: 'Métricas, KPIs y alertas en tiempo real' },
  { id: 'socios', label: 'Padrón de Socios', descripcion: 'Gestión de afiliados, vehículos y credenciales' },
  { id: 'cuotas', label: 'Cuotas y Multas', descripcion: 'Configuración y asignación de cargos económicos' },
  { id: 'cobranzas', label: 'Caja Rápida / Cobranzas', descripcion: 'Ventanilla de cobros, recibos y reimpresión' },
  { id: 'egresos', label: 'Control de Egresos', descripcion: 'Emisión de boletas y pagos institucionales' },
  { id: 'prestamos', label: 'Gestión de Préstamos', descripcion: 'Créditos internos y cronogramas de amortización' },
  { id: 'workflow', label: 'Workflow Cierre de Caja', descripcion: 'Arqueo diario y balance de entrega de turno' },
  { id: 'balance', label: 'Balance por Cajas', descripcion: 'Estados de cuentas de cajas múltiples' },
  { id: 'almacen', label: 'Almacén y Repuestos', descripcion: 'Control de inventario, compras y kardex' },
  { id: 'reportes', label: 'Matriz de Reportes', descripcion: 'Exportación a Excel y nóminas oficiales' },
  { id: 'conciliacion', label: 'Conciliación Bancaria', descripcion: 'Importación de extractos y cuadre' },
  { id: 'auditoria', label: 'Bitácora de Auditoría', descripcion: 'Trazabilidad de operaciones de usuarios' },
  { id: 'ficha', label: 'Ficha Técnica del Sistema', descripcion: 'Documentación técnica de la plataforma' },
  { id: 'config', label: 'Configuración del Sistema', descripcion: 'Parámetros generales, tipo de cambio e insumos' },
  { id: 'usuarios', label: 'Usuarios y Roles', descripcion: 'Creación de operadores y asignación de permisos RBAC' }
];

export const INITIAL_ROLES = [
  {
    id: 'admin',
    nombre: 'Super Administrador / Directorio',
    descripcion: 'Acceso irrestricto a todos los módulos y operaciones del sistema.',
    color: 'red',
    modulos: ['dashboard', 'socios', 'cuotas', 'cobranzas', 'egresos', 'prestamos', 'workflow', 'balance', 'almacen', 'reportes', 'conciliacion', 'auditoria', 'ficha', 'config', 'usuarios'],
    permisos: { ver: true, crear: true, editar: true, anular: true, exportar: true }
  },
  {
    id: 'cajero',
    nombre: 'Cajero(a) de Ventanilla',
    descripcion: 'Cobranza en caja rápida, consulta de socios y arqueo de turno.',
    color: 'blue',
    modulos: ['dashboard', 'socios', 'cuotas', 'cobranzas', 'workflow'],
    permisos: { ver: true, crear: true, editar: false, anular: false, exportar: true }
  },
  {
    id: 'hacienda',
    nombre: 'Secretaría de Hacienda / Tesorería',
    descripcion: 'Control de egresos, balances, préstamos y estados financieros.',
    color: 'emerald',
    modulos: ['dashboard', 'socios', 'cuotas', 'cobranzas', 'egresos', 'prestamos', 'workflow', 'balance', 'reportes', 'conciliacion', 'auditoria'],
    permisos: { ver: true, crear: true, editar: true, anular: true, exportar: true }
  },
  {
    id: 'operador',
    nombre: 'Operador de Turno y Radio',
    descripcion: 'Padrón de afiliados, asignación de turnos y aplicación de multas.',
    color: 'amber',
    modulos: ['dashboard', 'socios', 'cuotas'],
    permisos: { ver: true, crear: true, editar: false, anular: false, exportar: true }
  },
  {
    id: 'auditor',
    nombre: 'Auditor / Fiscalizador',
    descripcion: 'Modo de supervisión y solo lectura en balances, reportes y bitácora.',
    color: 'purple',
    modulos: ['dashboard', 'balance', 'reportes', 'auditoria', 'ficha'],
    permisos: { ver: true, crear: false, editar: false, anular: false, exportar: true }
  }
];

export const INITIAL_USERS = [
  {
    id: 'u1',
    usuario: 'admin33',
    password: '123',
    nombreCompleto: 'Administrador Central (SISCOB)',
    email: 'admin@radiomovil15deabril.com',
    celular: '7141199',
    rolId: 'admin',
    estado: 'ACTIVO',
    fechaCreacion: '2025-01-10',
    ultimoAcceso: '03/09/2026, 11:15'
  },
  {
    id: 'u2',
    usuario: 'cajera01',
    password: '123',
    nombreCompleto: 'Daniela Condori Vargas',
    email: 'daniela.caja@radiomovil15deabril.com',
    celular: '75483109',
    rolId: 'cajero',
    estado: 'ACTIVO',
    fechaCreacion: '2025-03-15',
    ultimoAcceso: '03/09/2026, 10:45'
  },
  {
    id: 'u3',
    usuario: 'hacienda15',
    password: '123',
    nombreCompleto: 'Rubén Aguirre Méndez',
    email: 'hacienda@radiomovil15deabril.com',
    celular: '72910482',
    rolId: 'hacienda',
    estado: 'ACTIVO',
    fechaCreacion: '2025-02-01',
    ultimoAcceso: '02/09/2026, 18:20'
  }
];