import React, { useState } from 'react';
import {
  ShieldCheck, Clock, CheckCircle2, AlertTriangle,
  XCircle, Lock, Unlock, FileText, Printer,
  FileCheck2, Send, Users, ChevronRight
} from 'lucide-react';
import { ESTADOS_CIERRE, ROLES_WORKFLOW, INITIAL_CIERRES } from '../utils/workflowCaja';

export default function WorkflowCierrePage() {
  const [activeRole, setActiveRole] = useState(ROLES_WORKFLOW.SECRETARIA);
  const [cierres, setCierres] = useState(INITIAL_CIERRES);
  const [selectedCierreId, setSelectedCierreId] = useState('CC-2026-09-02-T1');
  const [observacionInput, setObservacionInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalActionType, setModalActionType] = useState('');
  const [comisionEditable, setComisionEditable] = useState(false);
  const [comisionNombres, setComisionNombres] = useState('');

  const selectedCierre = cierres.find(c => c.id === selectedCierreId) || cierres[0];

  const getRolLabel = (rol) => {
    switch(rol) {
      case ROLES_WORKFLOW.CAJERO: return '1. Operadora/Cajera';
      case ROLES_WORKFLOW.SECRETARIA: return '2. Secretaría';
      case ROLES_WORKFLOW.TESORERO: return '3. Tesorero';
      case ROLES_WORKFLOW.COMISION_REVISORA: return '4. Comisión Revisora';
      default: return rol;
    }
  };

  const getActorName = (rol) => {
    switch(rol) {
      case ROLES_WORKFLOW.CAJERO: return selectedCierre.cajero.nombre + ' (' + selectedCierre.cajero.cargo + ')';
      case ROLES_WORKFLOW.SECRETARIA: return selectedCierre.secretaria.nombre + ' (' + selectedCierre.secretaria.cargo + ')';
      case ROLES_WORKFLOW.TESORERO: return selectedCierre.tesorero.nombre + ' (' + selectedCierre.tesorero.cargo + ')';
      case ROLES_WORKFLOW.COMISION_REVISORA: return 'Comisión Revisora Mensual — ' + selectedCierre.mesReporte;
      default: return 'Usuario';
    }
  };

  const getIp = (rol) => {
    switch(rol) {
      case ROLES_WORKFLOW.CAJERO: return selectedCierre.cajero.ip;
      case ROLES_WORKFLOW.SECRETARIA: return selectedCierre.secretaria.ip;
      case ROLES_WORKFLOW.TESORERO: return selectedCierre.tesorero.ip;
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

  // Cajera solicita cierre
  const handleSolicitarCierre = () => {
    if (activeRole !== ROLES_WORKFLOW.CAJERO) {
      alert('Solo la Operadora/Cajera puede solicitar el cierre de turno.');
      return;
    }
    const logs = addLog(selectedCierre, 'SOLICITUD_CIERRE_CAJERA',
      selectedCierre.estado, ESTADOS_CIERRE.CIERRE_SOLICITADO,
      'Cierre de turno enviado a revisión de Secretaría. Gaveta bloqueada.');
    setCierres(cierres.map(c => c.id === selectedCierre.id ? {
      ...c, estado: ESTADOS_CIERRE.CIERRE_SOLICITADO,
      bloqueadoEdicion: true, auditoriaLogs: logs
    } : c));
    alert('Cierre enviado a Secretaría. La caja quedó bloqueada para edición.');
  };

  // Confirmar acción desde modal
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
    alert('Acción registrada: ' + estadoNuevo.toUpperCase());
  };

  // Badge de estado
  const renderBadge = (estado) => {
    const badges = {
      [ESTADOS_CIERRE.ABIERTA]: <span className="bg-slate-100 text-slate-800 border border-slate-300 px-2.5 py-1 rounded-full text-xs font-bold">Abierta</span>,
      [ESTADOS_CIERRE.OPERACIONES_REGISTRADAS]: <span className="bg-blue-100 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full text-xs font-bold">Operaciones Registradas</span>,
      [ESTADOS_CIERRE.CIERRE_SOLICITADO]: <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-full text-xs font-black flex items-center animate-pulse"><Clock className="w-3.5 h-3.5 mr-1"/>Pendiente Secretaría</span>,
      [ESTADOS_CIERRE.REVISADO_SECRETARIA]: <span className="bg-cyan-100 text-cyan-900 border border-cyan-300 px-2.5 py-1 rounded-full text-xs font-black flex items-center"><CheckCircle2 className="w-3.5 h-3.5 mr-1"/>Revisado — Pendiente Tesorero</span>,
      [ESTADOS_CIERRE.APROBADO_TESORERO]: <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-2.5 py-1 rounded-full text-xs font-black flex items-center"><CheckCircle2 className="w-3.5 h-3.5 mr-1"/>Aprobado — Pendiente Comisión</span>,
      [ESTADOS_CIERRE.CONSOLIDADO]: <span className="bg-purple-100 text-purple-900 border border-purple-300 px-2.5 py-1 rounded-full text-xs font-black flex items-center"><FileCheck2 className="w-3.5 h-3.5 mr-1"/>Consolidado en Balances</span>,
      [ESTADOS_CIERRE.OBSERVADO]: <span className="bg-rose-100 text-rose-800 border border-rose-300 px-2.5 py-1 rounded-full text-xs font-black flex items-center"><AlertTriangle className="w-3.5 h-3.5 mr-1"/>Observado / Rechazado</span>,
    };
    return badges[estado] || null;
  };

  // Stepper: qué paso está activo
  const steps = [
    { label: '1. Operadora/Cajera', estados: [ESTADOS_CIERRE.OPERACIONES_REGISTRADAS, ESTADOS_CIERRE.CIERRE_SOLICITADO, ESTADOS_CIERRE.REVISADO_SECRETARIA, ESTADOS_CIERRE.APROBADO_TESORERO, ESTADOS_CIERRE.CONSOLIDADO] },
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

      {/* Banner de Rol Activo */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 text-white p-4 rounded-2xl shadow-md flex flex-wrap justify-between items-center gap-3 no-print">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-700 text-white rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-red-300 uppercase tracking-wider block">
              Control Oficial de Cierre — Sindicato Radio Móvil 15 de Abril
            </span>
            <h2 className="text-sm sm:text-base font-extrabold tracking-wide">
              Rol Activo: <strong className="text-amber-300">{getActorName(activeRole)}</strong>
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-1 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700 text-xs font-bold flex-wrap gap-1">
          <span className="text-slate-400 px-2 text-[11px]">Cambiar Rol:</span>
          {[
            { rol: ROLES_WORKFLOW.CAJERO, label: '1. Cajera' },
            { rol: ROLES_WORKFLOW.SECRETARIA, label: '2. Secretaría' },
            { rol: ROLES_WORKFLOW.TESORERO, label: '3. Tesorero' },
            { rol: ROLES_WORKFLOW.COMISION_REVISORA, label: '4. Comisión' },
          ].map(({ rol, label }) => (
            <button key={rol}
              onClick={() => setActiveRole(rol)}
              className={"px-3 py-1 rounded-lg transition cursor-pointer " + (activeRole === rol ? 'bg-red-700 text-white shadow-xs' : 'text-slate-300 hover:text-white')}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Columna izquierda: Lista de cierres */}
        <div className="lg:col-span-4 space-y-4 no-print">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
            <h3 className="font-extrabold text-sm uppercase tracking-wide text-slate-900">Cierres de Turno</h3>
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
                <div className="text-[11px] text-slate-500 font-medium">
                  Cajera: <strong className="text-slate-700">{c.cajero.nombre}</strong> • {c.fecha}
                </div>
                <div className="flex justify-between text-xs font-mono pt-2 border-t border-slate-100">
                  <span className="text-slate-500">Saldo Teórico:</span>
                  <strong className="text-slate-900">Bs {c.saldoTeorico.toFixed(2)}</strong>
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
                <p className="text-xs text-slate-500 font-mono">
                  Expediente: <strong>{selectedCierre.id}</strong> • {selectedCierre.turno} • Período: {selectedCierre.mesReporte}
                </p>
              </div>
              <div className="text-right">
                {renderBadge(selectedCierre.estado)}
                <div className="text-[10px] font-mono text-slate-400 mt-1">Fecha: {selectedCierre.fecha}</div>
              </div>
            </div>

            {/* Resumen financiero */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Saldo Apertura:</span>
                <strong className="text-slate-800 text-sm">Bs {selectedCierre.saldoInicial.toFixed(2)}</strong>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                <span className="text-[10px] text-emerald-700 block uppercase font-bold">(+) Ingresos:</span>
                <strong className="text-sm">Bs {selectedCierre.totalIngresos.toFixed(2)}</strong>
              </div>
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-rose-900">
                <span className="text-[10px] text-rose-700 block uppercase font-bold">(-) Egresos:</span>
                <strong className="text-sm">Bs {selectedCierre.totalEgresos.toFixed(2)}</strong>
              </div>
              <div className="p-3 bg-slate-900 text-white rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">(=) Saldo Teórico:</span>
                <strong className="text-sm text-emerald-400">Bs {selectedCierre.saldoTeorico.toFixed(2)}</strong>
              </div>
            </div>

            {/* Arqueo físico */}
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
                <span className="font-bold text-[10px] text-slate-500 uppercase block">1. Observaciones Operadora/Cajera:</span>
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

            {/* Comisión Revisora — Miembros */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="flex items-center gap-2 font-extrabold text-xs text-amber-900 uppercase">
                  <Users className="w-4 h-4"/>Comisión Revisora — {selectedCierre.mesReporte}
                  <span className="font-normal text-amber-700 text-[10px] normal-case">(Asignados por sorteo/rotación mensual)</span>
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {selectedCierre.comisionRevisora.map((m, i) => (
                  <div key={i} className="bg-white border border-amber-200 rounded-lg px-3 py-2 text-xs">
                    <strong className="text-slate-800 block">{m.nombre}</strong>
                    <span className="text-slate-500">Móvil #{m.nroMovil} — {m.cargo}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Firmas del acta */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-[10px]">
              <div className="border-t border-slate-400 pt-1">
                <strong className="block text-slate-800">{selectedCierre.cajero.nombre}</strong>
                <span className="text-slate-500 uppercase block">{selectedCierre.cajero.cargo}</span>
                <span className="font-mono text-[9px] text-slate-400">IP: {selectedCierre.cajero.ip}</span>
              </div>
              <div className="border-t border-slate-400 pt-1">
                <strong className="block text-slate-800">{selectedCierre.secretaria.nombre}</strong>
                <span className="text-slate-500 uppercase block">{selectedCierre.secretaria.cargo}</span>
                <span className="font-mono text-[9px] text-slate-400">
                  {[ESTADOS_CIERRE.REVISADO_SECRETARIA, ESTADOS_CIERRE.APROBADO_TESORERO, ESTADOS_CIERRE.CONSOLIDADO].includes(selectedCierre.estado) ? 'Revisado ✓' : 'Pendiente Revisión'}
                </span>
              </div>
              <div className="border-t border-slate-400 pt-1">
                <strong className="block text-slate-800">{selectedCierre.tesorero.nombre}</strong>
                <span className="text-slate-500 uppercase block">{selectedCierre.tesorero.cargo}</span>
                <span className="font-mono text-[9px] text-slate-400">
                  {[ESTADOS_CIERRE.APROBADO_TESORERO, ESTADOS_CIERRE.CONSOLIDADO].includes(selectedCierre.estado) ? 'Aprobado ✓' : 'Pendiente Aprobación'}
                </span>
              </div>
              <div className="border-t border-slate-400 pt-1">
                <strong className="block text-slate-800">Comisión Revisora</strong>
                <span className="text-slate-500 uppercase block">{selectedCierre.mesReporte}</span>
                <span className="font-mono text-[9px] text-slate-400">
                  {selectedCierre.estado === ESTADOS_CIERRE.CONSOLIDADO ? 'Visto Bueno ✓' : 'Pendiente V°B°'}
                </span>
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

              {/* Cajera: solicitar cierre */}
              {activeRole === ROLES_WORKFLOW.CAJERO && selectedCierre.estado === ESTADOS_CIERRE.OPERACIONES_REGISTRADAS && (
                <button onClick={handleSolicitarCierre}
                  className="flex items-center space-x-1.5 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer">
                  <Send className="w-3.5 h-3.5"/><span>Solicitar Cierre y Bloquear Caja</span>
                </button>
              )}

              {/* Secretaría: revisar */}
              {activeRole === ROLES_WORKFLOW.SECRETARIA && selectedCierre.estado === ESTADOS_CIERRE.CIERRE_SOLICITADO && (
                <>
                  <button onClick={() => { setModalActionType('rechazar'); setShowModal(true); }}
                    className="flex items-center space-x-1.5 bg-rose-700 hover:bg-rose-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer">
                    <XCircle className="w-3.5 h-3.5"/><span>Observar / Devolver</span>
                  </button>
                  <button onClick={() => { setModalActionType('aprobar_secretaria'); setShowModal(true); }}
                    className="flex items-center space-x-1.5 bg-cyan-700 hover:bg-cyan-800 text-white px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer">
                    <CheckCircle2 className="w-3.5 h-3.5"/><span>Aprobar — Pasar a Tesorero</span>
                  </button>
                </>
              )}

              {/* Tesorero: aprobar */}
              {activeRole === ROLES_WORKFLOW.TESORERO && selectedCierre.estado === ESTADOS_CIERRE.REVISADO_SECRETARIA && (
                <>
                  <button onClick={() => { setModalActionType('rechazar'); setShowModal(true); }}
                    className="flex items-center space-x-1.5 bg-rose-700 hover:bg-rose-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer">
                    <XCircle className="w-3.5 h-3.5"/><span>Observar / Rechazar</span>
                  </button>
                  <button onClick={() => { setModalActionType('aprobar_tesorero'); setShowModal(true); }}
                    className="flex items-center space-x-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer">
                    <CheckCircle2 className="w-3.5 h-3.5"/><span>Aprobar — Pasar a Comisión</span>
                  </button>
                </>
              )}

              {/* Comisión Revisora: visto bueno final */}
              {activeRole === ROLES_WORKFLOW.COMISION_REVISORA && selectedCierre.estado === ESTADOS_CIERRE.APROBADO_TESORERO && (
                <>
                  <button onClick={() => { setModalActionType('rechazar'); setShowModal(true); }}
                    className="flex items-center space-x-1.5 bg-rose-700 hover:bg-rose-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer">
                    <XCircle className="w-3.5 h-3.5"/><span>Objetar / Devolver</span>
                  </button>
                  <button onClick={() => { setModalActionType('visto_bueno_comision'); setShowModal(true); }}
                    className="flex items-center space-x-1.5 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer">
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
                {modalActionType === 'rechazar' && 'Indique el motivo del rechazo. La cajera podrá corregir y reenviar.'}
                {modalActionType === 'aprobar_secretaria' && 'Certifica que revisó las operaciones del turno y están conformes.'}
                {modalActionType === 'aprobar_tesorero' && 'Como Tesorero del Sindicato, aprueba este cierre de caja y lo envía a la Comisión Revisora.'}
                {modalActionType === 'visto_bueno_comision' && 'La Comisión Revisora otorga el visto bueno final. Este acta quedará consolidada en los balances del sindicato.'}
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
