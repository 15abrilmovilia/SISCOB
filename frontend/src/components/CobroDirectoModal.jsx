import React, { useState, useEffect } from 'react';
import { X, PlusCircle, DollarSign, Layers, CheckCircle2, UserCheck } from 'lucide-react';
import { createDeudaAPI } from '../utils/api';

export default function CobroDirectoModal({ 
  isOpen, 
  onClose, 
  socio, 
  conceptos = [], 
  onCobroDirectoAgregado 
}) {
  const [selectedConceptoId, setSelectedConceptoId] = useState('');
  const [monto, setMonto] = useState('0.00');
  const [periodo, setPeriodo] = useState('Septiembre 2026');
  const [descripcionPersonalizada, setDescripcionPersonalizada] = useState('');

  // Filtrar conceptos que aplican a cobro en ventanilla
  const conceptosDisponibles = conceptos.length > 0 ? conceptos : [
    { id: 'con-1', cajaId: 'c1', nombre: 'CUOTA FRECUENCIA MENSUAL SOCIOS', monto: 200 },
    { id: 'con-c1-don90', cajaId: 'c1', nombre: 'DONACION COLABORACION M 90', monto: 50 },
    { id: 'con-c1-col202', cajaId: 'c1', nombre: 'COLABORACION M 202', monto: 0 },
    { id: 'con-c1-logos', cajaId: 'c1', nombre: 'LOGOTIPOS', monto: 30 },
    { id: 'con-c1-num-peq', cajaId: 'c1', nombre: 'NUMEROS ADHESIVOS PEQUEÑOS', monto: 15 },
    { id: 'con-c1-num-gra', cajaId: 'c1', nombre: 'NUMEROS ADHESIVOS GRANDES', monto: 25 },
    { id: 'con-2', cajaId: 'c2', nombre: 'MULTA POR NO HACER TURNO', monto: 20 }
  ];

  useEffect(() => {
    if (isOpen && conceptosDisponibles.length > 0) {
      const primerConcepto = conceptosDisponibles[0];
      setSelectedConceptoId(primerConcepto.id);
      setMonto(String(primerConcepto.monto || '0.00'));
      setDescripcionPersonalizada(primerConcepto.nombre);
    }
  }, [isOpen]);

  if (!isOpen || !socio) return null;

  const handleConceptoChange = (cId) => {
    setSelectedConceptoId(cId);
    const conc = conceptosDisponibles.find(c => c.id === cId);
    if (conc) {
      setMonto(String(conc.monto || '0.00'));
      setDescripcionPersonalizada(conc.nombre);
    }
  };

  const handleAgregar = () => {
    const conc = conceptosDisponibles.find(c => c.id === selectedConceptoId);
    const montoNum = parseFloat(monto);

    if (isNaN(montoNum) || montoNum <= 0) {
      alert('Por favor ingrese un monto válido mayor a 0.');
      return;
    }

    const desc = descripcionPersonalizada.trim().toUpperCase() || conc?.nombre || 'COBRO DIRECTO';
    const fechaHoy = new Date().toISOString().split('T')[0];

    const nuevoItem = {
      id: `d-direct-${Date.now()}-${socio.id}`,
      socioId: socio.id,
      conceptoId: conc?.cajaId === 'c1' ? 1 : (conc?.cajaId === 'c5' ? 8 : 2),
      cajaId: conc?.cajaId || 'c1',
      descripcion: `${desc} - Móvil #${socio.id}`,
      periodo: periodo || 'Actual',
      monto: montoNum,
      pagado: false,
      fecha: fechaHoy,
      fechaVencimiento: fechaHoy,
      moneda: 'Bs',
      cantidad: 1
    };

    // Crear en API y enviar a la vista de cobro
    createDeudaAPI(nuevoItem).catch(() => {});
    onCobroDirectoAgregado(nuevoItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-fadeIn text-xs">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 to-red-800 text-white px-5 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2.5">
            <div className="bg-white/10 p-2 rounded-xl">
              <PlusCircle className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="font-black text-sm text-white">
                Cobro Directo / Agregar Concepto
              </h3>
              <p className="text-[11px] text-red-100 flex items-center space-x-1">
                <UserCheck className="w-3 h-3 inline" />
                <span>Móvil #{socio.id} - {socio.nombres} {socio.apPaterno}</span>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-red-200 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Concepto Selector */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Seleccionar Concepto del Catálogo *
            </label>
            <select
              value={selectedConceptoId}
              onChange={(e) => handleConceptoChange(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              {conceptosDisponibles.map(c => (
                <option key={c.id} value={c.id}>
                  {c.nombre} {c.monto > 0 ? `(Bs ${c.monto.toFixed(2)})` : '(Variable)'} [{c.cajaNombre || (c.cajaId === 'c1' ? 'Caja 1' : 'Caja ' + c.cajaId)}]
                </option>
              ))}
            </select>
          </div>

          {/* Nombre / Descripción en Recibo */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Detalle en el Recibo
            </label>
            <input
              type="text"
              value={descripcionPersonalizada}
              onChange={(e) => setDescripcionPersonalizada(e.target.value.toUpperCase())}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold uppercase text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Monto y Periodo */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Monto a Cobrar (Bs) *</label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                required
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono font-black text-sm text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Periodo / Glosa</label>
              <input
                type="text"
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-900 flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              Este ítem se agregará de inmediato a la lista de cobranza del <strong>Móvil #{socio.id}</strong> para emitir el recibo oficial y sumar a la caja correspondiente.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-200 rounded-xl"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleAgregar}
            className="px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white font-extrabold rounded-xl shadow-sm transition cursor-pointer"
          >
            Agregar al Recibo
          </button>
        </div>
      </div>
    </div>
  );
}
