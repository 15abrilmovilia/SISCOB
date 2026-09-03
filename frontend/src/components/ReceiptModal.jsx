import React from 'react';
import { Printer, CheckCircle, Share2, X } from 'lucide-react';

export default function ReceiptModal({ isOpen, onClose, data }) {
  if (!isOpen || !data) return null;

  const total = data.deudasCobrar.reduce((acc, d) => acc + d.monto, 0);

  // WhatsApp Message Generator
  const generateWhatsAppUrl = () => {
    const celular = data.socio.celular?.replace(/[^0-9]/g, '') || '59170000000';
    const conceptosTexto = data.deudasCobrar
      .map(d => `• ${d.descripcion}: Bs ${d.monto.toFixed(2)}`)
      .join('%0A');

    const mensaje = 
      `🚕 *RADIO MÓVIL 15 DE ABRIL - SISCOB*%0A` +
      `*COMPROBANTE OFICIAL DE COBRANZA*%0A` +
      `--------------------------------%0A` +
      `*Recibo N°:* ${data.nroRecibo}%0A` +
      `*Fecha:* ${data.fecha}%0A` +
      `*Socio:* ${data.socio.nombres} ${data.socio.apPaterno}%0A` +
      `*Móvil Interno:* #${data.socio.id}%0A` +
      `*Caja:* ${data.caja.nombre}%0A` +
      `--------------------------------%0A` +
      `*DETALLE DE PAGOS:*%0A` +
      `${conceptosTexto}%0A` +
      `--------------------------------%0A` +
      `*TOTAL CANCELADO:* Bs ${total.toFixed(2)}%0A` +
      `*Forma de Pago:* ${data.metodoPago}%0A` +
      `*Cajero(a):* ${data.usuario}%0A%0A` +
      `_Gracias por su puntual aporte a nuestra institución._`;

    return `https://wa.me/591${celular}?text=${mensaje}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border border-slate-200 animate-fadeIn">
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white px-4 py-3 flex justify-between items-center no-print">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-xs">Pago Procesado con Éxito</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Ticket Receipt (Identical to 80mm Thermal Layout) */}
        <div id="printable-area" className="p-6 text-xs text-slate-800 space-y-3 font-mono">
          <div className="text-center space-y-0.5 border-b pb-2">
            <h2 className="font-black text-sm uppercase text-slate-900">RADIO MÓVIL 15 DE ABRIL</h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase">Sistema de Cobranza (SISCOB)</p>
            <p className="text-[10px] text-slate-500">Tarija - Bolivia</p>
            <div className="pt-1">
              <span className="font-bold text-xs">RECIBO N° {data.nroRecibo}</span>
            </div>
            <p className="text-[10px] text-slate-400">{data.fecha}</p>
          </div>

          <div className="space-y-1 text-[11px] border-b pb-2">
            <div><strong>Socio:</strong> {data.socio.nombres} {data.socio.apPaterno}</div>
            <div><strong>Móvil Interno:</strong> #{data.socio.id} | CI: {data.socio.ci}</div>
            <div><strong>Caja Destino:</strong> {data.caja.nombre}</div>
            <div><strong>Cajero(a):</strong> {data.usuario}</div>
          </div>

          <div>
            <div className="font-bold text-[10px] uppercase text-slate-500 mb-1 border-b pb-0.5 flex justify-between">
              <span>Concepto Cobrado</span>
              <span>Monto</span>
            </div>
            <div className="space-y-1">
              {data.deudasCobrar.map((d) => (
                <div key={d.id} className="flex justify-between items-start text-[11px]">
                  <span className="truncate pr-2 font-sans font-medium">{d.descripcion}</span>
                  <span className="font-bold shrink-0">Bs {d.monto.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-dashed pt-2 space-y-1">
            <div className="flex justify-between text-sm font-black">
              <span>TOTAL CANCELADO:</span>
              <span className="text-red-700">Bs {total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Forma de Pago:</span>
              <span className="font-bold">{data.metodoPago}</span>
            </div>
          </div>

          <div className="pt-4 text-center text-[9px] text-slate-400 space-y-0.5 border-t">
            <p>Gracias por su puntual aporte.</p>
            <p>Directiva Radio Móvil 15 de Abril</p>
          </div>
        </div>

        {/* Modal Buttons: Print & WhatsApp */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex space-x-2 no-print">
          <a
            href={generateWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center space-x-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl text-xs font-bold transition shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={() => window.print()}
            className="flex-1 flex items-center justify-center space-x-1 bg-red-700 hover:bg-red-800 text-white py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir Ticket</span>
          </button>
        </div>
      </div>
    </div>
  );
}