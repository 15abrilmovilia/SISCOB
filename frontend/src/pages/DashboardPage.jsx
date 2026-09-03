import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  CreditCard, 
  AlertCircle, 
  ArrowUpRight, 
  ArrowDownRight, 
  UserPlus, 
  HandCoins, 
  Bell, 
  ChevronRight,
  ShieldAlert,
  Package,
  CheckCircle2
} from 'lucide-react';

export default function DashboardPage({ setActiveTab, onOpenNewSocioModal, cajas }) {
  const [timeframe, setTimeframe] = useState('semana');

  const weeklyData = [
    { day: 'L', label: 'Lun', val: 32, total: 'Bs 18,200' },
    { day: 'M', label: 'Mar', val: 58, total: 'Bs 34,500' },
    { day: 'M', label: 'Mié', val: 24, total: 'Bs 12,800' },
    { day: 'J', label: 'Jue', val: 72, total: 'Bs 42,100' },
    { day: 'V', label: 'Vie', val: 95, total: 'Bs 56,300' },
    { day: 'S', label: 'Sáb', val: 28, total: 'Bs 16,900' },
    { day: 'D', label: 'Dom', val: 12, total: 'Bs 7,400' },
  ];

  const recentTransactions = [
    { socio: 'María Castro', id: 'SOC-0521', concepto: 'Cuota Mensual Sostenimiento', fecha: 'Hoy, 09:41', monto: 'Bs 400.00', estado: 'PAGADO' },
    { socio: 'Juan Rodríguez', id: 'SOC-0349', concepto: 'Préstamo Express - Abono', fecha: 'Hoy, 09:15', monto: 'Bs 1,200.00', estado: 'PAGADO' },
    { socio: 'Ana López', id: 'SOC-0820', concepto: 'Multa Atraso Asamblea', fecha: 'Ayer, 16:30', monto: 'Bs 150.00', estado: 'PENDIENTE' },
    { socio: 'Pedro Torres', id: 'SOC-1102', concepto: 'Mantenimiento GPS Trimestral', fecha: 'Ayer, 14:05', monto: 'Bs 240.00', estado: 'PAGADO' },
    { socio: 'Remberto Torrico', id: 'SOC-0020', concepto: 'Aporte Publicidad y Radio', fecha: '01/09/2026', monto: 'Bs 66.00', estado: 'PAGADO' }
  ];

  const criticalAlerts = [
    { title: 'Corte de Caja Pendiente', desc: 'El corte de caja del turno tarde aún no fue cerrado por el cajero CAJ-02.', time: 'Hace 2 horas', type: 'warn' },
    { title: '5 Socios a Suspensión', desc: 'Socios con más de 2 meses de mora acumulada requieren notificación formal.', time: 'Hace 5 horas', type: 'danger' },
    { title: 'Stock Bajo: Formularios y Aceite', desc: 'Quedan menos de 2 unidades de Aceite Galón en almacén.', time: 'Ayer', type: 'info' }
  ];

  const totalRecaudacion = cajas.reduce((acc, c) => acc + c.ingresos, 0);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner / KPIs (Exact match to Stitch Dashboard) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Big Red Card: RECAUDACIÓN TOTAL MTD */}
        <div className="md:col-span-6 bg-gradient-to-br from-red-700 via-red-800 to-red-950 text-white p-5 rounded-2xl shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-red-200 block mb-1">
                Recaudación Total MTD (Mes Actual)
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight">
                Bs {(1245600 + totalRecaudacion).toLocaleString('es-BO', { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div className="bg-red-600/60 p-2.5 rounded-xl border border-red-400/30">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-red-600/40">
            <div className="flex justify-between text-xs font-semibold text-red-200 mb-1.5">
              <span>META MENSUAL: <strong>Bs 1,500,000.00</strong></span>
              <span>83% Alcanzado</span>
            </div>
            <div className="w-full bg-red-950/80 rounded-full h-2.5 overflow-hidden border border-red-500/30">
              <div className="bg-white h-full rounded-full transition-all duration-1000" style={{ width: '83%' }}></div>
            </div>
          </div>
        </div>

        {/* Small Card 1: Socios en Mora */}
        <div className="md:col-span-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-100">
              <AlertCircle className="w-5 h-5 text-rose-600" />
            </div>
            <span className="bg-rose-100 text-rose-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Crítico
            </span>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 font-mono">42</div>
            <span className="text-xs font-semibold text-slate-500 block">Socios en Mora</span>
            <div className="flex items-center space-x-1 text-[11px] text-rose-600 font-bold mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+12% vs mes anterior</span>
            </div>
          </div>
        </div>

        {/* Small Card 2: Pagos Procesados Hoy */}
        <div className="md:col-span-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
              <CreditCard className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Activo
            </span>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 font-mono">156</div>
            <span className="text-xs font-semibold text-slate-500 block">Pagos Procesados Hoy</span>
            <div className="flex items-center space-x-1 text-[11px] text-emerald-600 font-bold mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+Bs 45,230.00 recaudados</span>
            </div>
          </div>
        </div>
      </div>

      {/* Center Grid: Gráfico de Ingresos + Accesos Rápidos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 cols: Flujo de Ingresos */}
        <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm tracking-wide uppercase">
                Flujo de Ingresos por Cobranza
              </h3>
              <p className="text-xs text-slate-500">Recaudación diaria de cuotas de frecuencia, seguros y multas</p>
            </div>
            <div className="bg-slate-100 p-1 rounded-xl flex space-x-1 text-xs font-bold">
              <button
                onClick={() => setTimeframe('semana')}
                className={`px-3 py-1 rounded-lg transition ${
                  timeframe === 'semana' ? 'bg-red-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Semana
              </button>
              <button
                onClick={() => setTimeframe('mes')}
                className={`px-3 py-1 rounded-lg transition ${
                  timeframe === 'mes' ? 'bg-red-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Mes
              </button>
            </div>
          </div>

          {/* Bar Chart Simulation */}
          <div className="h-64 flex items-end justify-between gap-3 pt-6 px-2">
            {weeklyData.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <div className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-red-700 transition">
                  {item.total}
                </div>
                <div className="w-full bg-slate-100 rounded-t-lg h-44 flex items-end overflow-hidden">
                  <div 
                    className="w-full bg-red-700 group-hover:bg-red-600 transition-all rounded-t-lg"
                    style={{ height: `${item.val}%` }}
                  ></div>
                </div>
                <span className="text-xs font-bold text-slate-700">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right 4 cols: Acciones Rápidas (Stitch Style) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {/* Big Red Button: COBRO RÁPIDO */}
            <button
              onClick={() => setActiveTab('cobranzas')}
              className="bg-red-700 hover:bg-red-800 text-white p-5 rounded-2xl shadow-sm flex flex-col items-center justify-center space-y-2 text-center transition group active:scale-95 cursor-pointer"
            >
              <div className="p-3 bg-red-800/80 rounded-xl group-hover:scale-110 transition">
                <HandCoins className="w-7 h-7 text-white" />
              </div>
              <span className="font-extrabold text-sm uppercase tracking-wider block">COBRO RÁPIDO</span>
              <span className="text-[11px] text-red-200">Emitir Recibo</span>
            </button>

            {/* Button: NUEVO SOCIO */}
            <button
              onClick={() => onOpenNewSocioModal()}
              className="bg-white hover:bg-slate-50 text-slate-800 p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center justify-center space-y-2 text-center transition group active:scale-95 cursor-pointer"
            >
              <div className="p-3 bg-blue-50 text-blue-700 rounded-xl group-hover:scale-110 transition">
                <UserPlus className="w-7 h-7" />
              </div>
              <span className="font-extrabold text-sm uppercase tracking-wider block">NUEVO SOCIO</span>
              <span className="text-[11px] text-slate-500">Alta de Afiliado</span>
            </button>
          </div>

          {/* Alertas Críticas (Stitch Card) */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800 uppercase">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                <span>Alertas Críticas</span>
              </div>
              <span className="bg-red-100 text-red-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                3 Nuevas
              </span>
            </div>

            <div className="space-y-2.5">
              {criticalAlerts.map((alert, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <strong className="font-bold text-slate-900">{alert.title}</strong>
                    <span className="text-[10px] text-slate-400">{alert.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-tight">{alert.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Table: Transacciones Recientes */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wide">
              Transacciones y Cobranzas Recientes
            </h3>
            <p className="text-xs text-slate-500">Últimos cobros registrados por los cajeros de ventanilla</p>
          </div>
          <button 
            onClick={() => setActiveTab('cobranzas')}
            className="text-xs font-bold text-red-700 hover:text-red-800 flex items-center space-x-1 cursor-pointer"
          >
            <span>Ver Toda la Caja</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100">
              <tr>
                <th className="p-3">Socio / Afiliado</th>
                <th className="p-3">Concepto Cobrado</th>
                <th className="p-3">Fecha y Hora</th>
                <th className="p-3 text-right">Monto</th>
                <th className="p-3 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {recentTransactions.map((tx, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition">
                  <td className="p-3">
                    <div className="font-bold text-slate-900">{tx.socio}</div>
                    <div className="text-[10px] font-mono text-slate-400">{tx.id}</div>
                  </td>
                  <td className="p-3 text-slate-700 font-medium">{tx.concepto}</td>
                  <td className="p-3 font-mono text-slate-500">{tx.fecha}</td>
                  <td className="p-3 font-mono font-bold text-right text-slate-900">{tx.monto}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      tx.estado === 'PAGADO' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {tx.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}