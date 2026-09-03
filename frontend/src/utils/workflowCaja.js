// Estados oficiales del Workflow Bancario de Cierre de Caja
export const ESTADOS_CIERRE = {
  ABIERTA: 'abierta',
  OPERACIONES_REGISTRADAS: 'operaciones_registradas',
  CIERRE_SOLICITADO: 'cierre_solicitado', // Pendiente de Aprobación
  OBSERVADO: 'observado_rechazado',
  APROBADO: 'aprobado',
  CONSOLIDADO: 'consolidado'
};

export const ROLES_WORKFLOW = {
  CAJERO: 'cajero',
  JEFE_OPERACIONES: 'jefe_operaciones',
  TESORERIA: 'tesoreria'
};

export const INITIAL_CIERRES = [
  {
    id: 'CC-2026-09-02-T1',
    cajaId: 'c1',
    cajaNombre: 'Caja General - Radio Móvil 15 de Abril',
    turno: 'Turno Mañana (07:00 - 14:00)',
    fecha: '02/09/2026',
    cajero: { id: 'cajera01', nombre: 'Daniela Alarcón', rol: 'cajero', ip: '192.168.100.14' },
    jefeOperaciones: { id: 'jefe02', nombre: 'Carlos Mendoza', rol: 'jefe_operaciones', ip: '192.168.100.5' },
    tesorero: { id: 'tesorero01', nombre: 'Lic. Ramiro Paredes', rol: 'tesoreria', ip: '192.168.100.2' },
    estado: ESTADOS_CIERRE.CIERRE_SOLICITADO, // En espera de revisión por Jefe de Operaciones
    saldoInicial: 2500.0,
    totalIngresos: 4850.0,
    totalEgresos: 620.0,
    saldoTeorico: 6730.0,
    efectivoFisicoContado: 6730.0,
    diferencia: 0.0,
    comprobantesValidados: 18,
    observacionesCajero: 'Turno sin anomalías. Todos los socios del turno mañana cancelaron en efectivo exacto.',
    observacionesJefe: '',
    observacionesTesoreria: '',
    bloqueadoEdicion: true,
    auditoriaLogs: [
      {
        id: 1,
        fecha: '02/09/2026 07:00:15',
        usuario: 'Daniela Alarcón',
        rol: 'cajero',
        ip: '192.168.100.14',
        accion: 'APERTURA_TURNO',
        estadoAnterior: null,
        estadoNuevo: ESTADOS_CIERRE.ABIERTA,
        observacion: 'Apertura de gaveta física con saldo base de Bs 2,500.00'
      },
      {
        id: 2,
        fecha: '02/09/2026 13:45:10',
        usuario: 'Daniela Alarcón',
        rol: 'cajero',
        ip: '192.168.100.14',
        accion: 'OPERACIONES_COMPLETADAS',
        estadoAnterior: ESTADOS_CIERRE.ABIERTA,
        estadoNuevo: ESTADOS_CIERRE.OPERACIONES_REGISTRADAS,
        observacion: '18 recibos emitidos (Bs 4,850.00) y 2 boletas de egreso (Bs 620.00)'
      },
      {
        id: 3,
        fecha: '02/09/2026 14:05:22',
        usuario: 'Daniela Alarcón',
        rol: 'cajero',
        ip: '192.168.100.14',
        accion: 'SOLICITUD_CIERRE_ENVIADA',
        estadoAnterior: ESTADOS_CIERRE.OPERACIONES_REGISTRADAS,
        estadoNuevo: ESTADOS_CIERRE.CIERRE_SOLICITADO,
        observacion: 'Conteo físico completado (Bs 6,730.00). Gaveta cuadrada sin faltantes. Caja bloqueada para edición.'
      }
    ]
  },
  {
    id: 'CC-2026-09-01-T2',
    cajaId: 'c1',
    cajaNombre: 'Caja General - Radio Móvil 15 de Abril',
    turno: 'Turno Tarde (14:00 - 21:00)',
    fecha: '01/09/2026',
    cajero: { id: 'cajero02', nombre: 'Marcos Villegas', rol: 'cajero', ip: '192.168.100.16' },
    jefeOperaciones: { id: 'jefe02', nombre: 'Carlos Mendoza', rol: 'jefe_operaciones', ip: '192.168.100.5' },
    tesorero: { id: 'tesorero01', nombre: 'Lic. Ramiro Paredes', rol: 'tesoreria', ip: '192.168.100.2' },
    estado: ESTADOS_CIERRE.CONSOLIDADO,
    saldoInicial: 6730.0,
    totalIngresos: 3200.0,
    totalEgresos: 450.0,
    saldoTeorico: 9480.0,
    efectivoFisicoContado: 9480.0,
    diferencia: 0.0,
    comprobantesValidados: 12,
    observacionesCajero: 'Corte regular de noche.',
    observacionesJefe: 'Revisión conforme de boletas físicas de gasolina y cuotas de radio.',
    observacionesTesoreria: 'Consolidado oficialmente en el balance general de asamblea.',
    bloqueadoEdicion: true,
    auditoriaLogs: [
      { id: 10, fecha: '01/09/2026 21:10', usuario: 'Marcos Villegas', rol: 'cajero', ip: '192.168.100.16', accion: 'SOLICITUD_CIERRE', estadoAnterior: ESTADOS_CIERRE.OPERACIONES_REGISTRADAS, estadoNuevo: ESTADOS_CIERRE.CIERRE_SOLICITADO, observacion: 'Cierre enviado' },
      { id: 11, fecha: '01/09/2026 21:30', usuario: 'Carlos Mendoza', rol: 'jefe_operaciones', ip: '192.168.100.5', accion: 'APROBACION_OPERACIONES', estadoAnterior: ESTADOS_CIERRE.CIERRE_SOLICITADO, estadoNuevo: ESTADOS_CIERRE.APROBADO, observacion: 'Aprobado sin observaciones' },
      { id: 12, fecha: '01/09/2026 22:00', usuario: 'Lic. Ramiro Paredes', rol: 'tesoreria', ip: '192.168.100.2', accion: 'CONSOLIDACION_LIBRO_MAYOR', estadoAnterior: ESTADOS_CIERRE.APROBADO, estadoNuevo: ESTADOS_CIERRE.CONSOLIDADO, observacion: 'Ingreso al balance general definitivo' }
    ]
  }
];