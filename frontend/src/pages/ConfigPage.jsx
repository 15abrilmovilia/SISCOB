import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Ruler, 
  Package, 
  BadgePercent, 
  Sliders, 
  DollarSign, 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  CheckCircle2, 
  FolderTree, 
  X, 
  AlertCircle,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const CFG_KEYS = {
  GRUPOS_INGRESO: 'siscob_cfg_grupos_ingreso',
  GRUPOS_EGRESO: 'siscob_cfg_grupos_egreso',
  UNIDADES: 'siscob_cfg_unidades',
  PRODUCTOS: 'siscob_cfg_productos',
  CATEGORIAS: 'siscob_cfg_categorias',
  PARAMETROS: 'siscob_cfg_parametros',
  TIPO_CAMBIO: 'siscob_cfg_tipo_cambio'
};

const DEFAULT_GRUPOS_INGRESO = [
  { id: 'gi-1', codigo: 'ING-01', nombre: 'Aportes de Sostenimiento y Radio', conceptosCount: 4, orden: 1 },
  { id: 'gi-2', codigo: 'ING-02', nombre: 'Servicios de Monitoreo GPS', conceptosCount: 2, orden: 2 },
  { id: 'gi-3', codigo: 'ING-03', nombre: 'Multas y Sanciones Disciplinarias', conceptosCount: 5, orden: 3 },
  { id: 'gi-4', codigo: 'ING-04', nombre: 'Cartera y Amortización de Préstamos', conceptosCount: 2, orden: 4 },
  { id: 'gi-5', codigo: 'ING-05', nombre: 'Venta de Insumos y Repuestos Almacén', conceptosCount: 6, orden: 5 },
];

const DEFAULT_GRUPOS_EGRESO = [
  { id: 'ge-1', codigo: 'EGR-01', nombre: 'Planilla de Operadores y Personal', conceptosCount: 3, orden: 1 },
  { id: 'ge-2', codigo: 'EGR-02', nombre: 'Mantenimiento de Antenas y Frecuencia', conceptosCount: 4, orden: 2 },
  { id: 'ge-3', codigo: 'EGR-03', nombre: 'Alquiler y Servicios Básicos de Sede', conceptosCount: 4, orden: 3 },
  { id: 'ge-4', codigo: 'EGR-04', nombre: 'Fondo de Auxilio y Solidaridad', conceptosCount: 2, orden: 4 },
  { id: 'ge-5', codigo: 'EGR-05', nombre: 'Gastos de Administración y Papelería', conceptosCount: 5, orden: 5 },
];

const DEFAULT_UNIDADES = [
  { id: 'u1', codigo: 'PZA', nombre: 'Pieza / Unidad', descripcion: 'Para repuestos y uniformes', activo: true },
  { id: 'u2', codigo: 'GLN', nombre: 'Galón (3.785 L)', descripcion: 'Aceites y lubricantes pesados', activo: true },
  { id: 'u3', codigo: 'LTR', nombre: 'Litro', descripcion: 'Líquidos de freno y refrigerantes', activo: true },
  { id: 'u4', codigo: 'TAL', nombre: 'Talonario', descripcion: 'Boletas de carrera y recibos', activo: true },
  { id: 'u5', codigo: 'PAR', nombre: 'Par', descripcion: 'Guardabarros y guantes', activo: true },
  { id: 'u6', codigo: 'CAJ', nombre: 'Caja', descripcion: 'Insumos en lote', activo: true },
];

const DEFAULT_PRODUCTOS = [
  { id: 'p1', codigo: 'PROD-001', nombre: 'Aceite Motor 20W-50 Multigrado', unidad: 'GLN', costo: 110.0, precio: 135.0, stockMin: 5, stock: 12 },
  { id: 'p2', codigo: 'PROD-002', nombre: 'Guardabarro Trasero Institucional 15A', unidad: 'PAR', costo: 60.0, precio: 80.0, stockMin: 10, stock: 24 },
  { id: 'p3', codigo: 'PROD-003', nombre: 'Llanta Radial West Lake 185/70 R14', unidad: 'PZA', costo: 380.0, precio: 430.0, stockMin: 4, stock: 8 },
  { id: 'p4', codigo: 'PROD-004', nombre: 'Talonario Oficial Boletas de Carrera', unidad: 'TAL', costo: 12.0, precio: 18.0, stockMin: 20, stock: 65 },
  { id: 'p5', codigo: 'PROD-005', nombre: 'Antena Móvil VHF con Base Imantada', unidad: 'PZA', costo: 150.0, precio: 190.0, stockMin: 3, stock: 6 },
  { id: 'p6', codigo: 'PROD-006', nombre: 'Chaleco Reflectivo con Logo Móvil 15', unidad: 'PZA', costo: 35.0, precio: 45.0, stockMin: 15, stock: 38 },
];

const DEFAULT_CATEGORIAS = [
  { id: 'cat-1', codigo: 'PROP', nombre: 'Socio Propietario (1 Móvil)', cuotaSost: 400.0, cuotaGPS: 80.0, moraDias: 10, activos: 145 },
  { id: 'cat-2', codigo: 'P-MULT', nombre: 'Propietario Flota / Multimóvil', cuotaSost: 350.0, cuotaGPS: 70.0, moraDias: 10, activos: 25 },
  { id: 'cat-3', codigo: 'INQ', nombre: 'Conductor Inquilino / Relevo', cuotaSost: 150.0, cuotaGPS: 80.0, moraDias: 5, activos: 60 },
  { id: 'cat-4', codigo: 'ASAL', nombre: 'Conductor Asalariado Fijo', cuotaSost: 100.0, cuotaGPS: 40.0, moraDias: 15, activos: 18 },
  { id: 'cat-5', codigo: 'HON', nombre: 'Socio Honorario / Fundador', cuotaSost: 0.0, cuotaGPS: 0.0, moraDias: 30, activos: 8 },
];

const DEFAULT_PARAMETROS = {
  nombreInstitucion: 'RADIO MÓVIL 15 DE ABRIL S.R.L.',
  sigla: 'SISCOB',
  nit: '348912028',
  direccion: 'Av. Las Américas esq. C. Sucre, Tarija, Bolivia',
  telefono: '(+591) 4 664-1515',
  ciudad: 'Tarija - Bolivia',
  diasToleranciaMora: 15,
  porcentajeMultaAtraso: 5.0,
  pieRecibo: 'Gracias por su puntual aporte. Radio Móvil 15 de Abril al servicio de Tarija.',
  pieEgreso: 'Comprobante formal emitido con respaldo de directiva y tesorería.',
  anularSoloAdmin: true,
  exigirBeneficiarioEgreso: true,
  permitirPagoParcial: true
};

const DEFAULT_TIPO_CAMBIO = {
  oficial: 6.96,
  cobro: 9.80,
  ultimoAjuste: '02/09/2026 08:30',
  monedaPrincipal: 'Bs',
  permitirCobroDolar: true,
  historial: [
    { fecha: '01/09/2026 08:30', oficial: 6.96, cobro: 9.80, operador: 'admin33' },
    { fecha: '15/08/2026 09:15', oficial: 6.96, cobro: 9.50, operador: 'admin33' },
    { fecha: '01/08/2026 08:00', oficial: 6.96, cobro: 9.20, operador: 'admin33' },
    { fecha: '01/07/2026 10:20', oficial: 6.96, cobro: 8.90, operador: 'admin33' }
  ]
};

export default function ConfigPage({ printMode, setPrintMode, currentUser }) {
  const [activeSubTab, setActiveSubTab] = useState('agrupar');

  // Persisted States
  const [gruposIngreso, setGruposIngreso] = useState(() => loadFromStorage(CFG_KEYS.GRUPOS_INGRESO, DEFAULT_GRUPOS_INGRESO));
  const [gruposEgreso, setGruposEgreso] = useState(() => loadFromStorage(CFG_KEYS.GRUPOS_EGRESO, DEFAULT_GRUPOS_EGRESO));
  const [unidades, setUnidades] = useState(() => loadFromStorage(CFG_KEYS.UNIDADES, DEFAULT_UNIDADES));
  const [productos, setProductos] = useState(() => loadFromStorage(CFG_KEYS.PRODUCTOS, DEFAULT_PRODUCTOS));
  const [categoriasCobro, setCategoriasCobro] = useState(() => loadFromStorage(CFG_KEYS.CATEGORIAS, DEFAULT_CATEGORIAS));
  const [parametros, setParametros] = useState(() => loadFromStorage(CFG_KEYS.PARAMETROS, DEFAULT_PARAMETROS));
  const [tipoCambio, setTipoCambio] = useState(() => loadFromStorage(CFG_KEYS.TIPO_CAMBIO, DEFAULT_TIPO_CAMBIO));

  // Sync with LocalStorage
  useEffect(() => { saveToStorage(CFG_KEYS.GRUPOS_INGRESO, gruposIngreso); }, [gruposIngreso]);
  useEffect(() => { saveToStorage(CFG_KEYS.GRUPOS_EGRESO, gruposEgreso); }, [gruposEgreso]);
  useEffect(() => { saveToStorage(CFG_KEYS.UNIDADES, unidades); }, [unidades]);
  useEffect(() => { saveToStorage(CFG_KEYS.PRODUCTOS, productos); }, [productos]);
  useEffect(() => { saveToStorage(CFG_KEYS.CATEGORIAS, categoriasCobro); }, [categoriasCobro]);
  useEffect(() => { saveToStorage(CFG_KEYS.PARAMETROS, parametros); }, [parametros]);
  useEffect(() => { saveToStorage(CFG_KEYS.TIPO_CAMBIO, tipoCambio); }, [tipoCambio]);

  // Notifications Toast
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Modal State
  const [modal, setModal] = useState({
    isOpen: false,
    type: '', // 'grupo_ingreso' | 'grupo_egreso' | 'unidad' | 'producto' | 'categoria'
    isEdit: false,
    formData: {}
  });

  const openModal = (type, isEdit = false, item = null) => {
    let initialData = {};
    if (isEdit && item) {
      initialData = { ...item };
    } else {
      if (type === 'grupo_ingreso') initialData = { codigo: `ING-0${gruposIngreso.length + 1}`, nombre: '', orden: gruposIngreso.length + 1 };
      if (type === 'grupo_egreso') initialData = { codigo: `EGR-0${gruposEgreso.length + 1}`, nombre: '', orden: gruposEgreso.length + 1 };
      if (type === 'unidad') initialData = { codigo: '', nombre: '', descripcion: '', activo: true };
      if (type === 'producto') initialData = { codigo: `PROD-00${productos.length + 1}`, nombre: '', unidad: unidades[0]?.codigo || 'PZA', costo: 0, precio: 0, stockMin: 5, stock: 10 };
      if (type === 'categoria') initialData = { codigo: '', nombre: '', cuotaSost: 350, cuotaGPS: 80, moraDias: 10, activos: 0 };
    }
    setModal({ isOpen: true, type, isEdit, formData: initialData });
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: '', isEdit: false, formData: {} });
  };

  const handleModalSave = (e) => {
    e.preventDefault();
    const { type, isEdit, formData } = modal;

    if (type === 'grupo_ingreso') {
      if (isEdit) {
        setGruposIngreso(gruposIngreso.map(g => g.id === formData.id ? formData : g));
      } else {
        setGruposIngreso([...gruposIngreso, { ...formData, id: `gi-${Date.now()}`, conceptosCount: 0 }]);
      }
      showToast('Agrupador de Ingresos guardado correctamente');
    } else if (type === 'grupo_egreso') {
      if (isEdit) {
        setGruposEgreso(gruposEgreso.map(g => g.id === formData.id ? formData : g));
      } else {
        setGruposEgreso([...gruposEgreso, { ...formData, id: `ge-${Date.now()}`, conceptosCount: 0 }]);
      }
      showToast('Agrupador de Egresos guardado correctamente');
    } else if (type === 'unidad') {
      if (isEdit) {
        setUnidades(unidades.map(u => u.id === formData.id ? formData : u));
      } else {
        setUnidades([...unidades, { ...formData, id: `u-${Date.now()}`, codigo: formData.codigo.toUpperCase() }]);
      }
      showToast('Unidad de medida guardada correctamente');
    } else if (type === 'producto') {
      const parsed = {
        ...formData,
        costo: parseFloat(formData.costo) || 0,
        precio: parseFloat(formData.precio) || 0,
        stockMin: parseInt(formData.stockMin) || 0,
        stock: parseInt(formData.stock) || 0,
      };
      if (isEdit) {
        setProductos(productos.map(p => p.id === formData.id ? parsed : p));
      } else {
        setProductos([...productos, { ...parsed, id: `p-${Date.now()}` }]);
      }
      showToast('Producto del catálogo guardado correctamente');
    } else if (type === 'categoria') {
      const parsed = {
        ...formData,
        codigo: formData.codigo.toUpperCase(),
        cuotaSost: parseFloat(formData.cuotaSost) || 0,
        cuotaGPS: parseFloat(formData.cuotaGPS) || 0,
        moraDias: parseInt(formData.moraDias) || 0,
        activos: parseInt(formData.activos) || 0,
      };
      if (isEdit) {
        setCategoriasCobro(categoriasCobro.map(c => c.id === formData.id ? parsed : c));
      } else {
        setCategoriasCobro([...categoriasCobro, { ...parsed, id: `cat-${Date.now()}` }]);
      }
      showToast('Categoría de socio guardada correctamente');
    }

    closeModal();
  };

  // Delete handlers with confirmation
  const handleDeleteGrupoIngreso = (id) => {
    if (window.confirm('¿Está seguro de eliminar este agrupador de ingresos?')) {
      setGruposIngreso(gruposIngreso.filter(g => g.id !== id));
      showToast('Agrupador de ingresos eliminado');
    }
  };

  const handleDeleteGrupoEgreso = (id) => {
    if (window.confirm('¿Está seguro de eliminar este agrupador de egresos?')) {
      setGruposEgreso(gruposEgreso.filter(g => g.id !== id));
      showToast('Agrupador de egresos eliminado');
    }
  };

  const handleDeleteUnidad = (id) => {
    if (window.confirm('¿Está seguro de eliminar esta unidad de medida?')) {
      setUnidades(unidades.filter(u => u.id !== id));
      showToast('Unidad de medida eliminada');
    }
  };

  const toggleUnidadActiva = (id) => {
    setUnidades(unidades.map(u => u.id === id ? { ...u, activo: !u.activo } : u));
    showToast('Estado de unidad actualizado');
  };

  const handleDeleteProducto = (id) => {
    if (window.confirm('¿Está seguro de eliminar este producto del catálogo?')) {
      setProductos(productos.filter(p => p.id !== id));
      showToast('Producto eliminado del catálogo');
    }
  };

  const handleDeleteCategoria = (id) => {
    if (window.confirm('¿Está seguro de eliminar esta categoría de cobro?')) {
      setCategoriasCobro(categoriasCobro.filter(c => c.id !== id));
      showToast('Categoría de cobro eliminada');
    }
  };

  // Exchange rate update handler
  const [nuevoTipoCobro, setNuevoTipoCobro] = useState(tipoCambio.cobro);
  const handleActualizarTipoCambio = (e) => {
    e.preventDefault();
    const val = parseFloat(nuevoTipoCobro);
    if (!val || val <= 0) {
      alert('Ingrese un tipo de cambio válido.');
      return;
    }

    const nowStr = new Date().toLocaleString('es-BO', { 
      day: '2-digit', month: '2-digit', year: 'numeric', 
      hour: '2-digit', minute: '2-digit' 
    });

    const nuevoHistorial = [
      { 
        fecha: nowStr, 
        oficial: tipoCambio.oficial, 
        cobro: val, 
        operador: currentUser?.nombre || currentUser?.id || 'admin33' 
      },
      ...tipoCambio.historial
    ];

    setTipoCambio({
      ...tipoCambio,
      cobro: val,
      ultimoAjuste: nowStr,
      historial: nuevoHistorial
    });

    showToast(`Tipo de cambio de cobro actualizado a ${val.toFixed(2)} Bs/$us y registrado en el historial.`);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-5 animate-fadeIn">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-700 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center space-x-3 text-xs font-bold animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap justify-between items-center gap-3">
        <div>
          <h1 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
            <Settings className="w-5 h-5 text-red-700" />
            <span>Configuración General del Sistema SISCOB</span>
          </h1>
          <p className="text-xs text-slate-500">
            Administración completa de agrupadores contables, unidades, productos, tarifas y tipo de cambio
          </p>
        </div>

        <button
          onClick={() => {
            saveToStorage(CFG_KEYS.PARAMETROS, parametros);
            saveToStorage(CFG_KEYS.GRUPOS_INGRESO, gruposIngreso);
            saveToStorage(CFG_KEYS.GRUPOS_EGRESO, gruposEgreso);
            saveToStorage(CFG_KEYS.UNIDADES, unidades);
            saveToStorage(CFG_KEYS.PRODUCTOS, productos);
            saveToStorage(CFG_KEYS.CATEGORIAS, categoriasCobro);
            saveToStorage(CFG_KEYS.TIPO_CAMBIO, tipoCambio);
            showToast('¡Todas las configuraciones y parámetros han sido guardados exitosamente!');
          }}
          className="flex items-center space-x-1.5 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer active:scale-95"
        >
          <Save className="w-4 h-4" />
          <span>Guardar Todo</span>
        </button>
      </div>

      {/* Subwindows Navigation Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-wrap gap-1.5 text-xs font-extrabold">
          <button
            onClick={() => setActiveSubTab('agrupar')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl transition cursor-pointer ${
              activeSubTab === 'agrupar'
                ? 'bg-red-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span>Agrupar Ingresos + Egresos</span>
          </button>

          <button
            onClick={() => setActiveSubTab('unidades')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl transition cursor-pointer ${
              activeSubTab === 'unidades'
                ? 'bg-red-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Ruler className="w-4 h-4" />
            <span>Unidades de Medida</span>
          </button>

          <button
            onClick={() => setActiveSubTab('productos')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl transition cursor-pointer ${
              activeSubTab === 'productos'
                ? 'bg-red-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Productos / Almacén</span>
          </button>

          <button
            onClick={() => setActiveSubTab('categorias')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl transition cursor-pointer ${
              activeSubTab === 'categorias'
                ? 'bg-red-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BadgePercent className="w-4 h-4" />
            <span>Categorías Cobro</span>
          </button>

          <button
            onClick={() => setActiveSubTab('parametros')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl transition cursor-pointer ${
              activeSubTab === 'parametros'
                ? 'bg-red-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Parámetros Generales</span>
          </button>

          <button
            onClick={() => setActiveSubTab('tipo_cambio')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl transition cursor-pointer ${
              activeSubTab === 'tipo_cambio'
                ? 'bg-red-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Tipo de Cambio</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUBVENTANA 1: AGRUPAR INGRESOS + EGRESOS */}
      {/* ========================================================================= */}
      {activeSubTab === 'agrupar' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Grupos de Ingresos */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <h3 className="font-extrabold text-slate-900 text-sm uppercase">
                  Agrupadores de Ingresos
                </h3>
              </div>
              <button
                onClick={() => openModal('grupo_ingreso', false)}
                className="flex items-center space-x-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Nuevo Grupo</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-semibold">
                  <tr>
                    <th className="p-2.5">Código</th>
                    <th className="p-2.5">Nombre del Agrupador</th>
                    <th className="p-2.5 text-center">Conceptos</th>
                    <th className="p-2.5 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {gruposIngreso.map((g) => (
                    <tr key={g.id} className="hover:bg-slate-50">
                      <td className="p-2.5 font-mono font-bold text-slate-700">{g.codigo}</td>
                      <td className="p-2.5 font-bold text-slate-900">{g.nombre}</td>
                      <td className="p-2.5 text-center">
                        <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {g.conceptosCount} asignados
                        </span>
                      </td>
                      <td className="p-2.5 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <button 
                            onClick={() => openModal('grupo_ingreso', true, g)}
                            className="text-slate-400 hover:text-blue-600 p-1 cursor-pointer"
                            title="Editar"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteGrupoIngreso(g.id)}
                            className="text-slate-400 hover:text-red-700 p-1 cursor-pointer"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Grupos de Egresos */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                <h3 className="font-extrabold text-slate-900 text-sm uppercase">
                  Agrupadores de Egresos (Gastos)
                </h3>
              </div>
              <button
                onClick={() => openModal('grupo_egreso', false)}
                className="flex items-center space-x-1 bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Nuevo Grupo</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-semibold">
                  <tr>
                    <th className="p-2.5">Código</th>
                    <th className="p-2.5">Nombre del Agrupador</th>
                    <th className="p-2.5 text-center">Conceptos</th>
                    <th className="p-2.5 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {gruposEgreso.map((g) => (
                    <tr key={g.id} className="hover:bg-slate-50">
                      <td className="p-2.5 font-mono font-bold text-slate-700">{g.codigo}</td>
                      <td className="p-2.5 font-bold text-slate-900">{g.nombre}</td>
                      <td className="p-2.5 text-center">
                        <span className="bg-red-50 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {g.conceptosCount} asignados
                        </span>
                      </td>
                      <td className="p-2.5 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <button 
                            onClick={() => openModal('grupo_egreso', true, g)}
                            className="text-slate-400 hover:text-blue-600 p-1 cursor-pointer"
                            title="Editar"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteGrupoEgreso(g.id)}
                            className="text-slate-400 hover:text-red-700 p-1 cursor-pointer"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBVENTANA 2: UNIDADES DE MEDIDA */}
      {/* ========================================================================= */}
      {activeSubTab === 'unidades' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm uppercase">
                Catálogo de Unidades de Medida
              </h3>
              <p className="text-xs text-slate-500">Unidades de medida para repuestos, lubricantes y material de oficina</p>
            </div>
            <button
              onClick={() => openModal('unidad', false)}
              className="flex items-center space-x-1 bg-red-700 hover:bg-red-800 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nueva Unidad</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold">
                <tr>
                  <th className="p-3">Código</th>
                  <th className="p-3">Nombre de la Unidad</th>
                  <th className="p-3">Descripción / Uso</th>
                  <th className="p-3 text-center">Estado</th>
                  <th className="p-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {unidades.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-extrabold text-red-700">{u.codigo}</td>
                    <td className="p-3 font-bold text-slate-900">{u.nombre}</td>
                    <td className="p-3 text-slate-600">{u.descripcion}</td>
                    <td className="p-3 text-center">
                      <button 
                        onClick={() => toggleUnidadActiva(u.id)}
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full cursor-pointer transition ${
                          u.activo ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                        }`}
                      >
                        {u.activo ? 'ACTIVO' : 'INACTIVO'}
                      </button>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center space-x-1.5">
                        <button
                          onClick={() => openModal('unidad', true, u)}
                          className="text-slate-400 hover:text-blue-600 p-1 cursor-pointer"
                          title="Editar"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteUnidad(u.id)}
                          className="text-slate-400 hover:text-red-700 p-1 cursor-pointer"
                          title="Eliminar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBVENTANA 3: PRODUCTOS / ALMACÉN */}
      {/* ========================================================================= */}
      {activeSubTab === 'productos' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm uppercase">
                Catálogo de Productos e Insumos Institucionales
              </h3>
              <p className="text-xs text-slate-500">Artículos disponibles para venta o entrega a socios de Radio Móvil 15 de Abril</p>
            </div>
            <button
              onClick={() => openModal('producto', false)}
              className="flex items-center space-x-1 bg-red-700 hover:bg-red-800 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nuevo Producto</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold">
                <tr>
                  <th className="p-3">Código</th>
                  <th className="p-3">Descripción del Producto</th>
                  <th className="p-3 text-center">Unidad</th>
                  <th className="p-3 text-right">Costo (Bs)</th>
                  <th className="p-3 text-right">Precio Venta (Bs)</th>
                  <th className="p-3 text-center">Stock Mínimo</th>
                  <th className="p-3 text-center">Stock Actual</th>
                  <th className="p-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {productos.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-700">{p.codigo}</td>
                    <td className="p-3 font-bold text-slate-900">{p.nombre}</td>
                    <td className="p-3 text-center font-mono font-semibold text-slate-600">{p.unidad}</td>
                    <td className="p-3 font-mono text-right text-slate-600">Bs {p.costo.toFixed(2)}</td>
                    <td className="p-3 font-mono font-bold text-right text-emerald-700">Bs {p.precio.toFixed(2)}</td>
                    <td className="p-3 text-center font-mono text-slate-500">{p.stockMin}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full font-mono font-bold text-xs ${
                        p.stock <= p.stockMin ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-800'
                      }`}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center space-x-1.5">
                        <button
                          onClick={() => openModal('producto', true, p)}
                          className="text-slate-400 hover:text-blue-600 p-1 cursor-pointer"
                          title="Editar"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProducto(p.id)}
                          className="text-slate-400 hover:text-red-700 p-1 cursor-pointer"
                          title="Eliminar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBVENTANA 4: CATEGORÍAS COBRO */}
      {/* ========================================================================= */}
      {activeSubTab === 'categorias' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm uppercase">
                Categorías de Afiliados y Cuotas Base
              </h3>
              <p className="text-xs text-slate-500">Tarifario de cuotas mensuales y días de tolerancia para mora según categoría</p>
            </div>
            <button
              onClick={() => openModal('categoria', false)}
              className="flex items-center space-x-1 bg-red-700 hover:bg-red-800 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nueva Categoría</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold">
                <tr>
                  <th className="p-3">Código</th>
                  <th className="p-3">Nombre de la Categoría</th>
                  <th className="p-3 text-right">Cuota Sostenimiento</th>
                  <th className="p-3 text-right">Cuota Monitoreo GPS</th>
                  <th className="p-3 text-center">Tolerancia Mora</th>
                  <th className="p-3 text-center">Socios Activos</th>
                  <th className="p-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categoriasCobro.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-red-700">{c.codigo}</td>
                    <td className="p-3 font-bold text-slate-900">{c.nombre}</td>
                    <td className="p-3 font-mono font-bold text-right text-slate-900">Bs {c.cuotaSost.toFixed(2)}</td>
                    <td className="p-3 font-mono font-semibold text-right text-slate-700">Bs {c.cuotaGPS.toFixed(2)}</td>
                    <td className="p-3 text-center font-mono">{c.moraDias} días</td>
                    <td className="p-3 text-center">
                      <span className="bg-blue-50 text-blue-800 font-mono font-bold px-2 py-0.5 rounded-full text-[11px]">
                        {c.activos} afiliados
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center space-x-1.5">
                        <button
                          onClick={() => openModal('categoria', true, c)}
                          className="text-slate-400 hover:text-blue-600 p-1 cursor-pointer"
                          title="Editar"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategoria(c.id)}
                          className="text-slate-400 hover:text-red-700 p-1 cursor-pointer"
                          title="Eliminar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBVENTANA 5: PARÁMETROS DEL SISTEMA */}
      {/* ========================================================================= */}
      {activeSubTab === 'parametros' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          {/* Datos Institucionales */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="border-b pb-2">
              <h3 className="font-extrabold text-slate-900 uppercase">Datos de la Empresa / Sindicato</h3>
              <p className="text-[11px] text-slate-500">Aparecen en el encabezado de boletas y balances</p>
            </div>

            <div className="space-y-2.5">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Razón Social:</label>
                <input
                  type="text"
                  value={parametros.nombreInstitucion}
                  onChange={(e) => setParametros({ ...parametros, nombreInstitucion: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg font-bold"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">NIT:</label>
                  <input
                    type="text"
                    value={parametros.nit}
                    onChange={(e) => setParametros({ ...parametros, nit: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Teléfono:</label>
                  <input
                    type="text"
                    value={parametros.telefono}
                    onChange={(e) => setParametros({ ...parametros, telefono: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Dirección Central:</label>
                <input
                  type="text"
                  value={parametros.direccion}
                  onChange={(e) => setParametros({ ...parametros, direccion: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tolerancia Mora (Días):</label>
                  <input
                    type="number"
                    value={parametros.diasToleranciaMora}
                    onChange={(e) => setParametros({ ...parametros, diasToleranciaMora: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">% Multa Atraso:</label>
                  <input
                    type="number"
                    step="0.5"
                    value={parametros.porcentajeMultaAtraso}
                    onChange={(e) => setParametros({ ...parametros, porcentajeMultaAtraso: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Formato de Impresión y Recibos */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="border-b pb-2">
              <h3 className="font-extrabold text-slate-900 uppercase">Configuración de Impresora y Tickets</h3>
              <p className="text-[11px] text-slate-500">Parámetros predeterminados de caja</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Formato de Ticket Predeterminado:</label>
                <div className="flex space-x-4 pt-1">
                  <label className="flex items-center space-x-2 cursor-pointer font-semibold">
                    <input
                      type="radio"
                      name="printFormat"
                      value="termico"
                      checked={printMode === 'termico'}
                      onChange={() => setPrintMode('termico')}
                      className="text-red-700"
                    />
                    <span>Térmica 80mm / 58mm</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer font-semibold">
                    <input
                      type="radio"
                      name="printFormat"
                      value="carta"
                      checked={printMode === 'carta'}
                      onChange={() => setPrintMode('carta')}
                      className="text-red-700"
                    />
                    <span>Hoja Carta / A4</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Pie de Ticket Térmico:</label>
                <textarea
                  rows="2"
                  value={parametros.pieRecibo}
                  onChange={(e) => setParametros({ ...parametros, pieRecibo: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Pie de Egreso / Gasto:</label>
                <textarea
                  rows="2"
                  value={parametros.pieEgreso}
                  onChange={(e) => setParametros({ ...parametros, pieEgreso: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 font-medium">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={parametros.anularSoloAdmin}
                    onChange={(e) => setParametros({ ...parametros, anularSoloAdmin: e.target.checked })}
                    className="rounded text-red-700"
                  />
                  <span>Solo Administradores pueden anular cobros y egresos</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={parametros.exigirBeneficiarioEgreso}
                    onChange={(e) => setParametros({ ...parametros, exigirBeneficiarioEgreso: e.target.checked })}
                    className="rounded text-red-700"
                  />
                  <span>Exigir beneficiario y concepto obligatorio en egresos</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={parametros.permitirPagoParcial}
                    onChange={(e) => setParametros({ ...parametros, permitirPagoParcial: e.target.checked })}
                    className="rounded text-red-700"
                  />
                  <span>Permitir pagos parciales y amortizaciones de cuotas</span>
                </label>
              </div>

              <button
                onClick={() => {
                  saveToStorage(CFG_KEYS.PARAMETROS, parametros);
                  showToast('Parámetros guardados y sincronizados correctamente.');
                }}
                className="w-full py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-xl font-bold text-xs uppercase flex items-center justify-center space-x-2 shadow-xs transition cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Parámetros</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBVENTANA 6: TIPO DE CAMBIO */}
      {/* ========================================================================= */}
      {activeSubTab === 'tipo_cambio' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Tarjeta Cotización Actual */}
          <div className="md:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="border-b pb-2">
              <h3 className="font-extrabold text-slate-900 text-sm uppercase">
                Cotización de Tipo de Cambio
              </h3>
              <p className="text-xs text-slate-500">Conversión de cobros y pagos entre Bolivianos (Bs) y Dólares ($us)</p>
            </div>

            <form onSubmit={handleActualizarTipoCambio} className="space-y-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Tipo de Cambio Oficial (BCB)</span>
                <div className="text-2xl font-black font-mono text-slate-800">
                  1 $us = 6.96 Bs
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-xl border border-red-200 space-y-2">
                <span className="text-[10px] font-bold text-red-800 uppercase block">Tipo de Cambio de Cobro en Caja</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-lg text-red-800">1 $us =</span>
                  <input
                    type="number"
                    step="0.05"
                    required
                    value={nuevoTipoCobro}
                    onChange={(e) => setNuevoTipoCobro(e.target.value)}
                    className="w-28 p-2 border border-red-300 rounded-lg font-mono font-bold text-lg text-red-900 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <span className="font-mono font-bold text-lg text-red-800">Bs</span>
                </div>
                <p className="text-[10px] text-red-700">Utilizado para calcular equivalencias en caja rápida de cobro.</p>
                <p className="text-[10px] text-slate-500 font-medium">Último ajuste: {tipoCambio.ultimoAjuste}</p>
              </div>

              <div className="space-y-2 pt-1">
                <label className="flex items-center space-x-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={tipoCambio.permitirCobroDolar}
                    onChange={(e) => setTipoCambio({ ...tipoCambio, permitirCobroDolar: e.target.checked })}
                    className="rounded text-red-700"
                  />
                  <span>Permitir recepción de dólares en ventanilla de cobranzas</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-xl font-bold text-xs uppercase flex items-center justify-center space-x-2 shadow-xs transition cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Aplicar y Registrar Variación</span>
              </button>
            </form>
          </div>

          {/* Historial de Tipo de Cambio */}
          <div className="md:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="border-b pb-2 flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm uppercase">
                  Historial de Variaciones de Tipo de Cambio
                </h3>
                <p className="text-xs text-slate-500">Registro histórico auditado de variaciones de cotización</p>
              </div>
            </div>

            <div className="overflow-x-auto max-h-96">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-semibold sticky top-0">
                  <tr>
                    <th className="p-2.5">Fecha y Hora</th>
                    <th className="p-2.5 text-right">Oficial BCB</th>
                    <th className="p-2.5 text-right">T.C. Cobro</th>
                    <th className="p-2.5 text-center">Operador</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {tipoCambio.historial.map((h, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="p-2.5 font-sans font-bold text-slate-800">{h.fecha}</td>
                      <td className="p-2.5 text-right text-slate-600">Bs {h.oficial.toFixed(2)}</td>
                      <td className="p-2.5 text-right font-bold text-red-700">Bs {h.cobro.toFixed(2)}</td>
                      <td className="p-2.5 text-center font-sans">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold">
                          {h.operador}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL GLOBAL PARA CREACIÓN Y EDICIÓN DE ELEMENTOS */}
      {/* ========================================================================= */}
      {modal.isOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-black text-slate-900 text-sm uppercase">
                {modal.isEdit ? 'Editar ' : 'Nuevo '}
                {modal.type === 'grupo_ingreso' && 'Agrupador de Ingresos'}
                {modal.type === 'grupo_egreso' && 'Agrupador de Egresos'}
                {modal.type === 'unidad' && 'Unidad de Medida'}
                {modal.type === 'producto' && 'Producto de Almacén'}
                {modal.type === 'categoria' && 'Categoría de Socio'}
              </h3>
              <button onClick={closeModal} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleModalSave} className="space-y-3.5 text-xs">
              {/* Form: Agrupadores (Ingreso / Egreso) */}
              {(modal.type === 'grupo_ingreso' || modal.type === 'grupo_egreso') && (
                <>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Código Identificador:</label>
                    <input
                      type="text"
                      required
                      value={modal.formData.codigo || ''}
                      onChange={(e) => setModal({ ...modal, formData: { ...modal.formData, codigo: e.target.value.toUpperCase() } })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl font-mono font-bold"
                      placeholder="Ej: ING-06 o EGR-06"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nombre del Agrupador Contable:</label>
                    <input
                      type="text"
                      required
                      value={modal.formData.nombre || ''}
                      onChange={(e) => setModal({ ...modal, formData: { ...modal.formData, nombre: e.target.value } })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl font-bold"
                      placeholder="Ej: Alquiler de Antenas y Equipos"
                    />
                  </div>
                </>
              )}

              {/* Form: Unidad de Medida */}
              {modal.type === 'unidad' && (
                <>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Código de Unidad (Abreviatura):</label>
                    <input
                      type="text"
                      required
                      maxLength="6"
                      value={modal.formData.codigo || ''}
                      onChange={(e) => setModal({ ...modal, formData: { ...modal.formData, codigo: e.target.value.toUpperCase() } })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl font-mono font-bold"
                      placeholder="Ej: MTR, DOC, LOTE"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nombre Completo:</label>
                    <input
                      type="text"
                      required
                      value={modal.formData.nombre || ''}
                      onChange={(e) => setModal({ ...modal, formData: { ...modal.formData, nombre: e.target.value } })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl font-bold"
                      placeholder="Ej: Metro Lineal"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Descripción / Uso:</label>
                    <input
                      type="text"
                      value={modal.formData.descripcion || ''}
                      onChange={(e) => setModal({ ...modal, formData: { ...modal.formData, descripcion: e.target.value } })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl"
                      placeholder="Ej: Cables coaxiales y mangueras"
                    />
                  </div>
                </>
              )}

              {/* Form: Producto de Almacén */}
              {modal.type === 'producto' && (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Código:</label>
                      <input
                        type="text"
                        required
                        value={modal.formData.codigo || ''}
                        onChange={(e) => setModal({ ...modal, formData: { ...modal.formData, codigo: e.target.value } })}
                        className="w-full p-2 border border-slate-300 rounded-xl font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Unidad:</label>
                      <select
                        value={modal.formData.unidad || unidades[0]?.codigo}
                        onChange={(e) => setModal({ ...modal, formData: { ...modal.formData, unidad: e.target.value } })}
                        className="w-full p-2 border border-slate-300 rounded-xl font-bold cursor-pointer"
                      >
                        {unidades.map(u => (
                          <option key={u.id} value={u.codigo}>{u.nombre} ({u.codigo})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Descripción / Nombre del Producto:</label>
                    <input
                      type="text"
                      required
                      value={modal.formData.nombre || ''}
                      onChange={(e) => setModal({ ...modal, formData: { ...modal.formData, nombre: e.target.value } })}
                      className="w-full p-2 border border-slate-300 rounded-xl font-bold"
                      placeholder="Ej: Filtro de Aceite PH4967"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Costo Unitario (Bs):</label>
                      <input
                        type="number"
                        step="0.5"
                        required
                        value={modal.formData.costo}
                        onChange={(e) => setModal({ ...modal, formData: { ...modal.formData, costo: e.target.value } })}
                        className="w-full p-2 border border-slate-300 rounded-xl font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Precio Venta (Bs):</label>
                      <input
                        type="number"
                        step="0.5"
                        required
                        value={modal.formData.precio}
                        onChange={(e) => setModal({ ...modal, formData: { ...modal.formData, precio: e.target.value } })}
                        className="w-full p-2 border border-slate-300 rounded-xl font-mono font-bold text-emerald-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Stock Mínimo Alerta:</label>
                      <input
                        type="number"
                        required
                        value={modal.formData.stockMin}
                        onChange={(e) => setModal({ ...modal, formData: { ...modal.formData, stockMin: e.target.value } })}
                        className="w-full p-2 border border-slate-300 rounded-xl font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Stock Actual Inicial:</label>
                      <input
                        type="number"
                        required
                        value={modal.formData.stock}
                        onChange={(e) => setModal({ ...modal, formData: { ...modal.formData, stock: e.target.value } })}
                        className="w-full p-2 border border-slate-300 rounded-xl font-mono"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Form: Categoría de Socio */}
              {modal.type === 'categoria' && (
                <>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1">
                      <label className="block font-bold text-slate-700 mb-1">Código:</label>
                      <input
                        type="text"
                        required
                        maxLength="6"
                        value={modal.formData.codigo || ''}
                        onChange={(e) => setModal({ ...modal, formData: { ...modal.formData, codigo: e.target.value.toUpperCase() } })}
                        className="w-full p-2 border border-slate-300 rounded-xl font-mono font-bold"
                        placeholder="Ej: ASOC"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">Nombre Categoría:</label>
                      <input
                        type="text"
                        required
                        value={modal.formData.nombre || ''}
                        onChange={(e) => setModal({ ...modal, formData: { ...modal.formData, nombre: e.target.value } })}
                        className="w-full p-2 border border-slate-300 rounded-xl font-bold"
                        placeholder="Ej: Conductor Asociado"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Cuota Sostenimiento (Bs):</label>
                      <input
                        type="number"
                        step="10"
                        required
                        value={modal.formData.cuotaSost}
                        onChange={(e) => setModal({ ...modal, formData: { ...modal.formData, cuotaSost: e.target.value } })}
                        className="w-full p-2 border border-slate-300 rounded-xl font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Cuota GPS (Bs):</label>
                      <input
                        type="number"
                        step="10"
                        required
                        value={modal.formData.cuotaGPS}
                        onChange={(e) => setModal({ ...modal, formData: { ...modal.formData, cuotaGPS: e.target.value } })}
                        className="w-full p-2 border border-slate-300 rounded-xl font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Tolerancia Mora (Días):</label>
                      <input
                        type="number"
                        required
                        value={modal.formData.moraDias}
                        onChange={(e) => setModal({ ...modal, formData: { ...modal.formData, moraDias: e.target.value } })}
                        className="w-full p-2 border border-slate-300 rounded-xl font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Afiliados Iniciales:</label>
                      <input
                        type="number"
                        value={modal.formData.activos || 0}
                        onChange={(e) => setModal({ ...modal, formData: { ...modal.formData, activos: e.target.value } })}
                        className="w-full p-2 border border-slate-300 rounded-xl font-mono"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Modal Actions */}
              <div className="flex space-x-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-xl font-bold shadow-xs cursor-pointer transition"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}