import React, { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  Download, 
  Trash2, 
  ShieldAlert, 
  CheckCircle2, 
  RefreshCw 
} from 'lucide-react';

export default function ReiniciarSistemaModal({ 
  isOpen, 
  onClose, 
  onConfirmReset, 
  onExportBackup 
}) {
  const [backupDownloaded, setBackupDownloaded] = useState(false);
  const [saldoCajaGeneral, setSaldoCajaGeneral] = useState('0.00');
  const [saldoCajaGPS, setSaldoCajaGPS] = useState('0.00');
  const [confirmWord, setConfirmWord] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleDownloadBackupFirst = () => {
    onExportBackup();
    setBackupDownloaded(true);
    setError('');
  };

  const handleProceed = (e) => {
    e.preventDefault();
    if (!backupDownloaded) {
      setError('Por seguridad, descargue la copia de respaldo antes de reiniciar.');
      return;
    }

    if (confirmWord.trim().toUpperCase() !== 'REINICIAR') {
      setError('Debe escribir exactamente la palabra "REINICIAR" para confirmar.');
      return;
    }

    const cGeneral = parseFloat(saldoCajaGeneral) || 0;
    const cGPS = parseFloat(saldoCajaGPS) || 0;

    onConfirmReset({
      saldoCajaGeneral: cGeneral,
      saldoCajaGPS: cGPS
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-rose-200 animate-in fade-in zoom-in-95 duration-150 my-auto">
        
        {/* Header con advertencia roja */}
        <div className="bg-gradient-to-r from-rose-800 via-red-700 to-red-800 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/10 rounded-2xl">
              <ShieldAlert className="w-6 h-6 text-rose-200" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-wide">PUESTA A CERO DEL SISTEMA</h3>
              <p className="text-xs text-rose-200">Apertura e inicio limpio de operaciones contables</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-rose-200 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido */}
        <form onSubmit={handleProceed} className="p-6 space-y-5 text-xs">
          
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start space-x-3 text-amber-900 leading-relaxed">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-black text-amber-950">¡Acción Definitiva de Reinicio!</strong>
              <span>
                Esta operación vaciará el padrón de socios, eliminará la cartera de préstamos, todas las deudas, multas, egresos y recibos anteriores, dejando el sistema en blanco para comenzar el registro real de este mes (Septiembre 2026).
              </span>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 font-bold flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Paso 1: Descarga de Respaldo */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-black text-slate-800">
                Paso 1: Respaldo de Seguridad Preventivo
              </span>
              {backupDownloaded && (
                <span className="inline-flex items-center text-emerald-700 font-black text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Descargado
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500">
              Guarda un archivo con todos los datos que existen actualmente para que nunca pierdas el historial.
            </p>
            <button
              type="button"
              onClick={handleDownloadBackupFirst}
              className={`w-full py-2.5 px-3 rounded-xl font-bold flex items-center justify-center space-x-2 transition cursor-pointer border ${
                backupDownloaded
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-xs'
              }`}
            >
              <Download className="w-4 h-4 text-blue-600" />
              <span>{backupDownloaded ? 'Respaldo Descargado (Volver a Descargar)' : 'Descargar Copia de Seguridad (.json)'}</span>
            </button>
          </div>

          {/* Paso 2: Saldos de Apertura de Cajas para este mes */}
          <div className="space-y-3">
            <span className="font-black text-slate-800 block">
              Paso 2: Saldos de Apertura en Efectivo (Mes Actual)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Saldo Inicial Caja General (Bs):
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={saldoCajaGeneral}
                  onChange={(e) => setSaldoCajaGeneral(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Saldo Inicial Caja GPS (Bs):
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={saldoCajaGPS}
                  onChange={(e) => setSaldoCajaGPS(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Paso 3: Confirmación por Palabra Clave */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Paso 3: Para confirmar, escriba <strong className="text-red-700">REINICIAR</strong>:
            </label>
            <input
              type="text"
              required
              value={confirmWord}
              onChange={(e) => { setConfirmWord(e.target.value); setError(''); }}
              placeholder="Escriba REINICIAR aquí"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-black text-center tracking-widest text-red-700 uppercase focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Botones de acción */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-bold hover:bg-slate-50 transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!backupDownloaded || confirmWord.trim().toUpperCase() !== 'REINICIAR'}
              className={`px-5 py-2.5 rounded-xl font-black tracking-wide shadow-md flex items-center space-x-2 transition ${
                backupDownloaded && confirmWord.trim().toUpperCase() === 'REINICIAR'
                  ? 'bg-red-700 hover:bg-red-800 text-white cursor-pointer shadow-red-700/20'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Trash2 className="w-4 h-4" />
              <span>BORRAR Y EMPEZAR DE CERO</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
