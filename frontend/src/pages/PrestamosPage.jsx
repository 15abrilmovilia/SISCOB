import React, { useState } from 'react';
import { Landmark, Calculator, Printer, CheckCircle2, AlertCircle, FileText, ArrowUpRight } from 'lucide-react';

export default function PrestamosPage() {
  const [monto, setMonto] = useState(15000);
  const [plazo, setPlazo] = useState(12);
  const [tasaAnual, setTasaAnual] = useState(12); // 12% anual = 1% mensual
  const [showPlanModal, setShowPlanModal] = useState(false);

  // Prestamos activos
  const [prestamos, setPrestamos] = useState([
    { folio: 'PR-2026-0891', socio: 'Carlos Mendoza', id: 'SOC-0012', original: 50000, saldo: 12500, cuota: 2486.21, vencimiento: '15/09/2026', estado: 'AL DÍA' },
    { folio: 'PR-2026-0942', socio: 'Ana Ramírez', id: 'SOC-0045', original: 15000, saldo: 8000, cuota: 1332.40, vencimiento: '10/09/2026', estado: 'ATRASO' },
    { folio: 'PR-2026-1005', socio: 'Jorge López', id: 'SOC-0105', original: 120000, saldo: 115000, cuota: 5600.00, vencimiento: '20/09/2026', estado: 'AL DÍA' },
    { folio: 'PR-2025-0450', socio: 'María Torres', id: 'SOC-0088', original: 30000, saldo: 0, cuota: 0, vencimiento: 'Cancelado', estado: 'PAGADO' }
  ]);

  // Loan calculation logic
  const tasaMensual = (tasaAnual / 100) / 12;
  const cuotaMensual = (monto * (tasaMensual * Math.pow(1 + tasaMensual, plazo))) / (Math.pow(1 + tasaMensual, plazo) - 1);
  const totalPagar = cuotaMensual * plazo;
  const totalInteres = totalPagar - monto;

  // Generate Amortization Table
  const planPagos = [];
  let saldoRestante = monto;
  for (let i = 1; i <= plazo; i++) {
    const interesCuota = saldoRestante * tasaMensual;
    const capitalCuota = cuotaMensual - interesCuota;
    saldoRestante -= capitalCuota;
    planPagos.push({
      nro: i,
      cuota: cuotaMensual,
      capital: capitalCuota,
      interes: interesCuota,
      saldo: Math.max(0, saldoRestante)
    });
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-xs no-print">
        <div>
          <h1 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
            <Landmark className="w-5 h-5 text-red-700" />
            <span>Módulo de Préstamos y Fondo de Créditos</span>
          </h1>
          <p className="text-xs text-slate-500">Gestión de cartera, calculadora financiera y emisión de planes de pago</p>
        </div>
        <button
          onClick={() => setShowPlanModal(true)}
          className="flex items-center space-x-1.5 bg-red-700 hover:bg-red-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs transition cursor-pointer"
        >
          <Calculator className="w-4 h-4" />
          <span>Ver Plan de Pagos Simulado</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 cols: Kardex de Préstamos Activos */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wide">
              Kardex de Préstamos Institucionales
            </h3>
            <span className="text-xs font-bold text-slate-500">4 de 156 préstamos</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100">
                <tr>
                  <th className="p-3">Folio / Socio</th>
                  <th className="p-3 text-right">Monto Original</th>
                  <th className="p-3 text-right">Saldo Restante</th>
                  <th className="p-3 text-right">Cuota Mensual</th>
                  <th className="p-3 text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {prestamos.map((p) => (
                  <tr key={p.folio} className="hover:bg-slate-50 transition">
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{p.socio}</div>
                      <div className="text-[10px] font-mono text-slate-400">{p.folio} • {p.id}</div>
                    </td>
                    <td className="p-3 font-mono font-bold text-right text-slate-800">Bs {p.original.toLocaleString()}</td>
                    <td className="p-3 font-mono font-bold text-right text-red-700">Bs {p.saldo.toLocaleString()}</td>
                    <td className="p-3 font-mono font-semibold text-right text-slate-700">Bs {p.cuota.toFixed(2)}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        p.estado === 'AL DÍA' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : p.estado === 'ATRASO' 
                          ? 'bg-rose-100 text-rose-800' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {p.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 4 cols: Calculadora / Simulador (Exact Stitch style) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-2">
            <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block">Calculadora Rápida</span>
            <h3 className="font-extrabold text-slate-900 text-sm">Simulador de Préstamos</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Monto Solicitado (Bs)</label>
              <input
                type="number"
                step="1000"
                value={monto}
                onChange={(e) => setMonto(parseFloat(e.target.value) || 0)}
                className="w-full p-2 border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Plazo (Meses)</label>
                <select
                  value={plazo}
                  onChange={(e) => setPlazo(parseInt(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded-xl font-bold"
                >
                  <option value={6}>6 Meses</option>
                  <option value={12}>12 Meses</option>
                  <option value={24}>24 Meses</option>
                  <option value={36}>36 Meses</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tasa Anual (%)</label>
                <input
                  type="number"
                  step="0.5"
                  value={tasaAnual}
                  onChange={(e) => setTasaAnual(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border border-slate-300 rounded-xl font-bold font-mono"
                />
              </div>
            </div>

            {/* Cuota Estimada Result Card */}
            <div className="bg-red-50 p-4 rounded-xl border border-red-200 space-y-1 text-center">
              <span className="text-[10px] font-bold text-red-800 uppercase block">Cuota Mensual Estimada</span>
              <div className="text-2xl font-black font-mono text-red-700">
                Bs {cuotaMensual ? cuotaMensual.toFixed(2) : '0.00'}
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-red-200/60 text-[11px]">
                <div>
                  <span className="text-slate-500 block">Total a Pagar:</span>
                  <strong className="font-mono text-slate-800">Bs {totalPagar.toFixed(2)}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Interés Total:</span>
                  <strong className="font-mono text-red-800">Bs {totalInteres.toFixed(2)}</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowPlanModal(true)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-extrabold text-xs transition cursor-pointer shadow-xs"
            >
              VER TABLA DE AMORTIZACIÓN
            </button>
          </div>
        </div>
      </div>

      {/* Printable Plan de Pagos Modal */}
      {showPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200">
            <div className="bg-slate-900 text-white px-5 py-3.5 flex justify-between items-center no-print">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-red-400" />
                <h3 className="font-bold text-sm">Plan de Pagos / Tabla de Amortización</h3>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center space-x-1.5 bg-red-700 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir Plan</span>
                </button>
                <button onClick={() => setShowPlanModal(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>
            </div>

            <div id="printable-area" className="p-6 text-xs space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="text-center border-b pb-2">
                <h2 className="font-extrabold text-base uppercase tracking-wider text-slate-900">
                  RADIO MÓVIL 15 DE ABRIL
                </h2>
                <p className="text-[11px] font-bold text-red-800 uppercase">
                  PLAN DE PAGOS DE PRÉSTAMO OFICIAL
                </p>
                <div className="flex justify-center space-x-4 text-slate-600 mt-1 font-mono text-[11px]">
                  <span>Capital: Bs {monto.toLocaleString()}</span>
                  <span>•</span>
                  <span>Plazo: {plazo} Meses</span>
                  <span>•</span>
                  <span>Tasa: {tasaAnual}% Anual</span>
                </div>
              </div>

              <table className="w-full text-left font-mono">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b">
                  <tr>
                    <th className="p-2 text-center">N° Cuota</th>
                    <th className="p-2 text-right">Cuota Fija</th>
                    <th className="p-2 text-right">Capital</th>
                    <th className="p-2 text-right">Interés</th>
                    <th className="p-2 text-right">Saldo Restante</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {planPagos.map((p) => (
                    <tr key={p.nro}>
                      <td className="p-2 text-center font-bold text-slate-800">{p.nro}</td>
                      <td className="p-2 text-right font-bold text-blue-700">{p.cuota.toFixed(2)}</td>
                      <td className="p-2 text-right text-emerald-700">{p.capital.toFixed(2)}</td>
                      <td className="p-2 text-right text-slate-600">{p.interes.toFixed(2)}</td>
                      <td className="p-2 text-right font-bold text-slate-900">{p.saldo.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pt-8 grid grid-cols-2 gap-8 text-center text-[10px]">
                <div className="border-t border-slate-400 pt-1 font-bold uppercase text-slate-700">
                  Responsable Préstamos
                </div>
                <div className="border-t border-slate-400 pt-1 font-bold uppercase text-slate-700">
                  Socio Solicitante
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}