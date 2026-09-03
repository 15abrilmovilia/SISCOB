import React from 'react';
import { Landmark, Printer, ArrowDownRight, ArrowUpRight } from 'lucide-react';

export default function BalancePage({ cajas }) {
  const totalIngresos = cajas.reduce((a, c) => a + c.ingresos, 0);
  const totalEgresos = cajas.reduce((a, c) => a + c.egresos, 0);
  const totalSaldoAnt = cajas.reduce((a, c) => a + c.saldoAnterior, 0);
  const totalSaldoActual = totalSaldoAnt + totalIngresos - totalEgresos;

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-4">
      {/* Header with print button */}
      <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-xs no-print">
        <div>
          <h1 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
            <Landmark className="w-5 h-5 text-blue-700" />
            <span>Balance General por Cajas / Ítems</span>
          </h1>
          <p className="text-xs text-slate-500">
            Periodo: Desde: 01-07-2026 hasta: 02-09-2026 | Moneda: Bolivianos (Bs)
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center space-x-1.5 bg-blue-700 hover:bg-blue-600 text-white px-3.5 py-2 rounded-lg text-xs font-bold shadow-xs transition"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimir Informe para Asamblea</span>
        </button>
      </div>

      {/* Printable Area - Exact Balance Format from frames 212s and 228s */}
      <div id="printable-area" className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
        <div className="text-center border-b-2 border-slate-800 pb-3">
          <h2 className="text-base font-extrabold uppercase tracking-wide text-slate-900">
            RADIO MÓVIL 15 DE ABRIL
          </h2>
          <p className="text-xs font-bold text-blue-800 uppercase">SISTEMA DE COBRANZA DE SOCIOS (SISCOB) - BALANCE GENERAL POR CAJAS</p>
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
            Desde: 01-07-2026 hasta: 02-09-2026 | Moneda: Bolivianos (Bs)
          </p>
        </div>

        {/* Cajas breakdown */}
        <div className="space-y-6">
          {cajas.map((caja) => {
            const saldoActualCaja = caja.saldoAnterior + caja.ingresos - caja.egresos;
            return (
              <div key={caja.id} className="border border-slate-300 rounded-lg overflow-hidden">
                <div className="bg-slate-800 text-white px-4 py-2 flex justify-between items-center text-xs font-bold">
                  <span className="uppercase">{caja.nombre}</span>
                  <span className="font-mono text-emerald-400">
                    Saldo Actual: Bs {saldoActualCaja.toFixed(2)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 text-xs">
                  {/* Ingresos column */}
                  <div className="p-3 bg-slate-50/50">
                    <div className="font-bold text-slate-700 uppercase mb-2 flex items-center space-x-1 text-[11px]">
                      <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Ingresos Registrados</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200 text-slate-600">
                      <span>Recaudación Cuotas y Aportes</span>
                      <span className="font-mono font-semibold">Bs {caja.ingresos.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 text-slate-900">
                      <span>Total Ingresos:</span>
                      <span className="font-mono text-emerald-700">Bs {caja.ingresos.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Egresos column */}
                  <div className="p-3 bg-slate-50/50">
                    <div className="font-bold text-slate-700 uppercase mb-2 flex items-center space-x-1 text-[11px]">
                      <ArrowDownRight className="w-3.5 h-3.5 text-rose-600" />
                      <span>Egresos y Gastos</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200 text-slate-600">
                      <span>Pagos con Comprobante Oficial</span>
                      <span className="font-mono font-semibold">Bs {caja.egresos.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 text-slate-900">
                      <span>Total Egresos:</span>
                      <span className="font-mono text-rose-700">Bs {caja.egresos.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Subtotal Box (Exact table from video frame 228s) */}
                <div className="bg-slate-100 border-t border-slate-300 p-2.5">
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="bg-white p-1.5 rounded border border-slate-200">
                      <span className="text-[10px] text-slate-500 uppercase block font-semibold">Ingreso</span>
                      <span className="font-mono font-bold text-emerald-700">{caja.ingresos.toFixed(2)}</span>
                    </div>
                    <div className="bg-white p-1.5 rounded border border-slate-200">
                      <span className="text-[10px] text-slate-500 uppercase block font-semibold">Egreso</span>
                      <span className="font-mono font-bold text-rose-700">{caja.egresos.toFixed(2)}</span>
                    </div>
                    <div className="bg-white p-1.5 rounded border border-slate-200">
                      <span className="text-[10px] text-slate-500 uppercase block font-semibold">Saldo Ant.</span>
                      <span className="font-mono font-bold text-slate-700">{caja.saldoAnterior.toFixed(2)}</span>
                    </div>
                    <div className="bg-blue-50 p-1.5 rounded border border-blue-300">
                      <span className="text-[10px] text-blue-700 uppercase block font-extrabold">Saldo Actual</span>
                      <span className="font-mono font-extrabold text-blue-900">{saldoActualCaja.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Consolidated Total Box */}
        <div className="bg-slate-900 text-white rounded-xl p-4 border border-slate-800 mt-6">
          <div className="text-center font-extrabold uppercase text-xs tracking-wider text-slate-300 mb-3">
            TOTAL BALANCE CONSOLIDADO DE TODAS LAS CAJAS
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase block">Total Ingresos</span>
              <span className="font-mono text-sm font-bold text-emerald-400">Bs {totalIngresos.toFixed(2)}</span>
            </div>
            <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase block">Total Egresos</span>
              <span className="font-mono text-sm font-bold text-rose-400">Bs {totalEgresos.toFixed(2)}</span>
            </div>
            <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase block">Saldo Anterior</span>
              <span className="font-mono text-sm font-bold text-slate-300">Bs {totalSaldoAnt.toFixed(2)}</span>
            </div>
            <div className="bg-blue-900 p-2.5 rounded-lg border border-blue-500 ring-2 ring-blue-400">
              <span className="text-[10px] text-blue-200 uppercase block font-extrabold">Saldo General Actual</span>
              <span className="font-mono text-base font-extrabold text-white">Bs {totalSaldoActual.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}