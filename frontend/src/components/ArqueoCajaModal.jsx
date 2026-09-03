import React, { useState } from 'react';
import { Landmark, Printer, CheckCircle2, DollarSign, Clock, ShieldCheck, X, FileCheck } from 'lucide-react';

export default function ArqueoCajaModal({ isOpen, onClose, cajas, currentUser }) {
  if (!isOpen) return null;

  const [efectivoFisico, setEfectivoFisico] = useState('');
  const [observaciones, setObservaciones] = useState('');

  const saldoInicial = cajas.reduce((acc, c) => acc + (parseFloat(c.saldoAnterior) || 0), 0);
  const totalIngresos = cajas.reduce((acc, c) => acc + (parseFloat(c.ingresos) || 0), 0);
  const totalEgresos = cajas.reduce((acc, c) => acc + (parseFloat(c.egresos) || 0), 0);
  const saldoTeorico = saldoInicial + totalIngresos - totalEgresos;

  const fisico = parseFloat(efectivoFisico) || 0;
  const diferencia = fisico ? (fisico - saldoTeorico) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 text-xs text-slate-800 animate-fadeIn">
        <div className="bg-slate-900 text-white px-5 py-3.5 flex justify-between items-center no-print">
          <div className="flex items-center space-x-2">
            <Landmark className="w-4 h-4 text-red-400" />
            <span className="font-bold text-sm">Cierre de Turno y Arqueo Consolidado (5 Cajas)</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => window.print()}
              className="flex items-center space-x-1 bg-red-700 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir Corte</span>
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-white p-1 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Ticket / Voucher 80mm */}
        <div id="printable-area" className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="text-center border-b pb-2 space-y-0.5">
            <h2 className="font-black text-sm uppercase tracking-wider text-slate-900">
              RADIO MÓVIL 15 DE ABRIL
            </h2>
            <p className="text-[11px] font-bold text-red-700 uppercase">
              COMPROBANTE DE CORTE Y ARQUEO GENERAL
            </p>
            <p className="text-[10px] font-mono text-slate-500">
              Fecha: {new Date().toLocaleDateString('es-BO')} • Hora: {new Date().toLocaleTimeString('es-BO')}
            </p>
            <p className="text-[10px] font-mono font-bold text-slate-700">
              Responsable: {currentUser?.nombre || 'Administrador Central'}
            </p>
          </div>

          {/* Desglose de las 5 Cajas */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-[11px] space-y-1.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pb-1 border-b border-slate-200">
              Desglose por Caja Oficial (5 Cajas):
            </div>
            {cajas.map(c => {
              const saldoCaja = c.saldoActual !== undefined ? c.saldoActual : ((c.saldoAnterior || 0) + (c.ingresos || 0) - (c.egresos || 0));
              return (
                <div key={c.id} className="flex justify-between items-center text-slate-700">
                  <span className="truncate pr-2 font-bold">{c.nombre}:</span>
                  <span className="font-black text-slate-900 shrink-0">Bs {saldoCaja.toFixed(2)}</span>
                </div>
              );
            })}
          </div>

          <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200 font-mono">
            <div className="flex justify-between">
              <span>Saldo Apertura Total:</span>
              <strong className="text-slate-800">Bs {saldoInicial.toFixed(2)}</strong>
            </div>
            <div className="flex justify-between text-emerald-700 font-bold">
              <span>(+) Total Cobros Efectivo:</span>
              <span>Bs {totalIngresos.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-rose-700 font-bold">
              <span>(-) Total Egresos Realizados:</span>
              <span>Bs {totalEgresos.toFixed(2)}</span>
            </div>
            <div className="border-t border-slate-300 pt-1 flex justify-between text-slate-900 font-black text-sm">
              <span>(=) SALDO TOTAL TEÓRICO:</span>
              <span>Bs {saldoTeorico.toFixed(2)}</span>
            </div>
          </div>

          {/* Form input in Modal (Hidden on Print) */}
          <div className="space-y-2 no-print">
            <label className="block font-bold text-slate-700">Efectivo Físico Contado en Gaveta (Bs):</label>
            <input
              type="number"
              step="0.5"
              placeholder="Ej: 8530.00"
              value={efectivoFisico}
              onChange={(e) => setEfectivoFisico(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-xl font-mono font-bold text-slate-900 text-sm"
            />

            {efectivoFisico && (
              <div className={`p-2.5 rounded-xl font-mono text-xs font-bold flex justify-between ${
                diferencia === 0 
                  ? 'bg-emerald-100 text-emerald-900' 
                  : diferencia > 0 
                  ? 'bg-blue-100 text-blue-900' 
                  : 'bg-rose-100 text-rose-900'
              }`}>
                <span>{diferencia === 0 ? 'CAJA CUADRADA EXACTA' : diferencia > 0 ? 'SOBRANTE EN CAJA:' : 'FALTANTE EN CAJA:'}</span>
                <span>Bs {Math.abs(diferencia).toFixed(2)}</span>
              </div>
            )}

            <div>
              <label className="block font-bold text-slate-700 mb-1">Observaciones del Turno:</label>
              <textarea
                rows="2"
                placeholder="Novedades, billetes deteriorados, cortes provisionales..."
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-xl text-xs"
              />
            </div>
          </div>

          {/* Signatures */}
          <div className="pt-8 grid grid-cols-2 gap-6 text-center text-[10px]">
            <div className="border-t border-slate-400 pt-1 font-bold uppercase text-slate-700">
              Cajero(a) Entregante<br/>
              {currentUser?.nombre || 'Daniela'}
            </div>
            <div className="border-t border-slate-400 pt-1 font-bold uppercase text-slate-700">
              Tesorero(a) Receptor<br/>
              Directiva 15 de Abril
            </div>
          </div>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end space-x-2 no-print">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition"
          >
            Cerrar
          </button>
          <button
            onClick={() => {
              alert('Cierre de turno registrado y guardado exitosamente.');
              onClose();
            }}
            className="px-4 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-xl font-bold transition"
          >
            Confirmar Cierre de Caja
          </button>
        </div>
      </div>
    </div>
  );
}