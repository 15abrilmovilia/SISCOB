import React, { useState, useMemo } from 'react';
import { 
  Landmark, 
  Printer, 
  ArrowDownRight, 
  ArrowUpRight, 
  Download, 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  PieChart, 
  Calendar,
  Filter,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { printIsolatedDocument, downloadCSV, downloadXLSX } from '../utils/printHelper';

export default function BalancePage({ cajas = [], egresos = [], socios = [], currentUser }) {
  // Period filter states (default: first day of current month to today)
  const todayStr = new Date().toISOString().split('T')[0];
  const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
  
  const [fechaDesde, setFechaDesde] = useState(firstDayOfMonth);
  const [fechaHasta, setFechaHasta] = useState(todayStr);
  const [cajaFilter, setCajaFilter] = useState('TODAS');

  // Consolidated Financial Totals
  const totalIngresos = cajas.reduce((a, c) => a + (parseFloat(c.ingresos) || 0), 0);
  const totalEgresos = cajas.reduce((a, c) => a + (parseFloat(c.egresos) || 0), 0);
  const totalSaldoAnt = cajas.reduce((a, c) => a + (parseFloat(c.saldoAnterior) || 0), 0);
  const totalSaldoActual = cajas.reduce((a, c) => {
    const saldo = c.saldoActual !== undefined 
      ? parseFloat(c.saldoActual) 
      : (parseFloat(c.saldoAnterior || 0) + parseFloat(c.ingresos || 0) - parseFloat(c.egresos || 0));
    return a + saldo;
  }, 0);

  const resultadoNeto = totalIngresos - totalEgresos;

  // Filtered Cajas
  const filteredCajas = useMemo(() => {
    if (cajaFilter === 'TODAS') return cajas;
    return cajas.filter(c => c.id === cajaFilter);
  }, [cajas, cajaFilter]);

  // 1. Export to Excel (.xlsx) / CSV (.csv)
  const handleExportExcel = (formato = 'xlsx') => {
    const headers = [
      'Código Caja', 'Nombre de Caja', 'Saldo Anterior (Bs)', 'Ingresos Registrados (Bs)', 
      'Egresos / Gastos (Bs)', 'Saldo Actual Disponible (Bs)', '% Distribución del Patrimonio', 'Estado'
    ];

    const rows = cajas.map(c => {
      const saldo = c.saldoActual !== undefined 
        ? parseFloat(c.saldoActual) 
        : (parseFloat(c.saldoAnterior || 0) + parseFloat(c.ingresos || 0) - parseFloat(c.egresos || 0));
      const pct = totalSaldoActual > 0 ? ((saldo / totalSaldoActual) * 100).toFixed(1) + '%' : '0.0%';
      return [
        c.id,
        c.nombre,
        Number((parseFloat(c.saldoAnterior) || 0).toFixed(2)),
        Number((parseFloat(c.ingresos) || 0).toFixed(2)),
        Number((parseFloat(c.egresos) || 0).toFixed(2)),
        Number(saldo.toFixed(2)),
        pct,
        'Activa'
      ];
    });

    // Totals Row
    rows.push([
      'CONSOLIDADOS',
      'TOTAL GENERAL TODAS LAS CAJAS',
      Number(totalSaldoAnt.toFixed(2)),
      Number(totalIngresos.toFixed(2)),
      Number(totalEgresos.toFixed(2)),
      Number(totalSaldoActual.toFixed(2)),
      '100.0%',
      'Cerrado y Conciliado'
    ]);

    const filename = `Balance_General_Cajas_${fechaDesde}_al_${fechaHasta}`;
    if (formato === 'csv') {
      downloadCSV(filename, headers, rows);
    } else {
      downloadXLSX(filename, headers, rows, 'Balance_Cajas');
    }
  };

  // 2. Isolated Executive Print for General Assembly / Board
  const handlePrintAssemblyReport = () => {
    const tableRowsHTML = cajas.map((c, index) => {
      const saldo = c.saldoActual !== undefined 
        ? parseFloat(c.saldoActual) 
        : (parseFloat(c.saldoAnterior || 0) + parseFloat(c.ingresos || 0) - parseFloat(c.egresos || 0));
      const pct = totalSaldoActual > 0 ? ((saldo / totalSaldoActual) * 100).toFixed(1) : '0.0';
      return `
        <tr style="border-bottom: 1px solid #cbd5e1; font-family: 'JetBrains Mono', monospace; font-size: 11px;">
          <td style="padding: 6px 8px; text-align: center; color: #64748b; font-weight: bold;">${index + 1}</td>
          <td style="padding: 6px 8px; font-family: 'Inter', sans-serif; font-weight: 700; color: #0f172a; text-transform: uppercase;">${c.nombre}</td>
          <td style="padding: 6px 8px; text-align: right; color: #475569;">${(parseFloat(c.saldoAnterior) || 0).toFixed(2)}</td>
          <td style="padding: 6px 8px; text-align: right; color: #059669; font-weight: bold;">+${(parseFloat(c.ingresos) || 0).toFixed(2)}</td>
          <td style="padding: 6px 8px; text-align: right; color: #dc2626; font-weight: bold;">-${(parseFloat(c.egresos) || 0).toFixed(2)}</td>
          <td style="padding: 6px 8px; text-align: right; font-weight: 900; color: #0f172a; background: #f8fafc;">Bs ${saldo.toFixed(2)}</td>
          <td style="padding: 6px 8px; text-align: center; font-weight: bold; color: #2563eb;">${pct}%</td>
        </tr>
      `;
    }).join('');

    const html = `
      <div style="max-width: 800px; margin: 0 auto; font-family: 'Inter', sans-serif; color: #0f172a; padding: 10px;">
        <!-- Encabezado Oficial -->
        <div style="text-align: center; border-bottom: 2.5px solid #1e3a8a; padding-bottom: 10px; margin-bottom: 14px;">
          <h1 style="font-size: 18px; font-weight: 900; letter-spacing: 1px; color: #0f172a; margin-bottom: 2px;">
            ASOCIACIÓN DE TRANSPORTE "RADIO MÓVIL 15 DE ABRIL" S.R.L.
          </h1>
          <p style="font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">
            Personería Jurídica N° 458/98 • NIT: 1028374029 • Tarija, Bolivia
          </p>
          <div style="display: inline-block; background: #1e3a8a; color: #ffffff; font-weight: 800; font-size: 12px; padding: 4px 18px; border-radius: 4px; margin-top: 6px; text-transform: uppercase; letter-spacing: 0.5px;">
            INFORME ECONÓMICO Y BALANCE GENERAL POR CAJAS
          </div>
          <p style="font-size: 10.5px; font-family: 'JetBrains Mono', monospace; color: #334155; margin-top: 6px;">
            Periodo Evaluado: <strong>${fechaDesde}</strong> al <strong>${fechaHasta}</strong> | Moneda: <strong>Bolivianos (Bs)</strong>
          </p>
        </div>

        <!-- 4 Tarjetas de Resumen Ejecutivo -->
        <div style="display: flex; justify-content: space-between; gap: 10px; margin-bottom: 18px;">
          <div style="flex: 1; border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 6px; padding: 8px; text-align: center;">
            <span style="font-size: 9.5px; font-weight: bold; color: #64748b; text-transform: uppercase; display: block;">Saldo Inicial Periodo</span>
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 800; color: #334155;">Bs ${totalSaldoAnt.toFixed(2)}</span>
          </div>

          <div style="flex: 1; border: 1px solid #bbf7d0; background: #f0fdf4; border-radius: 6px; padding: 8px; text-align: center;">
            <span style="font-size: 9.5px; font-weight: bold; color: #166534; text-transform: uppercase; display: block;">Total Ingresos Recaudados</span>
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 900; color: #15803d;">+ Bs ${totalIngresos.toFixed(2)}</span>
          </div>

          <div style="flex: 1; border: 1px solid #fecaca; background: #fef2f2; border-radius: 6px; padding: 8px; text-align: center;">
            <span style="font-size: 9.5px; font-weight: bold; color: #991b1b; text-transform: uppercase; display: block;">Total Egresos y Gastos</span>
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 900; color: #b91c1c;">- Bs ${totalEgresos.toFixed(2)}</span>
          </div>

          <div style="flex: 1.2; border: 2px solid #1e3a8a; background: #eff6ff; border-radius: 6px; padding: 8px; text-align: center;">
            <span style="font-size: 10px; font-weight: 900; color: #1e3a8a; text-transform: uppercase; display: block;">Liquidez Total Disponible</span>
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 16px; font-weight: 900; color: #1e3a8a;">Bs ${totalSaldoActual.toFixed(2)}</span>
          </div>
        </div>

        <!-- Tabla Matricial de Conciliación -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background: #0f172a; color: #ffffff; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px;">
              <th style="padding: 7px 6px; border: 1px solid #0f172a; text-align: center;">N°</th>
              <th style="padding: 7px 8px; border: 1px solid #0f172a; text-align: left;">Cuenta / Caja Institucional</th>
              <th style="padding: 7px 8px; border: 1px solid #0f172a; text-align: right;">Saldo Ant.</th>
              <th style="padding: 7px 8px; border: 1px solid #0f172a; text-align: right;">Ingresos (+)</th>
              <th style="padding: 7px 8px; border: 1px solid #0f172a; text-align: right;">Egresos (-)</th>
              <th style="padding: 7px 8px; border: 1px solid #0f172a; text-align: right; background: #1e293b;">Saldo Actual</th>
              <th style="padding: 7px 8px; border: 1px solid #0f172a; text-align: center;">% Part.</th>
            </tr>
          </thead>
          <tbody>
            ${tableRowsHTML}
          </tbody>
          <tfoot>
            <tr style="background: #e2e8f0; font-weight: 900; font-family: 'JetBrains Mono', monospace; font-size: 11px; border-top: 2.5px solid #0f172a; border-bottom: 2.5px solid #0f172a;">
              <td colspan="2" style="padding: 8px; text-align: center; font-family: 'Inter', sans-serif;">TOTAL CONSOLIDADO GENERAL</td>
              <td style="padding: 8px; text-align: right;">${totalSaldoAnt.toFixed(2)}</td>
              <td style="padding: 8px; text-align: right; color: #059669;">+${totalIngresos.toFixed(2)}</td>
              <td style="padding: 8px; text-align: right; color: #dc2626;">-${totalEgresos.toFixed(2)}</td>
              <td style="padding: 8px; text-align: right; color: #1e3a8a; font-size: 12px; background: #dbeafe;">Bs ${totalSaldoActual.toFixed(2)}</td>
              <td style="padding: 8px; text-align: center;">100.0%</td>
            </tr>
          </tfoot>
        </table>

        <!-- Dictamen Legal de Cierre -->
        <div style="border: 1px dashed #94a3b8; border-radius: 6px; padding: 10px; font-size: 9.5px; color: #475569; line-height: 1.5; margin-bottom: 30px;" class="avoid-break">
          <strong>DICTAMEN DE CONCILIACIÓN:</strong> El presente informe certifica que los fondos, saldos y comprobantes de ingresos y egresos expuestos en el presente balance han sido verificados conforme al arqueo físico y digital de SISCOB. El resultado neto del periodo refleja un <strong>${resultadoNeto >= 0 ? 'SUPERÁVIT OPERATIVO' : 'DÉFICIT'} de Bs ${Math.abs(resultadoNeto).toFixed(2)}</strong> para conocimiento de la Asamblea General de Socios.
        </div>

        <!-- Bloque de 3 Firmas Ejecutivas -->
        <div style="display: flex; justify-content: space-between; text-align: center; font-size: 10.5px; margin-top: 35px;" class="avoid-break">
          <div style="width: 30%; border-top: 1.5px solid #0f172a; padding-top: 6px;">
            <strong>Presidente Directorio</strong><br>
            <span style="font-size: 9.5px; color: #64748b;">Radio Móvil 15 de Abril</span>
          </div>

          <div style="width: 30%; border-top: 1.5px solid #0f172a; padding-top: 6px;">
            <strong>Tesorero General</strong><br>
            <span style="font-size: 9.5px; color: #64748b;">Secretaría de Finanzas</span>
          </div>

          <div style="width: 30%; border-top: 1.5px solid #0f172a; padding-top: 6px;">
            <strong>Comisión Revisora</strong><br>
            <span style="font-size: 9.5px; color: #64748b;">Fiscalización de Cuentas</span>
          </div>
        </div>

        <div style="margin-top: 25px; padding-top: 6px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; font-size: 9px; color: #94a3b8; font-family: monospace;">
          <span>Informe_Balance_General_Cajas.jrxml</span>
          <span>Emisión: ${new Date().toLocaleString('es-BO')}</span>
          <span>Operador: ${currentUser?.nombre || 'Administrador Central'}</span>
        </div>
      </div>
    `;

    printIsolatedDocument(html, 'Balance_General_de_Cajas');
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Header Card */}
      <div className="flex flex-wrap justify-between items-center bg-white p-5 rounded-2xl border border-slate-200 shadow-xs gap-4 no-print">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <Landmark className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-lg font-black text-slate-900 tracking-tight">
                Balance Financiero y Conciliación de Cajas
              </h1>
              <p className="text-xs text-slate-500">
                Estado consolidado de fondos, flujo de efectivo operativo y arqueo patrimonial institucional
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => handleExportExcel('xlsx')}
            className="flex items-center space-x-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs active:scale-95"
            title="Exportar archivo Excel (.xlsx) nativo"
          >
            <Download className="w-4 h-4" />
            <span>Excel (.xlsx)</span>
          </button>
          <button
            onClick={() => handleExportExcel('csv')}
            className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer border border-slate-300 shadow-xs active:scale-95"
            title="Exportar archivo CSV (.csv) delimitado por punto y coma"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>CSV</span>
          </button>
          <button
            onClick={handlePrintAssemblyReport}
            className="flex items-center space-x-1.5 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs active:scale-95"
            title="Imprimir informe oficial para la Asamblea General"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Informe para Asamblea</span>
          </button>
        </div>
      </div>

      {/* Filter and Period Selection Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs no-print">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-1.5 font-bold text-slate-700">
            <Filter className="w-4 h-4 text-blue-700" />
            <span>Filtro de Periodo:</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-slate-500 font-medium">Desde:</span>
            <input
              type="date"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
              className="p-1.5 border border-slate-300 rounded-lg font-mono text-xs font-bold"
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-slate-500 font-medium">Hasta:</span>
            <input
              type="date"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
              className="p-1.5 border border-slate-300 rounded-lg font-mono text-xs font-bold"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="font-bold text-slate-600">Ver Caja:</span>
          <select
            value={cajaFilter}
            onChange={(e) => setCajaFilter(e.target.value)}
            className="p-1.5 border border-slate-300 rounded-lg font-semibold bg-white text-xs"
          >
            <option value="TODAS">TODAS LAS CAJAS ({cajas.length})</option>
            {cajas.map(c => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Top 4 Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Liquidez Total */}
        <div className="bg-gradient-to-br from-blue-900 via-blue-950 to-slate-900 text-white p-5 rounded-2xl shadow-sm space-y-2 border border-blue-800">
          <div className="flex justify-between items-center text-blue-200">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Patrimonio Total en Cajas</span>
            <Wallet className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black font-mono tracking-tight">
            Bs {totalSaldoActual.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="flex items-center space-x-1.5 text-[10px] text-emerald-400 font-bold pt-1 border-t border-blue-800/80">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Fondos disponibles en tiempo real</span>
          </div>
        </div>

        {/* KPI 2: Total Ingresos */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">Recaudación / Ingresos</span>
            <span className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-emerald-700">
            Bs {totalIngresos.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-slate-400 font-medium pt-1 border-t border-slate-100">
            Cuotas, aportes, sostenimiento y pagos
          </div>
        </div>

        {/* KPI 3: Total Egresos */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">Gastos y Salidas Oficiales</span>
            <span className="p-1.5 bg-rose-50 text-rose-700 rounded-lg">
              <TrendingDown className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-rose-700">
            Bs {totalEgresos.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-slate-400 font-medium pt-1 border-t border-slate-100">
            Sueldos, mantenimiento y descargos
          </div>
        </div>

        {/* KPI 4: Resultado Neto del Periodo */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">Flujo Neto del Periodo</span>
            <span className={`p-1.5 rounded-lg ${resultadoNeto >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
              <PieChart className="w-4 h-4" />
            </span>
          </div>
          <div className={`text-2xl font-black font-mono ${resultadoNeto >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
            {resultadoNeto >= 0 ? '+' : ''}Bs {resultadoNeto.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] font-bold pt-1 border-t border-slate-100">
            <span className={`px-2 py-0.5 rounded-full ${resultadoNeto >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {resultadoNeto >= 0 ? 'Superávit Operativo' : 'Déficit del Periodo'}
            </span>
          </div>
        </div>
      </div>

      {/* Distribution of Funds Across Cajas (Visual Progress Bars) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-wide flex items-center space-x-1.5">
            <PieChart className="w-4 h-4 text-blue-700" />
            <span>Distribución Porcentual del Patrimonio por Cajas</span>
          </h3>
          <span className="text-[11px] font-mono text-slate-400">Total: 100%</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {cajas.map(c => {
            const saldo = c.saldoActual !== undefined 
              ? parseFloat(c.saldoActual) 
              : (parseFloat(c.saldoAnterior || 0) + parseFloat(c.ingresos || 0) - parseFloat(c.egresos || 0));
            const pct = totalSaldoActual > 0 ? (saldo / totalSaldoActual) * 100 : 0;

            return (
              <div key={c.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="truncate pr-1 text-slate-700">{c.nombre}</span>
                  <span className="font-mono text-blue-700 shrink-0">{pct.toFixed(1)}%</span>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(Math.max(pct, 0), 100)}%` }}
                  />
                </div>
                <div className="text-[11px] font-mono text-slate-500 font-semibold text-right">
                  Bs {saldo.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Executive Financial Matrix Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">
              Matriz de Conciliación de Cajas
            </h3>
            <p className="text-[11px] text-slate-500">Detalle de movimientos, saldo anterior, entradas y salidas</p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-600 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">
            {filteredCajas.length} Cuentas
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900 text-white font-semibold">
              <tr>
                <th className="p-3 w-12 text-center">#</th>
                <th className="p-3">Cuenta / Caja Institucional</th>
                <th className="p-3 text-right">Saldo Ant.</th>
                <th className="p-3 text-right">Ingresos (+)</th>
                <th className="p-3 text-right">Egresos (-)</th>
                <th className="p-3 text-right bg-slate-800">Saldo Actual Disponible</th>
                <th className="p-3 text-center">% Part.</th>
                <th className="p-3 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredCajas.map((c, index) => {
                const saldo = c.saldoActual !== undefined 
                  ? parseFloat(c.saldoActual) 
                  : (parseFloat(c.saldoAnterior || 0) + parseFloat(c.ingresos || 0) - parseFloat(c.egresos || 0));
                const pct = totalSaldoActual > 0 ? (saldo / totalSaldoActual) * 100 : 0;

                return (
                  <tr key={c.id} className="hover:bg-slate-50 transition">
                    <td className="p-3 text-center font-bold text-slate-400">{index + 1}</td>
                    <td className="p-3">
                      <div className="font-extrabold text-slate-900 uppercase">{c.nombre}</div>
                      <div className="text-[10px] text-slate-400 font-mono">ID: {c.id}</div>
                    </td>
                    <td className="p-3 font-mono text-right text-slate-600">
                      Bs {(parseFloat(c.saldoAnterior) || 0).toFixed(2)}
                    </td>
                    <td className="p-3 font-mono font-bold text-right text-emerald-700">
                      +Bs {(parseFloat(c.ingresos) || 0).toFixed(2)}
                    </td>
                    <td className="p-3 font-mono font-bold text-right text-rose-700">
                      -Bs {(parseFloat(c.egresos) || 0).toFixed(2)}
                    </td>
                    <td className="p-3 font-mono font-black text-right text-slate-900 bg-blue-50/40 text-sm">
                      Bs {saldo.toFixed(2)}
                    </td>
                    <td className="p-3 text-center font-mono font-bold text-blue-700">
                      {pct.toFixed(1)}%
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                        Activa
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-slate-100 font-bold border-t-2 border-slate-300">
              <tr className="text-right text-xs">
                <td colSpan="2" className="p-3 text-center font-black uppercase text-slate-900 font-sans">
                  TOTAL CONSOLIDADO GENERAL
                </td>
                <td className="p-3 font-mono text-slate-700">Bs {totalSaldoAnt.toFixed(2)}</td>
                <td className="p-3 font-mono text-emerald-700">+Bs {totalIngresos.toFixed(2)}</td>
                <td className="p-3 font-mono text-rose-700">-Bs {totalEgresos.toFixed(2)}</td>
                <td className="p-3 font-mono font-black text-blue-900 bg-blue-100 text-sm">
                  Bs {totalSaldoActual.toFixed(2)}
                </td>
                <td className="p-3 text-center font-mono font-bold">100%</td>
                <td className="p-3 text-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Detailed Individual Caja Breakdown Cards */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">
          Desglose Individual y Flujo de Operaciones por Caja
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredCajas.map((caja) => {
            const saldoActualCaja = caja.saldoActual !== undefined 
              ? parseFloat(caja.saldoActual) 
              : (parseFloat(caja.saldoAnterior || 0) + parseFloat(caja.ingresos || 0) - parseFloat(caja.egresos || 0));

            return (
              <div key={caja.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between">
                <div>
                  {/* Top Bar of Caja */}
                  <div className="bg-slate-900 text-white p-3.5 flex justify-between items-center text-xs">
                    <div className="flex items-center space-x-2">
                      <Landmark className="w-4 h-4 text-blue-400" />
                      <span className="font-extrabold uppercase tracking-wide">{caja.nombre}</span>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-300 font-mono font-bold px-2 py-0.5 rounded text-[11px] border border-emerald-400/30">
                      Saldo: Bs {saldoActualCaja.toFixed(2)}
                    </span>
                  </div>

                  {/* Flow Split */}
                  <div className="grid grid-cols-2 divide-x divide-slate-100 p-4 gap-3 text-xs">
                    {/* Ingresos Column */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-1.5 text-emerald-700 font-bold text-[11px] uppercase">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        <span>Entradas / Ingresos</span>
                      </div>
                      <div className="bg-emerald-50/50 p-2 rounded-xl border border-emerald-100">
                        <span className="text-[10px] text-slate-500 block font-medium">Cobranzas del Periodo:</span>
                        <span className="font-mono font-black text-sm text-emerald-800">
                          Bs {(parseFloat(caja.ingresos) || 0).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Egresos Column */}
                    <div className="space-y-2 pl-3">
                      <div className="flex items-center space-x-1.5 text-rose-700 font-bold text-[11px] uppercase">
                        <ArrowDownRight className="w-3.5 h-3.5" />
                        <span>Salidas / Egresos</span>
                      </div>
                      <div className="bg-rose-50/50 p-2 rounded-xl border border-rose-100">
                        <span className="text-[10px] text-slate-500 block font-medium">Gastos del Periodo:</span>
                        <span className="font-mono font-black text-sm text-rose-800">
                          Bs {(parseFloat(caja.egresos) || 0).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtotal Mini Footer Bar */}
                <div className="bg-slate-50 border-t border-slate-200 p-2.5">
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="bg-white p-1 rounded-lg border border-slate-200">
                      <span className="text-[9px] text-slate-400 uppercase block font-bold">Ingreso</span>
                      <span className="font-mono font-bold text-emerald-700 text-[11px]">{(parseFloat(caja.ingresos) || 0).toFixed(2)}</span>
                    </div>
                    <div className="bg-white p-1 rounded-lg border border-slate-200">
                      <span className="text-[9px] text-slate-400 uppercase block font-bold">Egreso</span>
                      <span className="font-mono font-bold text-rose-700 text-[11px]">{(parseFloat(caja.egresos) || 0).toFixed(2)}</span>
                    </div>
                    <div className="bg-white p-1 rounded-lg border border-slate-200">
                      <span className="text-[9px] text-slate-400 uppercase block font-bold">Saldo Ant.</span>
                      <span className="font-mono font-bold text-slate-600 text-[11px]">{(parseFloat(caja.saldoAnterior) || 0).toFixed(2)}</span>
                    </div>
                    <div className="bg-blue-50 p-1 rounded-lg border border-blue-200">
                      <span className="text-[9px] text-blue-700 uppercase block font-extrabold">Saldo Actual</span>
                      <span className="font-mono font-black text-blue-900 text-[11px]">{saldoActualCaja.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}