import React from 'react';
import { Printer, X, FileText } from 'lucide-react';
import { printIsolatedDocument } from '../utils/printHelper';

export default function VoucherModal({ voucher, onClose }) {
  if (!voucher) return null;

  const handlePrint = () => {
    const html = `
      <div style="max-width: 650px; margin: 0 auto; padding: 20px; border: 2px solid #0f172a; border-radius: 8px; font-family: 'Inter', sans-serif;">
        <div style="text-align: right; font-family: monospace; font-weight: bold; color: #64748b; font-size: 12px; margin-bottom: 4px;">
          Nro: #${voucher.nroBoleta || voucher.id}
        </div>
        <div style="text-align: center; border-bottom: 2px solid #b91c1c; padding-bottom: 8px; margin-bottom: 12px;">
          <h2 style="font-size: 16px; font-weight: 900; color: #0f172a; text-transform: uppercase;">RADIO MÓVIL 15 DE ABRIL S.R.L.</h2>
          <p style="font-size: 10px; color: #64748b; font-weight: bold; text-transform: uppercase;">COMPROBANTE OFICIAL DE EGRESO</p>
          <div style="display: inline-block; background: #991b1b; color: white; padding: 2px 10px; font-size: 11px; font-weight: bold; border-radius: 4px; margin-top: 4px;">
            RUBRO: ${voucher.grupo || voucher.categoria}
          </div>
        </div>

        <div style="font-size: 11px; line-height: 1.8; margin-bottom: 12px; background: #f8fafc; padding: 10px; border-radius: 6px;">
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">
            <span style="color: #64748b;">Pagado a (Beneficiario):</span>
            <strong style="text-transform: uppercase; color: #0f172a;">${voucher.pagadoA}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-top: 4px;">
            <span style="color: #64748b;">Fecha:</span>
            <strong style="font-family: monospace;">${voucher.fecha}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-top: 4px;">
            <span style="color: #64748b;">Documento de Respaldo:</span>
            <strong style="font-family: monospace;">${voucher.conDocumento || 'S/D'}</strong>
          </div>
        </div>

        <div style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px; margin-bottom: 14px; background: #ffffff;">
          <div style="font-size: 10px; font-weight: bold; text-transform: uppercase; color: #64748b; margin-bottom: 4px;">Concepto Detallado:</div>
          <p style="font-size: 12px; font-weight: 600; color: #0f172a;">${voucher.descripcion}</p>
          ${voucher.observaciones ? `<p style="font-size: 10px; color: #64748b; margin-top: 4px; font-style: italic;">Obs: ${voucher.observaciones}</p>` : ''}
        </div>

        <div style="border-top: 2px solid #0f172a; border-bottom: 2px solid #0f172a; padding: 8px 0; display: flex; justify-content: space-between; align-items: center; margin-bottom: 35px;">
          <span style="font-weight: 900; font-size: 13px;">TOTAL CANCELADO:</span>
          <span style="font-family: monospace; font-size: 18px; font-weight: 900; color: #b91c1c;">
            ${voucher.moneda || 'Bs'} ${parseFloat(voucher.monto).toFixed(2)}
          </span>
        </div>

        <div style="display: flex; justify-content: space-around; text-align: center; font-size: 11px; margin-top: 40px;">
          <div style="width: 40%; border-top: 1.5px solid #0f172a; padding-top: 6px;">
            <strong>Directiva / Tesorería</strong><br>
            <span style="font-size: 10px; color: #64748b;">Firma Responsable</span>
          </div>
          <div style="width: 40%; border-top: 1.5px solid #0f172a; padding-top: 6px;">
            <strong>${voucher.pagadoA}</strong><br>
            <span style="font-size: 10px; color: #64748b;">Firma Beneficiario</span>
          </div>
        </div>

        <div style="margin-top: 25px; padding-top: 6px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; font-size: 9px; color: #94a3b8; font-family: monospace;">
          <span>boleta_egreso - Documento Oficial SISCOB</span>
          <span>Responsable: ${voucher.usuario || 'Directiva'}</span>
        </div>
      </div>
    `;
    printIsolatedDocument(html, `Boleta_Egreso_${voucher.nroBoleta || voucher.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full overflow-hidden flex flex-col border border-slate-200">
        <div className="bg-slate-900 text-white px-5 py-3 flex justify-between items-center no-print">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm">Comprobante de Egreso (Boleta Oficial)</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area - Exact JasperViewer format from frame 124s */}
        <div className="p-6 bg-slate-50 flex justify-center">
          <div 
            id="printable-area" 
            className="bg-white p-8 border border-slate-300 rounded-sm shadow-sm w-full max-w-md text-slate-800 font-sans text-xs"
          >
            <div className="text-right text-xs font-mono font-bold text-slate-600 mb-2">
              Nro: {voucher.id}
            </div>

            <div className="text-center border-b-2 border-slate-800 pb-2 mb-4">
              <h2 className="font-extrabold text-sm uppercase tracking-wider text-slate-900">
                RADIO MÓVIL 15 DE ABRIL
              </h2>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">COMPROBANTE OFICIAL DE EGRESO</p>
              <p className="text-[11px] font-semibold text-rose-800 mt-1 uppercase">
                Rubro: {voucher.grupo}
              </p>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="font-semibold text-slate-600">Pagado a:</span>
                <span className="font-bold text-slate-900 uppercase">{voucher.pagadoA}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="font-semibold text-slate-600">Fecha:</span>
                <span className="font-mono">{voucher.fecha}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="font-semibold text-slate-600">Documento / Respaldo:</span>
                <span className="font-mono text-slate-700">{voucher.conDocumento}</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded p-3 mb-4">
              <div className="text-[11px] text-slate-500 uppercase font-semibold mb-1">Concepto Detallado:</div>
              <p className="text-slate-800 font-medium">{voucher.descripcion}</p>
              {voucher.observaciones && (
                <p className="text-slate-500 italic mt-1 text-[10px]">Obs: {voucher.observaciones}</p>
              )}
            </div>

            <div className="border-t border-b border-slate-800 py-2 flex justify-between items-center mb-12">
              <span className="font-bold text-sm">TOTAL CANCELADO:</span>
              <span className="font-mono font-extrabold text-base text-slate-900">
                {voucher.moneda} {voucher.monto.toFixed(2)}
              </span>
            </div>

            {/* Signature blocks */}
            <div className="grid grid-cols-2 gap-8 text-center pt-8">
              <div>
                <div className="border-t border-slate-400 pt-1 text-[10px] font-bold uppercase text-slate-700">
                  Responsable
                </div>
                <p className="text-[9px] text-slate-400">Directiva / Tesorería</p>
              </div>
              <div>
                <div className="border-t border-slate-400 pt-1 text-[10px] font-bold uppercase text-slate-700">
                  Interesado
                </div>
                <p className="text-[9px] text-slate-400">Firma Beneficiario</p>
              </div>
            </div>

            <div className="mt-8 text-[9px] text-slate-400 flex justify-between border-t border-slate-100 pt-2">
              <span>boleta_egreso - Pagina 1 de 1</span>
              <span>Usuario: {voucher.usuario}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}