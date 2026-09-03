import React from 'react';
import { 
  Users, 
  HandCoins, 
  TrendingDown, 
  Landmark, 
  Package, 
  Settings, 
  Printer, 
  ShieldCheck, 
  Calendar 
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, printMode, setPrintMode }) {
  const navItems = [
    { id: 'socios', label: 'Registro de Socios', icon: Users },
    { id: 'cobranzas', label: 'Caja Cobranzas', icon: HandCoins },
    { id: 'egresos', label: 'Registro Egresos', icon: TrendingDown },
    { id: 'balance', label: 'Balance por Cajas', icon: Landmark },
    { id: 'almacen', label: 'Almacén / Kardex', icon: Package },
    { id: 'config', label: 'Configuración', icon: Settings },
  ];

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 shadow-md no-print">
      {/* Top utility bar */}
      <div className="bg-slate-950 px-4 py-1.5 flex flex-wrap justify-between items-center text-xs border-b border-slate-800 text-slate-300">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold tracking-wider text-blue-400 uppercase text-base">
              SISCOB
            </span>
            <span className="text-slate-400 text-xs font-medium hidden sm:inline">
              | Sistema Cobranza de Socios
            </span>
          </div>
          <span className="bg-blue-900/80 text-blue-200 font-bold px-2.5 py-0.5 rounded border border-blue-600">
            RADIO MÓVIL 15 DE ABRIL
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Usuario: <strong className="text-white">admin33</strong></span>
            <span className="bg-emerald-950 text-emerald-300 px-1.5 py-0.2 rounded text-[10px] border border-emerald-700">SUPER</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>02-09-2026</span>
          </div>
          <div className="flex items-center space-x-1 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            <Printer className="w-3 h-3 text-amber-400" />
            <span className="text-slate-400">Impresión:</span>
            <select 
              value={printMode} 
              onChange={(e) => setPrintMode(e.target.value)}
              className="bg-transparent text-amber-300 font-medium focus:outline-none cursor-pointer"
            >
              <option value="termico" className="bg-slate-900 text-white">Ticket Térmico (80mm)</option>
              <option value="carta" className="bg-slate-900 text-white">Hoja Carta / PDF</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main navigation tabs */}
      <div className="px-4 py-2 flex items-center justify-between overflow-x-auto">
        <nav className="flex space-x-1 sm:space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}