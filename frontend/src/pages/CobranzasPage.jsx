import React, { useState, useEffect } from 'react';
import { 
  Search, 
  CheckSquare, 
  Square, 
  Printer, 
  CheckCircle2, 
  RotateCcw, 
  AlertTriangle,
  History,
  Ban,
  Eye,
  FileText,
  BadgeAlert,
  ArrowLeft,
  Landmark
} from 'lucide-react';
import ReceiptModal from '../components/ReceiptModal';
import { registrarCobranzaAPI, anularCobranzaAPI } from '../utils/api';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const INITIAL_HISTORIAL_RECIBOS = [
  {
    nroRecibo: 1084,
    fecha: '02/09/2026, 18:45:00',
    usuario: 'admin33',
    cajero: 'Cajero Central',
    socioId: 20,
    socioNombre: 'REMBERTO TORRICO VARGAS',
    socioCI: '4414561',
    socioCelular: '7141199',
    totalBs: 480.0,
    totalSus: 0,
    metodoPago: 'Efectivo',
    cajaId: 'c1',
    cajaNombre: 'CAJA GENERAL (EFECTIVO)',
    items: [
      { id: 'd-seed-1', descripcion: 'Cuota Sostenimiento Mensual', monto: 400.0, periodo: 'Agosto 2026' },
      { id: 'd-seed-2', descripcion: 'Mantenimiento GPS', monto: 80.0, periodo: 'Agosto 2026' }
    ],
    estado: 'VIGENTE'
  }
];

export default function CobranzasPage({ 
  socios, 
  deudas, 
  setDeudas, 
  cajas, 
  setCajas, 
  preselectedSocioId, 
  printMode,
  recibos,
  setRecibos
}) {
  // Navigation: 'cobro' (Ventanilla) | 'historial' (Recibos emitidos)
  const [activeSubTab, setActiveSubTab] = useState('cobro');

  const [selectedSocioId, setSelectedSocioId] = useState(preselectedSocioId || 20);
  const [selectedDeudaIds, setSelectedDeudaIds] = useState(['d1', 'd2', 'd3', 'd4', 'd5']);
  const [observaciones, setObservaciones] = useState('');
  const [currentReceipt, setCurrentReceipt] = useState(null);
  const [radioMode, setRadioMode] = useState('deudas');

  // Historial de Recibos emitidos (enlazado con estado central de App y Supabase)
  const [localRecibos, setLocalRecibos] = useState(() => 
    loadFromStorage('siscob_recibos', [])
  );

  const historialRecibos = recibos !== undefined ? recibos : localRecibos;
  const setHistorialRecibos = setRecibos || setLocalRecibos;

  // Mensaje de notificación temporal
  const [alertMsg, setAlertMsg] = useState(null);

  // Caja seleccionada para el depósito (5 Cajas oficiales)
  const [selectedCajaId, setSelectedCajaId] = useState('c1');

  // Search in Historial
  const [historialSearch, setHistorialSearch] = useState('');

  const activeSocio = socios.find(s => s.id === Number(selectedSocioId)) || socios[0];
  const socioDeudas = deudas.filter(d => d.socioId === activeSocio?.id && !d.pagado);

  const toggleSelectDeuda = (id) => {
    if (selectedDeudaIds.includes(id)) {
      setSelectedDeudaIds(selectedDeudaIds.filter(item => item !== id));
    } else {
      setSelectedDeudaIds([...selectedDeudaIds, id]);
    }
  };

  const selectAll = () => {
    if (selectedDeudaIds.length === socioDeudas.length) {
      setSelectedDeudaIds([]);
    } else {
      setSelectedDeudaIds(socioDeudas.map(d => d.id));
    }
  };

  const selectedItems = socioDeudas.filter(d => selectedDeudaIds.includes(d.id));
  const totalBs = selectedItems.filter(d => d.moneda === 'Bs').reduce((acc, curr) => acc + curr.monto, 0);
  const totalSus = selectedItems.filter(d => d.moneda === '$us').reduce((acc, curr) => acc + curr.monto, 0);
  const totalDeudaAcumulada = socioDeudas.reduce((acc, curr) => acc + curr.monto, 0);

  // Sugerir automáticamente la caja según el concepto o categoría del socio
  useEffect(() => {
    if (selectedItems.length > 0) {
      const desc = (selectedItems[0].descripcion || '').toUpperCase();
      if (desc.includes('MULTA') || desc.includes('INFRAC') || desc.includes('ASAMBLEA') || desc.includes('MARCHA') || desc.includes('SANCION')) {
        setSelectedCajaId('c2'); // CAJA DE MULTAS E INFRACCIONES
      } else if (desc.includes('PRESTAMO') || desc.includes('CREDITO') || desc.includes('INTERES') || desc.includes('AMORTIZ')) {
        setSelectedCajaId('c4'); // CAJA PRÉSTAMOS
      } else if (desc.includes('NUEVO') || desc.includes('INGRESO') || desc.includes('ACCION') || desc.includes('INSCRIPCION')) {
        setSelectedCajaId('c3'); // CAJA NUEVOS SOCIOS
      } else if (activeSocio?.categoria === 'Conductores' || activeSocio?.categoria === 'Inquilino' || desc.includes('INQUILINO') || desc.includes('RELEVO')) {
        setSelectedCajaId('c5'); // CAJA FRECUENCIA INQUILINOS
      } else {
        setSelectedCajaId('c1'); // CAJA DE FRECUENCIA
      }
    }
  }, [selectedDeudaIds, activeSocio]);

  // REGISTRAR COBRANZA
  const handleCobrar = async () => {
    if (selectedItems.length === 0) {
      alert('Por favor marque al menos una deuda pendiente para cobrar.');
      return;
    }

    const chosenCaja = cajas.find(c => c.id === selectedCajaId) || cajas[0] || { id: 'c1', nombre: 'CAJA DE FRECUENCIA' };
    const nroRecibo = Math.floor(100000 + Math.random() * 900000);
    const receiptData = {
      nroRecibo,
      fecha: new Date().toLocaleString('es-BO'),
      usuario: 'Cajero Central',
      cajero: 'Cajero Central',
      socioId: activeSocio.id,
      socioNombre: `${activeSocio.nombres} ${activeSocio.apPaterno} ${activeSocio.apMaterno || ''}`.trim(),
      socioCI: activeSocio.ci,
      socioCelular: activeSocio.celular || '',
      items: selectedItems,
      totalBs,
      totalSus,
      metodoPago: 'Efectivo',
      cajaId: chosenCaja.id,
      cajaNombre: chosenCaja.nombre,
      observaciones,
      estado: 'VIGENTE',
      deudaIds: [...selectedDeudaIds]
    };

    // 1. Mostrar recibo en pantalla DE INMEDIATO
    setCurrentReceipt(receiptData);

    // 2. Guardar en Historial de Recibos
    setHistorialRecibos(prev => [receiptData, ...prev]);

    // 3. Marcar deudas pagadas y actualizar saldos en el sistema
    const updatedDeudas = deudas.map(d => 
      selectedDeudaIds.includes(d.id) ? { ...d, pagado: true, nroRecibo } : d
    );
    setDeudas(updatedDeudas);

    const updatedCajas = cajas.map(c => 
      c.id === chosenCaja.id 
        ? { ...c, ingresos: (c.ingresos || 0) + totalBs, saldoActual: (c.saldoActual || c.saldoAnterior || 0) + totalBs } 
        : c
    );
    setCajas(updatedCajas);

    setSelectedDeudaIds([]);
    setObservaciones('');

    // 4. Registrar en backend
    try {
      await registrarCobranzaAPI({
        nroRecibo: `REC-${nroRecibo}`,
        socioId: activeSocio.id,
        cajaId: chosenCaja.id,
        total: totalBs,
        metodoPago: 'Efectivo',
        cajero: 'Cajero Central',
        deudaIds: selectedDeudaIds
      });
    } catch (e) {
      console.warn('Error al sincronizar cobranza con backend:', e);
    }
  };

  // ANULAR / REVERTIR RECIBO EMITIDO POR ERROR
  const handleAnularRecibo = async (recibo) => {
    if (recibo.estado === 'ANULADO') {
      alert('Este recibo ya se encuentra anulado.');
      return;
    }

    const cajaNombreAfectada = cajas.find(c => c.id === (recibo.cajaId || 'c1'))?.nombre || 'la Caja';
    const confirmar = window.confirm(
      `¿Está seguro de ANULAR el Recibo N° ${recibo.nroRecibo} emitido a ${recibo.socioNombre} por Bs ${recibo.totalBs.toFixed(2)}?\n\n` +
      `Efectos automáticos:\n` +
      `1. Las deudas cobradas volverán a estar PENDIENTES en la cuenta del socio.\n` +
      `2. Se descontarán Bs ${recibo.totalBs.toFixed(2)} de ${cajaNombreAfectada} para que el arqueo cuadre exacto.\n` +
      `3. El recibo quedará marcado como ANULADO en el historial de auditoría.`
    );

    if (!confirmar) return;

    // 1. Obtener IDs de deudas que pertenecían a este recibo
    const debtIdsToRevert = recibo.items ? recibo.items.map(i => i.id) : (recibo.deudaIds || []);

    // 2. Restaurar deudas a pagado = false
    setDeudas(prev => prev.map(d => {
      if (debtIdsToRevert.includes(d.id) || d.nroRecibo === recibo.nroRecibo) {
        return { ...d, pagado: false, nroRecibo: null };
      }
      return d;
    }));

    // 3. Descontar dinero de la Caja
    setCajas(prev => prev.map(c => 
      c.id === (recibo.cajaId || 'c1')
        ? { ...c, ingresos: Math.max(0, (c.ingresos || 0) - recibo.totalBs), saldoActual: (c.saldoActual || 0) - recibo.totalBs }
        : c
    ));

    // 4. Marcar recibo como ANULADO en historial
    setHistorialRecibos(prev => prev.map(r => 
      r.nroRecibo === recibo.nroRecibo
        ? { ...r, estado: 'ANULADO', fechaAnulacion: new Date().toLocaleString('es-BO') }
        : r
    ));

    // 5. Enviar reversión a Supabase
    try {
      await anularCobranzaAPI({
        nroRecibo: recibo.nroRecibo,
        deudaIds: debtIdsToRevert,
        monto: recibo.totalBs,
        cajaId: recibo.cajaId || 'c1'
      });
    } catch (err) {
      console.warn('Error al anular cobranza remota:', err);
    }

    setAlertMsg(`¡Recibo N° ${recibo.nroRecibo} ANULADO exitosamente! Las deudas fueron restauradas y el dinero descontado de caja.`);
    setTimeout(() => setAlertMsg(null), 6000);
  };

  // Filtrado de historial
  const filteredHistorial = historialRecibos.filter(r => {
    if (!historialSearch.trim()) return true;
    const term = historialSearch.toLowerCase();
    return (
      r.nroRecibo.toString().includes(term) ||
      (r.socioNombre && r.socioNombre.toLowerCase().includes(term)) ||
      (r.socioId && r.socioId.toString().includes(term)) ||
      (r.socioCI && r.socioCI.includes(term))
    );
  });

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-4 animate-fadeIn">
      {/* Toast Alert */}
      {alertMsg && (
        <div className="bg-amber-100 border border-amber-300 text-amber-900 px-4 py-3 rounded-2xl flex items-center justify-between text-xs font-bold shadow-sm">
          <div className="flex items-center space-x-2">
            <BadgeAlert className="w-5 h-5 text-amber-700" />
            <span>{alertMsg}</span>
          </div>
          <button onClick={() => setAlertMsg(null)} className="text-amber-800 hover:text-black">✕</button>
        </div>
      )}

      {/* Top Header Switcher: Ventanilla vs Historial de Recibos */}
      <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-xs gap-3 no-print">
        <div>
          <h1 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Caja Rápida y Control de Recibos</span>
          </h1>
          <p className="text-xs text-slate-500">
            Cobro en ventanilla de aportes institucionales y gestión de comprobantes emitidos
          </p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl space-x-1 text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('cobro')}
            className={`px-3.5 py-2 rounded-lg transition cursor-pointer flex items-center space-x-1.5 ${
              activeSubTab === 'cobro'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>💵 Cobranza en Ventanilla</span>
          </button>
          <button
            onClick={() => setActiveSubTab('historial')}
            className={`px-3.5 py-2 rounded-lg transition cursor-pointer flex items-center space-x-1.5 ${
              activeSubTab === 'historial'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Historial y Anulación ({historialRecibos.length})</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VISTA 1: COBRANZA EN VENTANILLA (CAJA RÁPIDA) */}
      {/* ========================================================================= */}
      {activeSubTab === 'cobro' && (
        <div className="space-y-4">
          {/* Top Header: Search Socio & Mode Radio */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-wrap justify-between items-center gap-3">
              <div className="flex items-center space-x-3 flex-1 max-w-xl">
                <label className="text-xs font-bold text-slate-700 whitespace-nowrap uppercase">
                  Socio - Acción:
                </label>
                <div className="relative flex-1">
                  <select
                    value={activeSocio?.id || ''}
                    onChange={(e) => {
                      setSelectedSocioId(Number(e.target.value));
                      setSelectedDeudaIds([]);
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-blue-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {socios.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.nombres} {s.apPaterno} {s.apMaterno || ''} ({s.id}) - CI: {s.ci}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-xs font-semibold text-slate-700 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="radioMode"
                    value="deudas"
                    checked={radioMode === 'deudas'}
                    onChange={() => setRadioMode('deudas')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className={radioMode === 'deudas' ? 'text-blue-900 font-bold' : ''}>Deudas y Cuotas</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="radioMode"
                    value="almacen"
                    checked={radioMode === 'almacen'}
                    onChange={() => setRadioMode('almacen')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className={radioMode === 'almacen' ? 'text-blue-900 font-bold' : ''}>Almacén / Repuestos</span>
                </label>
              </div>
            </div>

            {/* Socio Summary Badges */}
            {activeSocio && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-xs">
                <div className="bg-slate-50 p-2 rounded border border-slate-200">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Móvil Interno</span>
                  <strong className="text-blue-900 text-sm font-mono font-bold">#{activeSocio.id}</strong>
                </div>
                <div className="bg-slate-50 p-2 rounded border border-slate-200">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Cédula CI</span>
                  <strong className="text-slate-800">{activeSocio.ci}</strong>
                </div>
                <div className="bg-slate-50 p-2 rounded border border-slate-200">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Categoría</span>
                  <strong className="text-slate-800">{activeSocio.categoria}</strong>
                </div>
                <div className="bg-red-50 p-2 rounded border border-red-200">
                  <span className="text-red-700 block text-[10px] uppercase font-bold">Deuda Pendiente</span>
                  <strong className="text-red-700 font-mono text-sm font-bold">Bs {totalDeudaAcumulada.toFixed(2)}</strong>
                </div>
              </div>
            )}
          </div>

          {/* Main Table: Obligations / Debts */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-xs">
              <div className="flex items-center space-x-2 font-bold text-slate-800 uppercase">
                <CheckSquare className="w-4 h-4 text-blue-700" />
                <span>Obligaciones Pendientes de Pago ({socioDeudas.length})</span>
              </div>
              <button
                onClick={selectAll}
                className="text-blue-700 hover:text-blue-900 font-bold text-xs cursor-pointer hover:underline"
              >
                {selectedDeudaIds.length === socioDeudas.length ? 'Desmarcar Todos' : 'Marcar Todos'}
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-900 text-white font-semibold">
                  <tr>
                    <th className="p-2.5 w-10 text-center">Cobrar</th>
                    <th className="p-2.5">Concepto de Cobro</th>
                    <th className="p-2.5">Periodo / Mes</th>
                    <th className="p-2.5 text-right">Monto (Bs)</th>
                    <th className="p-2.5 text-right">Monto ($us)</th>
                    <th className="p-2.5 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {socioDeudas.length > 0 ? (
                    socioDeudas.map((d) => {
                      const isSelected = selectedDeudaIds.includes(d.id);
                      return (
                        <tr
                          key={d.id}
                          onClick={() => toggleSelectDeuda(d.id)}
                          className={`cursor-pointer transition ${
                            isSelected ? 'bg-blue-50/70 font-semibold' : 'hover:bg-slate-50'
                          }`}
                        >
                          <td className="p-2.5 text-center" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleSelectDeuda(d.id)}
                              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                          </td>
                          <td className="p-2.5 font-medium text-slate-900">
                            {d.descripcion}
                          </td>
                          <td className="p-2.5 font-mono text-slate-600">{d.periodo}</td>
                          <td className="p-2.5 font-mono text-right font-bold text-slate-800">
                            {d.moneda === 'Bs' ? d.monto.toFixed(2) : '0.00'}
                          </td>
                          <td className="p-2.5 font-mono text-right text-slate-500">
                            {d.moneda === '$us' ? d.monto.toFixed(2) : '0.00'}
                          </td>
                          <td className="p-2.5 text-center">
                            <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[10px] font-bold">
                              PENDIENTE
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-slate-400">
                        Este socio no tiene obligaciones pendientes registradas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Bottom Totalizer Bar */}
            <div className="bg-slate-900 text-white p-4 flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center space-x-4">
                <span className="text-xs text-slate-400">Ítems Seleccionados:</span>
                <span className="font-mono text-sm font-bold bg-slate-800 px-2.5 py-1 rounded">
                  {selectedItems.length}
                </span>
              </div>

              <div className="flex items-center space-x-6 font-mono">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase font-sans">Total en Dólares</span>
                  <span className="text-base font-bold text-slate-300">$us {totalSus.toFixed(2)}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-emerald-400 block uppercase font-sans font-bold">Total a Cobrar (Bs)</span>
                  <span className="text-2xl font-black text-emerald-400">Bs {totalBs.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Observations & Action Buttons */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap justify-between items-center gap-4">
            
            {/* Selector de Caja Destino (5 Cajas oficiales) */}
            <div className="w-full sm:w-auto min-w-[270px]">
              <label className="block text-xs font-black text-slate-800 mb-1 flex items-center space-x-1.5">
                <Landmark className="w-4 h-4 text-red-700" />
                <span>Caja Destino del Cobro:</span>
              </label>
              <select
                value={selectedCajaId}
                onChange={(e) => setSelectedCajaId(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-black text-slate-900 focus:ring-2 focus:ring-red-500 cursor-pointer shadow-xs"
              >
                {cajas.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.nombre} (Saldo: Bs {(c.saldoActual || 0).toFixed(2)})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[240px] max-w-md">
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Observaciones del Recibo:
              </label>
              <input
                type="text"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                placeholder="Ej. Pago correspondiente a aportes del mes..."
                className="w-full p-2 border border-slate-300 rounded-xl text-xs"
              />
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedDeudaIds([])}
                className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center space-x-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Limpiar</span>
              </button>
              <button
                onClick={handleCobrar}
                disabled={selectedItems.length === 0}
                className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-black shadow-xs transition ${
                  selectedItems.length > 0 
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer active:scale-95' 
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>REGISTRAR COBRANZA Y EMITIR RECIBO</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VISTA 2: HISTORIAL Y ANULACIÓN DE RECIBOS EMITIDOS */}
      {/* ========================================================================= */}
      {activeSubTab === 'historial' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-5 animate-fadeIn">
          <div className="flex flex-wrap justify-between items-center gap-3 border-b border-slate-100 pb-3">
            <div>
              <h2 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide flex items-center space-x-2">
                <History className="w-4 h-4 text-slate-700" />
                <span>Historial de Recibos y Reversión de Cobros Erróneos</span>
              </h2>
              <p className="text-xs text-slate-500">
                Si te equivocaste de socio, monto o fecha, puedes anular el recibo para restaurar la deuda y cuadrar la caja.
              </p>
            </div>

            <div className="relative w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por N° de recibo, socio o CI..."
                value={historialSearch}
                onChange={(e) => setHistorialSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-xl text-xs font-semibold"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 text-white font-semibold">
                <tr>
                  <th className="p-3">Recibo N°</th>
                  <th className="p-3">Fecha y Hora</th>
                  <th className="p-3">Socio / Móvil</th>
                  <th className="p-3">Conceptos Cobrados</th>
                  <th className="p-3 text-right">Monto Total</th>
                  <th className="p-3 text-center">Estado</th>
                  <th className="p-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {filteredHistorial.length > 0 ? (
                  filteredHistorial.map((rec) => {
                    const isAnulado = rec.estado === 'ANULADO';

                    return (
                      <tr 
                        key={rec.nroRecibo} 
                        className={`transition ${isAnulado ? 'bg-rose-50/40 text-slate-400' : 'hover:bg-slate-50 text-slate-800'}`}
                      >
                        <td className="p-3 font-mono font-bold text-blue-700">
                          #{rec.nroRecibo}
                        </td>
                        <td className="p-3 font-mono text-slate-500 text-[11px]">
                          {rec.fecha}
                        </td>
                        <td className="p-3 font-semibold">
                          <div className="text-slate-900 font-bold">{rec.socioNombre}</div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            Móvil #{rec.socioId} • CI: {rec.socioCI}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="max-w-xs truncate text-[11px]">
                            {rec.items && rec.items.map(i => i.descripcion).join(', ')}
                          </div>
                        </td>
                        <td className="p-3 font-mono font-bold text-right text-emerald-700 text-sm">
                          Bs {parseFloat(rec.totalBs).toFixed(2)}
                        </td>
                        <td className="p-3 text-center">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            isAnulado 
                              ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          }`}>
                            {rec.estado}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center space-x-1.5">
                            <button
                              onClick={() => setCurrentReceipt(rec)}
                              className="flex items-center space-x-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-2.5 py-1 rounded-lg text-xs font-bold border border-blue-200 transition cursor-pointer"
                              title="Ver e imprimir copia de recibo"
                            >
                              <Eye className="w-3 h-3" />
                              <span>Ver</span>
                            </button>

                            {!isAnulado ? (
                              <button
                                onClick={() => handleAnularRecibo(rec)}
                                className="flex items-center space-x-1 bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer active:scale-95 shadow-2xs"
                                title="Anular este recibo por equivocación"
                              >
                                <Ban className="w-3 h-3" />
                                <span>Anular Recibo</span>
                              </button>
                            ) : (
                              <span className="text-[10px] text-slate-400 italic">
                                Revertido
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-slate-400">
                      No se encontraron recibos emitidos en el historial.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      <ReceiptModal
        isOpen={Boolean(currentReceipt)}
        receipt={currentReceipt}
        data={currentReceipt}
        onClose={() => setCurrentReceipt(null)}
        printMode={printMode}
      />
    </div>
  );
}