// Estados oficiales del Workflow de Cierre de Caja — Sindicato Radio Móvil 15 de Abril
export const ESTADOS_CIERRE = {
  ABIERTA: 'abierta',
  OPERACIONES_REGISTRADAS: 'operaciones_registradas',
  CIERRE_SOLICITADO: 'cierre_solicitado',       // Cajera envió → pendiente Secretaría
  REVISADO_SECRETARIA: 'revisado_secretaria',    // Secretaría aprobó → pendiente Tesorero
  APROBADO_TESORERO: 'aprobado_tesorero',        // Tesorero aprobó → pendiente Comisión Revisora
  CONSOLIDADO: 'consolidado',                    // Comisión Revisora dio visto bueno final
  OBSERVADO: 'observado_rechazado'              // Rechazado / Observado para corrección
};

// Roles del sistema de aprobación
export const ROLES_WORKFLOW = {
  CAJERO: 'cajero',                       // 1. Operadora / Cajera de ventanilla
  SECRETARIA: 'secretaria',               // 2. Secretaría / Administración
  TESORERO: 'tesorero',                   // 3. Tesorero del Sindicato
  COMISION_REVISORA: 'comision_revisora'  // 4. Comisión Revisora Mensual (socios por sorteo)
};

export const INITIAL_CIERRES = [
  {
    id: 'CC-2026-09-02-T1',
    cajaId: 'c1',
    cajaNombre: 'Caja General — Radio Móvil 15 de Abril',
    turno: 'Turno Mañana (07:00 - 14:00)',
    fecha: '02/09/2026',
    mesReporte: 'Septiembre 2026',
    cajero: { id: 'cajera01', nombre: 'Daniela Alarcón', cargo: 'Operadora / Cajera', ip: '192.168.100.14' },
    secretaria: { id: 'sec01', nombre: 'Ing. Carlos Mendoza', cargo: 'Secretaría de Administración', ip: '192.168.100.5' },
    tesorero: { id: 'tes01', nombre: 'Lic. Ramiro Paredes', cargo: 'Tesorero del Sindicato', ip: '192.168.100.2' },
    comisionRevisora: [
      { nombre: 'Sr. Juan Mamani', nroMovil: '015', cargo: 'Comisión Revisora' },
      { nombre: 'Sr. Pedro Quispe', nroMovil: '042', cargo: 'Comisión Revisora' },
      { nombre: 'Sra. Rosa Flores', nroMovil: '078', cargo: 'Comisión Revisora' }
    ],
    estado: ESTADOS_CIERRE.CIERRE_SOLICITADO,
    saldoInicial: 2500.0,
    totalIngresos: 4850.0,
    totalEgresos: 620.0,
    saldoTeorico: 6730.0,
    efectivoFisicoContado: 6730.0,
    diferencia: 0.0,
    comprobantesValidados: 18,
    observacionesCajero: 'Turno sin anomalías. Todos los socios del turno mañana cancelaron en efectivo exacto.',
    observacionesSecretaria: '',
    observacionesTesorero: '',
    observacionesComision: '',
    bloqueadoEdicion: true,
    auditoriaLogs: [
      {
        id: 1,
        fecha: '02/09/2026 07:00:15',
        usuario: 'Daniela Alarcón',
        rol: 'cajero',
        cargo: 'Operadora / Cajera',
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
        cargo: 'Operadora / Cajera',
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
        cargo: 'Operadora / Cajera',
        ip: '192.168.100.14',
        accion: 'SOLICITUD_CIERRE_ENVIADA',
        estadoAnterior: ESTADOS_CIERRE.OPERACIONES_REGISTRADAS,
        estadoNuevo: ESTADOS_CIERRE.CIERRE_SOLICITADO,
        observacion: 'Conteo físico completado (Bs 6,730.00). Gaveta cuadrada. Caja bloqueada para edición.'
      }
    ]
  },
  {
    id: 'CC-2026-09-01-T2',
    cajaId: 'c1',
    cajaNombre: 'Caja General — Radio Móvil 15 de Abril',
    turno: 'Turno Tarde (14:00 - 21:00)',
    fecha: '01/09/2026',
    mesReporte: 'Septiembre 2026',
    cajero: { id: 'cajero02', nombre: 'Marcos Villegas', cargo: 'Operador / Cajero', ip: '192.168.100.16' },
    secretaria: { id: 'sec01', nombre: 'Ing. Carlos Mendoza', cargo: 'Secretaría de Administración', ip: '192.168.100.5' },
    tesorero: { id: 'tes01', nombre: 'Lic. Ramiro Paredes', cargo: 'Tesorero del Sindicato', ip: '192.168.100.2' },
    comisionRevisora: [
      { nombre: 'Sr. Juan Mamani', nroMovil: '015', cargo: 'Comisión Revisora' },
      { nombre: 'Sr. Pedro Quispe', nroMovil: '042', cargo: 'Comisión Revisora' },
      { nombre: 'Sra. Rosa Flores', nroMovil: '078', cargo: 'Comisión Revisora' }
    ],
    estado: ESTADOS_CIERRE.CONSOLIDADO,
    saldoInicial: 6730.0,
    totalIngresos: 3200.0,
    totalEgresos: 450.0,
    saldoTeorico: 9480.0,
    efectivoFisicoContado: 9480.0,
    diferencia: 0.0,
    comprobantesValidados: 12,
    observacionesCajero: 'Corte regular de noche.',
    observacionesSecretaria: 'Revisión conforme de boletas físicas de cuotas y multas del turno.',
    observacionesTesorero: 'Aprobado conforme. Saldos cuadran con el libro de registro.',
    observacionesComision: 'Comisión Revisora otorga visto bueno. Ingresos y egresos del turno aprobados en sesión.',
    bloqueadoEdicion: true,
    auditoriaLogs: [
      { id: 10, fecha: '01/09/2026 21:10', usuario: 'Marcos Villegas', rol: 'cajero', cargo: 'Operador / Cajero', ip: '192.168.100.16', accion: 'SOLICITUD_CIERRE', estadoAnterior: ESTADOS_CIERRE.OPERACIONES_REGISTRADAS, estadoNuevo: ESTADOS_CIERRE.CIERRE_SOLICITADO, observacion: 'Cierre de turno enviado a Secretaría' },
      { id: 11, fecha: '01/09/2026 21:30', usuario: 'Ing. Carlos Mendoza', rol: 'secretaria', cargo: 'Secretaría de Administración', ip: '192.168.100.5', accion: 'REVISION_SECRETARIA', estadoAnterior: ESTADOS_CIERRE.CIERRE_SOLICITADO, estadoNuevo: ESTADOS_CIERRE.REVISADO_SECRETARIA, observacion: 'Revisado y conforme por Secretaría de Administración' },
      { id: 12, fecha: '01/09/2026 22:00', usuario: 'Lic. Ramiro Paredes', rol: 'tesorero', cargo: 'Tesorero del Sindicato', ip: '192.168.100.2', accion: 'APROBACION_TESORERO', estadoAnterior: ESTADOS_CIERRE.REVISADO_SECRETARIA, estadoNuevo: ESTADOS_CIERRE.APROBADO_TESORERO, observacion: 'Aprobado por el Tesorero General del Sindicato' },
      { id: 13, fecha: '01/09/2026 22:30', usuario: 'Comisión Revisora — Sr. Juan Mamani (y 2 miembros)', rol: 'comision_revisora', cargo: 'Comisión Revisora Mensual', ip: '192.168.100.20', accion: 'VISTO_BUENO_COMISION', estadoAnterior: ESTADOS_CIERRE.APROBADO_TESORERO, estadoNuevo: ESTADOS_CIERRE.CONSOLIDADO, observacion: 'Comisión Revisora otorga visto bueno. Ingresos y egresos del turno aprobados en sesión.' }
    ]
  }
];
