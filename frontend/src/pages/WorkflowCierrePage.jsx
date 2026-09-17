import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck, Clock, CheckCircle2, AlertTriangle,
  XCircle, Lock, Unlock, FileText, Printer,
  FileCheck2, Send, Users, ChevronRight, UserCheck,
  Dices, Plus, Trash2, Edit2, Save, Sparkles, Check,
  RefreshCw, RotateCcw, Landmark
} from 'lucide-react';
import { 
  ESTADOS_CIERRE, 
  ROLES_WORKFLOW, 
  DEFAULT_COMISIONES_MES 
} from '../utils/workflowCaja';
import { loadFromStorage, saveToStorage } from '../utils/storage';

export default function WorkflowCierrePage({ 
  socios = [], 
  currentUser,
  cajas = [],
  recibos = [],
  egresos = []
}) {
  const [activeRole, setActiveRole] = useState(ROLES_WORKFLOW.SECRETARIA);
  const [cajaFiltroId, setCajaFiltroId] = useState('c1'); // 'c1'..'c5' o 'todas'
  const [observacionInput, setObservacionInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalActionType, setModalActionType] = useState('');

  // ── Gestión Dinámica de Comisión Revisora ──
  const [comisionesPorMes, setComisionesPorMes] = useState(() => 
    loadFromStorage('siscob_comision_revisora', DEFAULT_COMISIONES_MES)
  );
  const [showComisionModal, setShowComisionModal] = useState(false);
  const [editingMes, setEditingMes] = useState('Septiembre 2026');
  const [tempMiembros, setTempMiembros] = useState([]);
  const [sorteoNotif, setSorteoNotif] = useState('');

  // ── Cálculos con Datos REALES del Sistema ──
  const selectedCajaObj = useMemo(() => {
    if (cajaFiltroId === 'todas') {
      const saldoAnterior = cajas.reduce((acc, c) => acc + (parseFloat(c.saldoAnterior) || 0), 0);
      const ingresos = cajas.reduce((acc, c) => acc + (parseFloat(c.ingresos) || 0), 0);
      const egresosTot = cajas.reduce((acc, c) => acc + (parseFloat(c.egresos) || 0), 0);
      const saldoActual = cajas.reduce((acc, c) => acc + (parseFloat(c.saldoActual) || 0), 0);
      return {
        id: 'todas',
        nombre: 'Consolidado Institucional (Todas las Cajas)',
        saldoAnterior,
        ingresos,
        egresos: egresosTot,
        saldoActual
      };
    }
    return cajas.find(c => c.id === cajaFiltroId) || cajas[0] || {
      id: 'c1',
      nombre: 'Caja 1 — Cuotas de Frecuencia',
      saldoAnterior: 0,
      ingresos: 0,
      egresos: 0,
      saldoActual: 0
    };
  }, [cajas, cajaFiltroId]);

  // Recibos reales vigentes del período
  const recibosFiltrados = useMemo(() => {
    return (recibos || []).filter(r => 
      r.estado !== 'ANULADO' && (cajaFiltroId === 'todas' || r.cajaId === cajaFiltroId)
    );
  }, [recibos, cajaFiltroId]);

  // Egresos reales del período
  const egresosFiltrados = useMemo(() => {
    return (egresos || []).filter(e => 
      cajaFiltroId === 'todas' || e.cajaId === cajaFiltroId
    );
  }, [egresos, cajaFiltroId]);

  // Creador de Cierre en Vivo basado en los datos del sistema
  const generarCierreEnVivo = () => {
    const comisionActual = comisionesPorMes['Septiembre 2026'] || DEFAULT_COMISIONES_MES['Septiembre 2026'];
    const saldoInicial = parseFloat(selectedCajaObj.saldoAnterior) || 0;
    const totalIngresos = parseFloat(selectedCajaObj.ingresos) || 0;
    const totalEgresos = parseFloat(selectedCajaObj.egresos) || 0;
    const saldoTeorico = saldoInicial + totalIngresos - totalEgresos;
    const comprobantesCount = recibosFiltrados.length + egresosFiltrados.length;

    const fechaHoy = new Date().toLocaleDateString('es-BO');
    const cobradorInicial = (currentUser?.rol === 'admin' || currentUser?.rol === 'admin33')
      ? { id: currentUser?.id || 'admin01', nombre: currentUser?.nombre || 'Administrador Central', cargo: 'Administrador / Cobrador', ip: '192.168.100.5' }
      : { id: 'cajera01', nombre: currentUser?.nombre || 'Daniela Alarcón', cargo: 'Operadora / Cajera', ip: '192.168.100.14' };

    return {
      id: 'CC-' + new Date().toISOString().slice(0, 10) + '-T1',
      cajaId: selectedCajaObj.id,
      cajaNombre: selectedCajaObj.nombre,
      turno: 'Turno Activo (' + new Date().toLocaleDateString('es-BO') + ')',
      fecha: fechaHoy,
      mesReporte: 'Septiembre 2026',
      cajero: cobradorInicial,
      secretaria: { id: 'sec01', nombre: 'Ing. Carlos Mendoza', cargo: 'Secretaría de Administración', ip: '192.168.100.5' },
      tesorero: { id: 'tes01', nombre: 'Lic. Ramiro Paredes', cargo: 'Tesorero del Sindicato', ip: '192.168.100.2' },
      comisionRevisora: comisionActual,
      estado: totalIngresos > 0 || totalEgresos > 0 ? ESTADOS_CIERRE.OPERACIONES_REGISTRADAS : ESTADOS_CIERRE.ABIERTA,
      saldoInicial,
      totalIngresos,
      totalEgresos,
      saldoTeorico,
      efectivoFisicoContado: saldoTeorico,
      diferencia: 0.0,
      comprobantesValidados: comprobantesCount,
      observacionesCajero: comprobantesCount > 0 
        ? 'Turno con ' + comprobantesCount + ' operaciones registradas en el sistema.' 
        : 'Caja limpia / Puesta a cero sin operaciones previas registradas.',
      observacionesSecretaria: '',
      observacionesTesorero: '',
      observacionesComision: '',
      bloqueadoEdicion: false,
      auditoriaLogs: [
        {
          id: 1,
          fecha: new Date().toLocaleString('es-BO'),
          usuario: cobradorInicial.nombre,
          rol: cobradorInicial.cargo.includes('Administrador') ? 'admin_cobrador' : 'cajero',
          cargo: cobradorInicial.cargo,
          ip: cobradorInicial.ip,
          accion: 'APERTURA_CON_SALDOS_SISTEMA',
          estadoAnterior: null,
          estadoNuevo: ESTADOS_CIERRE.ABIERTA,
          observacion: 'Apertura de turno sincronizada con saldos reales de caja (Saldo base: Bs ' + saldoInicial.toFixed(2) + ')'
        }
      ]
    };
  };

  // Cargar cierres guardados o generar el cierre en vivo
  const [cierres, setCierres] = useState(() => {
    const saved = loadFromStorage('siscob_cierres_workflow', null);
    if (saved && Array.isArray(saved) && saved.length > 0) {
      return saved;
    }
    return [generarCierreEnVivo()];
  });

  const [selectedCierreId, setSelectedCierreId] = useState(() => cierres[0]?.id || 'CC-ACTIVO');

  // Mantener el cierre activo actualizado con los saldos reales si aún está abierto
  const selectedCierre = useMemo(() => {
    return cierres.find(c => c.id === selectedCierreId) || cierres[0] || generarCierreEnVivo();
  }, [cierres, selectedCierreId]);

  // Si el usuario cambia de caja seleccionada, actualizar los saldos del cierre si no fue consolidado
  const handleSincronizarConSistema = () => {
    const nuevoCierre = generarCierreEnVivo();
    setCierres(prev => [nuevoCierre, ...prev.filter(c => c.id !== nuevoCierre.id)]);
    setSelectedCierreId(nuevoCierre.id);
    saveToStorage('siscob_cierres_workflow', [nuevoCierre]);
    alert('✅ Cierre sincronizado con los saldos REALES de las cajas del sistema.');
  };

  // Poner los cierres del workflow a cero
  const handlePonerCierresACero = () => {
    const confirm = window.confirm(
      '¿Desea poner el Workflow de Cierre a CERO?\n\n' +
      'Esto eliminará los cierres de prueba antiguos y creará un turno limpio con los saldos actuales de caja.'
    );
    if (!confirm) return;

    localStorage.removeItem('siscob_cierres_workflow');
    const nuevo = generarCierreEnVivo();
    setCierres([nuevo]);
    setSelectedCierreId(nuevo.id);
    saveToStorage('siscob_cierres_workflow', [nuevo]);
    alert('✅ Workflow puesto a cero. El turno actual refleja exactamente el saldo de las cajas.');
  };

  // Guardar cierres en storage cada vez que cambien
  useEffect(() => {
    if (cierres && cierres.length > 0) {
      saveToStorage('siscob_cierres_workflow', cierres);
    }
  }, [cierres]);

  // Sincronizar Comisión Revisora del Cierre con los datos guardados del mes
  useEffect(() => {
    const comisionMes = comisionesPorMes[selectedCierre.mesReporte];
    if (comisionMes && comisionMes.length > 0) {
      setCierres(prev => prev.map(c => 
        c.id === selectedCierre.id 
          ? { ...c, comisionRevisora: comisionMes } 
          : c
      ));
    }
  }, [comisionesPorMes, selectedCierre.mesReporte, selectedCierre.id]);

  const getRolLabel = (rol) => {
    switch(rol) {
      case ROLES_WORKFLOW.CAJERO: return '1. Operadora/Cajera';
      case ROLES_WORKFLOW.ADMIN_COBRADOR: return '1.B Admin (Cobrador)';
      case ROLES_WORKFLOW.SECRETARIA: return '2. Secretaría';
      case ROLES_WORKFLOW.TESORERO: return '3. Tesorero';
      case ROLES_WORKFLOW.COMISION_REVISORA: return '4. Comisión Revisora';
      default: return rol;
    }
  };

  const getActorName = (rol) => {
    switch(rol) {
      case ROLES_WORKFLOW.CAJERO: 
        return selectedCierre.cajero.nombre + ' (' + selectedCierre.cajero.cargo + ')';
      case ROLES_WORKFLOW.ADMIN_COBRADOR: 
        return (currentUser?.nombre || 'Ing. Carlos Mendoza') + ' (Administrador / Cobrador)';
      case ROLES_WORKFLOW.SECRETARIA: 
        return selectedCierre.secretaria.nombre + ' (' + selectedCierre.secretaria.cargo + ')';
      case ROLES_WORKFLOW.TESORERO: 
        return selectedCierre.tesorero.nombre + ' (' + selectedCierre.tesorero.cargo + ')';
      case ROLES_WORKFLOW.COMISION_REVISORA: 
        return 'Comisión Revisora Mensual — ' + selectedCierre.mesReporte;
      default: 
        return 'Usuario';
    }
  };

  const getIp = (rol) => {
    switch(rol) {
      case ROLES_WORKFLOW.CAJERO: return selectedCierre.cajero.ip || '192.168.100.14';
      case ROLES_WORKFLOW.ADMIN_COBRADOR: return '192.168.100.5';
      case ROLES_WORKFLOW.SECRETARIA: return selectedCierre.secretaria.ip || '192.168.100.5';
      case ROLES_WORKFLOW.TESORERO: return selectedCierre.tesorero.ip || '192.168.100.2';
      case ROLES_WORKFLOW.COMISION_REVISORA: return '192.168.100.20';
      default: return '192.168.100.1';
    }
  };

  const addLog = (cierre, accion, estadoAnterior, estadoNuevo, obs) => {
    const log = {
      id: cierre.auditoriaLogs.length + 1,
      fecha: new Date().toLocaleString('es-BO'),
      usuario: getActorName(activeRole),
      rol: activeRole,
      cargo: getRolLabel(activeRole),
      ip: getIp(activeRole),
      accion,
      estadoAnterior,
      estadoNuevo,
      observacion: obs || 'Sin observaciones adicionales'
    };
    return [log, ...cierre.auditoriaLogs];
  };

  // Solicitar cierre (tanto Cajera como Administrador Cobrador)
  const handleSolicitarCierre = () => {
    if (activeRole !== ROLES_WORKFLOW.CAJERO && activeRole !== ROLES_WORKFLOW.ADMIN_COBRADOR) {
      alert('Solo el responsable de caja (Cajera o Administrador) puede solicitar el cierre de turno.');
      return;
    }
    const cobradorTexto = activeRole === ROLES_WORKFLOW.ADMIN_COBRADOR 
      ? 'Administración Central (Cobrador)' 
      : 'Operadora / Cajera';

    const logs = addLog(
      selectedCierre, 
      'SOLICITUD_CIERRE_COBRADOR',
      selectedCierre.estado, 
      ESTADOS_CIERRE.CIERRE_SOLICITADO,
      'Cierre de turno enviado a revisión de Secretaría por ' + cobradorTexto + '. Gaveta bloqueada.'
    );

    setCierres(cierres.map(c => c.id === selectedCierre.id ? {
      ...c, 
      estado: ESTADOS_CIERRE.CIERRE_SOLICITADO,
      bloqueadoEdicion: true, 
      auditoriaLogs: logs
    } : c));

    alert('Cierre enviado a Secretaría por ' + cobradorTexto + '. La caja quedó bloqueada para edición.');
  };

  // Cambiar cobrador asignado al turno (Cajera <-> Administrador)
  const handleToggleCobradorTurno = () => {
    const esAdminActual = selectedCierre.cajero.cargo.includes('Administrador');
    const nuevoCajero = esAdminActual 
      ? { id: 'cajera01', nombre: 'Daniela Alarcón', cargo: 'Operadora / Cajera', ip: '192.168.100.14' }
      : { id: 'admin01', nombre: currentUser?.nombre || 'Ing. Carlos Mendoza', cargo: 'Administrador / Cobrador', ip: '192.168.100.5' };

    setCierres(prev => prev.map(c => 
      c.id === selectedCierre.id ? { ...c, cajero: nuevoCajero } : c
    ));
    alert('Cobrador del turno cambiado a: ' + nuevoCajero.nombre + ' (' + nuevoCajero.cargo + ')');
  };

  // Confirmar acción de dictamen
  const handleConfirmModal = () => {
    if (!observacionInput && modalActionType === 'rechazar') {
      alert('Debe indicar el motivo del rechazo.');
      return;
    }
    const estadoAnterior = selectedCierre.estado;
    let estadoNuevo = estadoAnterior;
    let accionNombre = '';
    let obsKey = '';

    if (modalActionType === 'rechazar') {
      estadoNuevo = ESTADOS_CIERRE.OBSERVADO;
      accionNombre = 'RECHAZO_OBSERVACION';
      obsKey = activeRole === ROLES_WORKFLOW.SECRETARIA ? 'observacionesSecretaria'
             : activeRole === ROLES_WORKFLOW.TESORERO ? 'observacionesTesorero'
             : 'observacionesComision';
    } else if (modalActionType === 'aprobar_secretaria') {
      estadoNuevo = ESTADOS_CIERRE.REVISADO_SECRETARIA;
      accionNombre = 'APROBACION_SECRETARIA';
      obsKey = 'observacionesSecretaria';
    } else if (modalActionType === 'aprobar_tesorero') {
      estadoNuevo = ESTADOS_CIERRE.APROBADO_TESORERO;
      accionNombre = 'APROBACION_TESORERO';
      obsKey = 'observacionesTesorero';
    } else if (modalActionType === 'visto_bueno_comision') {
      estadoNuevo = ESTADOS_CIERRE.CONSOLIDADO;
      accionNombre = 'VISTO_BUENO_COMISION_REVISORA';
      obsKey = 'observacionesComision';
    }

    const logs = addLog(selectedCierre, accionNombre, estadoAnterior, estadoNuevo,
      observacionInput || 'Aprobado sin observaciones');

    setCierres(cierres.map(c => c.id === selectedCierre.id ? {
      ...c,
      estado: estadoNuevo,
      [obsKey]: observacionInput || c[obsKey],
      bloqueadoEdicion: estadoNuevo !== ESTADOS_CIERRE.OBSERVADO,
      auditoriaLogs: logs
    } : c));

    setShowModal(false);
    setObservacionInput('');
    alert('Acción registrada con éxito: ' + estadoNuevo.toUpperCase());
  };

  // ── Funciones de Comisión Revisora (Asignación Manual y Sorteo) ──
  const handleOpenComisionModal = () => {
    const mes = selectedCierre.mesReporte || 'Septiembre 2026';
    setEditingMes(mes);
    const existing = comisionesPorMes[mes] || selectedCierre.comisionRevisora || [];
    setTempMiembros(JSON.parse(JSON.stringify(existing)));
    setSorteoNotif('');
    setShowComisionModal(true);
  };

  const handleSorteoAleatorio = () => {
    const sociosCandidatos = socios.filter(s => s.estado !== 'BAJA' && s.estado !== 'INACTIVO');
    if (sociosCandidatos.length < 3) {
      alert('No hay suficientes socios activos registrados para realizar el sorteo.');
      return;
    }
    const shuffled = [...sociosCandidatos].sort(() => 0.5 - Math.random());
    const seleccionados = shuffled.slice(0, 3);
    const cargos = ['Presidente Comisión', 'Secretario Comisión', 'Vocal Comisión'];
    const nuevos = seleccionados.map((s, idx) => ({
      id: s.id,
      nombre: (s.nombres + ' ' + s.apPaterno + (s.apMaterno ? ' ' + s.apMaterno : '')).trim().toUpperCase(),
      nroMovil: s.nroMovil || String(s.id).padStart(3, '0'),
      ci: s.ci || '',
      cargo: cargos[idx] || ('Miembro ' + (idx + 1)),
      metodo: 'Sorteo Aleatorio de Asamblea'
    }));

    setTempMiembros(nuevos);
    setSorteoNotif('🎲 ¡Sorteo realizado exitosamente entre ' + sociosCandidatos.length + ' socios activos!');
    setTimeout(() => setSorteoNotif(''), 5000);
  };

  const handleAddMiembroManual = () => {
    setTempMiembros(prev => [
      ...prev,
      {
        nombre: '',
        nroMovil: '',
        cargo: 'Vocal Comisión',
        metodo: 'Asignación Manual'
      }
    ]);
  };

  const handleSelectSocioForMiembro = (index, socioIdStr) => {
    const socioId = Number(socioIdStr);
    const s = socios.find(item => item.id === socioId);
    if (!s) return;

    setTempMiembros(prev => prev.map((m, i) => i === index ? {
      ...m,
      id: s.id,
      nombre: (s.nombres + ' ' + s.apPaterno + (s.apMaterno ? ' ' + s.apMaterno : '')).trim().toUpperCase(),
      nroMovil: s.nroMovil || String(s.id).padStart(3, '0'),
      ci: s.ci || '',
      metodo: 'Asignación Manual'
    } : m));
  };

  const handleUpdateMiembroField = (index, field, value) => {
    setTempMiembros(prev => prev.map((m, i) => i === index ? { ...m, [field]: value } : m));
  };

  const handleRemoveMiembro = (index) => {
    if (tempMiembros.length <= 1) {
      alert('La comisión revisora debe tener al menos 1 miembro.');
      return;
    }
    setTempMiembros(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveComision = () => {
    if (tempMiembros.some(m => !m.nombre || !m.nombre.trim())) {
      alert('Por favor complete el nombre de todos los miembros de la comisión.');
      return;
    }

    const updated = {
      ...comisionesPorMes,
      [editingMes]: tempMiembros
    };

    setComisionesPorMes(updated);
    saveToStorage('siscob_comision_revisora', updated);

    setCierres(prev => prev.map(c => 
      c.mesReporte === editingMes 
        ? { ...c, comisionRevisora: tempMiembros } 
        : c
    ));

    setShowComisionModal(false);
    alert('✅ Comisión Revisora del mes "' + editingMes + '" guardada y aplicada al acta con éxito.');
  };

  // Badge de estado
  const renderBadge = (estado) => {
    const badges = {
      [ESTADOS_CIERRE.ABIERTA]: <span className="bg-slate-100 text-slate-800 border border-slate-300 px-2.5 py-1 rounded-full text-xs font-bold">Abierta / En Curso</span>,
      [ESTADOS_CIERRE.OPERACIONES_REGISTRADAS]: <span className="bg-blue-100 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full text-xs font-bold">Operaciones Registradas</span>,
      [ESTADOS_CIERRE.CIERRE_SOLICITADO]: <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-full text-xs font-black flex items-center animate-pulse"><Clock className="w-3.5 h-3.5 mr-1"/>Pendiente Secretaría</span>,
      [ESTADOS_CIERRE.REVISADO_SECRETARIA]: <span className="bg-cyan-100 text-cyan-900 border border-cyan-300 px-2.5 py-1 rounded-full text-xs font-black flex items-center"><CheckCircle2 className="w-3.5 h-3.5 mr-1"/>Revisado — Pendiente Tesorero</span>,
      [ESTADOS_CIERRE.APROBADO_TESORERO]: <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-2.5 py-1 rounded-full text-xs font-black flex items-center"><CheckCircle2 className="w-3.5 h-3.5 mr-1"/>Aprobado — Pendiente Comisión</span>,
      [ESTADOS_CIERRE.CONSOLIDADO]: <span className="bg-purple-100 text-purple-900 border border-purple-300 px-2.5 py-1 rounded-full text-xs font-black flex items-center"><FileCheck2 className="w-3.5 h-3.5 mr-1"/>Consolidado en Balances</span>,
      [ESTADOS_CIERRE.OBSERVADO]: <span className="bg-rose-100 text-rose-800 border border-rose-300 px-2.5 py-1 rounded-full text-xs font-black flex items-center"><AlertTriangle className="w-3.5 h-3.5 mr-1"/>Observado / Rechazado</span>,
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

      {/* Banner de Roles con selector para Administrador Cobrador */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 text-white p-4 rounded-2xl shadow-md flex flex-wrap justify-between items-center gap-3 no-print">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-700 text-white rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold text-red-300 uppercase tracking-wider block">
                Control Oficial de Cierre — Sindicato Radio Móvil 15 de Abril
              </span>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                Admin igual cobra
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-extrabold tracking-wide">
              Rol Activo en Sesión: <strong className="text-amber-300">{getActorName(activeRole)}</strong>
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-1 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700 text-xs font-bold flex-wrap gap-1">
          <span className="text-slate-400 px-2 text-[11px]">Cambiar Rol:</span>
          {[
            { rol: ROLES_WORKFLOW.CAJERO, label: '1. Cajera' },
            { rol: ROLES_WORKFLOW.ADMIN_COBRADOR, label: '1.B Admin Cobrador' },
            { rol: ROLES_WORKFLOW.SECRETARIA, label: '2. Secretaría' },
            { rol: ROLES_WORKFLOW.TESORERO, label: '3. Tesorero' },
            { rol: ROLES_WORKFLOW.COMISION_REVISORA, label: '4. Comisión' },
          ].map(({ rol, label }) => (
            <button 
              key={rol}
              onClick={() => setActiveRole(rol)}
              className={"px-3 py-1 rounded-lg transition cursor-pointer " + 
                (activeRole === rol ? 'bg-red-700 text-white shadow-xs' : 'text-slate-300 hover:text-white')}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

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
            title="Actualiza los números del acta con los ingresos y egresos reales registrados en el sistema"
          >
            <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
            <span>Sincronizar Saldos Reales</span>
          </button>

          <button
            type="button"
            onClick={handlePonerCierresACero}
            className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer"
            title="Limpia datos anteriores del workflow y deja el turno a cero coincidiendo con la Puesta a Cero contable"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
            <span>Poner Workflow a CERO</span>
          </button>
        </div>
      </div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Columna izquierda: Lista de cierres y asignación */}
        <div className="lg:col-span-4 space-y-4 no-print">
          
          {/* Botón Destacado: Asignar Comisión Revisora */}
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
              Socios asignados cada mes por sorteo o asignación para aprobar ingresos y egresos junto al Tesorero.
            </p>
            <button
              onClick={handleOpenComisionModal}
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

        {/* Columna derecha: Expediente */}
        <div className="lg:col-span-8 space-y-5">

          {/* Stepper de 5 pasos */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 no-print">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-500">
                Línea de Aprobación Oficial del Cierre
              </h3>
              {selectedCierre.bloqueadoEdicion
                ? <span className="flex items-center text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200"><Lock className="w-3.5 h-3.5 mr-1"/>Edición Bloqueada</span>
                : <span className="flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"><Unlock className="w-3.5 h-3.5 mr-1"/>Abierto</span>}
            </div>
            <div className="grid grid-cols-5 gap-1.5 pt-1 text-center font-mono text-[10px]">
              {steps.map((step, i) => (
                <div key={i}
                  className={"p-2 rounded-xl border " +
                    (stepPendiente(i)
                      ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold ring-2 ring-amber-400/40 animate-pulse'
                      : stepActivo(step)
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-bold'
                        : 'bg-slate-100 border-slate-200 text-slate-500')}>
                  {step.label}
                </div>
              ))}
            </div>
          </div>

          {/* Acta oficial imprimible */}
          <div id="printable-area" className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-5">

            {/* Encabezado */}
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
                  <span>{selectedCierre.turno}</span>
                  <span>•</span>
                  <span className="text-red-700 font-bold">Mes: {selectedCierre.mesReporte}</span>
                </div>
              </div>
              <div className="text-right">
                {renderBadge(selectedCierre.estado)}
                <div className="text-[10px] font-mono text-slate-400 mt-1">Fecha: {selectedCierre.fecha}</div>
              </div>
            </div>

            {/* Selector de Cobrador del Turno (Cajera o Administrador) */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between text-xs gap-2 no-print">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-500 uppercase text-[10px]">Cobrador del Turno:</span>
                <strong className="text-slate-900">{selectedCierre.cajero.nombre}</strong>
                <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                  {selectedCierre.cajero.cargo}
                </span>
              </div>
              <button
                onClick={handleToggleCobradorTurno}
                className="text-[11px] font-bold text-red-700 hover:text-red-900 underline cursor-pointer"
              >
                🔄 Cambiar cobrador (Cajera ↔ Administrador)
              </button>
            </div>

            {/* Resumen financiero — 100% REAL conectado a las Cajas del Sistema */}
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

            {/* Arqueo físico vs Teórico */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-500 block font-bold uppercase">Efectivo Físico Contado:</span>
                <strong className="text-base text-slate-900">Bs {selectedCierre.efectivoFisicoContado.toFixed(2)}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block font-bold uppercase">Diferencia de Caja:</span>
                <span className={"text-base font-black " + (selectedCierre.diferencia === 0 ? 'text-emerald-700' : 'text-rose-700')}>
                  {selectedCierre.diferencia === 0 ? 'Bs 0.00 (Cuadrada)' : 'Bs ' + selectedCierre.diferencia.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block font-bold uppercase">Comprobantes Físicos:</span>
                <strong className="text-base text-slate-900">{selectedCierre.comprobantesValidados} recibos/boletas</strong>
              </div>
            </div>

            {/* Observaciones por nivel */}
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-[10px] text-slate-500 uppercase block">1. Observaciones Cobrador(a) (Cajera / Admin):</span>
                <p className="text-slate-800 italic mt-1">"{selectedCierre.observacionesCajero}"</p>
              </div>
              {selectedCierre.observacionesSecretaria && (
                <div className="p-3 rounded-xl bg-cyan-50/70 border border-cyan-200">
                  <span className="font-bold text-[10px] text-cyan-800 uppercase block">2. Dictamen Secretaría / Administración:</span>
                  <p className="text-cyan-950 font-semibold mt-1">"{selectedCierre.observacionesSecretaria}"</p>
                </div>
              )}
              {selectedCierre.observacionesTesorero && (
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <span className="font-bold text-[10px] text-emerald-800 uppercase block">3. Aprobación del Tesorero:</span>
                  <p className="text-emerald-950 font-semibold mt-1">"{selectedCierre.observacionesTesorero}"</p>
                </div>
              )}
              {selectedCierre.observacionesComision && (
                <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200">
                  <span className="font-bold text-[10px] text-purple-800 uppercase block">4. Visto Bueno Comisión Revisora:</span>
                  <p className="text-purple-950 font-semibold mt-1">"{selectedCierre.observacionesComision}"</p>
                </div>
              )}
            </div>

            {/* Comisión Revisora — Miembros Asignados */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <span className="flex items-center gap-2 font-extrabold text-xs text-amber-950 uppercase">
                  <Users className="w-4 h-4 text-amber-700"/>
                  Comisión Revisora Asignada — {selectedCierre.mesReporte}
                </span>
                <button
                  onClick={handleOpenComisionModal}
                  className="no-print text-[11px] bg-amber-600 hover:bg-amber-700 text-white font-bold px-2.5 py-1 rounded-lg transition shadow-xs cursor-pointer flex items-center space-x-1"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Modificar Miembros</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {(selectedCierre.comisionRevisora || []).map((m, i) => (
                  <div key={i} className="bg-white border border-amber-200 rounded-lg p-2.5 text-xs space-y-0.5">
                    <div className="flex justify-between items-start">
                      <strong className="text-slate-900 block font-bold text-[11px]">{m.nombre}</strong>
                      <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                        Móvil #{m.nroMovil}
                      </span>
                    </div>
                    <p className="text-amber-900 font-semibold text-[10px]">{m.cargo}</p>
                    <p className="text-slate-400 text-[9px] font-mono">{m.metodo || 'Asignado en asamblea'}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Firmas Oficiales: Cobrador, Secretaría, Tesorero y los 3 Miembros de la Comisión */}
            <div className="pt-6 space-y-4">
              <p className="text-center font-bold text-slate-400 text-[10px] uppercase tracking-wider">
                Firmas y Rúbricas Oficiales de Conformidad
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center text-[10px]">
                {/* 1. Cobrador */}
                <div className="border-t border-slate-400 pt-1">
                  <strong className="block text-slate-800">{selectedCierre.cajero.nombre}</strong>
                  <span className="text-slate-500 uppercase block">{selectedCierre.cajero.cargo}</span>
                  <span className="font-mono text-[9px] text-slate-400">IP: {selectedCierre.cajero.ip}</span>
                </div>

                {/* 2. Secretaría */}
                <div className="border-t border-slate-400 pt-1">
                  <strong className="block text-slate-800">{selectedCierre.secretaria.nombre}</strong>
                  <span className="text-slate-500 uppercase block">{selectedCierre.secretaria.cargo}</span>
                  <span className="font-mono text-[9px] text-slate-400">
                    {[ESTADOS_CIERRE.REVISADO_SECRETARIA, ESTADOS_CIERRE.APROBADO_TESORERO, ESTADOS_CIERRE.CONSOLIDADO].includes(selectedCierre.estado) ? 'Revisado ✓' : 'Pendiente Revisión'}
                  </span>
                </div>

                {/* 3. Tesorero */}
                <div className="border-t border-slate-400 pt-1">
                  <strong className="block text-slate-800">{selectedCierre.tesorero.nombre}</strong>
                  <span className="text-slate-500 uppercase block">{selectedCierre.tesorero.cargo}</span>
                  <span className="font-mono text-[9px] text-slate-400">
                    {[ESTADOS_CIERRE.APROBADO_TESORERO, ESTADOS_CIERRE.CONSOLIDADO].includes(selectedCierre.estado) ? 'Aprobado ✓' : 'Pendiente Aprobación'}
                  </span>
                </div>
              </div>

              {/* Firmas individuales de la Comisión Revisora */}
              <div className="pt-3 border-t border-dashed border-slate-200">
                <p className="text-left font-bold text-amber-900 text-[10px] uppercase mb-3">
                  Miembros de la Comisión Revisora — {selectedCierre.mesReporte}:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-[10px]">
                  {(selectedCierre.comisionRevisora || []).map((m, idx) => (
                    <div key={idx} className="border-t border-amber-400 pt-1">
                      <strong className="block text-slate-800">{m.nombre}</strong>
                      <span className="text-amber-800 font-semibold uppercase block">Móvil #{m.nroMovil} • {m.cargo}</span>
                      <span className="font-mono text-[9px] text-slate-400">
                        {selectedCierre.estado === ESTADOS_CIERRE.CONSOLIDADO ? 'V°B° Conforme ✓' : 'Pendiente V°B°'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Barra de acciones */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap justify-between items-center gap-3 no-print">
            <div className="text-xs">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Acciones Disponibles para:</span>
              <strong className="text-red-700 font-extrabold">{getActorName(activeRole)}</strong>
            </div>

            <div className="flex flex-wrap gap-2">
              <button onClick={() => window.print()}
                className="flex items-center space-x-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl text-xs font-bold border border-slate-300 transition cursor-pointer">
                <Printer className="w-3.5 h-3.5"/><span>Imprimir Acta</span>
              </button>

              {/* Cajera o Admin Cobrador: solicitar cierre */}
              {(activeRole === ROLES_WORKFLOW.CAJERO || activeRole === ROLES_WORKFLOW.ADMIN_COBRADOR) && 
               (selectedCierre.estado === ESTADOS_CIERRE.OPERACIONES_REGISTRADAS || selectedCierre.estado === ESTADOS_CIERRE.ABIERTA) && (
                <button onClick={handleSolicitarCierre}
                  className="flex items-center space-x-1.5 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer shadow-xs">
                  <Send className="w-3.5 h-3.5"/><span>Solicitar Cierre y Bloquear Caja</span>
                </button>
              )}

              {/* Secretaría: revisar */}
              {activeRole === ROLES_WORKFLOW.SECRETARIA && selectedCierre.estado === ESTADOS_CIERRE.CIERRE_SOLICITADO && (
                <>
                  <button onClick={() => { setModalActionType('rechazar'); setShowModal(true); }}
                    className="flex items-center space-x-1.5 bg-rose-700 hover:bg-rose-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs">
                    <XCircle className="w-3.5 h-3.5"/><span>Observar / Devolver</span>
                  </button>
                  <button onClick={() => { setModalActionType('aprobar_secretaria'); setShowModal(true); }}
                    className="flex items-center space-x-1.5 bg-cyan-700 hover:bg-cyan-800 text-white px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5"/><span>Aprobar — Pasar a Tesorero</span>
                  </button>
                </>
              )}

              {/* Tesorero: aprobar */}
              {activeRole === ROLES_WORKFLOW.TESORERO && selectedCierre.estado === ESTADOS_CIERRE.REVISADO_SECRETARIA && (
                <>
                  <button onClick={() => { setModalActionType('rechazar'); setShowModal(true); }}
                    className="flex items-center space-x-1.5 bg-rose-700 hover:bg-rose-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs">
                    <XCircle className="w-3.5 h-3.5"/><span>Observar / Rechazar</span>
                  </button>
                  <button onClick={() => { setModalActionType('aprobar_tesorero'); setShowModal(true); }}
                    className="flex items-center space-x-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5"/><span>Aprobar — Pasar a Comisión</span>
                  </button>
                </>
              )}

              {/* Comisión Revisora: visto bueno final */}
              {activeRole === ROLES_WORKFLOW.COMISION_REVISORA && selectedCierre.estado === ESTADOS_CIERRE.APROBADO_TESORERO && (
                <>
                  <button onClick={() => { setModalActionType('rechazar'); setShowModal(true); }}
                    className="flex items-center space-x-1.5 bg-rose-700 hover:bg-rose-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs">
                    <XCircle className="w-3.5 h-3.5"/><span>Objetar / Devolver</span>
                  </button>
                  <button onClick={() => { setModalActionType('visto_bueno_comision'); setShowModal(true); }}
                    className="flex items-center space-x-1.5 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer shadow-xs">
                    <FileCheck2 className="w-3.5 h-3.5"/><span>Otorgar Visto Bueno Final</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Bitácora de auditoría */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden p-5 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-red-700"/>
                <h3 className="font-extrabold text-xs uppercase tracking-wide text-slate-900">
                  Bitácora de Auditoría — Trazabilidad Oficial
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-400">
                {selectedCierre.auditoriaLogs.length} eventos
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b">
                  <tr>
                    <th className="p-2.5">Fecha/Hora</th>
                    <th className="p-2.5">Usuario / Cargo</th>
                    <th className="p-2.5">Acción</th>
                    <th className="p-2.5">Estado → Nuevo</th>
                    <th className="p-2.5">Observaciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {selectedCierre.auditoriaLogs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="p-2.5 font-mono text-slate-500 text-[11px] whitespace-nowrap">{log.fecha}</td>
                      <td className="p-2.5">
                        <strong className="text-slate-900 block">{log.usuario}</strong>
                        <span className="text-[9px] font-extrabold font-mono text-slate-400 uppercase">{log.cargo || log.rol}</span>
                      </td>
                      <td className="p-2.5">
                        <span className="bg-slate-100 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200">{log.accion}</span>
                      </td>
                      <td className="p-2.5 font-mono text-[11px]">
                        <span className="text-slate-400">{log.estadoAnterior || 'INICIO'}</span>
                        <span className="mx-1 text-slate-400">→</span>
                        <strong className="text-red-700">{log.estadoNuevo}</strong>
                      </td>
                      <td className="p-2.5 text-slate-700 text-[11px] max-w-xs">{log.observacion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: ASIGNAR / SORTEAR COMISIÓN REVISORA DEL MES */}
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
                    onClick={handleAddMiembroManual}
                    className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center space-x-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar Miembro</span>
                  </button>
                </div>

                {tempMiembros.map((m, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-slate-800 text-[11px]">
                        Miembro #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMiembro(idx)}
                        className="text-slate-400 hover:text-rose-700 transition"
                        title="Quitar miembro"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                      <div className="sm:col-span-5">
                        <label className="block text-[10px] text-slate-500 font-bold mb-0.5">
                          Seleccionar del Padrón de Socios:
                        </label>
                        <select
                          value={m.id || ''}
                          onChange={(e) => handleSelectSocioForMiembro(idx, e.target.value)}
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
                        <label className="block text-[10px] text-slate-500 font-bold mb-0.5">
                          Nombre Completo:
                        </label>
                        <input
                          type="text"
                          value={m.nombre}
                          onChange={(e) => handleUpdateMiembroField(idx, 'nombre', e.target.value)}
                          placeholder="Nombre y Apellidos"
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg text-[11px] font-bold text-slate-800"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-[10px] text-slate-500 font-bold mb-0.5">
                          Cargo / Rol:
                        </label>
                        <select
                          value={m.cargo}
                          onChange={(e) => handleUpdateMiembroField(idx, 'cargo', e.target.value)}
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

                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono pt-1">
                      <span>Nº Móvil: <strong>{m.nroMovil || 'S/N'}</strong></span>
                      <span className="italic">{m.metodo || 'Asignación Manual'}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex justify-end space-x-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowComisionModal(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer transition"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSaveComision}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold transition shadow-xs flex items-center space-x-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Comisión Revisora</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de dictamen */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 text-xs">
            <div className={"p-4 text-white font-bold text-sm flex justify-between items-center " +
              (modalActionType === 'rechazar' ? 'bg-rose-800'
              : modalActionType === 'visto_bueno_comision' ? 'bg-purple-800'
              : modalActionType === 'aprobar_secretaria' ? 'bg-cyan-800'
              : 'bg-emerald-800')}>
              <span>
                {modalActionType === 'rechazar' && 'Observar y Devolver para Corrección'}
                {modalActionType === 'aprobar_secretaria' && 'Secretaría — Aprobar Cierre de Turno'}
                {modalActionType === 'aprobar_tesorero' && 'Tesorero — Aprobar Cierre de Turno'}
                {modalActionType === 'visto_bueno_comision' && 'Comisión Revisora — Visto Bueno Final'}
              </span>
              <button onClick={() => setShowModal(false)} className="text-white/80 hover:text-white">✕</button>
            </div>
            <div className="p-5 space-y-3">
              <p className="text-slate-600">
                {modalActionType === 'rechazar' && 'Indique el motivo del rechazo. La cajera o cobrador podrá corregir y reenviar.'}
                {modalActionType === 'aprobar_secretaria' && 'Certifica que revisó las operaciones del turno y están conformes.'}
                {modalActionType === 'aprobar_tesorero' && 'Como Tesorero del Sindicato, aprueba este cierre de caja y lo envía a la Comisión Revisora.'}
                {modalActionType === 'visto_bueno_comision' && 'La Comisión Revisora del mes (' + (selectedCierre.comisionRevisora || []).map(m=>m.nombre).join(', ') + ') otorga el visto bueno final. Este acta quedará consolidada en los balances del sindicato.'}
              </p>
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Observaciones / Dictamen {modalActionType === 'rechazar' ? '(Obligatorio)' : '(Opcional)'}:
                </label>
                <textarea rows="3"
                  placeholder="Escribe el fundamento de la decisión..."
                  value={observacionInput}
                  onChange={e => setObservacionInput(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs"/>
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl font-bold">Cancelar</button>
                <button onClick={handleConfirmModal}
                  className={"px-4 py-2 text-white rounded-xl font-bold " +
                    (modalActionType === 'rechazar' ? 'bg-rose-700 hover:bg-rose-800'
                    : modalActionType === 'visto_bueno_comision' ? 'bg-purple-700 hover:bg-purple-800'
                    : modalActionType === 'aprobar_secretaria' ? 'bg-cyan-700 hover:bg-cyan-800'
                    : 'bg-emerald-700 hover:bg-emerald-800')}>
                  Confirmar Dictamen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
