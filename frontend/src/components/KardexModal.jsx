import React from 'react';
import { User, FileText, Printer, CheckCircle2, AlertTriangle, Calendar, Phone, ShieldCheck, X } from 'lucide-react';

export default function KardexModal({ isOpen, onClose, socio, deudas }) {
  if (!isOpen || !socio) return null;

  const socioDeudas = deudas.filter(d => d.socioId === socio.id);
  const pendientes = socioDeudas.filter(d => !d.pagado);
  const pagadas = socioDeudas.filter(d => d.pagado);
  const totalPendiente = pendientes.reduce((acc, d) => acc + d.monto, 0);
  const totalHistoricoPagado = pagadas.reduce((acc, d) => acc + d.monto, 0);

  const esSolvente = totalPendiente === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 text-xs text-slate-800 animate-fadeIn">
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex justify-between items-center no-print">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-red-400" />
            <span className="font-bold text-sm">Kardex Individual y Extracto de Cuenta del Socio</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => window.print()}
              className="flex items-center space-x-1.5 bg-red-700 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir Extracto</span>
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-white p-1 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Extract Content */}
        <div id="printable-area" className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="text-center border-b pb-3 space-y-1">
            <h2 className="font-black text-lg text-slate-900 tracking-wider uppercase">
              RADIO MÓVIL 15 DE ABRIL
            </h2>
            <p className="text-xs font-bold text-red-700 uppercase">
              EXTRACTO ECONÓMICO INDIVIDUAL Y KARDEX DE SOCIO
            </p>
            <p className="text-[11px] text-slate-500 font-mono">
              Fecha de Emisión: {new Date().toLocaleDateString('es-BO')} • Sistema SISCOB
            </p>
          </div>

          {/* Socio Profile Banner */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Afiliado / Titular:</span>
              <div className="text-sm font-black text-slate-900">{socio.nombres} {socio.apPaterno} {socio.apMaterno}</div>
              <span className="text-xs font-mono text-slate-600">CI: {socio.ci}</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Móvil e Ingreso:</span>
              <div className="text-xs font-bold text-slate-800">MÓVIL INTERNO #{socio.id}</div>
              <span className="text-xs text-slate-600 block">Fecha Ingreso: {socio.fechaIngreso}</span>
              <span className="text-[11px] font-bold text-emerald-700">Categoría: {socio.categoria}</span>
            </div>

            <div className="space-y-1 text-right sm:border-l sm:pl-4 border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Certificación de Estado:</span>
              <div className="inline-flex">
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase flex items-center space-x-1 ${
                  esSolvente ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {esSolvente ? <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> : <AlertTriangle className="w-3.5 h-3.5 mr-1" />}
                  {esSolvente ? 'SOCIO SOLVENTE (AL DÍA)' : 'SOCIO EN MORA'}
                </span>
              </div>
              <div className="text-xs font-mono font-bold mt-1 text-slate-700">
                Deuda Total: <strong className={esSolvente ? 'text-emerald-700' : 'text-red-700'}>Bs {totalPendiente.toFixed(2)}</strong>
              </div>
            </div>
          </div>

          {/* Cuotas y Cargos Pendientes */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-slate-800 uppercase tracking-wide text-xs flex justify-between items-center">
              <span>Obligaciones y Deudas Pendientes de Pago</span>
              <span className="text-red-700 font-mono font-bold">Total: Bs {totalPendiente.toFixed(2)}</span>
            </h4>
            {pendientes.length === 0 ? (
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-800 text-center font-bold">
                El socio se encuentra completamente al día. No registra deudas pendientes.
              </div>
            ) : (
              <table className="w-full text-left font-mono border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b">
                  <tr>
                    <th className="p-2">Concepto</th>
                    <th className="p-2">Periodo</th>
                    <th className="p-2 text-right">Monto (Bs)</th>
                    <th className="p-2 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pendientes.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50">
                      <td className="p-2 font-sans font-bold text-slate-800">{d.descripcion}</td>
                      <td className="p-2 text-slate-600">{d.periodo}</td>
                      <td className="p-2 text-right font-bold text-red-700">Bs {d.monto.toFixed(2)}</td>
                      <td className="p-2 text-center">
                        <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded text-[10px] font-bold">
                          PENDIENTE
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Histórico de Aportes Pagados Recientemente */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-slate-800 uppercase tracking-wide text-xs flex justify-between items-center">
              <span>Historial de Pagos y Aportes Cancelados</span>
              <span className="text-emerald-700 font-mono font-bold">Aportado: Bs {totalHistoricoPagado.toFixed(2)}</span>
            </h4>
            <table className="w-full text-left font-mono border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b">
                <tr>
                  <th className="p-2">Concepto Cancelado</th>
                  <th className="p-2">Periodo</th>
                  <th className="p-2 text-right">Monto Cancelado</th>
                  <th className="p-2 text-center">Recibo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pagadas.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50">
                    <td className="p-2 font-sans text-slate-700">{d.descripcion}</td>
                    <td className="p-2 text-slate-600">{d.periodo}</td>
                    <td className="p-2 text-right text-emerald-700 font-bold">Bs {d.monto.toFixed(2)}</td>
                    <td className="p-2 text-center text-[10px] text-slate-400 font-bold">PAGADO</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Signatures Footer */}
          <div className="pt-10 grid grid-cols-2 gap-10 text-center text-[10px]">
            <div className="border-t border-slate-400 pt-1 font-bold uppercase text-slate-700">
              Firma y Sello de Tesorería<br/>
              Radio Móvil 15 de Abril
            </div>
            <div className="border-t border-slate-400 pt-1 font-bold uppercase text-slate-700">
              Firma del Afiliado<br/>
              {socio.nombres} {socio.apPaterno}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}