import React from 'react';
import { Landmark, Printer, QrCode, ShieldCheck, Car, Phone, Calendar, X } from 'lucide-react';

export default function CredencialModal({ isOpen, onClose, socio }) {
  if (!isOpen || !socio) return null;

  const qrData = encodeURIComponent(`SISCOB_SOCIO_${socio.id}_${socio.ci}`);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrData}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 text-xs text-slate-800 animate-fadeIn">
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex justify-between items-center no-print">
          <div className="flex items-center space-x-2">
            <QrCode className="w-4 h-4 text-red-400" />
            <span className="font-bold text-sm">Credencial Institucional del Afiliado</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => window.print()}
              className="flex items-center space-x-1.5 bg-red-700 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir Carnet</span>
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-white p-1 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Badge Area */}
        <div id="printable-area" className="p-6 space-y-6 flex flex-col items-center">
          {/* Anverso (Front Side) */}
          <div className="w-[330px] h-[200px] bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 text-white rounded-2xl p-4 shadow-lg border-2 border-red-600/40 relative overflow-hidden flex flex-col justify-between">
            {/* Top Bar */}
            <div className="flex justify-between items-center border-b border-red-500/40 pb-2">
              <div className="flex items-center space-x-2">
                <div className="bg-red-700 text-white p-1 rounded-lg">
                  <Landmark className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-xs leading-none tracking-wider text-white">RADIO MÓVIL 15 DE ABRIL</h3>
                  <span className="text-[8px] text-red-200 font-bold uppercase tracking-widest">Tarija • Bolivia</span>
                </div>
              </div>
              <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                {socio.categoria}
              </span>
            </div>

            {/* Center Info */}
            <div className="flex items-center space-x-3 my-1">
              <div className="w-16 h-16 rounded-xl bg-slate-100 text-slate-800 flex flex-col items-center justify-center font-black text-lg border border-slate-300 shadow-inner shrink-0">
                <Car className="w-5 h-5 text-red-700 mb-0.5" />
                <span>#{socio.id}</span>
              </div>
              <div className="truncate space-y-0.5">
                <span className="text-[9px] text-slate-400 font-bold uppercase block">Afiliado Titular</span>
                <div className="font-extrabold text-sm text-white truncate">
                  {socio.nombres} {socio.apPaterno}
                </div>
                <div className="text-[10px] font-mono text-red-200">CI: {socio.ci}</div>
                <div className="text-[9px] text-slate-300">Ingreso: {socio.fechaIngreso}</div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="flex justify-between items-center text-[8px] text-slate-400 border-t border-slate-700 pt-1.5 font-mono">
              <span>ESTADO: <strong>VIGENTE</strong></span>
              <span>SISCOB CREDENTIAL ID: 15A-{socio.id}</span>
            </div>
          </div>

          {/* Reverso (Back Side with QR) */}
          <div className="w-[330px] h-[200px] bg-white text-slate-800 rounded-2xl p-4 shadow-lg border-2 border-slate-300 flex justify-between items-center space-x-3">
            <div className="flex-1 space-y-2 text-[9px] leading-tight">
              <div className="font-bold uppercase text-red-700 border-b pb-1">
                Reglamento Interno
              </div>
              <p className="text-slate-600">
                Esta credencial es de uso personal e intransferible. Acredita al titular como socio activo con derecho a radiofrecuencia y beneficios sindicales.
              </p>
              <div className="pt-2 text-center border-t border-slate-200">
                <span className="text-[8px] font-bold text-slate-500 block uppercase">Firma del Directorio</span>
                <span className="font-mono text-[8px] text-slate-400">Radio Móvil 15 de Abril</span>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center space-y-1">
              <img
                src={qrUrl}
                alt="QR Socio"
                className="w-24 h-24 rounded-lg border border-slate-300 p-1 bg-white"
              />
              <span className="text-[8px] font-mono font-bold text-slate-500">ESCANEAR PARA COBRO</span>
            </div>
          </div>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-slate-500 text-[11px] no-print">
          Formato estándar para termolaminar o imprimir en PVC (85mm x 54mm)
        </div>
      </div>
    </div>
  );
}