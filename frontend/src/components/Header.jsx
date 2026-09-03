import React, { useRef } from 'react';
import { Menu, Calendar, Printer, Settings, Download, Upload, LogOut, UserCheck, RotateCcw } from 'lucide-react';

export default function Header({ 
  toggleSidebar, 
  printMode, 
  setPrintMode, 
  setActiveTab, 
  currentUser, 
  onLogout,
  onExportBackup,
  onImportBackup,
  onOpenArqueoModal,
  onOpenResetModal
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportBackup(file);
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs no-print">
      <div className="px-4 py-2 flex flex-wrap items-center justify-between gap-2">
        {/* Left: Hamburger button + Branding */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition cursor-pointer border border-slate-200"
            title="Abrir / Ocultar Menú Lateral"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2">
            <span className="font-black tracking-wider text-red-700 text-sm sm:text-base">
              SISCOB
            </span>
            <span className="text-slate-300">|</span>
            <span className="bg-red-50 text-red-800 text-xs font-extrabold px-2.5 py-0.5 rounded-full border border-red-200">
              RADIO MÓVIL 15 DE ABRIL
            </span>
          </div>
        </div>

        {/* Right Actions: Backup, Arqueo, Printer, User, Logout */}
        <div className="flex items-center space-x-2 text-xs">
          {/* Cierre / Arqueo button */}
          <button
            onClick={onOpenArqueoModal}
            className="hidden md:flex items-center space-x-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1.5 rounded-xl font-bold transition cursor-pointer"
            title="Cierre de Turno y Arqueo de Gaveta"
          >
            <span>Arqueo Diario</span>
          </button>

          {/* Backup Button */}
          <button
            onClick={onExportBackup}
            className="hidden sm:flex items-center space-x-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1.5 rounded-xl font-bold transition cursor-pointer"
            title="Exportar Respaldo (.json)"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>Respaldo</span>
          </button>

          {/* Restore File Input */}
          <input
            type="file"
            accept=".json"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="hidden sm:flex items-center space-x-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1.5 rounded-xl font-bold transition cursor-pointer"
            title="Restaurar Base de Datos (.json)"
          >
            <Upload className="w-3.5 h-3.5 text-emerald-600" />
            <span>Restaurar</span>
          </button>

          {/* Reset / Puesta a Cero button */}
          {onOpenResetModal && (
            <button
              onClick={onOpenResetModal}
              className="hidden lg:flex items-center space-x-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-2.5 py-1.5 rounded-xl font-bold transition cursor-pointer"
              title="Puesta a Cero e Inicio Limpio de Mes"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Puesta a Cero</span>
            </button>
          )}

          {/* Printer format switcher */}
          <div className="flex items-center space-x-1.5 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200">
            <Printer className="w-3.5 h-3.5 text-amber-600" />
            <select
              value={printMode}
              onChange={(e) => setPrintMode(e.target.value)}
              className="bg-transparent text-slate-700 font-bold focus:outline-none cursor-pointer"
            >
              <option value="termico">Ticket 80mm</option>
              <option value="carta">Hoja Carta</option>
            </select>
          </div>

          {/* User badge */}
          <div className="flex items-center space-x-1.5 bg-slate-100 px-2.5 py-1.5 rounded-xl border border-slate-200">
            <UserCheck className="w-3.5 h-3.5 text-red-700" />
            <span className="font-bold text-slate-800 truncate max-w-[90px] sm:max-w-[130px]">
              {currentUser?.nombre?.split(' ')[0] || 'Admin'}
            </span>
          </div>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="p-1.5 rounded-xl text-slate-500 hover:bg-rose-50 hover:text-rose-700 transition cursor-pointer"
            title="Cerrar Sesión"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}