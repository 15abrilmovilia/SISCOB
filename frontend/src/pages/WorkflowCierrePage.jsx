import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck, Clock, CheckCircle2, AlertTriangle,
  XCircle, Lock, Unlock, FileText, Printer,
  FileCheck2, Send, Users, ChevronRight, UserCheck,
  Dices, Plus, Trash2, Edit2, Save, Sparkles, Check,
  RefreshCw, RotateCcw, Landmark, Calculator, ArrowRight,
  Share2, MessageSquare, AlertCircle, Eye
} from 'lucide-react';
import { 
  ESTADOS_CIERRE, 
  ROLES_WORKFLOW, 
  DEFAULT_COMISIONES_MES 
} from '../utils/workflowCaja';
import { 
  TIPOS_HORARIO_TURNO, 
  DENOMINACIONES_BILLETES, 
  calcularResumenTurno, 
  generarMensajeWhatsAppTurno 
} from '../utils/turnosHelper';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { habilitarTurnoAPI, aprobarTurnoAPI } from '../utils/api';

export default function WorkflowCierrePage({ 
  socios = [], 
  currentUser,
  cajas = [],
  recibos = [],
  egresos = [],
  usuarios = [],
  turnoActivo,
  setTurnoActivo,
  historialTurnos = [],
  setHistorialTurnos
}) {
  // Pestaña Principal: 'turnos_guardia' (Lunes / Diario) | 'cierre_mensual' (Asamblea / Tesorero)
  const [activeMainTab, setActiveMainTab] = useState('turnos_guardia');

  // ── ESTADOS PARA GESTIÓN DE TURNOS DE OPERADORAS (LUNES / DIARIO) ──
  const [showHabilitarModal, setShowHabilitarModal] = useState(false);
  const [formHabilitar, setFormHabilitar] = useState({
    operadoraId: 'cajera01',
    operadoraNombre: 'Daniela Condori',
    horarioTipo: 'fin_semana',
    fondoCambio: '200.00',
    observaciones: 'Fondo base de cambio entregado en monedas y billetes chicos.'
  });

  // Modal de Cuadre del Lunes por la Administradora
  const [showCuadreModal, setShowCuadreModal] = useState(false);
  const [turnoEnCuadre, setTurnoEnCuadre] = useState(null);
  const [billetesCuadre, setBilletesCuadre] = useState({
    200: 0, 100: 0, 50: 0, 20: 0, 10: 0, 5: 0, 2: 0, 1: 0, 0.5: 0
  });
  const [bancoQrVerificado, setBancoQrVerificado] = useState(false);
  const [observacionesCuadre, setObservacionesCuadre] = useState('');

  // Modal para ver comprobante / acta de traspaso de custodia
  const [comprobanteImprimir, setComprobanteImprimir] = useState(null);

  // ── ESTADOS PARA CIERRE MENSUAL INSTITUCIONAL ──
  const [activeRole, setActiveRole] = useState(ROLES_WORKFLOW.SECRETARIA);
  const [cajaFiltroId, setCajaFiltroId] = useState('c1');
  const [observacionInput, setObservacionInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalActionType, setModalActionType] = useState('');

  const [comisionesPorMes, setComisionesPorMes] = useState(() => 
    loadFromStorage('siscob_comision_revisora', DEFAULT_COMISIONES_MES)
  );
  const [showComisionModal, setShowComisionModal] = useState(false);
  const [editingMes, setEditingMes] = useState('Septiembre 2026');
  const [tempMiembros, setTempMiembros] = useState([]);
  const [sorteoNotif, setSorteoNotif] = useState('');

  // Resumen en vivo del turno activo
  const resumenTurnoActivo = useMemo(() => {
    return calcularResumenTurno(turnoActivo, recibos, egresos);
  }, [turnoActivo, recibos, egresos]);

  // Resumen del turno que se está cuadrando en el modal
  const resumenTurnoEnCuadre = useMemo(() => {
    return calcularResumenTurno(turnoEnCuadre, recibos, egresos);
  }, [turnoEnCuadre, recibos, egresos]);

  // Total de efectivo físico contado en el modal de cuadre
  const totalEfectivoContadoCuadre = useMemo(() => {
    return Object.entries(billetesCuadre).reduce((acc, [valor, cant]) => {
      return acc + (parseFloat(valor) * (parseInt(cant) || 0));
    }, 0);
  }, [billetesCuadre]);

  const diferenciaCuadre = totalEfectivoContadoCuadre - (resumenTurnoEnCuadre.efectivoEsperadoEnMano || 0);

  // ── ACCIÓN 1: Administradora habilita turno a la operadora ──
  const handleConfirmHabilitarTurno = () => {
    const horarioDef = TIPOS_HORARIO_TURNO.find(h => h.id === formHabilitar.horarioTipo) || TIPOS_HORARIO_TURNO[2];
    const nuevoTurno = {
      id: 'TURNO-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + Math.floor(100 + Math.random() * 900),
      operadoraId: formHabilitar.operadoraId,
      operadoraNombre: formHabilitar.operadoraNombre,
      horarioTipo: formHabilitar.horarioTipo,
      horarioLabel: horarioDef.nombre + ' (' + horarioDef.horas + ')',
      fechaInicio: new Date().toISOString(),
      fechaCierre: null,
      fondoCambio: parseFloat(formHabilitar.fondoCambio) || 0,
      habilitadoPor: currentUser?.nombre || 'Administrador Central',
      estado: 'HABILITADO_ACTIVO',
      observacionesApertura: formHabilitar.observaciones || 'Turno habilitado regularmente',
      arqueoOperadora: null,
      cuadreAdmin: null
    };

    if (setTurnoActivo) {
      setTurnoActivo(nuevoTurno);
    }
    saveToStorage('siscob_turno_operadora_activo', nuevoTurno);
    // Sincronizar con Supabase / Railway
    habilitarTurnoAPI(nuevoTurno);
    setShowHabilitarModal(false);
    alert('✅ Turno habilitado con éxito para ' + nuevoTurno.operadoraNombre + '. La operadora ya puede cobrar en su horario.');
  };

  // ── ACCIÓN 2: Administradora finaliza turno anticipadamente ──
  const handleFinalizarTurnoAnticipado = () => {
    if (!turnoActivo) return;
    const conf = window.confirm('¿Desea cerrar el turno de ' + turnoActivo.operadoraNombre + ' para pasar al cuadre de caja?');
    if (!conf) return;

    const turnoActualizado = {
      ...turnoActivo,
      estado: 'ENTREGADO_PENDIENTE_CUADRE',
      fechaCierre: new Date().toISOString(),
      arqueoOperadora: {
        totalDeclarado: resumenTurnoActivo.efectivoEsperadoEnMano,
        observaciones: 'Cierre de turno solicitado por Administración'
      }
    };

    if (setTurnoActivo) {
      setTurnoActivo(turnoActualizado);
    }
    saveToStorage('siscob_turno_operadora_activo', turnoActualizado);
    alert('Turno cerrado. Ahora puede proceder a realizar el cuadre con la operadora.');
  };

  // ── ACCIÓN 3: Abrir Cuadre del Lunes por la Administradora ──
  const handleAbrirCuadre = (turno) => {
    setTurnoEnCuadre(turno);
    // Si la operadora dejó un desglose de billetes, precargarlo
    if (turno.arqueoOperadora && turno.arqueoOperadora.billetes) {
      setBilletesCuadre(turno.arqueoOperadora.billetes);
    } else {
      setBilletesCuadre({ 200: 0, 100: 0, 50: 0, 20: 0, 10: 0, 5: 0, 2: 0, 1: 0, 0.5: 0 });
    }
    setBancoQrVerificado(false);
    setObservacionesCuadre('');
    setShowCuadreModal(true);
  };

  // ── ACCIÓN 4: Confirmar Cuadre de Caja (Aprobado por Administradora) ──
  const handleConfirmarCuadreCaja = () => {
    if (!turnoEnCuadre) return;

    const estadoFinalCuadre = Math.abs(diferenciaCuadre) < 0.01 
      ? 'CUADRADA' 
      : diferenciaCuadre < 0 ? 'FALTANTE' : 'SOBRANTE';

    const turnoFinalizado = {
      ...turnoEnCuadre,
      estado: 'CUADRADO_CONFORME',
      fechaCuadre: new Date().toISOString(),
      cuadreAdmin: {
        revisadoPor: currentUser?.nombre || 'Administrador Central',
        fechaCuadre: new Date().toISOString(),
        efectivoEsperado: resumenTurnoEnCuadre.efectivoEsperadoEnMano,
        efectivoContado: totalEfectivoContadoCuadre,
        diferencia: diferenciaCuadre,
        estadoCuadre: estadoFinalCuadre,
        bancoQrVerificado,
        billetesDetalle: billetesCuadre,
        observaciones: observacionesCuadre || (estadoFinalCuadre === 'CUADRADA' ? 'Caja cuadrada sin diferencias' : 'Cuadre con observaciones')
      }
    };

    // Guardar en historial
    const nuevoHistorial = [turnoFinalizado, ...(historialTurnos || []).filter(h => h.id !== turnoFinalizado.id)];
    if (setHistorialTurnos) {
      setHistorialTurnos(nuevoHistorial);
    }
    saveToStorage('siscob_historial_turnos', nuevoHistorial);

    // Limpiar turno activo si era este
    if (turnoActivo && turnoActivo.id === turnoFinalizado.id) {
      if (setTurnoActivo) {
        setTurnoActivo(null);
      }
      saveToStorage('siscob_turno_operadora_activo', null);
    }

    // Sincronizar con Supabase / Railway
    aprobarTurnoAPI({
      id: turnoFinalizado.id,
      aprobadoPor: currentUser?.nombre || 'Administrador Central',
      notasAprobacion: observacionesCuadre || 'Cuadre conforme',
      resumenFinanciero: resumenTurnoEnCuadre,
      fechaCierre: new Date().toISOString(),
      billetesDeclarados: billetesCuadre,
      totalEfectivoDeclarado: totalEfectivoContadoCuadre
    });

    setShowCuadreModal(false);
    setComprobanteImprimir({ turno: turnoFinalizado, resumen: resumenTurnoEnCuadre });
    alert('✅ ¡Cuadre completado y registrado con éxito en la bitácora!');
  };

  // ── LOGICA DE CIERRE MENSUAL (CONECTADO 100% A DATOS REALES) ──
  const selectedCajaObj = useMemo(() => {
    if (cajaFiltroId === 'todas') {
      const saldoAnterior = cajas.reduce((acc, c) => acc + (parseFloat(c.saldoAnterior) || 0), 0);
      const ingresos = cajas.reduce((acc, c) => acc + (parseFloat(c.ingresos) || 0), 0);
      const egresosTot = cajas.reduce((acc, c) => acc + (parseFloat(c.egresos) || 0), 0);
      const saldoActual = cajas.reduce((acc, c) => acc + (parseFloat(c.saldoActual) || 0), 0);
      return {
        id: 'todas',
        nombre: 'Consolidado Institucional (Todas las Cajas)',
        saldoAnterior, ingresos, egresos: egresosTot, saldoActual
      };
    }
    return cajas.find(c => c.id === cajaFiltroId) || cajas[0] || {
      id: 'c1', nombre: 'Caja 1 — Cuotas de Frecuencia',
      saldoAnterior: 0, ingresos: 0, egresos: 0, saldoActual: 0
    };
  }, [cajas, cajaFiltroId]);

  const recibosFiltrados = useMemo(() => {
    return (recibos || []).filter(r => 
      r.estado !== 'ANULADO' && (cajaFiltroId === 'todas' || r.cajaId === cajaFiltroId)
    );
  }, [recibos, cajaFiltroId]);

  const egresosFiltrados = useMemo(() => {
    return (egresos || []).filter(e => 
      cajaFiltroId === 'todas' || e.cajaId === cajaFiltroId
    );
  }, [egresos, cajaFiltroId]);

  const generarCierreEnVivo = () => {
    const comisionActual = comisionesPorMes['Septiembre 2026'] || DEFAULT_COMISIONES_MES['Septiembre 2026'];
    const saldoInicial = parseFloat(selectedCajaObj.saldoAnterior) || 0;
    const totalIngresos = parseFloat(selectedCajaObj.ingresos) || 0;
    const totalEgresos = parseFloat(selectedCajaObj.egresos) || 0;
    const saldoTeorico = saldoInicial + totalIngresos - totalEgresos;
    const comprobantesCount = recibosFiltrados.length + egresosFiltrados.length;

    const cobradorInicial = (currentUser?.rol === 'admin' || currentUser?.rol === 'admin33')
      ? { id: currentUser?.id || 'admin01', nombre: currentUser?.nombre || 'Administrador Central', cargo: 'Administrador / Cobrador', ip: '192.168.100.5' }
      : { id: 'cajera01', nombre: currentUser?.nombre || 'Daniela Condori', cargo: 'Operadora / Cajera', ip: '192.168.100.14' };

    return {
      id: 'CC-' + new Date().toISOString().slice(0, 10) + '-T1',
      cajaId: selectedCajaObj.id,
      cajaNombre: selectedCajaObj.nombre,
      turno: 'Cierre del Mes (' + new Date().toLocaleDateString('es-BO') + ')',
      fecha: new Date().toLocaleDateString('es-BO'),
      mesReporte: 'Septiembre 2026',
      cajero: cobradorInicial,
      secretaria: { id: 'sec01', nombre: 'Ing. Carlos Mendoza', cargo: 'Secretaría de Administración', ip: '192.168.100.5' },
      tesorero: { id: 'tes01', nombre: 'Lic. Ramiro Paredes', cargo: 'Tesorero del Sindicato', ip: '192.168.100.2' },
      comisionRevisora: comisionActual,
      estado: totalIngresos > 0 || totalEgresos > 0 ? ESTADOS_CIERRE.OPERACIONES_REGISTRADAS : ESTADOS_CIERRE.ABIERTA,
      saldoInicial, totalIngresos, totalEgresos, saldoTeorico,
      efectivoFisicoContado: saldoTeorico, diferencia: 0.0,
      comprobantesValidados: comprobantesCount,
      observacionesCajero: comprobantesCount > 0 
        ? 'Cierre con ' + comprobantesCount + ' operaciones registradas en el sistema.' 
        : 'Caja limpia / Puesta a cero sin operaciones previas registradas.',
      observacionesSecretaria: '', observacionesTesorero: '', observacionesComision: '',
      bloqueadoEdicion: false,
      auditoriaLogs: [
        {
          id: 1, fecha: new Date().toLocaleString('es-BO'),
          usuario: cobradorInicial.nombre, rol: 'admin_cobrador',
          cargo: cobradorInicial.cargo, ip: cobradorInicial.ip,
          accion: 'APERTURA_CON_SALDOS_SISTEMA', estadoAnterior: null,
          estadoNuevo: ESTADOS_CIERRE.ABIERTA,
          observacion: 'Apertura de cierre sincronizada con saldos de caja (Saldo base: Bs ' + saldoInicial.toFixed(2) + ')'
        }
      ]
    };
  };

  const [cierres, setCierres] = useState(() => {
    const saved = loadFromStorage('siscob_cierres_workflow', null);
    if (saved && Array.isArray(saved) && saved.length > 0) return saved;
    return [generarCierreEnVivo()];
  });

  const [selectedCierreId, setSelectedCierreId] = useState(() => cierres[0]?.id || 'CC-ACTIVO');
  const selectedCierre = useMemo(() => {
    return cierres.find(c => c.id === selectedCierreId) || cierres[0] || generarCierreEnVivo();
  }, [cierres, selectedCierreId]);

  const handlePonerCierresACero = () => {
    const conf = window.confirm('¿Desea reiniciar el Workflow a CERO?\n\nDejará el acta limpia coincidiendo con la Puesta a Cero contable.');
    if (!conf) return;
    localStorage.removeItem('siscob_cierres_workflow');
    const nuevo = generarCierreEnVivo();
    setCierres([nuevo]);
    setSelectedCierreId(nuevo.id);
    saveToStorage('siscob_cierres_workflow', [nuevo]);
    alert('✅ Workflow puesto a cero.');
  };

  const handleSincronizarConSistema = () => {
    const nuevo = generarCierreEnVivo();
    setCierres(prev => [nuevo, ...prev.filter(c => c.id !== nuevo.id)]);
    setSelectedCierreId(nuevo.id);
    saveToStorage('siscob_cierres_workflow', [nuevo]);
    alert('✅ Cierre sincronizado con los saldos REALES de las cajas.');
  };

  // Sorteo aleatorio de Comisión Revisora
  const handleSorteoAleatorio = () => {
    const candidatos = socios.filter(s => s.estado !== 'BAJA' && s.estado !== 'INACTIVO');
    if (candidatos.length < 3) {
      alert('No hay suficientes socios activos para realizar el sorteo.');
      return;
    }
    const shuffled = [...candidatos].sort(() => 0.5 - Math.random());
    const seleccionados = shuffled.slice(0, 3);
    const cargos = ['Presidente Comisión', 'Secretario Comisión', 'Vocal Comisión'];
    const nuevos = seleccionados.map((s, idx) => ({
      id: s.id,
      nombre: (s.nombres + ' ' + s.apPaterno + (s.apMaterno ? ' ' + s.apMaterno : '')).trim().toUpperCase(),
      nroMovil: s.nroMovil || String(s.id).padStart(3, '0'),
      ci: s.ci || '',
      cargo: cargos[idx],
      metodo: 'Sorteo Aleatorio de Asamblea'
    }));
    setTempMiembros(nuevos);
    setSorteoNotif('🎲 ¡Sorteo realizado exitosamente entre ' + candidatos.length + ' socios activos!');
    setTimeout(() => setSorteoNotif(''), 5000);
  };

  const handleSaveComision = () => {
    if (tempMiembros.some(m => !m.nombre || !m.nombre.trim())) {
      alert('Complete los datos de todos los miembros.');
      return;
    }
    const updated = { ...comisionesPorMes, [editingMes]: tempMiembros };
    setComisionesPorMes(updated);
    saveToStorage('siscob_comision_revisora', updated);
    setCierres(prev => prev.map(c => c.mesReporte === editingMes ? { ...c, comisionRevisora: tempMiembros } : c));
    setShowComisionModal(false);
    alert('✅ Comisión Revisora guardada con éxito.');
  };

  const renderBadge = (estado) => {
    const badges = {
      [ESTADOS_CIERRE.ABIERTA]: <span className="bg-slate-100 text-slate-800 border border-slate-300 px-2.5 py-1 rounded-full text-xs font-bold">Abierta</span>,
      [ESTADOS_CIERRE.OPERACIONES_REGISTRADAS]: <span className="bg-blue-100 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full text-xs font-bold">Operaciones Registradas</span>,
      [ESTADOS_CIERRE.CIERRE_SOLICITADO]: <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-full text-xs font-black flex items-center animate-pulse"><Clock className="w-3.5 h-3.5 mr-1"/>Pendiente Secretaría</span>,
      [ESTADOS_CIERRE.REVISADO_SECRETARIA]: <span className="bg-cyan-100 text-cyan-900 border border-cyan-300 px-2.5 py-1 rounded-full text-xs font-black flex items-center"><CheckCircle2 className="w-3.5 h-3.5 mr-1"/>Revisado — Pendiente Tesorero</span>,
      [ESTADOS_CIERRE.APROBADO_TESORERO]: <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-2.5 py-1 rounded-full text-xs font-black flex items-center"><CheckCircle2 className="w-3.5 h-3.5 mr-1"/>Aprobado — Pendiente Comisión</span>,
      [ESTADOS_CIERRE.CONSOLIDADO]: <span className="bg-purple-100 text-purple-900 border border-purple-300 px-2.5 py-1 rounded-full text-xs font-black flex items-center"><FileCheck2 className="w-3.5 h-3.5 mr-1"/>Consolidado en Balances</span>,
      [ESTADOS_CIERRE.OBSERVADO]: <span className="bg-rose-100 text-rose-800 border border-rose-300 px-2.5 py-1 rounded-full text-xs font-black flex items-center"><AlertTriangle className="w-3.5 h-3.5 mr-1"/>Observado</span>,
    };
    return badges[estado] || null;
  };

  const steps = [
    { label: '1. Cajera / Admin', estados: [ESTADOS_CIERRE.OPERACIONES_REGISTRADAS, ESTADOS_CIERRE.CIERRE_SOLICITADO, ESTADOS_CIERRE.REVISADO_SECRETARIA, ESTADOS_CIERRE.APROBADO_TESORERO, ESTADOS_CIERRE.CONSOLIDADO] },
    { label: '2. Secretaría', estados: [ESTADOS_CIERRE.REVISADO_SECRETARIA, ESTADOS_CIERRE.APROBADO_TESORERO, ESTADOS_CIERRE.CONSOLIDADO] },
    { label: '3. Tesorero', estados: [ESTADOS_CIERRE.APROBADO_TESORERO, ESTADOS_CIERRE.CONSOLIDADO] },
    { label: '4. Comisión Revisora', estados: [ESTADOS_CIERRE.CONSOLIDADO] },
    { label: '5. Consolidado', estados: [ESTADOS_CIERRE.CONSOLIDADO] },
  ];

  const stepActivo = (step) => step.estados.includes(selectedCierre.estado);
  const stepPendiente = (i) => {
    if (selectedCierre.estado === ESTADOS_CIERRE.CIERRE_SOLICITADO && i === 1) return true;
    if (selectedCierre.estado === ESTADOS_CIERRE.REVISADO_SECRETARIA && i === 2) return true;
    if (selectedCierre.estado === ESTADOS_CIERRE.APROBADO_TESORERO && i === 3) return true;
    return false;
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 animate-fadeIn text-slate-800">

      {/* Selector Superior de Pestaña Principal */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap justify-between items-center gap-3 no-print">
        <div>
          <h1 className="text-base sm:text-lg font-black text-slate-900 flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-red-700" />
            <span>Workflow y Control de Caja — Radio Móvil 15 de Abril</span>
          </h1>
          <p className="text-xs text-slate-500">
            Custodia de turnos de operadoras, cuadres del Lunes y cierre mensual con Comisión Revisora
          </p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl space-x-1 text-xs font-bold">
          <button
            onClick={() => setActiveMainTab('turnos_guardia')}
            className={"px-4 py-2 rounded-lg transition cursor-pointer flex items-center space-x-1.5 " +
              (activeMainTab === 'turnos_guardia' ? 'bg-red-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900')}
          >
            <Clock className="w-4 h-4" />
            <span>1. Control de Turnos y Cuadre de Guardia (Lunes)</span>
            {turnoActivo && turnoActivo.estado === 'ENTREGADO_PENDIENTE_CUADRE' && (
              <span className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping ml-1" title="Cuadre pendiente"></span>
            )}
          </button>

          <button
            onClick={() => setActiveMainTab('cierre_mensual')}
            className={"px-4 py-2 rounded-lg transition cursor-pointer flex items-center space-x-1.5 " +
              (activeMainTab === 'cierre_mensual' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900')}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>2. Cierre Mensual Institucional (Asamblea)</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VISTA 1: CONTROL DE TURNOS Y CUADRE DEL LUNES (DIARIO / FIN DE SEMANA)     */}
      {/* ========================================================================= */}
      {activeMainTab === 'turnos_guardia' && (
        <div className="space-y-6">

          {/* Panel de Estado del Turno Actual */}
          {!turnoActivo ? (
            <div className="bg-white rounded-3xl border-2 border-dashed border-slate-300 p-6 sm:p-8 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h3 className="font-black text-base text-slate-900 uppercase">
                  Ningún Turno de Operadora Habilitado
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Actualmente la <strong>Administradora</strong> está a cargo de la oficina. Las operadoras tienen el cobro bloqueado hasta que usted habilite su turno de guardia (Almuerzo, Noche o Fin de Semana).
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowHabilitarModal(true)}
                className="px-6 py-3 bg-red-700 hover:bg-red-800 text-white rounded-2xl font-black text-xs transition shadow-md flex items-center space-x-2 mx-auto cursor-pointer active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>🟢 Habilitar Turno de Cobro para Operadora</span>
              </button>
            </div>
          ) : turnoActivo.estado === 'HABILITADO_ACTIVO' ? (
            <div className="bg-emerald-50 border-2 border-emerald-400 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex flex-wrap justify-between items-start gap-3">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-xs animate-pulse">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-black text-emerald-950 uppercase text-sm sm:text-base">
                        Turno de Guardia Habilitado y en Curso
                      </span>
                      <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                        Ventanilla Activa
                      </span>
                    </div>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      <strong>{turnoActivo.operadoraNombre}</strong> • {turnoActivo.horarioLabel}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleFinalizarTurnoAnticipado}
                  className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-xs font-black transition shadow-xs flex items-center space-x-1.5 cursor-pointer"
                >
                  <XCircle className="w-4 h-4" />
                  <span>🛑 Cerrar Turno y Pasar a Cuadre</span>
                </button>
              </div>

              {/* Métricas en vivo del turno */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs pt-2 border-t border-emerald-200">
                <div className="p-3 bg-white rounded-xl border border-emerald-200">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Fondo de Cambio:</span>
                  <strong className="text-slate-800 text-sm">Bs {parseFloat(turnoActivo.fondoCambio || 0).toFixed(2)}</strong>
                </div>
                <div className="p-3 bg-white rounded-xl border border-emerald-200 text-emerald-900">
                  <span className="text-[10px] text-emerald-700 uppercase font-bold block">Cobrado en Efectivo:</span>
                  <strong className="text-sm">Bs {resumenTurnoActivo.totalEfectivo.toFixed(2)} ({resumenTurnoActivo.totalRecibos} recibos)</strong>
                </div>
                <div className="p-3 bg-white rounded-xl border border-emerald-200 text-blue-900">
                  <span className="text-[10px] text-blue-700 uppercase font-bold block">Cobrado por QR / Banco:</span>
                  <strong className="text-sm">Bs {resumenTurnoActivo.totalBancoQR.toFixed(2)}</strong>
                </div>
                <div className="p-3 bg-slate-900 text-white rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Efectivo en Gaveta:</span>
                  <strong className="text-sm text-emerald-400">Bs {resumenTurnoActivo.efectivoEsperadoEnMano.toFixed(2)}</strong>
                </div>
              </div>
            </div>
          ) : (
            /* Turno entregado esperando cuadre del Lunes por la mañana */
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-400 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex flex-wrap justify-between items-start gap-3">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-amber-600 text-white rounded-2xl shadow-xs">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="bg-amber-200 text-amber-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                      Esperando Cuadre del Lunes
                    </span>
                    <h3 className="font-black text-base text-amber-950 uppercase mt-0.5">
                      Turno Entregado por {turnoActivo.operadoraNombre}
                    </h3>
                    <p className="text-xs text-amber-900 font-medium">
                      {turnoActivo.horarioLabel} • Efectivo Físico Declarado: <strong>Bs {parseFloat(turnoActivo.arqueoOperadora?.totalDeclarado || 0).toFixed(2)}</strong>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleAbrirCuadre(turnoActivo)}
                  className="px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-2xl text-xs font-black transition shadow-md flex items-center space-x-2 cursor-pointer active:scale-95"
                >
                  <Calculator className="w-4 h-4" />
                  <span>🔍 Realizar Cuadre de Caja del Lunes</span>
                </button>
              </div>

              {turnoActivo.arqueoOperadora?.observaciones && (
                <div className="p-3 bg-white/80 rounded-xl border border-amber-200 text-xs text-amber-900 italic">
                  <strong>Nota de la Operadora:</strong> "{turnoActivo.arqueoOperadora.observaciones}"
                </div>
              )}
            </div>
          )}

          {/* Historial de Turnos Cuadrados Anteriores */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-sm uppercase text-slate-900">
                  Historial de Turnos de Guardia Cuadrados
                </h3>
                <p className="text-xs text-slate-500">
                  Registro de traspaso de custodia y arqueos de caja finalizados
                </p>
              </div>
              <span className="text-xs font-bold font-mono text-slate-400">
                {(historialTurnos || []).length} Turnos cerrados
              </span>
            </div>

            {(historialTurnos || []).length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No hay turnos anteriores en el historial. Los turnos que cuadre los días lunes aparecerán aquí.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Expediente</th>
                      <th className="p-3">Horario / Período</th>
                      <th className="p-3">Operadora</th>
                      <th className="p-3">Efectivo Físico</th>
                      <th className="p-3">QR / Banco</th>
                      <th className="p-3">Estado Cuadre</th>
                      <th className="p-3 text-right">Comprobante</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {historialTurnos.map(h => (
                      <tr key={h.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-red-700">{h.id}</td>
                        <td className="p-3">
                          <strong className="text-slate-800 block">{h.horarioLabel}</strong>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {new Date(h.fechaCuadre || h.fechaInicio).toLocaleDateString('es-BO')}
                          </span>
                        </td>
                        <td className="p-3 font-medium text-slate-800">{h.operadoraNombre}</td>
                        <td className="p-3 font-mono font-bold text-slate-900">
                          Bs {parseFloat(h.cuadreAdmin?.efectivoContado || 0).toFixed(2)}
                        </td>
                        <td className="p-3 font-mono text-blue-800 font-bold">
                          Bs {parseFloat(h.cuadreAdmin?.bancoVerificado || 0).toFixed(2)}
                        </td>
                        <td className="p-3">
                          {h.cuadreAdmin?.estadoCuadre === 'CUADRADA' ? (
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                              ✓ Cuadrada
                            </span>
                          ) : (
                            <span className="bg-rose-100 text-rose-800 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                              Dif: Bs {parseFloat(h.cuadreAdmin?.diferencia || 0).toFixed(2)}
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            type="button"
                            onClick={() => setComprobanteImprimir({ turno: h, resumen: calcularResumenTurno(h, recibos, egresos) })}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs transition cursor-pointer"
                            title="Ver Comprobante de Custodia"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VISTA 2: CIERRE MENSUAL INSTITUCIONAL (TESORERO Y COMISIÓN REVISORA)      */}
      {/* ========================================================================= */}
      {activeMainTab === 'cierre_mensual' && (
        <div className="space-y-6">
          {/* Barra de Control de Saldos Reales y Caja Objetivo */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 no-print">
            <div className="flex items-center space-x-3 flex-1 min-w-[280px]">
              <Landmark className="w-5 h-5 text-red-700 shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Caja Vinculada para este Cierre:</span>
                <select
                  value={cajaFiltroId}
                  onChange={(e) => setCajaFiltroId(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="c1">Caja 1 — Frecuencia Mensual (Propietarios)</option>
                  <option value="c2">Caja 2 — Multas e Infracciones</option>
                  <option value="c3">Caja 3 — Nuevos Socios / Inscripciones</option>
                  <option value="c4">Caja 4 — Cartera y Préstamos</option>
                  <option value="c5">Caja 5 — Frecuencia Inquilinos</option>
                  <option value="todas">⭐ Consolidado General (Todas las 5 Cajas)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleSincronizarConSistema}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer"
                title="Sincronizar con saldos reales"
              >
                <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
                <span>Sincronizar Saldos Reales</span>
              </button>

              <button
                type="button"
                onClick={handlePonerCierresACero}
                className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer"
                title="Poner cierres a cero"
              >
                <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
                <span>Poner Workflow a CERO</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Columna izquierda: Comisión y Expedientes */}
            <div className="lg:col-span-4 space-y-4 no-print">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-4 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-amber-700" />
                    <h3 className="font-extrabold text-xs uppercase text-amber-950">
                      Comisión Revisora ({selectedCierre.mesReporte})
                    </h3>
                  </div>
                  <span className="bg-amber-200 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {(selectedCierre.comisionRevisora || []).length} Miembros
                  </span>
                </div>
                <p className="text-[11px] text-amber-800">
                  Socios asignados por sorteo de asamblea para aprobar ingresos y egresos junto al Tesorero.
                </p>
                <button
                  onClick={() => {
                    setEditingMes(selectedCierre.mesReporte || 'Septiembre 2026');
                    setTempMiembros(JSON.parse(JSON.stringify(comisionesPorMes[selectedCierre.mesReporte] || [])));
                    setShowComisionModal(true);
                  }}
                  className="w-full py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
                >
                  <Dices className="w-4 h-4" />
                  <span>Sortear / Asignar Socios del Mes</span>
                </button>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
                <h3 className="font-extrabold text-sm uppercase tracking-wide text-slate-900">Expedientes de Cierre</h3>
                <span className="text-xs font-bold text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">{cierres.length} Turnos</span>
              </div>

              <div className="space-y-2.5">
                {cierres.map(c => (
                  <div key={c.id}
                    onClick={() => setSelectedCierreId(c.id)}
                    className={"p-4 rounded-2xl border transition-all cursor-pointer space-y-2 " +
                      (selectedCierre.id === c.id ? 'bg-white border-red-700 shadow-md ring-2 ring-red-700/10' : 'bg-white hover:bg-slate-50 border-slate-200')}>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono font-bold text-xs text-red-700 block">{c.id}</span>
                        <strong className="text-xs font-bold text-slate-900">{c.turno}</strong>
                      </div>
                      {renderBadge(c.estado)}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium flex items-center justify-between">
                      <span>Cobrador: <strong className="text-slate-800">{c.cajero.nombre}</strong></span>
                      <span className="text-slate-400 font-mono text-[10px]">{c.fecha}</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono pt-2 border-t border-slate-100">
                      <span className="text-slate-500">Saldo Teórico:</span>
                      <strong className={c.saldoTeorico === 0 ? "text-slate-400" : "text-slate-900 font-bold"}>
                        Bs {c.saldoTeorico.toFixed(2)}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Columna derecha: Acta de Cierre Mensual Imprimible */}
            <div className="lg:col-span-8 space-y-5">
              <div id="printable-area" className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-5">
                <div className="flex justify-between items-start border-b-2 border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-red-700 tracking-wider uppercase block">
                      Sindicato Radio Móvil 15 de Abril — SISCOB
                    </span>
                    <h2 className="font-black text-lg text-slate-900 uppercase">
                      Acta Oficial de Arqueo y Cierre de Caja
                    </h2>
                    <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono mt-1">
                      <span>Expediente: <strong>{selectedCierre.id}</strong></span>
                      <span>•</span>
                      <span className="text-red-700 font-bold">Mes: {selectedCierre.mesReporte}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    {renderBadge(selectedCierre.estado)}
                    <div className="text-[10px] font-mono text-slate-400 mt-1">Fecha: {selectedCierre.fecha}</div>
                  </div>
                </div>

                {/* Resumen financiero 100% real */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Saldo Apertura:</span>
                    <strong className="text-slate-800 text-sm">Bs {selectedCierre.saldoInicial.toFixed(2)}</strong>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                    <span className="text-[10px] text-emerald-700 block uppercase font-bold">(+) Ingresos Cobrados:</span>
                    <strong className="text-sm">Bs {selectedCierre.totalIngresos.toFixed(2)}</strong>
                  </div>
                  <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-rose-900">
                    <span className="text-[10px] text-rose-700 block uppercase font-bold">(-) Egresos Pagados:</span>
                    <strong className="text-sm">Bs {selectedCierre.totalEgresos.toFixed(2)}</strong>
                  </div>
                  <div className="p-3 bg-slate-900 text-white rounded-xl">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">(=) Saldo Teórico:</span>
                    <strong className="text-sm text-emerald-400">Bs {selectedCierre.saldoTeorico.toFixed(2)}</strong>
                  </div>
                </div>

                {/* Comisión Revisora Miembros */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
                  <span className="flex items-center gap-2 font-extrabold text-xs text-amber-950 uppercase">
                    <Users className="w-4 h-4 text-amber-700"/>
                    Comisión Revisora Asignada — {selectedCierre.mesReporte}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {(selectedCierre.comisionRevisora || []).map((m, i) => (
                      <div key={i} className="bg-white border border-amber-200 rounded-lg p-2 text-xs">
                        <strong className="text-slate-900 block font-bold text-[11px]">{m.nombre}</strong>
                        <span className="text-amber-800 font-semibold text-[10px]">Móvil #{m.nroMovil} • {m.cargo}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Firmas Oficiales */}
                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <p className="text-center font-bold text-slate-400 text-[10px] uppercase tracking-wider">
                    Firmas y Rúbricas Oficiales de Conformidad
                  </p>
                  <div className="grid grid-cols-3 gap-3 text-center text-[10px]">
                    <div className="border-t border-slate-400 pt-1">
                      <strong className="block text-slate-800">{selectedCierre.cajero.nombre}</strong>
                      <span className="text-slate-500 uppercase block">{selectedCierre.cajero.cargo}</span>
                    </div>
                    <div className="border-t border-slate-400 pt-1">
                      <strong className="block text-slate-800">{selectedCierre.secretaria.nombre}</strong>
                      <span className="text-slate-500 uppercase block">{selectedCierre.secretaria.cargo}</span>
                    </div>
                    <div className="border-t border-slate-400 pt-1">
                      <strong className="block text-slate-800">{selectedCierre.tesorero.nombre}</strong>
                      <span className="text-slate-500 uppercase block">{selectedCierre.tesorero.cargo}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center text-[10px] pt-2">
                    {(selectedCierre.comisionRevisora || []).map((m, idx) => (
                      <div key={idx} className="border-t border-amber-400 pt-1">
                        <strong className="block text-slate-800">{m.nombre}</strong>
                        <span className="text-amber-800 block">Comisión Revisora (Móvil #{m.nroMovil})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Barra de Acciones del Cierre */}
              <div className="flex justify-end space-x-2 no-print">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir Acta Oficial</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: HABILITAR TURNO DE OPERADORA (POR LA ADMINISTRADORA)             */}
      {/* ========================================================================= */}
      {showHabilitarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 text-xs">
            <div className="bg-gradient-to-r from-red-800 to-red-950 text-white p-5 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-700 rounded-xl">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm uppercase tracking-wide">
                    Habilitar Turno de Guardia para Operadora
                  </h3>
                  <p className="text-red-200 text-xs">
                    Asignación de custodia de cobranzas y fondo de cambio base
                  </p>
                </div>
              </div>
              <button onClick={() => setShowHabilitarModal(false)} className="text-white/80 hover:text-white text-lg font-bold">✕</button>
            </div>

            <div className="p-6 space-y-4">
              {/* Seleccionar Operadora */}
              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase text-[10px]">
                  Operadora Responsable de Guardia:
                </label>
                <select
                  value={formHabilitar.operadoraId}
                  onChange={(e) => {
                    const id = e.target.value;
                    const op = (usuarios || []).find(u => u.id === id || u.usuario === id);
                    setFormHabilitar(prev => ({
                      ...prev,
                      operadoraId: id,
                      operadoraNombre: op ? (op.nombre || op.nombreCompleto) : 'Daniela Condori'
                    }));
                  }}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                >
                  <option value="cajera01">Daniela Condori (Operadora de Radio)</option>
                  {(usuarios || []).filter(u => u.rol === 'cajero' && u.id !== 'cajera01').map(u => (
                    <option key={u.id} value={u.id}>
                      {u.nombre || u.nombreCompleto} ({u.usuario})
                    </option>
                  ))}
                </select>
              </div>

              {/* Tipo de Horario */}
              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase text-[10px]">
                  Horario de Guardia a Habilitar:
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {TIPOS_HORARIO_TURNO.map(h => (
                    <label
                      key={h.id}
                      className={"p-3 rounded-xl border flex items-center justify-between cursor-pointer transition " +
                        (formHabilitar.horarioTipo === h.id ? 'bg-red-50 border-red-500 ring-1 ring-red-500' : 'bg-slate-50 border-slate-200 hover:bg-slate-100')}
                    >
                      <div className="flex items-center space-x-2.5">
                        <input
                          type="radio"
                          name="horarioTipo"
                          value={h.id}
                          checked={formHabilitar.horarioTipo === h.id}
                          onChange={() => setFormHabilitar(prev => ({ ...prev, horarioTipo: h.id }))}
                          className="text-red-700 focus:ring-red-500"
                        />
                        <div>
                          <strong className="text-slate-900 block text-xs">{h.nombre}</strong>
                          <span className="text-[11px] text-slate-500">{h.descripcion}</span>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded font-bold text-slate-700">
                        {h.horas}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Fondo de Cambio Inicial */}
              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase text-[10px]">
                  Fondo de Cambio Inicial Entregado en Gaveta (Bs):
                </label>
                <input
                  type="number"
                  min="0"
                  step="10"
                  value={formHabilitar.fondoCambio}
                  onChange={(e) => setFormHabilitar(prev => ({ ...prev, fondoCambio: e.target.value }))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono font-bold text-emerald-900"
                  placeholder="200.00"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Este monto se sumará al efectivo físico que la operadora debe entregarle al terminar.
                </span>
              </div>

              {/* Observaciones */}
              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase text-[10px]">
                  Observaciones de Apertura:
                </label>
                <input
                  type="text"
                  value={formHabilitar.observaciones}
                  onChange={(e) => setFormHabilitar(prev => ({ ...prev, observaciones: e.target.value }))}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs"
                  placeholder="Ej: Billetes de 20 y 10 para cambio..."
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowHabilitarModal(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer transition"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmHabilitarTurno}
                  className="px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-xl font-black transition shadow-xs flex items-center space-x-2 cursor-pointer active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Habilitar Turno Oficial</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: CUADRE DE CAJA DEL LUNES (RECONCILIACIÓN POR ADMINISTRADORA)      */}
      {/* ========================================================================= */}
      {showCuadreModal && turnoEnCuadre && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 text-xs animate-fadeIn">
            {/* Cabecera */}
            <div className="bg-gradient-to-r from-slate-900 to-red-950 text-white p-5 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-red-700 rounded-2xl">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm uppercase tracking-wide">
                    Cuadre y Recepción de Turno (Lunes / Cambio de Guardia)
                  </h3>
                  <p className="text-red-200 text-xs">
                    Operadora: <strong>{turnoEnCuadre.operadoraNombre}</strong> • {turnoEnCuadre.horarioLabel}
                  </p>
                </div>
              </div>
              <button onClick={() => setShowCuadreModal(false)} className="text-white/80 hover:text-white text-lg font-bold">✕</button>
            </div>

            <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              {/* Comparador de 2 Columnas: Lo que dice el sistema vs Lo que se cuenta en sobre */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Columna Izquierda: Lo que registró el Sistema */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 font-mono">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-bold uppercase text-slate-500">
                      1. Valores Registrados en el Sistema
                    </span>
                    <span className="text-[10px] text-slate-400">{resumenTurnoEnCuadre.totalRecibos} Cobros</span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-700">
                      <span>(+) Fondo Inicial de Cambio:</span>
                      <strong>Bs {(resumenTurnoEnCuadre.fondoCambio || 0).toFixed(2)}</strong>
                    </div>
                    <div className="flex justify-between text-emerald-800">
                      <span>(+) Cobranza en Efectivo:</span>
                      <strong>Bs {resumenTurnoEnCuadre.totalEfectivo.toFixed(2)}</strong>
                    </div>
                    <div className="flex justify-between text-rose-800">
                      <span>(-) Egresos pagados en turno:</span>
                      <strong>- Bs {resumenTurnoEnCuadre.totalEgresos.toFixed(2)}</strong>
                    </div>

                    <div className="pt-2 border-t border-slate-300 flex justify-between text-sm bg-slate-100 p-2.5 rounded-xl">
                      <span className="font-sans font-black text-slate-900 text-xs uppercase">
                        👉 Efectivo Esperado en Sobre:
                      </span>
                      <strong className="text-emerald-800 text-base">
                        Bs {resumenTurnoEnCuadre.efectivoEsperadoEnMano.toFixed(2)}
                      </strong>
                    </div>

                    {/* QR Banco Sol aparte */}
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-950 font-sans text-xs space-y-1">
                      <div className="flex justify-between font-mono">
                        <span className="font-bold">📱 Cobros por QR Banco Sol:</span>
                        <strong className="text-blue-900 text-sm">Bs {resumenTurnoEnCuadre.totalBancoQR.toFixed(2)}</strong>
                      </div>
                      <p className="text-[11px] text-blue-700">
                        Este dinero ya se acreditó directamente en la cuenta bancaria del sindicato.
                      </p>
                      <label className="flex items-center space-x-2 pt-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={bancoQrVerificado}
                          onChange={(e) => setBancoQrVerificado(e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-[11px] font-bold text-blue-900">
                          He verificado el extracto del Banco Sol y los Bs {resumenTurnoEnCuadre.totalBancoQR.toFixed(2)} están confirmados.
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Columna Derecha: Conteo Real del Sobre (Calculadora de Billetes) */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-[10px] font-bold uppercase text-slate-500">
                      2. Conteo Físico Real del Sobre
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold">Calculadora Bolivianos</span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5">
                    {DENOMINACIONES_BILLETES.map(d => (
                      <div key={d.valor} className="bg-slate-50 p-2 rounded-xl border border-slate-200 text-xs">
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-600 mb-0.5">
                          <span>Bs {d.valor}</span>
                          <span className="font-mono text-emerald-700">
                            Bs {((parseFloat(billetesCuadre[d.valor]) || 0) * d.valor).toFixed(0)}
                          </span>
                        </div>
                        <input
                          type="number"
                          min="0"
                          placeholder="0"
                          value={billetesCuadre[d.valor] || ''}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            setBilletesCuadre(prev => ({ ...prev, [d.valor]: Math.max(0, val) }));
                          }}
                          className="w-full p-1 bg-white border border-slate-300 rounded text-center text-xs font-mono font-bold"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-slate-900 text-white rounded-xl flex justify-between items-center font-mono">
                    <span className="text-xs uppercase font-bold text-slate-300">
                      Total Contado en Mano:
                    </span>
                    <strong className="text-lg text-emerald-400 font-black">
                      Bs {totalEfectivoContadoCuadre.toFixed(2)}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Semáforo de Diagnóstico del Cuadre */}
              <div className={"p-4 rounded-2xl border-2 flex items-center justify-between " +
                (Math.abs(diferenciaCuadre) < 0.01 
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-950' 
                  : diferenciaCuadre < 0 
                    ? 'bg-rose-50 border-rose-400 text-rose-950' 
                    : 'bg-blue-50 border-blue-400 text-blue-950')}>
                <div className="flex items-center space-x-3">
                  {Math.abs(diferenciaCuadre) < 0.01 ? (
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                  ) : diferenciaCuadre < 0 ? (
                    <AlertTriangle className="w-8 h-8 text-rose-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-8 h-8 text-blue-600 shrink-0" />
                  )}
                  <div>
                    <h4 className="font-black text-sm uppercase">
                      {Math.abs(diferenciaCuadre) < 0.01 
                        ? '✅ CAJA CUADRADA EXACTA (Bs 0.00)' 
                        : diferenciaCuadre < 0 
                          ? '⚠️ FALTANTE EN CAJA DE LA OPERADORA' 
                          : 'ℹ️ SOBRANTE EN CAJA'}
                    </h4>
                    <p className="text-xs">
                      {Math.abs(diferenciaCuadre) < 0.01 
                        ? 'El efectivo entregado en sobre coincide centavo a centavo con lo registrado en el sistema.' 
                        : diferenciaCuadre < 0 
                          ? 'Faltan Bs ' + Math.abs(diferenciaCuadre).toFixed(2) + ' para completar lo recaudado. Este saldo queda a cargo de ' + turnoEnCuadre.operadoraNombre + '.' 
                          : 'Hay un sobrante de Bs ' + diferenciaCuadre.toFixed(2) + ' en el sobre.'}
                    </p>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-[10px] uppercase font-bold block text-slate-500">Diferencia:</span>
                  <strong className={"text-xl font-black " + (Math.abs(diferenciaCuadre) < 0.01 ? 'text-emerald-700' : diferenciaCuadre < 0 ? 'text-rose-700' : 'text-blue-700')}>
                    {diferenciaCuadre >= 0 ? '+' : ''}Bs {diferenciaCuadre.toFixed(2)}
                  </strong>
                </div>
              </div>

              {/* Observaciones del Cuadre */}
              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase text-[10px]">
                  Observaciones de la Administradora:
                </label>
                <textarea
                  rows="2"
                  value={observacionesCuadre}
                  onChange={(e) => setObservacionesCuadre(e.target.value)}
                  placeholder="Ej: Turno de fin de semana recibido conforme, sobre entregado a horas 08:30..."
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              {/* Botones de Acción */}
              <div className="pt-2 flex flex-wrap justify-between items-center gap-3 border-t border-slate-200">
                <a
                  href={generarMensajeWhatsAppTurno(turnoEnCuadre, resumenTurnoEnCuadre, {
                    revisadoPor: currentUser?.nombre || 'Administrador Central',
                    efectivoContado: totalEfectivoContadoCuadre,
                    diferencia: diferenciaCuadre
                  })}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black transition shadow-xs flex items-center space-x-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>📲 Enviar Resumen a WhatsApp de Directiva</span>
                </a>

                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowCuadreModal(false)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmarCuadreCaja}
                    className="px-6 py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-xl font-black transition shadow-md flex items-center space-x-2 cursor-pointer active:scale-95"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Aprobar y Recibir Caja Conforme</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: COMPROBANTE DE TRASPASO DE CUSTODIA (IMPRIMIBLE)                  */}
      {/* ========================================================================= */}
      {comprobanteImprimir && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 text-xs">
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center no-print">
              <span className="font-bold">Acta Oficial de Traspaso de Custodia</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1 bg-red-700 text-white rounded-lg font-bold text-xs flex items-center space-x-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir</span>
                </button>
                <button onClick={() => setComprobanteImprimir(null)} className="text-white">✕</button>
              </div>
            </div>

            <div id="printable-area" className="p-6 space-y-4 text-slate-900 font-sans">
              <div className="text-center border-b pb-2 space-y-0.5">
                <h2 className="font-black text-sm uppercase">SINDICATO RADIO MÓVIL 15 DE ABRIL</h2>
                <p className="text-[10px] font-bold text-red-700 uppercase">ACTA DE TRASPASO DE CUSTODIA Y ARQUEO</p>
                <p className="text-[9px] text-slate-400 font-mono">Expediente: {comprobanteImprimir.turno.id}</p>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Horario:</span>
                  <strong>{comprobanteImprimir.turno.horarioLabel}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Operadora Entregante:</span>
                  <strong>{comprobanteImprimir.turno.operadoraNombre}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Administradora Receptora:</span>
                  <strong>{comprobanteImprimir.turno.cuadreAdmin?.revisadoPor || 'Administración'}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Fecha de Cuadre:</span>
                  <span className="font-mono">{new Date().toLocaleString('es-BO')}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Fondo Base de Cambio:</span>
                  <span>Bs {(comprobanteImprimir.resumen.fondoCambio || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cobranza Efectivo:</span>
                  <span>Bs {(comprobanteImprimir.resumen.totalEfectivo || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-rose-700">
                  <span>(-) Egresos pagados:</span>
                  <span>- Bs {(comprobanteImprimir.resumen.totalEgresos || 0).toFixed(2)}</span>
                </div>
                <div className="pt-1.5 border-t border-slate-300 flex justify-between font-bold text-slate-900">
                  <span>EFECTIVO ENTREGADO:</span>
                  <span className="text-emerald-800 text-sm">
                    Bs {(comprobanteImprimir.turno.cuadreAdmin?.efectivoContado || comprobanteImprimir.resumen.efectivoEsperadoEnMano).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-blue-900 pt-1">
                  <span>Cobros QR Banco Sol:</span>
                  <span>Bs {(comprobanteImprimir.resumen.totalBancoQR || 0).toFixed(2)}</span>
                </div>
              </div>

              <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl text-center font-bold text-emerald-900 text-xs">
                {comprobanteImprimir.turno.cuadreAdmin?.estadoCuadre === 'CUADRADA' 
                  ? '✅ CAJA RECIBIDA CUADRADA Y CONFORME (Bs 0.00)'
                  : 'DIFERENCIA REGISTRADA: Bs ' + parseFloat(comprobanteImprimir.turno.cuadreAdmin?.diferencia || 0).toFixed(2)}
              </div>

              <div className="pt-8 grid grid-cols-2 gap-4 text-center text-[10px]">
                <div className="border-t border-slate-400 pt-1">
                  <strong className="block">{comprobanteImprimir.turno.operadoraNombre}</strong>
                  <span className="text-slate-500 uppercase">Operadora Entregante</span>
                </div>
                <div className="border-t border-slate-400 pt-1">
                  <strong className="block">{comprobanteImprimir.turno.cuadreAdmin?.revisadoPor || 'Administración'}</strong>
                  <span className="text-slate-500 uppercase">Administradora Receptora</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: ASIGNAR COMISIÓN REVISORA */}
      {showComisionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 text-xs">
            <div className="bg-gradient-to-r from-amber-700 to-amber-900 text-white p-5 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-600 rounded-xl">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm uppercase tracking-wide">
                    Asignación de Comisión Revisora Mensual
                  </h3>
                  <p className="text-amber-200 text-xs">
                    Sindicato Radio Móvil 15 de Abril • Período: <strong>{editingMes}</strong>
                  </p>
                </div>
              </div>
              <button onClick={() => setShowComisionModal(false)} className="text-white/80 hover:text-white text-lg font-bold">✕</button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {sorteoNotif && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 font-bold text-xs flex items-center space-x-2 animate-bounce">
                  <span>{sorteoNotif}</span>
                </div>
              )}

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="font-extrabold text-amber-950 text-xs flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    Sorteo Aleatorio de Asamblea (Rotación Mensual)
                  </h4>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    Elige al azar 3 socios activos del padrón para conformar la comisión del mes.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSorteoAleatorio}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-black text-xs transition shadow-xs flex items-center space-x-1.5 cursor-pointer active:scale-95"
                >
                  <Dices className="w-4 h-4" />
                  <span>Realizar Sorteo Aleatorio</span>
                </button>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 uppercase text-[10px]">
                  Mes del Período a Asignar:
                </label>
                <input
                  type="text"
                  value={editingMes}
                  onChange={(e) => setEditingMes(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                  placeholder="ej. Septiembre 2026"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block font-bold text-slate-700 uppercase text-[10px]">
                    Miembros de la Comisión ({tempMiembros.length}):
                  </label>
                  <button
                    type="button"
                    onClick={() => setTempMiembros(prev => [...prev, { nombre: '', nroMovil: '', cargo: 'Vocal Comisión', metodo: 'Asignación Manual' }])}
                    className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center space-x-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar Miembro</span>
                  </button>
                </div>

                {tempMiembros.map((m, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-slate-800 text-[11px]">Miembro #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => setTempMiembros(prev => prev.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-rose-700 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                      <div className="sm:col-span-5">
                        <label className="block text-[10px] text-slate-500 font-bold mb-0.5">Padrón de Socios:</label>
                        <select
                          value={m.id || ''}
                          onChange={(e) => {
                            const s = socios.find(item => item.id === Number(e.target.value));
                            if (!s) return;
                            setTempMiembros(prev => prev.map((item, i) => i === idx ? {
                              ...item, id: s.id,
                              nombre: (s.nombres + ' ' + s.apPaterno + (s.apMaterno ? ' ' + s.apMaterno : '')).trim().toUpperCase(),
                              nroMovil: s.nroMovil || String(s.id).padStart(3, '0'),
                              ci: s.ci || '', metodo: 'Asignación Manual'
                            } : item));
                          }}
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg text-[11px] font-bold text-slate-800"
                        >
                          <option value="">-- Buscar socio por Móvil/Nombre --</option>
                          {socios.map(s => (
                            <option key={s.id} value={s.id}>
                              Móv #{s.nroMovil || s.id} - {s.nombres} {s.apPaterno} ({s.categoria})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="sm:col-span-4">
                        <label className="block text-[10px] text-slate-500 font-bold mb-0.5">Nombre Completo:</label>
                        <input
                          type="text"
                          value={m.nombre}
                          onChange={(e) => {
                            const val = e.target.value;
                            setTempMiembros(prev => prev.map((item, i) => i === idx ? { ...item, nombre: val } : item));
                          }}
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg text-[11px] font-bold text-slate-800"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-[10px] text-slate-500 font-bold mb-0.5">Cargo:</label>
                        <select
                          value={m.cargo}
                          onChange={(e) => {
                            const val = e.target.value;
                            setTempMiembros(prev => prev.map((item, i) => i === idx ? { ...item, cargo: val } : item));
                          }}
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg text-[11px] font-bold text-amber-900"
                        >
                          <option value="Presidente Comisión">Presidente</option>
                          <option value="Secretario Comisión">Secretario</option>
                          <option value="Vocal Comisión">Vocal 1</option>
                          <option value="Vocal 2 Comisión">Vocal 2</option>
                          <option value="Miembro Revisor">Miembro Revisor</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex justify-end space-x-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowComisionModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSaveComision}
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Comisión Revisora</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
