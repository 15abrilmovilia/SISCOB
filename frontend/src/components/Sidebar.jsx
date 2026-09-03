import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  HandCoins, 
  TrendingDown, 
  Landmark, 
  Package, 
  Settings, 
  Sliders, 
  FileSpreadsheet, 
  ChevronRight, 
  ShieldCheck, 
  FileText, 
  FileCheck,
  GitPullRequest,
  LogOut,
  X 
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
    { id: 'socios', label: 'SOCIOS', icon: Users },
    { id: 'cuotas', label: 'CUOTAS Y MULTAS', icon: Sliders },
    { id: 'cobranzas', label: 'CAJA RÁPIDA', icon: HandCoins },
    { id: 'egresos', label: 'EGRESOS', icon: TrendingDown },
    { id: 'prestamos', label: 'PRÉSTAMOS', icon: Landmark },
    { id: 'workflow', label: 'WORKFLOW CIERRE CAJA', icon: GitPullRequest },
    { id: 'balance', label: 'BALANCE POR CAJAS', icon: FileSpreadsheet },
    { id: 'almacen', label: 'ALMACÉN / KARDEX', icon: Package },
    { id: 'reportes', label: 'MATRIZ REPORTES', icon: FileSpreadsheet },
    { id: 'conciliacion', label: 'IMPORTAR / CONCILIACIÓN', icon: FileCheck },
    { id: 'auditoria', label: 'BITÁCORA AUDITORÍA', icon: ShieldCheck },
    { id: 'ficha', label: 'FICHA TÉCNICA / CLIENTE', icon: FileText },
    { id: 'config', label: 'CONFIGURACIÓN', icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 shadow-lg lg:shadow-none
        flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top Logo & Header */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
            <div className="flex items-center space-x-3">
              <div className="bg-red-700 text-white p-2.5 rounded-xl shadow-sm flex items-center justify-center">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-black text-slate-900 tracking-wider text-base leading-none">SISCOB</h2>
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block mt-0.5">
                  Radio Móvil 15 Abril
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav items list */}
          <nav className="p-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (window.innerWidth < 1024) setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-extrabold tracking-wide transition-all ${
                    isActive
                      ? 'bg-red-700 text-white shadow-sm shadow-red-700/20'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-white" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Footer */}
        <div className="p-3 border-t border-slate-100 bg-white">
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-2 truncate">
              <div className="bg-red-700 text-white p-1.5 rounded-lg text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <div className="text-xs font-extrabold text-slate-900 truncate">SISCOB 15A</div>
                <div className="text-[10px] text-slate-500 font-medium">En Línea</div>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="p-1 text-slate-400 hover:text-rose-700 transition"
              title="Cerrar Sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}