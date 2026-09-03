/**
 * DATOS BASE DE PRODUCCIÓN - SISTEMA CONTABLE SISCOB
 * Radio Móvil 15 de Abril (Tarija, Bolivia)
 * 
 * Configuración en blanco para inicio de operaciones limpias.
 * Todos los registros históricos anteriores han sido respaldados.
 */

// Padrón de Socios en Cero (Listo para registrar los socios reales)
export const INITIAL_SOCIOS = [];

// Cuentas por Cobrar y Obligaciones en Cero
export const INITIAL_DEUDAS = [];

// Balance de Cajas de Apertura - Mes Actual (Septiembre 2026)
export const INITIAL_CAJAS = [
  { 
    id: "c1", 
    nombre: "CAJA GENERAL", 
    saldoAnterior: 0.00, 
    ingresos: 0.00, 
    egresos: 0.00, 
    saldoActual: 0.00 
  },
  { 
    id: "c2", 
    nombre: "CAJA MANTENIMIENTO GPS", 
    saldoAnterior: 0.00, 
    ingresos: 0.00, 
    egresos: 0.00, 
    saldoActual: 0.00 
  }
];

// Egresos y Comprobantes en Cero
export const INITIAL_EGRESOS = [];

// Inventario de Almacén en Cero
export const INITIAL_PRODUCTOS = [];

// Módulos del Sistema para Control de Acceso (RBAC)
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

// Perfiles de Roles del Sistema
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

// Usuario Administrador Central de Arranque
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
    fechaCreacion: '2026-09-01',
    ultimoAcceso: '03/09/2026'
  }
];