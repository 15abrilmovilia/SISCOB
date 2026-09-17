// Tipos de horarios estándar para Radio Móvil 15 de Abril
export const TIPOS_HORARIO_TURNO = [
  {
    id: 'almuerzo',
    nombre: 'Turno Mediodía / Almuerzo',
    horas: '12:00 - 14:00',
    descripcion: 'Cubre el horario de almuerzo de la Administradora'
  },
  {
    id: 'noche',
    nombre: 'Turno Noche / Madrugada',
    horas: '18:00 - 06:00 (Día siguiente)',
    descripcion: 'Cubre la noche y madrugada hasta que regrese Administración'
  },
  {
    id: 'fin_semana',
    nombre: 'Turno Fin de Semana (Viernes a Lunes)',
    horas: 'Viernes 18:00 a Lunes 06:00',
    descripcion: 'Turno continuo de sábado y domingo para cuadre el Lunes'
  },
  {
    id: 'personalizado',
    nombre: 'Turno Especial / Personalizado',
    horas: 'Horario a definir',
    descripcion: 'Feriados o eventos especiales de asamblea'
  }
];

export const DENOMINACIONES_BILLETES = [
  { valor: 200, label: 'Billetes de Bs 200' },
  { valor: 100, label: 'Billetes de Bs 100' },
  { valor: 50,  label: 'Billetes de Bs 50' },
  { valor: 20,  label: 'Billetes de Bs 20' },
  { valor: 10,  label: 'Billetes de Bs 10' },
  { valor: 5,   label: 'Monedas de Bs 5' },
  { valor: 2,   label: 'Monedas de Bs 2' },
  { valor: 1,   label: 'Monedas de Bs 1' },
  { valor: 0.5, label: 'Monedas de 50 Ctv' }
];

// Calcular desglose exacto del turno (Efectivo vs. QR/Banco + Egresos)
export function calcularResumenTurno(turno, recibos = [], egresos = []) {
  if (!turno) {
    return {
      totalRecibos: 0,
      totalEfectivo: 0,
      totalBancoQR: 0,
      totalIngresos: 0,
      totalEgresos: 0,
      fondoCambio: 0,
      efectivoEsperadoEnMano: 0,
      cantidadRecibos: 0,
      cantidadEgresos: 0,
      recibos: [],
      egresos: []
    };
  }

  const fechaInicio = turno.fechaInicio ? new Date(turno.fechaInicio).getTime() : 0;
  const fechaFin = turno.fechaCierre ? new Date(turno.fechaCierre).getTime() : Date.now();

  const recibosTurno = (recibos || []).filter(r => {
    if (r.estado === 'ANULADO') return false;
    if (r.turnoId && r.turnoId === turno.id) return true;
    if (!r.fechaIso && !r.fecha) return false;
    try {
      const fStr = r.fechaIso || r.fecha;
      const tTime = new Date(fStr).getTime();
      if (!isNaN(tTime) && fechaInicio > 0) {
        return tTime >= (fechaInicio - 60000) && tTime <= (fechaFin + 3600000);
      }
    } catch (e) {}
    return false;
  });

  const egresosTurno = (egresos || []).filter(e => {
    if (e.turnoId && e.turnoId === turno.id) return true;
    try {
      const tTime = new Date(e.fecha).getTime();
      if (!isNaN(tTime) && fechaInicio > 0) {
        return tTime >= (fechaInicio - 60000) && tTime <= (fechaFin + 3600000);
      }
    } catch (err) {}
    return false;
  });

  let totalEfectivo = 0;
  let totalBancoQR = 0;

  recibosTurno.forEach(r => {
    const monto = parseFloat(r.totalBs) || 0;
    const metodo = (r.metodoPago || '').toLowerCase();
    if (metodo.includes('qr') || metodo.includes('banco') || metodo.includes('depósito') || metodo.includes('transferencia')) {
      totalBancoQR += monto;
    } else {
      totalEfectivo += monto;
    }
  });

  const totalEgresos = egresosTurno.reduce((acc, e) => acc + (parseFloat(e.monto) || 0), 0);
  const fondoCambio = parseFloat(turno.fondoCambio) || 0;

  // Fórmula: Fondo de Cambio Inicial + Efectivo Cobrado - Egresos pagados en efectivo
  const efectivoEsperadoEnMano = fondoCambio + totalEfectivo - totalEgresos;

  return {
    totalRecibos: recibosTurno.length,
    totalEfectivo,
    totalBancoQR,
    totalIngresos: totalEfectivo + totalBancoQR,
    totalEgresos,
    fondoCambio,
    efectivoEsperadoEnMano,
    cantidadRecibos: recibosTurno.length,
    cantidadEgresos: egresosTurno.length,
    recibos: recibosTurno,
    egresos: egresosTurno
  };
}

// Generar mensaje oficial para WhatsApp de la Directiva
export function generarMensajeWhatsAppTurno(turno, resumen, resultadoCuadre = {}) {
  const dif = resultadoCuadre.diferencia || 0;
  const estadoTexto = dif === 0 
    ? '✅ CAJA CUADRADA EXACTA (Bs 0.00)' 
    : dif < 0 
      ? ('⚠️ FALTANTE EN CAJA: -Bs ' + Math.abs(dif).toFixed(2) + ' (A cargo de la operadora)')
      : ('ℹ️ SOBRANTE EN CAJA: +Bs ' + dif.toFixed(2));

  const mensaje = 
    `🚕 *RADIO MÓVIL 15 DE ABRIL — SISCOB*%0A` +
    `📋 *INFORME OFICIAL DE ARQUEO Y CUADRE DE TURNO*%0A` +
    `-----------------------------------------------%0A` +
    `*Expediente Turno:* ${turno.id}%0A` +
    `*Horario:* ${turno.horarioLabel}%0A` +
    `*Operadora de Guardia:* ${turno.operadoraNombre}%0A` +
    `*Revisado por:* ${resultadoCuadre.revisadoPor || 'Administración Central'}%0A` +
    `*Fecha de Cuadre:* ${new Date().toLocaleDateString('es-BO')} ${new Date().toLocaleTimeString('es-BO')}%0A` +
    `-----------------------------------------------%0A` +
    `💵 *DESGLOSE DE FONDOS RECIBIDOS:*%0A` +
    `• Fondo Base de Cambio: Bs ${(resumen.fondoCambio || 0).toFixed(2)}%0A` +
    `• Cobranza en Efectivo: Bs ${(resumen.totalEfectivo || 0).toFixed(2)} (${resumen.totalRecibos} recibos)%0A` +
    `• (-) Egresos de Base: Bs ${(resumen.totalEgresos || 0).toFixed(2)}%0A` +
    `-----------------------------------------------%0A` +
    `👉 *EFECTIVO FÍSICO ENTREGADO EN MANO:* Bs ${(resultadoCuadre.efectivoContado || resumen.efectivoEsperadoEnMano).toFixed(2)}%0A` +
    `📱 *COBROS POR QR BANCO SOL:* Bs ${(resumen.totalBancoQR || 0).toFixed(2)} (Verificado en cuenta)%0A` +
    `-----------------------------------------------%0A` +
    `*DIAGNÓSTICO DE AUDITORÍA:*%0A` +
    `${estadoTexto}%0A%0A` +
    `_Sistema SISCOB • Control Económico y Cobranzas_`;

  return `https://wa.me/?text=${mensaje}`;
}
