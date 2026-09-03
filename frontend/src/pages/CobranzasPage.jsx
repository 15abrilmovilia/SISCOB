import React, { useState } from 'react';
import { Search, CheckSquare, Square, Printer, CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react';
import ReceiptModal from '../components/ReceiptModal';
import { registrarCobranzaAPI } from '../utils/api';

export default function CobranzasPage({ socios, deudas, setDeudas, cajas, setCajas, preselectedSocioId, printMode }) {
  const [selectedSocioId, setSelectedSocioId] = useState(preselectedSocioId || 20);
  const [selectedDeudaIds, setSelectedDeudaIds] = useState(['d1', 'd2', 'd3', 'd4', 'd5']); // Default similar to video
  const [observaciones, setObservaciones] = useState('');
  const [currentReceipt, setCurrentReceipt] = useState(null);
  const [radioMode, setRadioMode] = useState('deudas'); // 'deudas' | 'almacen'

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

  const handleCobrar = async () => {
    if (selectedItems.length === 0) {
      alert('Por favor marque al menos una deuda pendiente para cobrar.');
      return;
    }

    const nroRecibo = Math.floor(100000 + Math.random() * 900000);
    const receiptData = {
      nroRecibo,
      fecha: new Date().toLocaleString('es-BO'),
      usuario: 'admin33',
      socioId: activeSocio.id,
      socioNombre: `${activeSocio.nombres} ${activeSocio.apPaterno} ${activeSocio.apMaterno || ''}`,
      socioCI: activeSocio.ci,
      items: selectedItems,
      totalBs,
      totalSus,
      observaciones
    };

    // Registrar en Supabase a través de Railway
    await registrarCobranzaAPI({
      nroRecibo: `REC-${nroRecibo}`,
      socioId: activeSocio.id,
      cajaId: 'c1',
      total: totalBs,
      metodoPago: 'Efectivo',
      cajero: 'Cajero Central',
      deudaIds: selectedDeudaIds
    });

    // Mark deudas as paid
    const updatedDeudas = deudas.map(d => 
      selectedDeudaIds.includes(d.id) ? { ...d, pagado: true, nroRecibo } : d
    );
    setDeudas(updatedDeudas);

    // Add to Caja General
    const updatedCajas = cajas.map(c => 
      c.id === 'c1' ? { ...c, ingresos: c.ingresos + totalBs, saldoActual: (c.saldoActual || 0) + totalBs } : c
    );
    setCajas(updatedCajas);

    // Open receipt modal
    setCurrentReceipt(receiptData);
    setSelectedDeudaIds([]);
    setObservaciones('');
  };

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-4">
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
              <span className={radioMode === 'almacen' ? 'text-blue-900 font-bold' : ''}>Estación / Almacén</span>
            </label>
          </div>
        </div>
      </div>

      {/* Main Cobranza Interface (Identical to Frame 100s) */}
      <div className="space-y-4">
        {/* Table 1: Deudas Pendientes */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="bg-slate-900 text-white px-4 py-2.5 flex justify-between items-center text-xs">
            <span className="font-bold uppercase tracking-wider flex items-center space-x-2">
              <span>Deudas Pendientes de Cobro</span>
              <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40 text-[11px]">
                {socioDeudas.length} Registros
              </span>
            </span>
            <button
              onClick={selectAll}
              className="text-[11px] text-blue-300 hover:text-white underline font-semibold cursor-pointer"
            >
              {selectedDeudaIds.length === socioDeudas.length ? 'Deseleccionar Todas' : 'Seleccionar Todas'}
            </button>
          </div>

          <div className="overflow-x-auto max-h-64 overflow-y-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-semibold sticky top-0 border-b border-slate-200">
                <tr>
                  <th className="p-2.5 w-10 text-center">Sel</th>
                  <th className="p-2.5">Desde</th>
                  <th className="p-2.5">Descripción Concepto</th>
                  <th className="p-2.5 text-center">Cant</th>
                  <th className="p-2.5 text-center">Moneda</th>
                  <th className="p-2.5 text-right">Monto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {socioDeudas.length > 0 ? (
                  socioDeudas.map((deuda) => {
                    const isChecked = selectedDeudaIds.includes(deuda.id);
                    return (
                      <tr
                        key={deuda.id}
                        onClick={() => toggleSelectDeuda(deuda.id)}
                        className={`cursor-pointer transition select-none ${
                          isChecked ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <td className="p-2.5 text-center">
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 mx-auto text-white" />
                          ) : (
                            <Square className="w-4 h-4 mx-auto text-slate-400" />
                          )}
                        </td>
                        <td className="p-2.5 font-mono">{deuda.fecha}</td>
                        <td className="p-2.5 uppercase">{deuda.descripcion}</td>
                        <td className="p-2.5 text-center font-mono">{deuda.cantidad.toFixed(1)}</td>
                        <td className="p-2.5 text-center font-bold">{deuda.moneda}</td>
                        <td className="p-2.5 text-right font-mono font-bold">{deuda.monto.toFixed(2)}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-slate-400 italic">
                      Este socio no tiene deudas pendientes. ¡Está al día!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 px-4 py-2 text-right border-t border-slate-200 text-xs text-slate-600">
            Deuda Total Acumulada: <strong className="font-mono text-slate-900 text-sm">Bs {totalDeudaAcumulada.toFixed(2)}</strong>
          </div>
        </div>

        {/* Table 2: Items a Cobrar (Selected items preview) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase">
            Ítems a Cobrar ({selectedItems.length} seleccionados)
          </div>
          <div className="overflow-x-auto max-h-40 overflow-y-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="p-2">Fecha Deuda</th>
                  <th className="p-2">Descripción</th>
                  <th className="p-2 text-center">Cant</th>
                  <th className="p-2 text-center">Moneda</th>
                  <th className="p-2 text-right">Monto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {selectedItems.length > 0 ? (
                  selectedItems.map((item) => (
                    <tr key={item.id} className="bg-white">
                      <td className="p-2 text-slate-600">{item.fecha}</td>
                      <td className="p-2 font-sans font-medium text-slate-800 uppercase">{item.descripcion}</td>
                      <td className="p-2 text-center">{item.cantidad.toFixed(1)}</td>
                      <td className="p-2 text-center font-bold text-slate-700">{item.moneda}</td>
                      <td className="p-2 text-right font-bold text-blue-700">{item.monto.toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-slate-400 italic">
                      Marque las casillas en la tabla superior para cobrar ítems
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Section: Observations + Totales a Cobrar + Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Observations */}
          <div className="md:col-span-8 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">
              Observaciones del Recibo:
            </label>
            <textarea
              rows="2"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              placeholder="Notas adicionales o número de autorización..."
              className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Totales Box */}
          <div className="md:col-span-4 bg-slate-900 text-white p-4 rounded-xl border border-slate-800 shadow-md">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Totales a Cobrar
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700">
                <span className="text-[10px] text-slate-400 block">$us (Dólares)</span>
                <span className="font-mono text-base font-bold text-slate-300">{totalSus.toFixed(1)}</span>
              </div>
              <div className="bg-blue-900/60 p-2 rounded-lg border border-blue-600">
                <span className="text-[10px] text-blue-300 block">Bs (Bolivianos)</span>
                <span className="font-mono text-xl font-extrabold text-blue-300">{totalBs.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex flex-wrap justify-between items-center gap-3 pt-2">
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedDeudaIds([])}
              className="px-3.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-bold transition flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar</span>
            </button>
            <button
              onClick={() => alert('Función Cobranza Múltiple: Permite cobrar a un grupo de socios en lote.')}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-300 transition"
            >
              Cobranza Múltiple
            </button>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleCobrar}
              disabled={selectedItems.length === 0}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg text-xs font-extrabold shadow-sm transition ${
                selectedItems.length > 0 
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer' 
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>REGISTRAR COBRANZA Y EMITIR RECIBO</span>
            </button>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      <ReceiptModal
        receipt={currentReceipt}
        onClose={() => setCurrentReceipt(null)}
        printMode={printMode}
      />
    </div>
  );
}