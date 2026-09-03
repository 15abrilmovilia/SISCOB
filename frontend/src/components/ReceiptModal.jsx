import React from 'react';
import { Printer, CheckCircle, Share2, X, MessageSquare } from 'lucide-react';

export default function ReceiptModal({ isOpen, onClose, data, receipt, printMode = 'termico' }) {
  // Support both receipt and data prop names
  const receiptData = receipt || data;
  const isVisible = (isOpen !== undefined ? isOpen : true) && Boolean(receiptData);

  if (!isVisible || !receiptData) return null;

  const items = receiptData.items || receiptData.deudasCobrar || [];
  const total = receiptData.totalBs || receiptData.total || items.reduce((acc, d) => acc + (parseFloat(d.monto) || 0), 0);
  const socioNombre = receiptData.socioNombre || (receiptData.socio ? `${receiptData.socio.nombres} ${receiptData.socio.apPaterno} ${receiptData.socio.apMaterno || ''}`.trim() : 'Socio Afiliado');
  const socioId = receiptData.socioId || receiptData.socio?.id || '';
  const socioCI = receiptData.socioCI || receiptData.socio?.ci || '';
  const socioCelular = receiptData.socioCelular || receiptData.celular || receiptData.socio?.celular || '';
  const cajaNombre = receiptData.cajaNombre || receiptData.caja?.nombre || 'CAJA GENERAL (EFECTIVO)';
  const metodoPago = receiptData.metodoPago || 'Efectivo';
  const cajero = receiptData.cajero || receiptData.usuario || 'Cajero(a) Central';
  const fecha = receiptData.fecha || new Date().toLocaleString('es-BO');

  // WhatsApp Message Generator
  const generateWhatsAppUrl = () => {
    const celular = socioCelular.replace(/[^0-9]/g, '') || '59170000000';
    const conceptosTexto = items
      .map(d => `• ${d.descripcion}: Bs ${(parseFloat(d.monto) || 0).toFixed(2)}`)
      .join('%0A');

    const mensaje = 
      `🚕 *RADIO MÓVIL 15 DE ABRIL - SISCOB*%0A` +
      `*COMPROBANTE OFICIAL DE COBRANZA*%0A` +
      `--------------------------------%0A` +
      `*Recibo N°:* ${receiptData.nroRecibo}%0A` +
      `*Fecha:* ${fecha}%0A` +
      `*Socio:* ${socioNombre}%0A` +
      `*Móvil Interno:* #${socioId} | CI: ${socioCI}%0A` +
      `*Caja:* ${cajaNombre}%0A` +
      `--------------------------------%0A` +
      `*DETALLE DE PAGOS:*%0A` +
      `${conceptosTexto}%0A` +
      `--------------------------------%0A` +
      `*TOTAL CANCELADO:* Bs ${total.toFixed(2)}%0A` +
      `*Forma de Pago:* ${metodoPago}%0A` +
      `*Cajero(a):* ${cajero}%0A%0A` +
      `_Gracias por su puntual aporte a nuestra institución._`;

    return `https://wa.me/591${celular}?text=${mensaje}`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-fadeIn print:static print:inset-auto print:bg-white print:p-0 print:overflow-visible">
      <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 print:shadow-none print:border-none print:w-full ${
        printMode === 'carta' ? 'max-w-2xl w-full' : 'max-w-sm w-full'
      }`}>
        {/* Modal Top Bar (Hidden on print) */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex justify-between items-center no-print">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="font-extrabold text-xs tracking-wide uppercase block">Cobranza Registrada</span>
              <span className="text-[10px] text-slate-400">Recibo N° {receiptData.nroRecibo}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
              title="Enviar recibo por WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 bg-red-700 hover:bg-red-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
              title="Imprimir ticket o recibo"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>
            <button 
              onClick={onClose} 
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer text-base font-bold ml-1"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Printable Receipt Container */}
        <div id="printable-area" className="p-6 text-xs text-slate-800 space-y-3 font-mono print:p-2 print:m-0 print:w-full">
          {/* Header */}
          <div className="text-center space-y-0.5 border-b-2 border-slate-800 pb-2">
            <h2 className="font-black text-sm uppercase text-slate-900 tracking-wider">
              RADIO MÓVIL 15 DE ABRIL S.R.L.
            </h2>
            <p className="text-[10px] text-slate-600 font-bold uppercase">Sistema de Cobranza (SISCOB)</p>
            <p className="text-[10px] text-slate-500">Av. Las Américas esq. C. Sucre • Tarija, Bolivia</p>
            <div className="pt-1.5">
              <span className="font-black text-xs bg-slate-100 text-slate-900 px-3 py-1 rounded border border-slate-300 inline-block">
                RECIBO OFICIAL N° {receiptData.nroRecibo}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 pt-0.5 font-medium">{fecha}</p>
          </div>

          {/* Socio Details */}
          <div className="space-y-1 text-[11px] border-b border-slate-200 pb-2.5">
            <div><strong>Socio / Afiliado:</strong> <span className="uppercase">{socioNombre}</span></div>
            <div className="flex justify-between">
              <span><strong>Móvil Interno:</strong> #{socioId}</span>
              <span><strong>CI:</strong> {socioCI}</span>
            </div>
            <div className="flex justify-between">
              <span><strong>Caja:</strong> {cajaNombre}</span>
              <span><strong>Cajero:</strong> {cajero}</span>
            </div>
          </div>

          {/* Items / Detalle de Pagos */}
          <div>
            <div className="font-bold text-[10px] uppercase text-slate-600 mb-1 border-b border-slate-300 pb-1 flex justify-between">
              <span>Concepto Cobrado</span>
              <span className="text-right">Importe</span>
            </div>
            <div className="space-y-1 divide-y divide-slate-100">
              {items.map((d, index) => (
                <div key={d.id || index} className="flex justify-between items-start text-[11px] pt-1">
                  <span className="font-sans font-medium text-slate-900 pr-2">
                    {d.descripcion}
                    {d.periodo ? ` (${d.periodo})` : ''}
                  </span>
                  <span className="font-bold shrink-0 font-mono">
                    Bs {(parseFloat(d.monto) || 0).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="border-t-2 border-slate-800 pt-2 space-y-1">
            <div className="flex justify-between text-sm font-black text-slate-900">
              <span>TOTAL CANCELADO:</span>
              <span className="text-red-700 font-mono text-base">Bs {total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[10px] text-slate-600 pt-0.5">
              <span>Forma de Pago: <strong>{metodoPago}</strong></span>
              <span>Estado: <strong className="text-emerald-700">PAGADO</strong></span>
            </div>
          </div>

          {/* Footer & Barcode */}
          <div className="pt-3 text-center text-[9px] text-slate-500 space-y-1 border-t border-slate-200">
            <p className="font-bold">¡Gracias por su puntual aporte a la institución!</p>
            <p>Radio Móvil 15 de Abril • Siempre a su servicio</p>
            <div className="pt-1 font-mono text-[10px] text-slate-400 tracking-widest">
              ||| ||||| |||| |||||| ||||| ||||| |||
            </div>
          </div>
        </div>

        {/* Bottom Actions (Hidden on print) */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-between space-x-2 no-print">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            Cerrar Ventana
          </button>
          <button
            onClick={handlePrint}
            className="w-full py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer flex items-center justify-center space-x-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Recibo</span>
          </button>
        </div>
      </div>
    </div>
  );
}