import React, { useState, useMemo } from 'react';
import { 
  FileSpreadsheet, 
  Printer, 
  Search, 
  Filter, 
  Download, 
  FileText,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';

// Datos de Ingresos Recaudados (Fiel a JasperViewer de usuario)
const RAW_INGRESOS = [
  { interno: 1, nombre: 'SANTIAGO LLANOS', cat: 'Conductores', caja: 'c1', moneda: 'Bs', cajero: 'DANIELA', ahorro: 6.0, jefeLinea: 18.0, gpsJulio: 24.0, gpsMarzo: 24.0, minPunta: 10.0, proMarzo: 90.0, sostenimiento: 96.0, pandemia: 10.0, retrasado: 72.0, colaboracion: 0.0, prestamo: 0.0, interes: 0.0, proSede: 0.0, proGps2: 0.0 },
  { interno: 3, nombre: 'CARLOS MAXI', cat: 'Conductores', caja: 'c1', moneda: 'Bs', cajero: 'DANIELA', ahorro: 17.0, jefeLinea: 51.0, gpsJulio: 68.0, gpsMarzo: 0.0, minPunta: 25.0, proMarzo: 0.0, sostenimiento: 272.0, pandemia: 40.0, retrasado: 0.0, colaboracion: 30.0, prestamo: 482.0, interes: 0.0, proSede: 0.0, proGps2: 0.0 },
  { interno: 5, nombre: 'RUBEN AGUIRRE', cat: 'Conductores', caja: 'c2', moneda: 'Bs', cajero: 'ADMIN', ahorro: 0.0, jefeLinea: 0.0, gpsJulio: 80.0, gpsMarzo: 12.0, minPunta: 0.0, proMarzo: 45.0, sostenimiento: 320.0, pandemia: 0.0, retrasado: 48.0, colaboracion: 0.0, prestamo: 0.0, interes: 0.0, proSede: 0.0, proGps2: 0.0 },
  { interno: 7, nombre: 'FERMIN ARELLANO', cat: 'Conductores', caja: 'c1', moneda: 'Bs', cajero: 'DANIELA', ahorro: 19.0, jefeLinea: 51.0, gpsJulio: 68.0, gpsMarzo: 8.0, minPunta: 20.0, proMarzo: 30.0, sostenimiento: 272.0, pandemia: 50.0, retrasado: 32.0, colaboracion: 30.0, prestamo: 340.0, interes: 0.0, proSede: 0.0, proGps2: 0.0 },
  { interno: 8, nombre: 'BRAULIO COLQUE', cat: 'Conductores', caja: 'c1', moneda: 'Bs', cajero: 'CARLOS', ahorro: 78.0, jefeLinea: 21.0, gpsJulio: 28.0, gpsMarzo: 12.0, minPunta: 10.0, proMarzo: 45.0, sostenimiento: 112.0, pandemia: 40.0, retrasado: 48.0, colaboracion: 26.0, prestamo: 0.0, interes: 0.0, proSede: 0.0, proGps2: 0.0 },
  { interno: 9, nombre: 'HERNAN CHAMBI', cat: 'Conductores', caja: 'c1', moneda: 'Bs', cajero: 'DANIELA', ahorro: 110.0, jefeLinea: 45.0, gpsJulio: 60.0, gpsMarzo: 12.0, minPunta: 10.0, proMarzo: 45.0, sostenimiento: 240.0, pandemia: 30.0, retrasado: 48.0, colaboracion: 0.0, prestamo: 0.0, interes: 0.0, proSede: 0.0, proGps2: 0.0 },
  { interno: 10, nombre: 'LEODAN HUIZA', cat: 'Conductores', caja: 'c2', moneda: 'Bs', cajero: 'ADMIN', ahorro: 2.0, jefeLinea: 6.0, gpsJulio: 8.0, gpsMarzo: 0.0, minPunta: 5.0, proMarzo: 32.0, sostenimiento: 32.0, pandemia: 20.0, retrasado: 0.0, colaboracion: 0.0, prestamo: 0.0, interes: 0.0, proSede: 0.0, proGps2: 0.0 },
  { interno: 11, nombre: 'JHONNY SALAZAR', cat: 'Conductores', caja: 'c1', moneda: 'Bs', cajero: 'DANIELA', ahorro: 2.0, jefeLinea: 6.0, gpsJulio: 8.0, gpsMarzo: 0.0, minPunta: 0.0, proMarzo: 43.0, sostenimiento: 32.0, pandemia: 10.0, retrasado: 0.0, colaboracion: 9.0, prestamo: 0.0, interes: 0.0, proSede: 0.0, proGps2: 0.0 },
  { interno: 13, nombre: 'CARRILLO MELITON', cat: 'Conductores', caja: 'c1', moneda: 'Bs', cajero: 'DANIELA', ahorro: 43.0, jefeLinea: 36.0, gpsJulio: 48.0, gpsMarzo: 4.0, minPunta: 20.0, proMarzo: 15.0, sostenimiento: 192.0, pandemia: 40.0, retrasado: 16.0, colaboracion: 0.0, prestamo: 246.0, interes: 0.0, proSede: 0.0, proGps2: 0.0 },
  { interno: 14, nombre: 'MAX VERA', cat: 'Conductores', caja: 'c1', moneda: 'Bs', cajero: 'DANIELA', ahorro: 17.0, jefeLinea: 45.0, gpsJulio: 60.0, gpsMarzo: 20.0, minPunta: 0.0, proMarzo: 75.0, sostenimiento: 240.0, pandemia: 50.0, retrasado: 191.0, colaboracion: 0.0, prestamo: 72.0, interes: 50.0, proSede: 0.0, proGps2: 0.0 },
  { interno: 15, nombre: 'RAFAEL LEONARDO', cat: 'Conductores', caja: 'c1', moneda: 'Bs', cajero: 'CARLOS', ahorro: 238.0, jefeLinea: 42.0, gpsJulio: 56.0, gpsMarzo: 8.0, minPunta: 20.0, proMarzo: 30.0, sostenimiento: 224.0, pandemia: 40.0, retrasado: 32.0, colaboracion: 30.0, prestamo: 0.0, interes: 0.0, proSede: 0.0, proGps2: 0.0 },
  { interno: 16, nombre: 'SEVERO PARI', cat: 'Conductores', caja: 'c2', moneda: 'Bs', cajero: 'DANIELA', ahorro: 4.0, jefeLinea: 12.0, gpsJulio: 16.0, gpsMarzo: 16.0, minPunta: 0.0, proMarzo: 60.0, sostenimiento: 64.0, pandemia: 10.0, retrasado: 0.0, colaboracion: 0.0, prestamo: 0.0, interes: 0.0, proSede: 18.0, proGps2: 0.0 },
  { interno: 17, nombre: 'ALEX ROBERT', cat: 'Conductores', caja: 'c1', moneda: 'Bs', cajero: 'DANIELA', ahorro: 17.0, jefeLinea: 51.0, gpsJulio: 68.0, gpsMarzo: 0.0, minPunta: 15.0, proMarzo: 0.0, sostenimiento: 272.0, pandemia: 40.0, retrasado: 0.0, colaboracion: 0.0, prestamo: 432.0, interes: 0.0, proSede: 0.0, proGps2: 0.0 },
  { interno: 18, nombre: 'MARIO QUISPE', cat: 'Conductores', caja: 'c1', moneda: 'Bs', cajero: 'DANIELA', ahorro: 328.0, jefeLinea: 42.0, gpsJulio: 56.0, gpsMarzo: 8.0, minPunta: 3.0, proMarzo: 30.0, sostenimiento: 224.0, pandemia: 50.0, retrasado: 32.0, colaboracion: 30.0, prestamo: 0.0, interes: 0.0, proSede: 0.0, proGps2: 0.0 },
  { interno: 19, nombre: 'BRAULIO NAVARRO', cat: 'Conductores', caja: 'c1', moneda: 'Bs', cajero: 'DANIELA', ahorro: 14.0, jefeLinea: 42.0, gpsJulio: 56.0, gpsMarzo: 20.0, minPunta: 10.0, proMarzo: 75.0, sostenimiento: 224.0, pandemia: 20.0, retrasado: 80.0, colaboracion: 0.0, prestamo: 0.0, interes: 0.0, proSede: 0.0, proGps2: 95.0 },
  { interno: 20, nombre: 'REMBERTO TORRICO', cat: 'Conductores', caja: 'c1', moneda: 'Bs', cajero: 'DANIELA', ahorro: 247.0, jefeLinea: 33.0, gpsJulio: 44.0, gpsMarzo: 0.0, minPunta: 15.0, proMarzo: 0.0, sostenimiento: 176.0, pandemia: 50.0, retrasado: 0.0, colaboracion: 0.0, prestamo: 0.0, interes: 0.0, proSede: 0.0, proGps2: 0.0 },
  { interno: 25, nombre: 'PAULINO MUNOZ', cat: 'Conductores', caja: 'c2', moneda: 'Bs', cajero: 'ADMIN', ahorro: 9.0, jefeLinea: 27.0, gpsJulio: 36.0, gpsMarzo: 0.0, minPunta: 5.0, proMarzo: 127.0, sostenimiento: 144.0, pandemia: 40.0, retrasado: 31.0, colaboracion: 0.0, prestamo: 0.0, interes: 0.0, proSede: 36.0, proGps2: 0.0 }
];

// Datos de Deudas Pendientes (Fiel a Frame 164s de Quipus / JasperViewer)
const RAW_DEUDAS_PENDIENTES = [
  { interno: 1, nombre: 'SANTIAGO LLANOS', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 248.0, inasistencia: 0.0, gpsJulio: 56.0, pandemia: 650.0, interes: 0.0, prestamo: 0.0, colaboracion: 0.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 },
  { interno: 2, nombre: 'CARLOS MAXI', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 320.0, inasistencia: 0.0, gpsJulio: 80.0, pandemia: 660.0, interes: 125.0, prestamo: 2060.0, colaboracion: 30.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 },
  { interno: 3, nombre: 'CARLOS LA FUENTE', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 48.0, inasistencia: 0.0, gpsJulio: 12.0, pandemia: 620.0, interes: 125.0, prestamo: 1618.0, colaboracion: 0.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 },
  { interno: 4, nombre: 'JOAQUIN CHURQUI', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 480.0, inasistencia: 0.0, gpsJulio: 80.0, pandemia: 660.0, interes: 130.0, prestamo: 1992.0, colaboracion: 30.0, promanten: 150.0, guardaBarro: 80.0, llanta: 1177.0, gpsMarzo: 40.0 },
  { interno: 5, nombre: 'RUBEN AGUIRRE', cat: 'Conductores', caja: 'c2', moneda: 'Bs', retrasado: 0.0, inasistencia: 0.0, gpsJulio: 0.0, pandemia: 660.0, interes: 0.0, prestamo: 0.0, colaboracion: 0.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 },
  { interno: 6, nombre: 'GUIDO ESTEVEZ', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 336.0, inasistencia: 0.0, gpsJulio: 80.0, pandemia: 660.0, interes: 0.0, prestamo: 0.0, colaboracion: 30.0, promanten: 15.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 4.0 },
  { interno: 7, nombre: 'FERMIN ARELLANO', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 48.0, inasistencia: 0.0, gpsJulio: 12.0, pandemia: 610.0, interes: 21.0, prestamo: 4460.0, colaboracion: 0.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 },
  { interno: 8, nombre: 'BRAULIO COLQUE', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 208.0, inasistencia: 0.0, gpsJulio: 52.0, pandemia: 620.0, interes: 333.0, prestamo: 7400.0, colaboracion: 4.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 },
  { interno: 9, nombre: 'HERNAN CHAMBI', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 80.0, inasistencia: 0.0, gpsJulio: 20.0, pandemia: 630.0, interes: 0.0, prestamo: 0.0, colaboracion: 0.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 },
  { interno: 10, nombre: 'LEODAN HUIZA', cat: 'Conductores', caja: 'c2', moneda: 'Bs', retrasado: 336.0, inasistencia: 0.0, gpsJulio: 72.0, pandemia: 640.0, interes: 99.0, prestamo: 1272.0, colaboracion: 0.0, promanten: 13.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 12.0 },
  { interno: 11, nombre: 'JHONNY SALAZAR', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 416.0, inasistencia: 0.0, gpsJulio: 72.0, pandemia: 650.0, interes: 35.0, prestamo: 265.0, colaboracion: 0.0, promanten: 77.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 32.0 },
  { interno: 12, nombre: 'ADRIAN CARRIZO', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 640.0, inasistencia: 0.0, gpsJulio: 0.0, pandemia: 660.0, interes: 0.0, prestamo: 0.0, colaboracion: 30.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 },
  { interno: 13, nombre: 'CARRILLO MELITON', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 128.0, inasistencia: 0.0, gpsJulio: 32.0, pandemia: 620.0, interes: 250.0, prestamo: 3212.0, colaboracion: 0.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 },
  { interno: 14, nombre: 'MAX VERA', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 80.0, inasistencia: 0.0, gpsJulio: 20.0, pandemia: 610.0, interes: 250.0, prestamo: 3564.0, colaboracion: 0.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 },
  { interno: 15, nombre: 'RAFAEL LEONARDO', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 96.0, inasistencia: 0.0, gpsJulio: 24.0, pandemia: 620.0, interes: 100.0, prestamo: 2000.0, colaboracion: 0.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 },
  { interno: 16, nombre: 'SEVERO PARI', cat: 'Conductores', caja: 'c2', moneda: 'Bs', retrasado: 320.0, inasistencia: 0.0, gpsJulio: 64.0, pandemia: 650.0, interes: 160.0, prestamo: 2667.0, colaboracion: 0.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 },
  { interno: 17, nombre: 'ALEX ROBERT', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 320.0, inasistencia: 0.0, gpsJulio: 80.0, pandemia: 660.0, interes: 0.0, prestamo: 0.0, colaboracion: 0.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 },
  { interno: 18, nombre: 'MARIO QUISPE', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 48.0, inasistencia: 0.0, gpsJulio: 12.0, pandemia: 620.0, interes: 175.0, prestamo: 3691.0, colaboracion: 0.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 },
  { interno: 20, nombre: 'REMBERTO TORRICO', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 144.0, inasistencia: 0.0, gpsJulio: 36.0, pandemia: 610.0, interes: 0.0, prestamo: 0.0, colaboracion: 0.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 }
];

export default function ReportesPage() {
  const [reportTab, setReportTab] = useState('recaudados'); // 'recaudados' | 'deudas'

  // Shared Filter States:
  // Desde, Hasta, Categoria, Moneda, Cajas, Cajero
  const [fechaDesde, setFechaDesde] = useState('2026-07-20');
  const [fechaHasta, setFechaHasta] = useState('2026-08-01');
  const [selectedCategoria, setSelectedCategoria] = useState('TODOS');
  const [selectedMoneda, setSelectedMoneda] = useState('TODAS');
  const [selectedCaja, setSelectedCaja] = useState('TODAS');
  const [selectedCajero, setSelectedCajero] = useState('TODOS');
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Filtrado para Ingresos Recaudados
  const filteredIngresos = useMemo(() => {
    return RAW_INGRESOS.filter(item => {
      const matchCat = selectedCategoria === 'TODOS' || item.cat === selectedCategoria;
      const matchMoneda = selectedMoneda === 'TODAS' || item.moneda === selectedMoneda;
      const matchCaja = selectedCaja === 'TODAS' || item.caja === selectedCaja;
      const matchCajero = selectedCajero === 'TODOS' || item.cajero === selectedCajero;
      const matchSearch = searchTerm === '' || 
        `${item.interno} ${item.nombre}`.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchMoneda && matchCaja && matchCajero && matchSearch;
    });
  }, [selectedCategoria, selectedMoneda, selectedCaja, selectedCajero, searchTerm]);

  // Totales Ingresos
  const totalsIngresos = useMemo(() => {
    const sum = (key) => filteredIngresos.reduce((acc, curr) => acc + (curr[key] || 0), 0);
    return {
      ahorro: sum('ahorro'),
      jefeLinea: sum('jefeLinea'),
      gpsJulio: sum('gpsJulio'),
      gpsMarzo: sum('gpsMarzo'),
      minPunta: sum('minPunta'),
      proMarzo: sum('proMarzo'),
      sostenimiento: sum('sostenimiento'),
      pandemia: sum('pandemia'),
      retrasado: sum('retrasado'),
      colaboracion: sum('colaboracion'),
      prestamo: sum('prestamo'),
      interes: sum('interes'),
      proSede: sum('proSede'),
      proGps2: sum('proGps2'),
    };
  }, [filteredIngresos]);
  const grandTotalIngresos = Object.values(totalsIngresos).reduce((a, b) => a + b, 0);

  // 2. Filtrado para Deudas Pendientes (Misma lógica exacta)
  const filteredDeudas = useMemo(() => {
    return RAW_DEUDAS_PENDIENTES.filter(item => {
      const matchCat = selectedCategoria === 'TODOS' || item.cat === selectedCategoria;
      const matchMoneda = selectedMoneda === 'TODAS' || item.moneda === selectedMoneda;
      const matchCaja = selectedCaja === 'TODAS' || item.caja === selectedCaja;
      const matchSearch = searchTerm === '' || 
        `${item.interno} ${item.nombre}`.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchMoneda && matchCaja && matchSearch;
    });
  }, [selectedCategoria, selectedMoneda, selectedCaja, searchTerm]);

  // Totales Deudas
  const totalsDeudas = useMemo(() => {
    const sum = (key) => filteredDeudas.reduce((acc, curr) => acc + (curr[key] || 0), 0);
    return {
      retrasado: sum('retrasado'),
      inasistencia: sum('inasistencia'),
      gpsJulio: sum('gpsJulio'),
      pandemia: sum('pandemia'),
      interes: sum('interes'),
      prestamo: sum('prestamo'),
      colaboracion: sum('colaboracion'),
      promanten: sum('promanten'),
      guardaBarro: sum('guardaBarro'),
      llanta: sum('llanta'),
      gpsMarzo: sum('gpsMarzo'),
    };
  }, [filteredDeudas]);
  const grandTotalDeudas = Object.values(totalsDeudas).reduce((a, b) => a + b, 0);

  const handleExportExcel = (tipo) => {
    alert(`Reporte "${tipo}" exportado a Excel.
Periodo: ${fechaDesde} al ${fechaHasta}
Total: Bs ${(tipo === 'Ingresos' ? grandTotalIngresos : grandTotalDeudas).toFixed(2)}`);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-5">
      {/* Top Title & Navigation Tabs */}
      <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-xs no-print">
        <div>
          <h1 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
            <FileSpreadsheet className="w-5 h-5 text-red-700" />
            <span>Módulo de Matrices y Rendición de Cuentas (JasperReports)</span>
          </h1>
          <p className="text-xs text-slate-500">
            Reportes matriciales consolidados por socio con selección de fechas, categoría, moneda y cajas
          </p>
        </div>

        {/* Tab Switcher: Ingresos vs Deudas */}
        <div className="flex bg-slate-100 p-1 rounded-xl space-x-1 text-xs font-bold">
          <button
            onClick={() => setReportTab('recaudados')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center space-x-1.5 ${
              reportTab === 'recaudados' 
                ? 'bg-red-700 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Ingresos Recaudados por Socio</span>
          </button>
          <button
            onClick={() => setReportTab('deudas')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center space-x-1.5 ${
              reportTab === 'deudas' 
                ? 'bg-red-700 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Deudas Pendientes por Socio</span>
          </button>
        </div>
      </div>

      {/* Filter Bar (Same for both reports) */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3 no-print">
        <div className="flex items-center space-x-2 text-xs font-extrabold text-slate-800 uppercase border-b border-slate-100 pb-2">
          <Filter className="w-4 h-4 text-red-700" />
          <span>
            Filtros para: {reportTab === 'recaudados' ? 'Ingresos Recaudados por Socio' : 'Deudas Pendientes por Socio'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          {/* Fecha Desde */}
          <div>
            <label className="block font-bold text-slate-600 mb-1">Desde:</label>
            <input
              type="date"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-xl font-mono text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Fecha Hasta */}
          <div>
            <label className="block font-bold text-slate-600 mb-1">Hasta / Al:</label>
            <input
              type="date"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-xl font-mono text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block font-bold text-slate-600 mb-1">Categoría:</label>
            <select
              value={selectedCategoria}
              onChange={(e) => setSelectedCategoria(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <option value="TODOS">TODAS</option>
              <option value="Conductores">Conductores</option>
              <option value="Inquilinos">Inquilinos</option>
              <option value="Directorio">Directorio</option>
            </select>
          </div>

          {/* Moneda */}
          <div>
            <label className="block font-bold text-slate-600 mb-1">Moneda:</label>
            <select
              value={selectedMoneda}
              onChange={(e) => setSelectedMoneda(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <option value="TODAS">TODAS</option>
              <option value="Bs">Bolivianos (Bs)</option>
              <option value="$us">Dólares ($us)</option>
            </select>
          </div>

          {/* Caja(s) */}
          <div>
            <label className="block font-bold text-slate-600 mb-1">Caja(s):</label>
            <select
              value={selectedCaja}
              onChange={(e) => setSelectedCaja(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <option value="TODAS">TODAS LAS CAJAS</option>
              <option value="c1">Caja General</option>
              <option value="c2">Caja GPS y Mantenimiento</option>
              <option value="c3">Caja Préstamos</option>
            </select>
          </div>

          {/* Cajero (Solo relevante para recaudados, desactivable en deudas) */}
          <div>
            <label className="block font-bold text-slate-600 mb-1">
              {reportTab === 'recaudados' ? 'Cajero(s):' : 'Operador:'}
            </label>
            <select
              value={selectedCajero}
              onChange={(e) => setSelectedCajero(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <option value="TODOS">TODOS</option>
              <option value="DANIELA">Daniela</option>
              <option value="CARLOS">Carlos</option>
              <option value="ADMIN">Admin33</option>
            </select>
          </div>
        </div>

        {/* Quick Actions & Search */}
        <div className="flex flex-wrap justify-between items-center gap-3 pt-2 border-t border-slate-100">
          <div className="relative w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por interno o nombre de socio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-xl text-xs"
            />
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => handleExportExcel(reportTab === 'recaudados' ? 'Ingresos' : 'Deudas')}
              className="flex items-center space-x-1.5 bg-emerald-700 hover:bg-emerald-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Excel</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center space-x-1.5 bg-red-700 hover:bg-red-800 text-white px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir Vista Jasper</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VISTA 1: INGRESOS RECAUDADOS POR SOCIO (JASPERVIEWER MATRIZ) */}
      {/* ========================================================================= */}
      {reportTab === 'recaudados' && (
        <div id="printable-area" className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden p-6 text-slate-800">
          <div className="bg-slate-200/80 border border-slate-300 rounded-lg p-2 flex items-center justify-between text-xs text-slate-600 mb-4 no-print">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-red-700" />
              <span className="font-bold text-slate-800">JasperViewer - Ingresos Recaudados por Socio.jrxml</span>
            </div>
            <div className="flex items-center space-x-3 text-[11px] font-mono">
              <span>Página 1 de 4</span>
              <span>Zoom: 100%</span>
            </div>
          </div>

          <div className="text-center pb-3 border-b-2 border-slate-800 mb-4 space-y-1">
            <h3 className="font-extrabold text-base tracking-wider uppercase text-slate-900">
              RADIO MÓVIL 15 DE ABRIL
            </h3>
            <h2 className="text-lg font-black text-slate-900 tracking-wide uppercase">
              Ingresos Recaudados por Socio
            </h2>
            <p className="text-xs font-mono text-slate-700 font-semibold">
              Desde: <strong>{fechaDesde}</strong> hasta: <strong>{fechaHasta}</strong> | cajero(s): <strong>{selectedCajero}</strong> | categoria: <strong>{selectedCategoria}</strong> | moneda: <strong>{selectedMoneda}</strong> | caja(s): <strong>{selectedCaja}</strong>
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[11px] text-left border-collapse border border-slate-400 font-mono">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-400">
                <tr className="divide-x divide-slate-300 text-center">
                  <th className="p-2 w-16 bg-slate-200 text-slate-900 font-sans">Interno</th>
                  <th className="p-2">Ahorro<br/><span className="text-[9px] text-slate-500">Bs</span></th>
                  <th className="p-2">Jefe de<br/>línea Bs</th>
                  <th className="p-2">Mantenim.<br/>GPS Julio</th>
                  <th className="p-2">Mantenim.<br/>GPS Marzo</th>
                  <th className="p-2">Minuto<br/>punta Bs</th>
                  <th className="p-2">Promanten.<br/>Marzo Bs</th>
                  <th className="p-2">Sostenim.<br/>Bs</th>
                  <th className="p-2">Sostenim.<br/>Pandemia</th>
                  <th className="p-2">Sostenim.<br/>Retrasado</th>
                  <th className="p-2">Colaborac.<br/>Int 25 Bs</th>
                  <th className="p-2">Préstamo<br/>Nuevo Bs</th>
                  <th className="p-2">Interés<br/>Nuevo Bs</th>
                  <th className="p-2">PRO<br/>SEDE Bs</th>
                  <th className="p-2">PRO<br/>GPS 2 Bs</th>
                  <th className="p-2 bg-slate-200 font-extrabold text-slate-900 font-sans">TOTAL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredIngresos.map((row) => {
                  const rowTotal = row.ahorro + row.jefeLinea + row.gpsJulio + row.gpsMarzo + 
                    row.minPunta + row.proMarzo + row.sostenimiento + row.pandemia + row.retrasado + 
                    row.colaboracion + row.prestamo + row.interes + row.proSede + row.proGps2;

                  return (
                    <tr key={row.interno} className="divide-x divide-slate-200 hover:bg-red-50/50 transition">
                      <td className="p-1.5 text-center font-bold text-slate-900 bg-slate-50/80 font-sans">
                        {row.interno}
                      </td>
                      <td className="p-1.5 text-right">{row.ahorro.toFixed(1)}</td>
                      <td className="p-1.5 text-right">{row.jefeLinea.toFixed(1)}</td>
                      <td className="p-1.5 text-right">{row.gpsJulio.toFixed(1)}</td>
                      <td className="p-1.5 text-right">{row.gpsMarzo.toFixed(1)}</td>
                      <td className="p-1.5 text-right">{row.minPunta.toFixed(1)}</td>
                      <td className="p-1.5 text-right">{row.proMarzo.toFixed(1)}</td>
                      <td className="p-1.5 text-right font-semibold">{row.sostenimiento.toFixed(1)}</td>
                      <td className="p-1.5 text-right">{row.pandemia.toFixed(1)}</td>
                      <td className="p-1.5 text-right">{row.retrasado.toFixed(1)}</td>
                      <td className="p-1.5 text-right">{row.colaboracion.toFixed(1)}</td>
                      <td className="p-1.5 text-right text-blue-700 font-bold">{row.prestamo.toFixed(1)}</td>
                      <td className="p-1.5 text-right">{row.interes.toFixed(1)}</td>
                      <td className="p-1.5 text-right">{row.proSede.toFixed(1)}</td>
                      <td className="p-1.5 text-right">{row.proGps2.toFixed(1)}</td>
                      <td className="p-1.5 text-right font-extrabold bg-slate-50 text-slate-900 font-sans">
                        {rowTotal.toFixed(1)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-slate-100 font-bold border-t-2 border-slate-500 divide-x divide-slate-300">
                <tr className="text-right">
                  <td className="p-2 text-center text-slate-900 uppercase font-sans">TOTALES</td>
                  <td className="p-2">{totalsIngresos.ahorro.toFixed(1)}</td>
                  <td className="p-2">{totalsIngresos.jefeLinea.toFixed(1)}</td>
                  <td className="p-2">{totalsIngresos.gpsJulio.toFixed(1)}</td>
                  <td className="p-2">{totalsIngresos.gpsMarzo.toFixed(1)}</td>
                  <td className="p-2">{totalsIngresos.minPunta.toFixed(1)}</td>
                  <td className="p-2">{totalsIngresos.proMarzo.toFixed(1)}</td>
                  <td className="p-2 text-slate-900">{totalsIngresos.sostenimiento.toFixed(1)}</td>
                  <td className="p-2">{totalsIngresos.pandemia.toFixed(1)}</td>
                  <td className="p-2">{totalsIngresos.retrasado.toFixed(1)}</td>
                  <td className="p-2">{totalsIngresos.colaboracion.toFixed(1)}</td>
                  <td className="p-2 text-blue-800">{totalsIngresos.prestamo.toFixed(1)}</td>
                  <td className="p-2">{totalsIngresos.interes.toFixed(1)}</td>
                  <td className="p-2">{totalsIngresos.proSede.toFixed(1)}</td>
                  <td className="p-2">{totalsIngresos.proGps2.toFixed(1)}</td>
                  <td className="p-2 bg-red-100 text-red-900 text-xs font-black font-sans">
                    Bs {grandTotalIngresos.toFixed(1)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-300 flex justify-between items-center text-[10px] text-slate-500 font-mono">
            <span>Reporte: ingresos_recaudados_por_socio.jrxml</span>
            <span>Generado por: admin33 • Sistema SISCOB</span>
            <span>Página 1 de 1</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VISTA 2: DEUDAS PENDIENTES POR SOCIO (EXACTA MATRIZ JASPERVIEWER) */}
      {/* ========================================================================= */}
      {reportTab === 'deudas' && (
        <div id="printable-area" className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden p-6 text-slate-800">
          <div className="bg-slate-200/80 border border-slate-300 rounded-lg p-2 flex items-center justify-between text-xs text-slate-600 mb-4 no-print">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-red-700" />
              <span className="font-bold text-slate-800">JasperViewer - Deudas Pendientes por Socio.jrxml</span>
            </div>
            <div className="flex items-center space-x-3 text-[11px] font-mono">
              <span>Página 1 de 4</span>
              <span>Zoom: 100%</span>
            </div>
          </div>

          <div className="text-center pb-3 border-b-2 border-slate-800 mb-4 space-y-1">
            <h3 className="font-extrabold text-base tracking-wider uppercase text-slate-900">
              RADIO MÓVIL 15 DE ABRIL
            </h3>
            <h2 className="text-lg font-black text-slate-900 tracking-wide uppercase">
              Deudas Pendientes por Socio
            </h2>
            <p className="text-xs font-mono text-slate-700 font-semibold">
              A la fecha: <strong>{fechaHasta}</strong> | categoria: <strong>{selectedCategoria}</strong> | moneda: <strong>{selectedMoneda}</strong> | caja(s): <strong>{selectedCaja}</strong>
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[11px] text-left border-collapse border border-slate-400 font-mono">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-400">
                <tr className="divide-x divide-slate-300 text-center">
                  <th className="p-2 w-16 bg-slate-200 text-slate-900 font-sans">Interno</th>
                  <th className="p-2">Sostenim.<br/>Retrasado</th>
                  <th className="p-2">Inasistenc.<br/>Reunión Bs</th>
                  <th className="p-2">Mantenim.<br/>GPS Julio</th>
                  <th className="p-2">Sostenim.<br/>Pandemia</th>
                  <th className="p-2">Interés<br/>Nuevo Bs</th>
                  <th className="p-2">Préstamo<br/>Nuevo Bs</th>
                  <th className="p-2">Colaborac.<br/>Int 25 Bs</th>
                  <th className="p-2">Promanten.<br/>Marzo Bs</th>
                  <th className="p-2">Guarda<br/>Barro Bs</th>
                  <th className="p-2">Llanta West<br/>Lake Bs</th>
                  <th className="p-2">Mantenim.<br/>GPS Marzo</th>
                  <th className="p-2 bg-red-100 font-extrabold text-red-900 font-sans">TOTAL DEUDA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredDeudas.map((row) => {
                  const rowTotal = row.retrasado + row.inasistencia + row.gpsJulio + row.pandemia + 
                    row.interes + row.prestamo + row.colaboracion + row.promanten + row.guardaBarro + 
                    row.llanta + row.gpsMarzo;

                  return (
                    <tr key={row.interno} className="divide-x divide-slate-200 hover:bg-red-50/50 transition">
                      <td className="p-1.5 text-center font-bold text-slate-900 bg-slate-50/80 font-sans">
                        {row.interno}
                      </td>
                      <td className="p-1.5 text-right">{row.retrasado.toFixed(1)}</td>
                      <td className="p-1.5 text-right text-rose-600 font-bold">{row.inasistencia.toFixed(1)}</td>
                      <td className="p-1.5 text-right">{row.gpsJulio.toFixed(1)}</td>
                      <td className="p-1.5 text-right font-semibold">{row.pandemia.toFixed(1)}</td>
                      <td className="p-1.5 text-right">{row.interes.toFixed(1)}</td>
                      <td className="p-1.5 text-right text-blue-700 font-bold">{row.prestamo.toFixed(1)}</td>
                      <td className="p-1.5 text-right">{row.colaboracion.toFixed(1)}</td>
                      <td className="p-1.5 text-right">{row.promanten.toFixed(1)}</td>
                      <td className="p-1.5 text-right">{row.guardaBarro.toFixed(1)}</td>
                      <td className="p-1.5 text-right">{row.llanta.toFixed(1)}</td>
                      <td className="p-1.5 text-right">{row.gpsMarzo.toFixed(1)}</td>
                      <td className="p-1.5 text-right font-black bg-red-50 text-red-900 font-sans">
                        {rowTotal.toFixed(1)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-slate-100 font-bold border-t-2 border-slate-500 divide-x divide-slate-300">
                <tr className="text-right">
                  <td className="p-2 text-center text-slate-900 uppercase font-sans">TOTALES</td>
                  <td className="p-2">{totalsDeudas.retrasado.toFixed(1)}</td>
                  <td className="p-2 text-rose-700">{totalsDeudas.inasistencia.toFixed(1)}</td>
                  <td className="p-2">{totalsDeudas.gpsJulio.toFixed(1)}</td>
                  <td className="p-2 text-slate-900">{totalsDeudas.pandemia.toFixed(1)}</td>
                  <td className="p-2">{totalsDeudas.interes.toFixed(1)}</td>
                  <td className="p-2 text-blue-800">{totalsDeudas.prestamo.toFixed(1)}</td>
                  <td className="p-2">{totalsDeudas.colaboracion.toFixed(1)}</td>
                  <td className="p-2">{totalsDeudas.promanten.toFixed(1)}</td>
                  <td className="p-2">{totalsDeudas.guardaBarro.toFixed(1)}</td>
                  <td className="p-2">{totalsDeudas.llanta.toFixed(1)}</td>
                  <td className="p-2">{totalsDeudas.gpsMarzo.toFixed(1)}</td>
                  <td className="p-2 bg-red-200 text-red-950 text-xs font-black font-sans">
                    Bs {grandTotalDeudas.toFixed(1)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-300 flex justify-between items-center text-[10px] text-slate-500 font-mono">
            <span>Reporte: deudas_pendientes_por_socio.jrxml</span>
            <span>Generado por: admin33 • Sistema SISCOB</span>
            <span>Página 1 de 1</span>
          </div>
        </div>
      )}
    </div>
  );
}