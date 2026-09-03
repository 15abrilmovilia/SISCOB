import React, { useState } from 'react';
import { 
  GitPullRequest, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Lock, 
  Unlock, 
  UserCheck, 
  FileText, 
  Printer, 
  DollarSign, 
  Landmark, 
  Search, 
  ChevronRight,
  Eye,
  MessageSquare,
  ArrowRight,
  Send,
  Building2,
  FileCheck2
} from 'lucide-react';
import { ESTADOS_CIERRE, ROLES_WORKFLOW, INITIAL_CIERRES } from '../utils/workflowCaja';

export default function WorkflowCierrePage() {
  // Simulador de Rol Activo para probar la interacción bancaria completa
  const [activeRole, setActiveRole] = useState(ROLES_WORKFLOW.JEFE_OPERACIONES);
  const [cierres, setCierres] = useState(INITIAL_CIERRES);
  const [selectedCierreId, setSelectedCierreId] = useState('CC-2026-09-02-T1');
  const [observacionInput, setObservacionInput] = useState('');
  const [showObservacionModal, setShowObservacionModal] = useState(false);
  const [modalActionType, setModalActionType] = useState(''); // 'rechazar' | 'aprobar' | 'consolidar'

  const selectedCierre = cierres.find(c => c.id === selectedCierreId) || cierres[0];

  // IP simulada de la terminal según el rol
  const getSimulatedIp = (rol) => {
    switch(rol) {
      case ROLES_WORKFLOW.CAJERO: return '192.168.100.14';
      case ROLES_WORKFLOW.JEFE_OPERACIONES: return '192.168.100.5';
      case ROLES_WORKFLOW.TESORERIA: return '192.168.100.2';
      default: return '192.168.100.1';
    }
  };

  const getActorName = (rol) => {
    switch(rol) {
      case ROLES_WORKFLOW.CAJERO: return 'Daniela Alarcón (Cajera 01)';
      case ROLES_WORKFLOW.JEFE_OPERACIONES: return 'Carlos Mendoza (Jefe Operaciones)';
      case ROLES_WORKFLOW.TESORERIA: return 'Lic. Ramiro Paredes (Tesorero General)';
      default: return 'Usuario Sistema';
    }
  };

  // Helper para agregar log inmutable
  const addAuditLog = (cierre, accion, estadoAnterior, estadoNuevo, obs) => {
    const newLog = {
      id: cierre.auditoriaLogs.length + 1,
      fecha: new Date().toLocaleString('es-BO'),
      usuario: getActorName(activeRole),
      rol: activeRole,
      ip: getSimulatedIp(activeRole),
      accion,
      estadoAnterior,
      estadoNuevo,
      observacion: obs || 'Sin observaciones adicionales'
    };
    return [newLog, ...cierre.auditoriaLogs];
  };

  // 1. Acción Cajero: Solicitar Cierre de Caja
  const handleSolicitarCierre = () => {
    if (activeRole !== ROLES_WORKFLOW.CAJERO) {
      alert('Solo el Cajero responsable puede solicitar el cierre de turno.');
      return;
    }

    const estadoAnterior = selectedCierre.estado;
    const estadoNuevo = ESTADOS_CIERRE.CIERRE_SOLICITADO;
    const logsActualizados = addAuditLog(
      selectedCierre,
      'SOLICITUD_CIERRE',
      estadoAnterior,
      estadoNuevo,
      'Cierre enviado a revisión por el Jefe de Operaciones. Edición bloqueada.'
    );

    setCierres(cierres.map(c => c.id === selectedCierre.id ? {
      ...c,
      estado: estadoNuevo,
      bloqueadoEdicion: true,
      auditoriaLogs: logsActualizados
    } : c));

    alert('Solicitud de cierre enviada. La caja ha sido BLOQUEADA para edición hasta que el Jefe de Operaciones la evalúe.');
  };

  // 2. Acción Jefe de Operaciones: Aprobar o Rechazar
  const handleConfirmActionModal = () => {
    if (!observacionInput && modalActionType === 'rechazar') {
      alert('Las observaciones son obligatorias para rechazar un cierre.');
      return;
    }

    const estadoAnterior = selectedCierre.estado;
    let estadoNuevo = selectedCierre.estado;
    let accionNombre = '';

    if (modalActionType === 'aprobar') {
      estadoNuevo = ESTADOS_CIERRE.APROBADO;
      accionNombre = 'APROBACION_JEFE_OPERACIONES';
    } else if (modalActionType === 'rechazar') {
      estadoNuevo = ESTADOS_CIERRE.OBSERVADO;
      accionNombre = 'OBSERVACION_RECHAZO_OPERACIONES';
    } else if (modalActionType === 'consolidar') {
      estadoNuevo = ESTADOS_CIERRE.CONSOLIDADO;
      accionNombre = 'CONSOLIDACION_TESORERIA';
    }

    const logsActualizados = addAuditLog(
      selectedCierre,
      accionNombre,
      estadoAnterior,
      estadoNuevo,
      observacionInput || 'Aprobado según protocolo bancario'
    );

    setCierres(cierres.map(c => c.id === selectedCierre.id ? {
      ...c,
      estado: estadoNuevo,
      observacionesJefe: modalActionType === 'aprobar' || modalActionType === 'rechazar' ? observacionInput : c.observacionesJefe,
      observacionesTesoreria: modalActionType === 'consolidar' ? observacionInput : c.observacionesTesoreria,
      bloqueadoEdicion: estadoNuevo !== ESTADOS_CIERRE.OBSERVADO, // Si se observa, se desbloquea para subsanar
      auditoriaLogs: logsActualizados
    } : c));

    setShowObservacionModal(false);
    setObservacionInput('');
    alert(`Operación procesada: Estado actualizado a "${estadoNuevo.toUpperCase()}".`);
  };

  // Badge visual de estado
  const renderEstadoBadge = (estado) => {
    switch(estado) {
      case ESTADOS_CIERRE.ABIERTA:
        return <span className="bg-slate-100 text-slate-800 border border-slate-300 px-2.5 py-1 rounded-full text-xs font-bold uppercase">Abierta</span>;
      case ESTADOS_CIERRE.OPERACIONES_REGISTRADAS:
        return <span className="bg-blue-100 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full text-xs font-bold uppercase">Operaciones Registradas</span>;
      case ESTADOS_CIERRE.CIERRE_SOLICITADO:
        return <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-full text-xs font-black uppercase flex items-center space-x-1 animate-pulse"><Clock className="w-3.5 h-3.5 mr-1" />Pendiente de Aprobación</span>;
      case ESTADOS_CIERRE.OBSERVADO:
        return <span className="bg-rose-100 text-rose-800 border border-rose-300 px-2.5 py-1 rounded-full text-xs font-black uppercase flex items-center space-x-1"><AlertTriangle className="w-3.5 h-3.5 mr-1" />Observado / Rechazado</span>;
      case ESTADOS_CIERRE.APROBADO:
        return <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-full text-xs font-black uppercase flex items-center space-x-1"><CheckCircle2 className="w-3.5 h-3.5 mr-1" />Aprobado por Operaciones</span>;
      case ESTADOS_CIERRE.CONSOLIDADO:
        return <span className="bg-purple-100 text-purple-900 border border-purple-300 px-2.5 py-1 rounded-full text-xs font-black uppercase flex items-center space-x-1"><FileCheck2 className="w-3.5 h-3.5 mr-1" />Consolidado en Balances</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 animate-fadeIn text-slate-800">
      {/* Role Simulator Banner (Permite probar los 3 roles en vivo) */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 text-white p-4 rounded-2xl shadow-md flex flex-wrap justify-between items-center gap-3 no-print">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-700 text-white rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold text-red-300 uppercase tracking-wider">Simulador de Control Bancario</span>
              <span className="bg-red-600/60 text-[10px] font-mono font-bold px-2 py-0.5 rounded">IP: {getSimulatedIp(activeRole)}</span>
            </div>
            <h2 className="text-sm sm:text-base font-extrabold tracking-wide">
              Rol Activo en Sesión: <strong className="text-amber-300">{getActorName(activeRole)}</strong>
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-1 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700 text-xs font-bold">
          <span className="text-slate-400 px-2 text-[11px]">Cambiar Rol:</span>
          <button
            onClick={() => setActiveRole(ROLES_WORKFLOW.CAJERO)}
            className={`px-3 py-1 rounded-lg transition cursor-pointer ${
              activeRole === ROLES_WORKFLOW.CAJERO ? 'bg-red-700 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            1. Cajero
          </button>
          <button
            onClick={() => setActiveRole(ROLES_WORKFLOW.JEFE_OPERACIONES)}
            className={`px-3 py-1 rounded-lg transition cursor-pointer ${
              activeRole === ROLES_WORKFLOW.JEFE_OPERACIONES ? 'bg-red-700 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            2. Jefe Operaciones
          </button>
          <button
            onClick={() => setActiveRole(ROLES_WORKFLOW.TESORERIA)}
            className={`px-3 py-1 rounded-lg transition cursor-pointer ${
              activeRole === ROLES_WORKFLOW.TESORERIA ? 'bg-red-700 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            3. Tesorería
          </button>
        </div>
      </div>

      {/* Main Container Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (4 cols): Lista de Cierres de Turno */}
        <div className="lg:col-span-4 space-y-4 no-print">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
            <h3 className="font-extrabold text-sm uppercase tracking-wide text-slate-900">
              Cierres de Caja en Proceso
            </h3>
            <span className="text-xs font-bold text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
              {cierres.length} Turnos
            </span>
          </div>

          <div className="space-y-2.5">
            {cierres.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedCierreId(c.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  selectedCierre.id === c.id 
                    ? 'bg-white border-red-700 shadow-md ring-2 ring-red-700/10' 
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono font-bold text-xs text-red-700 block">{c.id}</span>
                    <strong className="text-xs font-bold text-slate-900">{c.turno}</strong>
                  </div>
                  {renderEstadoBadge(c.estado)}
                </div>

                <div className="text-[11px] text-slate-500 font-medium">
                  Cajero: <strong className="text-slate-700">{c.cajero.nombre}</strong> • {c.fecha}
                </div>

                <div className="flex justify-between text-xs font-mono pt-2 border-t border-slate-100">
                  <span className="text-slate-500">Saldo Teórico:</span>
                  <strong className="text-slate-900">Bs {c.saldoTeorico.toFixed(2)}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (8 cols): Expediente Completo de Aprobación & Auditoría */}
        <div className="lg:col-span-8 space-y-5">
          {/* Status Pipeline / Stepper */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 no-print">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-500">
                Línea de Vida del Cierre de Caja (Workflow Oficial)
              </h3>
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-600">
                {selectedCierre.bloqueadoEdicion ? (
                  <span className="flex items-center text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    <Lock className="w-3.5 h-3.5 mr-1" /> Edición Bloqueada
                  </span>
                ) : (
                  <span className="flex items-center text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <Unlock className="w-3.5 h-3.5 mr-1" /> Abierto / En Edición
                  </span>
                )}
              </div>
            </div>

            {/* Stepper Graphic */}
            <div className="grid grid-cols-4 gap-2 pt-1 text-center font-mono text-[10px]">
              <div className={`p-2 rounded-xl border ${selectedCierre.estado !== ESTADOS_CIERRE.ABIERTA ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-bold' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                <span>1. Operaciones</span>
              </div>
              <div className={`p-2 rounded-xl border ${selectedCierre.estado === ESTADOS_CIERRE.CIERRE_SOLICITADO ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold ring-2 ring-amber-400/40' : (selectedCierre.estado === ESTADOS_CIERRE.APROBADO || selectedCierre.estado === ESTADOS_CIERRE.CONSOLIDADO) ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-bold' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                <span>2. Revisión Operaciones</span>
              </div>
              <div className={`p-2 rounded-xl border ${selectedCierre.estado === ESTADOS_CIERRE.APROBADO ? 'bg-emerald-100 border-emerald-300 text-emerald-900 font-black ring-2 ring-emerald-400/40' : selectedCierre.estado === ESTADOS_CIERRE.CONSOLIDADO ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-bold' : selectedCierre.estado === ESTADOS_CIERRE.OBSERVADO ? 'bg-rose-50 border-rose-300 text-rose-900 font-bold' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                <span>3. Aprobación Final</span>
              </div>
              <div className={`p-2 rounded-xl border ${selectedCierre.estado === ESTADOS_CIERRE.CONSOLIDADO ? 'bg-purple-100 border-purple-300 text-purple-900 font-black ring-2 ring-purple-400/40' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                <span>4. Consolidado Balances</span>
              </div>
            </div>
          </div>

          {/* Expediente Imprimible de Cierre de Caja */}
          <div id="printable-area" className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4">
            {/* Header Documento */}
            <div className="flex justify-between items-start border-b-2 border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-red-700 tracking-wider uppercase block">Radio Móvil 15 de Abril • SISCOB</span>
                <h2 className="font-black text-lg text-slate-900 uppercase">Acta Oficial de Arqueo y Cierre de Caja</h2>
                <p className="text-xs text-slate-500 font-mono">Código Expediente: <strong>{selectedCierre.id}</strong> • {selectedCierre.turno}</p>
              </div>
              <div className="text-right">
                {renderEstadoBadge(selectedCierre.estado)}
                <div className="text-[10px] font-mono text-slate-400 mt-1">Fecha: {selectedCierre.fecha}</div>
              </div>
            </div>

            {/* Financial Math Summary (Idéntico a control bancario) */}
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

            {/* Arqueo Físico vs Teórico */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-500 block font-bold uppercase">Efectivo Físico Contado:</span>
                <strong className="text-base text-slate-900">Bs {selectedCierre.efectivoFisicoContado.toFixed(2)}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block font-bold uppercase">Diferencia de Caja:</span>
                <span className={`text-base font-black ${selectedCierre.diferencia === 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {selectedCierre.diferencia === 0 ? 'Bs 0.00 (Cuadrada)' : `Bs ${selectedCierre.diferencia.toFixed(2)}`}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block font-bold uppercase">Comprobantes Físicos:</span>
                <strong className="text-base text-slate-900">{selectedCierre.comprobantesValidados} recibos/boletas</strong>
              </div>
            </div>

            {/* Observaciones registradas por roles */}
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-[10px] text-slate-500 uppercase block">1. Observaciones del Cajero(a):</span>
                <p className="text-slate-800 italic">"{selectedCierre.observacionesCajero}"</p>
              </div>

              {selectedCierre.observacionesJefe && (
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                  <span className="font-bold text-[10px] text-amber-800 uppercase block">2. Dictamen del Jefe de Operaciones:</span>
                  <p className="text-amber-950 font-semibold">"{selectedCierre.observacionesJefe}"</p>
                </div>
              )}

              {selectedCierre.observacionesTesoreria && (
                <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1">
                  <span className="font-bold text-[10px] text-purple-800 uppercase block">3. Asiento de Consolidación Tesorería:</span>
                  <p className="text-purple-950 font-semibold">"{selectedCierre.observacionesTesoreria}"</p>
                </div>
              )}
            </div>

            {/* Firmas de Control Dual Oficial */}
            <div className="pt-8 grid grid-cols-3 gap-4 text-center text-[10px]">
              <div className="border-t border-slate-400 pt-1">
                <strong className="block text-slate-800">{selectedCierre.cajero.nombre}</strong>
                <span className="text-slate-500 uppercase block">Cajero(a) Entregante</span>
                <span className="font-mono text-[9px] text-slate-400">IP: {selectedCierre.cajero.ip}</span>
              </div>
              <div className="border-t border-slate-400 pt-1">
                <strong className="block text-slate-800">{selectedCierre.jefeOperaciones.nombre}</strong>
                <span className="text-slate-500 uppercase block">Jefe de Operaciones</span>
                <span className="font-mono text-[9px] text-slate-400">
                  {selectedCierre.estado === ESTADOS_CIERRE.APROBADO || selectedCierre.estado === ESTADOS_CIERRE.CONSOLIDADO ? 'Aprobado Digitalmente' : 'Pendiente Revisión'}
                </span>
              </div>
              <div className="border-t border-slate-400 pt-1">
                <strong className="block text-slate-800">{selectedCierre.tesorero.nombre}</strong>
                <span className="text-slate-500 uppercase block">Tesorero General</span>
                <span className="font-mono text-[9px] text-slate-400">
                  {selectedCierre.estado === ESTADOS_CIERRE.CONSOLIDADO ? 'Consolidado en Libros' : 'Pendiente Consolidar'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Control Bar (Contextual according to active role and current state) */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap justify-between items-center gap-3 no-print">
            <div className="text-xs">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Acciones Disponibles para:</span>
              <strong className="text-red-700 font-extrabold">{getActorName(activeRole)}</strong>
            </div>

            <div className="flex flex-wrap space-x-2">
              <button
                onClick={() => window.print()}
                className="flex items-center space-x-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl text-xs font-bold border border-slate-300 transition cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir Acta</span>
              </button>

              {/* Botón Cajero: Solicitar Cierre */}
              {activeRole === ROLES_WORKFLOW.CAJERO && selectedCierre.estado === ESTADOS_CIERRE.OPERACIONES_REGISTRADAS && (
                <button
                  onClick={handleSolicitarCierre}
                  className="flex items-center space-x-1.5 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Solicitar Cierre y Bloquear Caja</span>
                </button>
              )}

              {/* Botones Jefe Operaciones: Aprobar o Rechazar */}
              {activeRole === ROLES_WORKFLOW.JEFE_OPERACIONES && selectedCierre.estado === ESTADOS_CIERRE.CIERRE_SOLICITADO && (
                <>
                  <button
                    onClick={() => { setModalActionType('rechazar'); setShowObservacionModal(true); }}
                    className="flex items-center space-x-1.5 bg-rose-700 hover:bg-rose-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Observar / Rechazar Cierre</span>
                  </button>
                  <button
                    onClick={() => { setModalActionType('aprobar'); setShowObservacionModal(true); }}
                    className="flex items-center space-x-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Aprobar Cierre de Caja</span>
                  </button>
                </>
              )}

              {/* Botón Tesorería: Consolidar en Libros y Balances */}
              {activeRole === ROLES_WORKFLOW.TESORERIA && selectedCierre.estado === ESTADOS_CIERRE.APROBADO && (
                <button
                  onClick={() => { setModalActionType('consolidar'); setShowObservacionModal(true); }}
                  className="flex items-center space-x-1.5 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer shadow-xs"
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>Consolidar Oficialmente en Balance</span>
                </button>
              )}
            </div>
          </div>

          {/* Inmutable Audit Log Table (Bancario) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-3 p-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-red-700" />
                <h3 className="font-extrabold text-xs uppercase tracking-wide text-slate-900">
                  Bitácora de Auditoría Inmutable del Expediente (Trazabilidad Bancaria)
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-400">
                {selectedCierre.auditoriaLogs.length} eventos registrados
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b">
                  <tr>
                    <th className="p-2.5">Fecha y Hora</th>
                    <th className="p-2.5">Usuario / Rol</th>
                    <th className="p-2.5">Terminal IP</th>
                    <th className="p-2.5">Acción</th>
                    <th className="p-2.5">Transición de Estado</th>
                    <th className="p-2.5">Observaciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {selectedCierre.auditoriaLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="p-2.5 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                        {log.fecha}
                      </td>
                      <td className="p-2.5">
                        <strong className="text-slate-900 block">{log.usuario}</strong>
                        <span className="text-[9px] font-extrabold font-mono text-slate-400 uppercase">
                          {log.rol}
                        </span>
                      </td>
                      <td className="p-2.5 font-mono text-slate-500 text-[11px]">
                        {log.ip}
                      </td>
                      <td className="p-2.5">
                        <span className="bg-slate-100 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200">
                          {log.accion}
                        </span>
                      </td>
                      <td className="p-2.5 font-mono text-[11px]">
                        <span className="text-slate-400">{log.estadoAnterior || 'INICIO'}</span>
                        <span className="mx-1 text-slate-400">→</span>
                        <strong className="text-red-700 font-bold">{log.estadoNuevo}</strong>
                      </td>
                      <td className="p-2.5 text-slate-700 text-[11px] max-w-xs">
                        {log.observacion}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Dictamen / Observaciones */}
      {showObservacionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 text-xs">
            <div className={`p-4 text-white font-bold text-sm flex justify-between items-center ${
              modalActionType === 'aprobar' ? 'bg-emerald-800' : modalActionType === 'rechazar' ? 'bg-rose-800' : 'bg-purple-800'
            }`}>
              <span>
                {modalActionType === 'aprobar' && 'Confirmar Aprobación de Cierre de Caja'}
                {modalActionType === 'rechazar' && 'Observar y Rechazar Cierre de Turno'}
                {modalActionType === 'consolidar' && 'Consolidar Oficialmente en Libros Mayores'}
              </span>
              <button onClick={() => setShowObservacionModal(false)} className="text-white/80 hover:text-white">✕</button>
            </div>

            <div className="p-5 space-y-3">
              <p className="text-slate-600">
                {modalActionType === 'aprobar' && 'Al aprobar, certificas que el efectivo físico y los comprobantes fueron revisados satisfactoriamente.'}
                {modalActionType === 'rechazar' && 'Debes fundamentar el motivo del rechazo (ej. faltante sin justificar, boleta extraviada).'}
                {modalActionType === 'consolidar' && 'Este cierre se incorporará de forma irreversible a los reportes financieros de asamblea.'}
              </p>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Observaciones / Dictamen Oficial {modalActionType === 'rechazar' ? '*' : '(Opcional)'}:
                </label>
                <textarea
                  rows="3"
                  required={modalActionType === 'rechazar'}
                  placeholder="Escribe el fundamento de la decisión..."
                  value={observacionInput}
                  onChange={(e) => setObservacionInput(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowObservacionModal(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmActionModal}
                  className={`px-4 py-2 text-white rounded-xl font-bold transition shadow-xs ${
                    modalActionType === 'aprobar' ? 'bg-emerald-700 hover:bg-emerald-800' : modalActionType === 'rechazar' ? 'bg-rose-700 hover:bg-rose-800' : 'bg-purple-700 hover:bg-purple-800'
                  }`}
                >
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