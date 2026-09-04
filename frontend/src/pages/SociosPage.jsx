import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Calendar, 
  DollarSign, 
  ChevronRight, 
  ChevronLeft,
  UserCheck, 
  Plus, 
  FileText,
  Clock,
  Car,
  QrCode,
  Edit,
  Download,
  Printer,
  ArrowUpDown,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  UserX,
  MessageSquare,
  ShieldCheck,
  ShieldAlert,
  Phone
} from 'lucide-react';
import KardexModal from '../components/KardexModal';
import CredencialModal from '../components/CredencialModal';
import EditSocioModal from '../components/EditSocioModal';
import AsignarCuotaModal from '../components/AsignarCuotaModal';

export default function SociosPage({ 
  socios = [], 
  setSocios, 
  onGoToCobranza, 
  deudas = [], 
  setDeudas,
  onOpenNewSocioModal,
  onUpdateSocio 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('TODOS');
  const [statusTab, setStatusTab] = useState('TODOS'); // 'TODOS' | 'AL_DIA' | 'EN_MORA' | 'SUSPENDIDOS'
  const [sortBy, setSortBy] = useState('movil_asc'); // 'movil_asc' | 'movil_desc' | 'deuda_desc' | 'nombre_asc' | 'antiguedad_desc'
  const [pageSize, setPageSize] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  // Modals state
  const [selectedSocio, setSelectedSocio] = useState(null);
  const [isKardexModalOpen, setIsKardexModalOpen] = useState(false);
  const [isCredencialModalOpen, setIsCredencialModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAsignarCuotaOpen, setIsAsignarCuotaOpen] = useState(false);

  // Helper robusto para calcular antigüedad en "X Años Y Meses"
  const calcularAntiguedad = (fechaIngresoStr) => {
    if (!fechaIngresoStr) return '0 Meses';
    let fechaIng;
    if (fechaIngresoStr.includes('-')) {
      fechaIng = new Date(fechaIngresoStr);
    } else if (fechaIngresoStr.includes('/')) {
      const parts = fechaIngresoStr.split('/');
      if (parts[0].length === 4) {
        fechaIng = new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
      } else {
        fechaIng = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      }
    } else {
      fechaIng = new Date(fechaIngresoStr);
    }

    if (isNaN(fechaIng.getTime())) return '0 Meses';

    const hoy = new Date();
    let anos = hoy.getFullYear() - fechaIng.getFullYear();
    let meses = hoy.getMonth() - fechaIng.getMonth();
    if (meses < 0) {
      anos--;
      meses += 12;
    }
    if (anos <= 0) return `${Math.max(0, meses)} Meses`;
    return `${anos} Años ${meses} Meses`;
  };

  // Mapa de deudas pendientes por socio
  const socioDeudasMap = useMemo(() => {
    const map = {};
    deudas.forEach((d) => {
      if (!d.pagado) {
        map[d.socioId] = (map[d.socioId] || 0) + (parseFloat(d.monto) || 0);
      }
    });
    return map;
  }, [deudas]);

  // Totales KPI Globales
  const kpis = useMemo(() => {
    const total = socios.length;
    let alDia = 0;
    let enMora = 0;
    let suspendidos = 0;
    let carteraTotal = 0;

    socios.forEach((s) => {
      const deuda = socioDeudasMap[s.id] || 0;
      carteraTotal += deuda;
      if (s.estado === 'SUSP' || s.estado === 'BAJA') {
        suspendidos++;
      }
      if (deuda > 0) {
        enMora++;
      } else {
        alDia++;
      }
    });

    return { total, alDia, enMora, suspendidos, carteraTotal };
  }, [socios, socioDeudasMap]);

  // Filtrado compuesto
  const filteredSocios = useMemo(() => {
    return socios.filter((s) => {
      const deuda = socioDeudasMap[s.id] || 0;

      // 1. Búsqueda por texto (móvil, nombre, CI, teléfono, placa, vehículo)
      const movilDisplay = s.nroMovil || (s.id < 10 && s.id >= 0 ? `0${s.id}` : `${s.id}`);
      const searchStr = `${movilDisplay} ${s.id} ${s.nombres} ${s.apPaterno} ${s.apMaterno} ${s.ci} ${s.celular || ''} ${s.placa || ''} ${s.vehiculo || ''}`.toLowerCase();
      const matchesSearch = searchStr.includes(searchTerm.toLowerCase());

      // 2. Categoría
      const matchesCat = selectedCategoria === 'TODOS' || s.categoria === selectedCategoria;

      // 3. Pestaña de Estado
      let matchesTab = true;
      if (statusTab === 'AL_DIA') matchesTab = deuda === 0 && s.estado !== 'SUSP';
      else if (statusTab === 'EN_MORA') matchesTab = deuda > 0;
      else if (statusTab === 'SUSPENDIDOS') matchesTab = s.estado === 'SUSP' || s.estado === 'BAJA';

      return matchesSearch && matchesCat && matchesTab;
    });
  }, [socios, socioDeudasMap, searchTerm, selectedCategoria, statusTab]);

  // Ordenamiento
  const sortedSocios = useMemo(() => {
    const list = [...filteredSocios];
    switch (sortBy) {
      case 'movil_desc':
        return list.sort((a, b) => b.id - a.id);
      case 'deuda_desc':
        return list.sort((a, b) => (socioDeudasMap[b.id] || 0) - (socioDeudasMap[a.id] || 0));
      case 'nombre_asc':
        return list.sort((a, b) => (a.nombres || '').localeCompare(b.nombres || ''));
      case 'antiguedad_desc':
        return list.sort((a, b) => new Date(a.fechaIngreso || 0) - new Date(b.fechaIngreso || 0));
      case 'movil_asc':
      default:
        return list.sort((a, b) => a.id - b.id);
    }
  }, [filteredSocios, sortBy, socioDeudasMap]);

  // Paginación
  const totalPages = pageSize === 'TODOS' ? 1 : Math.max(1, Math.ceil(sortedSocios.length / pageSize));
  const paginatedSocios = useMemo(() => {
    if (pageSize === 'TODOS') return sortedSocios;
    const start = (currentPage - 1) * pageSize;
    return sortedSocios.slice(start, start + pageSize);
  }, [sortedSocios, currentPage, pageSize]);

  // Handlers para modales
  const handleOpenKardex = (socio) => {
    setSelectedSocio(socio);
    setIsKardexModalOpen(true);
  };

  const handleOpenCredencial = (socio) => {
    setSelectedSocio(socio);
    setIsCredencialModalOpen(true);
  };

  const handleOpenEdit = (socio) => {
    setSelectedSocio(socio);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedSocio) => {
    if (onUpdateSocio) {
      onUpdateSocio(updatedSocio);
    } else {
      setSocios((prev) => prev.map((s) => (s.id === updatedSocio.id ? updatedSocio : s)));
    }
  };

  // Cobranza rápida por WhatsApp
  const handleSendWhatsApp = (socio, deuda) => {
    const cleanPhone = (socio.celular || '').replace(/\D/g, '');
    if (!cleanPhone) {
      alert(`El socio #${socio.id} (${socio.nombres} ${socio.apPaterno}) no tiene un número de celular registrado.`);
      return;
    }
    const telefono = cleanPhone.length === 8 ? `591${cleanPhone}` : cleanPhone;
    const mensaje = `Estimado(a) socio(a) ${socio.nombres} ${socio.apPaterno} (Móvil #${socio.id}):\nDe parte de la Administración de Radio Móvil 15 de Abril (SISCOB), le recordamos cordialmente que registra un saldo pendiente de Bs ${deuda.toFixed(2)} por concepto de cuotas/aportes sindicales.\nLe solicitamos pasar por ventanilla para regularizar su situación. ¡Muchas gracias!`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  // Exportar a CSV para Excel
  const handleExportCSV = () => {
    const headers = [
      'Movil_ID',
      'Nombres',
      'ApPaterno',
      'ApMaterno',
      'CI',
      'Celular',
      'Categoria',
      'Estado_Gremial',
      'Placa',
      'Vehiculo',
      'Deuda_Pendiente_Bs',
      'Antiguedad'
    ];
    const rows = sortedSocios.map((s) => {
      const deuda = socioDeudasMap[s.id] || 0;
      return [
        s.id,
        `"${s.nombres || ''}"`,
        `"${s.apPaterno || ''}"`,
        `"${s.apMaterno || ''}"`,
        `"${s.ci || ''}"`,
        `"${s.celular || ''}"`,
        `"${s.categoria || ''}"`,
        s.estado === 'SUSP' ? 'SUSPENDIDO' : deuda > 0 ? 'EN MORA' : 'AL DÍA',
        `"${s.placa || ''}"`,
        `"${s.vehiculo || ''}"`,
        deuda.toFixed(2),
        `"${calcularAntiguedad(s.fechaIngreso)}"`
      ];
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Padron_Socios_SISCOB_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Imprimir nómina oficial
  const handlePrintPadron = () => {
    window.print();
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-5">
      {/* 1. Header Bar Ejecutiva */}
      <div className="flex flex-wrap justify-between items-center bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs gap-4 no-print">
        <div className="space-y-0.5">
          <div className="flex items-center space-x-2.5">
            <div className="bg-red-700 text-white p-2 rounded-xl shadow-xs">
              <Users className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Padrón General de Socios y Afiliados
            </h1>
          </div>
          <p className="text-xs text-slate-500 pl-9">
            Control de membresías, estado de cuentas por cobrar, flota vehicular y credenciales con QR
          </p>
        </div>

        {/* Botones de acción principal */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer border border-slate-200"
            title="Descargar padrón en formato Excel (CSV)"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Exportar Excel</span>
          </button>

          <button
            onClick={handlePrintPadron}
            className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer border border-slate-200"
            title="Imprimir nómina oficial para el Directorio"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>Imprimir Nómina</span>
          </button>

          <button
            onClick={() => { setSelectedSocio(null); setIsAsignarCuotaOpen(true); }}
            className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer border border-slate-200"
            title="Asignar multa o cuota a un socio"
          >
            <ShieldAlert className="w-4 h-4 text-amber-700" />
            <span>+ Multa / Cargo</span>
          </button>

          {onOpenNewSocioModal && (
            <button
              onClick={onOpenNewSocioModal}
              className="flex items-center space-x-2 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-xl text-xs font-black shadow-md transition cursor-pointer transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              <span>NUEVO SOCIO</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Tarjetas KPI de Estado Ejecutivo */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 no-print">
        {/* KPI 1: Total Afiliados */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Total Afiliados
            </span>
            <div className="text-2xl font-black text-slate-900 mt-0.5 font-mono">
              {kpis.total}
            </div>
            <span className="text-[10px] text-slate-400 font-semibold">100% Padrón General</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 2: Solventes / Al Día */}
        <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
              Socios Al Día
            </span>
            <div className="text-2xl font-black text-emerald-700 mt-0.5 font-mono">
              {kpis.alDia}
            </div>
            <span className="text-[10px] text-emerald-600 font-bold">
              {kpis.total > 0 ? Math.round((kpis.alDia / kpis.total) * 100) : 0}% Sin deudas
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 3: En Mora */}
        <div className="bg-white p-4 rounded-2xl border border-red-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-red-800 uppercase tracking-wider block">
              Socios En Mora
            </span>
            <div className="text-2xl font-black text-red-700 mt-0.5 font-mono">
              {kpis.enMora}
            </div>
            <span className="text-[10px] text-red-600 font-bold">
              {kpis.total > 0 ? Math.round((kpis.enMora / kpis.total) * 100) : 0}% Con cuotas atrasadas
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-700 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 4: Deuda Total en Cartera */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
              Cartera por Cobrar
            </span>
            <div className="text-2xl font-black text-red-400 mt-0.5 font-mono">
              Bs {kpis.carteraTotal.toLocaleString('es-BO', { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[10px] text-slate-300 font-medium">Deuda total del gremio</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-white/10 text-red-400 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Barra de Navegación por Segmentos y Filtros */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-3 no-print">
        {/* Pestañas Segmentadas */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => { setStatusTab('TODOS'); setCurrentPage(1); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                statusTab === 'TODOS'
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              TODOS ({kpis.total})
            </button>
            <button
              onClick={() => { setStatusTab('AL_DIA'); setCurrentPage(1); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                statusTab === 'AL_DIA'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800'
              }`}
            >
              AL DÍA ({kpis.alDia})
            </button>
            <button
              onClick={() => { setStatusTab('EN_MORA'); setCurrentPage(1); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                statusTab === 'EN_MORA'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'bg-rose-50 hover:bg-rose-100 text-rose-800'
              }`}
            >
              EN MORA ({kpis.enMora})
            </button>
            {kpis.suspendidos > 0 && (
              <button
                onClick={() => { setStatusTab('SUSPENDIDOS'); setCurrentPage(1); }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                  statusTab === 'SUSPENDIDOS'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900'
                }`}
              >
                SUSPENDIDOS ({kpis.suspendidos})
              </button>
            )}
          </div>

          <div className="text-xs font-semibold text-slate-500">
            Mostrando <strong>{filteredSocios.length}</strong> de {socios.length} afiliados
          </div>
        </div>

        {/* Buscador y Controles de Filtro */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
          {/* Search Omnibox */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por Móvil #, Nombre, C.I., Teléfono, Placa o Vehículo..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-red-500 focus:outline-none bg-slate-50/50 focus:bg-white transition"
            />
          </div>

          {/* Categoría */}
          <div className="sm:col-span-3">
            <select
              value={selectedCategoria}
              onChange={(e) => { setSelectedCategoria(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
            >
              <option value="TODOS">TODAS LAS CATEGORÍAS</option>
              <option value="Propietario">Propietario</option>
              <option value="Inquilino">Inquilino / Relevo</option>
              <option value="Conductores">Conductores</option>
              <option value="Directorio">Directorio</option>
              <option value="Pasivos / Honorarios">Pasivos / Honorarios</option>
            </select>
          </div>

          {/* Ordenamiento */}
          <div className="sm:col-span-3">
            <div className="flex items-center space-x-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-2.5 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
              >
                <option value="movil_asc">Móvil (1 → N)</option>
                <option value="movil_desc">Móvil (N → 1)</option>
                <option value="deuda_desc">Mayor Deuda Primero</option>
                <option value="nombre_asc">Nombre (A → Z)</option>
                <option value="antiguedad_desc">Mayor Antigüedad</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Tabla Principal del Padrón de Socios */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Printable Header (Visible solo al imprimir) */}
        <div className="hidden print:block p-6 text-center border-b border-slate-300 space-y-1">
          <h2 className="text-xl font-black uppercase text-slate-900">RADIO MÓVIL 15 DE ABRIL</h2>
          <p className="text-xs font-bold uppercase text-red-700">Padrón General de Socios y Estado de Deudas</p>
          <p className="text-[10px] text-slate-500 font-mono">
            Generado el: {new Date().toLocaleDateString('es-BO')} • Total Afiliados: {sortedSocios.length} • Cartera: Bs {kpis.carteraTotal.toFixed(2)}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50/80 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-3.5 text-center w-16">Móvil</th>
                <th className="py-3 px-3.5">Afiliado Titular</th>
                <th className="py-3 px-3.5">C.I. / Contacto</th>
                <th className="py-3 px-3.5">Vehículo / Placa</th>
                <th className="py-3 px-3.5">Antigüedad</th>
                <th className="py-3 px-3.5 text-right">Deuda Actual</th>
                <th className="py-3 px-3.5 text-center">Estado</th>
                <th className="py-3 px-3.5 text-right no-print">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {paginatedSocios.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400 space-y-2">
                    <Users className="w-10 h-10 mx-auto text-slate-300" />
                    <p className="font-bold text-sm text-slate-700">
                      {socios.length === 0 ? 'Padrón en Blanco para Este Mes' : 'No se encontraron afiliados'}
                    </p>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      {socios.length === 0 
                        ? 'El sistema está limpio a cero. Puede comenzar a registrar los socios activos de Radio Móvil 15 de Abril.'
                        : 'Prueba ajustando los filtros de búsqueda o categoría.'}
                    </p>
                    {socios.length === 0 && onOpenNewSocioModal && (
                      <button
                        onClick={onOpenNewSocioModal}
                        className="mt-2 inline-flex items-center space-x-2 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-xl text-xs font-black shadow-md transition cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>REGISTRAR PRIMER SOCIO</span>
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                paginatedSocios.map((s) => {
                  const antiguedad = calcularAntiguedad(s.fechaIngreso);
                  const deuda = socioDeudasMap[s.id] || 0;
                  const esSolvente = deuda === 0;
                  const isSusp = s.estado === 'SUSP' || s.estado === 'BAJA';
                  const inicial = (s.nombres || 'S').charAt(0).toUpperCase();

                  return (
                    <tr key={s.id} className="hover:bg-red-50/20 transition-colors group">
                      {/* Móvil */}
                      <td className="py-3 px-3.5 text-center">
                        <span className="inline-flex items-center justify-center font-mono font-black text-xs px-2 py-1 rounded-xl bg-slate-900 text-white shadow-xs">
                          #{s.nroMovil || (s.id < 10 && s.id >= 0 ? `0${s.id}` : s.id)}
                        </span>
                      </td>

                      {/* Afiliado Titular con Avatar */}
                      <td className="py-3 px-3.5">
                        <div className="flex items-center space-x-2.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                            esSolvente 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {inicial}
                          </div>
                          <div>
                            <div className="font-black text-slate-900 group-hover:text-red-700 transition">
                              {s.nombres} {s.apPaterno} {s.apMaterno}
                            </div>
                            <div className="flex items-center space-x-2 text-[10px] text-slate-400">
                              <span className="font-bold text-slate-600">{s.categoria}</span>
                              {s.observaciones && <span>• {s.observaciones}</span>}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* C.I. y Celular */}
                      <td className="py-3 px-3.5">
                        <div className="font-mono text-slate-800 font-bold">CI: {s.ci}</div>
                        {s.celular ? (
                          <span className="text-[11px] text-slate-500 font-mono flex items-center space-x-1">
                            <Phone className="w-3 h-3 text-slate-400 inline" />
                            <span>{s.celular}</span>
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">Sin teléfono</span>
                        )}
                      </td>

                      {/* Vehículo y Placa */}
                      <td className="py-3 px-3.5">
                        {s.placa || s.vehiculo ? (
                          <div>
                            <span className="font-mono font-black text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded text-[11px] border border-slate-200">
                              {s.placa || 'S/P'}
                            </span>
                            <div className="text-[10px] text-slate-500 uppercase mt-0.5 truncate max-w-[150px]">
                              {s.vehiculo || 'No especificado'}
                            </div>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">Sin vehículo asignado</span>
                        )}
                      </td>

                      {/* Antigüedad */}
                      <td className="py-3 px-3.5">
                        <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-200">
                          {antiguedad}
                        </span>
                        <span className="block text-[9px] text-slate-400 font-mono mt-0.5">
                          Desde {s.fechaIngreso || 'N/D'}
                        </span>
                      </td>

                      {/* Deuda Actual */}
                      <td className="py-3 px-3.5 text-right font-mono">
                        {deuda > 0 ? (
                          <div>
                            <span className="text-red-700 font-black text-xs">
                              Bs {deuda.toFixed(2)}
                            </span>
                            <span className="block text-[9px] font-bold text-red-500 uppercase">Mora Activa</span>
                          </div>
                        ) : (
                          <div>
                            <span className="text-emerald-700 font-bold text-xs">
                              Bs 0.00
                            </span>
                            <span className="block text-[9px] font-semibold text-emerald-600 uppercase">Al Día</span>
                          </div>
                        )}
                      </td>

                      {/* Estado */}
                      <td className="py-3 px-3.5 text-center">
                        {isSusp ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-100 text-amber-900 border border-amber-200">
                            SUSPENDIDO
                          </span>
                        ) : deuda > 0 ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-rose-100 text-rose-800 border border-rose-200">
                            EN MORA
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
                            AL DÍA
                          </span>
                        )}
                      </td>

                      {/* Acciones Rápidas */}
                      <td className="py-3 px-3.5 text-right no-print">
                        <div className="flex items-center justify-end space-x-1.5">
                          {/* WhatsApp Reminder (si tiene deuda y teléfono) */}
                          {deuda > 0 && s.celular && (
                            <button
                              onClick={() => handleSendWhatsApp(s, deuda)}
                              className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg transition cursor-pointer"
                              title="Enviar recordatorio de cobro por WhatsApp"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {/* Credencial / Carnet con QR */}
                          <button
                            onClick={() => handleOpenCredencial(s)}
                            className="flex items-center space-x-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 px-2 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer"
                            title="Imprimir Credencial / Carnet con QR"
                          >
                            <QrCode className="w-3.5 h-3.5 text-amber-700" />
                            <span className="hidden sm:inline">Carnet</span>
                          </button>

                          {/* Kardex */}
                          <button
                            onClick={() => handleOpenKardex(s)}
                            className="flex items-center space-x-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer"
                            title="Ver Kardex / Extracto Económico"
                          >
                            <FileText className="w-3.5 h-3.5 text-blue-600" />
                            <span className="hidden sm:inline">Kardex</span>
                          </button>

                          {/* Asignar Multa / Cuota */}
                          <button
                            onClick={() => { setSelectedSocio(s); setIsAsignarCuotaOpen(true); }}
                            className="flex items-center space-x-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 px-2 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer"
                            title="Asignar Multa o Cuota a este socio"
                          >
                            <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                            <span className="hidden xl:inline">+ Multa</span>
                          </button>

                          {/* Editar Socio */}
                          <button
                            onClick={() => handleOpenEdit(s)}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition cursor-pointer"
                            title="Editar datos del socio y vehículo"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>

                          {/* Cobrar en Ventanilla */}
                          <button
                            onClick={() => onGoToCobranza(s.id)}
                            className="flex items-center space-x-1 bg-red-700 hover:bg-red-800 text-white px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition cursor-pointer shadow-xs"
                            title="Cobrar en Ventanilla"
                          >
                            <DollarSign className="w-3.5 h-3.5" />
                            <span>Cobrar</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación y Control de Registros */}
        <div className="p-4 bg-slate-50/80 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 no-print">
          <div className="flex items-center space-x-2">
            <span>Mostrar:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                const val = e.target.value === 'TODOS' ? 'TODOS' : parseInt(e.target.value);
                setPageSize(val);
                setCurrentPage(1);
              }}
              className="bg-white border border-slate-300 rounded-lg px-2 py-1 font-bold text-xs focus:outline-none"
            >
              <option value={10}>10 por pág.</option>
              <option value={15}>15 por pág.</option>
              <option value={25}>25 por pág.</option>
              <option value={50}>50 por pág.</option>
              <option value="TODOS">Todos</option>
            </select>
            <span className="text-slate-400">|</span>
            <span>
              Total: <strong>{sortedSocios.length}</strong> registros
            </span>
          </div>

          {pageSize !== 'TODOS' && totalPages > 1 && (
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="px-3 py-1 font-bold text-slate-700">
                Página {currentPage} de {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Firmas Oficiales para Impresión (Solo visible al imprimir) */}
        <div className="hidden print:flex justify-around items-end pt-20 pb-8 text-center text-xs">
          <div className="border-t border-slate-900 w-64 pt-2">
            <span className="font-black block uppercase">Presidente del Directorio</span>
            <span className="text-[10px] text-slate-500">Radio Móvil 15 de Abril</span>
          </div>
          <div className="border-t border-slate-900 w-64 pt-2">
            <span className="font-black block uppercase">Secretario de Hacienda</span>
            <span className="text-[10px] text-slate-500">Comisión de Cobranzas</span>
          </div>
        </div>
      </div>

      {/* Modales */}
      <KardexModal
        isOpen={isKardexModalOpen}
        onClose={() => setIsKardexModalOpen(false)}
        socio={selectedSocio}
        deudas={deudas}
      />

      <CredencialModal
        isOpen={isCredencialModalOpen}
        onClose={() => setIsCredencialModalOpen(false)}
        socio={selectedSocio}
      />

      <EditSocioModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        socio={selectedSocio}
        onSave={handleSaveEdit}
      />

      <AsignarCuotaModal
        isOpen={isAsignarCuotaOpen}
        onClose={() => setIsAsignarCuotaOpen(false)}
        socio={selectedSocio}
        socios={socios}
        setDeudas={setDeudas}
      />
    </div>
  );
}