import React, { useState } from 'react';
import { 
  Settings, 
  Layers, 
  Ruler, 
  Package, 
  BadgePercent, 
  Sliders, 
  DollarSign, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  CheckCircle2, 
  Printer, 
  Shield, 
  RefreshCw,
  FolderTree
} from 'lucide-react';

export default function ConfigPage({ printMode, setPrintMode }) {
  const [activeSubTab, setActiveSubTab] = useState('agrupar'); // 'agrupar' | 'unidades' | 'productos' | 'categorias' | 'parametros' | 'tipo_cambio'

  // 1. Agrupar Ingresos + Egresos State
  const [gruposIngreso, setGruposIngreso] = useState([
    { id: 'gi-1', codigo: 'ING-01', nombre: 'Aportes de Sostenimiento y Radio', conceptosCount: 4, orden: 1 },
    { id: 'gi-2', codigo: 'ING-02', nombre: 'Servicios de Monitoreo GPS', conceptosCount: 2, orden: 2 },
    { id: 'gi-3', codigo: 'ING-03', nombre: 'Multas y Sanciones Disciplinarias', conceptosCount: 5, orden: 3 },
    { id: 'gi-4', codigo: 'ING-04', nombre: 'Cartera y Amortización de Préstamos', conceptosCount: 2, orden: 4 },
    { id: 'gi-5', codigo: 'ING-05', nombre: 'Venta de Insumos y Repuestos Almacén', conceptosCount: 6, orden: 5 },
  ]);

  const [gruposEgreso, setGruposEgreso] = useState([
    { id: 'ge-1', codigo: 'EGR-01', nombre: 'Planilla de Operadores y Personal', conceptosCount: 3, orden: 1 },
    { id: 'ge-2', codigo: 'EGR-02', nombre: 'Mantenimiento de Antenas y Frecuencia', conceptosCount: 4, orden: 2 },
    { id: 'ge-3', codigo: 'EGR-03', nombre: 'Alquiler y Servicios Básicos de Sede', conceptosCount: 4, orden: 3 },
    { id: 'ge-4', codigo: 'EGR-04', nombre: 'Fondo de Auxilio y Solidaridad', conceptosCount: 2, orden: 4 },
    { id: 'ge-5', codigo: 'EGR-05', nombre: 'Gastos de Administración y Papelería', conceptosCount: 5, orden: 5 },
  ]);

  // 2. Unidades de Medida State
  const [unidades, setUnidades] = useState([
    { id: 'u1', codigo: 'PZA', nombre: 'Pieza / Unidad', descripcion: 'Para repuestos y uniformes', activo: true },
    { id: 'u2', codigo: 'GLN', nombre: 'Galón (3.785 L)', descripcion: 'Aceites y lubricantes pesados', activo: true },
    { id: 'u3', codigo: 'LTR', nombre: 'Litro', descripcion: 'Líquidos de freno y refrigerantes', activo: true },
    { id: 'u4', codigo: 'TAL', nombre: 'Talonario', descripcion: 'Boletas de carrera y recibos', activo: true },
    { id: 'u5', codigo: 'PAR', nombre: 'Par', descripcion: 'Guardabarros y guantes', activo: true },
    { id: 'u6', codigo: 'CAJ', nombre: 'Caja', descripcion: 'Insumos en lote', activo: true },
  ]);

  // 3. Catálogo de Productos State
  const [productos, setProductos] = useState([
    { id: 'p1', codigo: 'PROD-001', nombre: 'Aceite Motor 20W-50 Multigrado', unidad: 'GLN', costo: 110.0, precio: 135.0, stockMin: 5, stock: 12 },
    { id: 'p2', codigo: 'PROD-002', nombre: 'Guardabarro Trasero Institucional 15A', unidad: 'PAR', costo: 60.0, precio: 80.0, stockMin: 10, stock: 24 },
    { id: 'p3', codigo: 'PROD-003', nombre: 'Llanta Radial West Lake 185/70 R14', unidad: 'PZA', costo: 380.0, precio: 430.0, stockMin: 4, stock: 8 },
    { id: 'p4', codigo: 'PROD-004', nombre: 'Talonario Oficial Boletas de Carrera', unidad: 'TAL', costo: 12.0, precio: 18.0, stockMin: 20, stock: 65 },
    { id: 'p5', codigo: 'PROD-005', nombre: 'Antena Móvil VHF con Base Imantada', unidad: 'PZA', costo: 150.0, precio: 190.0, stockMin: 3, stock: 6 },
    { id: 'p6', codigo: 'PROD-006', nombre: 'Chaleco Reflectivo con Logo Móvil 15', unidad: 'PZA', costo: 35.0, precio: 45.0, stockMin: 15, stock: 38 },
  ]);

  // 4. Categorías de Cobro State
  const [categoriasCobro, setCategoriasCobro] = useState([
    { id: 'cat-1', codigo: 'PROP', nombre: 'Socio Propietario (1 Móvil)', cuotaSost: 400.0, cuotaGPS: 80.0, moraDias: 10, activos: 145 },
    { id: 'cat-2', codigo: 'P-MULT', nombre: 'Propietario Flota / Multimóvil', cuotaSost: 350.0, cuotaGPS: 70.0, moraDias: 10, activos: 25 },
    { id: 'cat-3', codigo: 'INQ', nombre: 'Conductor Inquilino / Relevo', cuotaSost: 150.0, cuotaGPS: 80.0, moraDias: 5, activos: 60 },
    { id: 'cat-4', codigo: 'ASAL', nombre: 'Conductor Asalariado Fijo', cuotaSost: 100.0, cuotaGPS: 40.0, moraDias: 15, activos: 18 },
    { id: 'cat-5', codigo: 'HON', nombre: 'Socio Honorario / Fundador', cuotaSost: 0.0, cuotaGPS: 0.0, moraDias: 30, activos: 8 },
  ]);

  // 5. Parámetros del Sistema State
  const [parametros, setParametros] = useState({
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
  });

  // 6. Tipo de Cambio State
  const [tipoCambio, setTipoCambio] = useState({
    oficial: 6.96,
    cobro: 9.80,
    ultimoAjuste: '02/09/2026 08:30',
    monedaPrincipal: 'Bs',
    permitirCobroDolar: true,
    historial: [
      { fecha: '01/09/2026', oficial: 6.96, cobro: 9.80, operador: 'admin33' },
      { fecha: '15/08/2026', oficial: 6.96, cobro: 9.50, operador: 'admin33' },
      { fecha: '01/08/2026', oficial: 6.96, cobro: 9.20, operador: 'admin33' },
      { fecha: '01/07/2026', oficial: 6.96, cobro: 8.90, operador: 'admin33' }
    ]
  });

  // Modals helpers
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'unidad' | 'producto' | 'grupo' | 'categoria'

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-5 animate-fadeIn">
      {/* Top Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap justify-between items-center gap-3">
        <div>
          <h1 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
            <Settings className="w-5 h-5 text-red-700" />
            <span>Configuración General del Sistema SISCOB</span>
          </h1>
          <p className="text-xs text-slate-500">
            Administración de agrupadores contables, unidades, catálogo de productos, categorías y tipo de cambio
          </p>
        </div>

        <button
          onClick={() => alert('Parámetros guardados y sincronizados en la base de datos.')}
          className="flex items-center space-x-1.5 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Guardar Cambios</span>
        </button>
      </div>

      {/* Subwindows Navigation Tabs (Exact Subventanas requested by user) */}
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
            <span>Unidades</span>
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
            <span>Parámetros</span>
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
        <div className="space-y-4">
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
                  onClick={() => alert('Función: Agregar nuevo agrupador de ingresos')}
                  className="flex items-center space-x-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer"
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
                      <th className="p-2.5 text-center">Acción</th>
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
                          <button className="text-slate-400 hover:text-red-700 p-1">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
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
                  onClick={() => alert('Función: Agregar nuevo agrupador de egresos')}
                  className="flex items-center space-x-1 bg-red-50 text-red-700 hover:bg-red-100 px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer"
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
                      <th className="p-2.5 text-center">Acción</th>
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
                          <button className="text-slate-400 hover:text-red-700 p-1">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBVENTANA 2: UNIDADES */}
      {/* ========================================================================= */}
      {activeSubTab === 'unidades' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm uppercase">
                Catálogo de Unidades de Medida
              </h3>
              <p className="text-xs text-slate-500">Unidades para repuestos, lubricantes y material de oficina</p>
            </div>
            <button
              onClick={() => {
                const cod = prompt('Código de unidad (Ej: ROLLO):');
                const nom = prompt('Nombre de la unidad (Ej: Rollo de 50 metros):');
                if (cod && nom) {
                  setUnidades([...unidades, { id: `u${unidades.length + 1}`, codigo: cod.toUpperCase(), nombre: nom, descripcion: 'Nueva unidad', activo: true }]);
                }
              }}
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
              <tbody className="divide-y divide-slate-100 font-sans">
                {unidades.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-extrabold text-red-700">{u.codigo}</td>
                    <td className="p-3 font-bold text-slate-900">{u.nombre}</td>
                    <td className="p-3 text-slate-600">{u.descripcion}</td>
                    <td className="p-3 text-center">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        ACTIVO
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => setUnidades(unidades.filter(x => x.id !== u.id))}
                        className="text-slate-400 hover:text-red-700 p-1"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
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
              onClick={() => alert('Función: Registrar nuevo producto al catálogo')}
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
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
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
              onClick={() => alert('Función: Agregar nueva categoría de socio')}
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
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
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
              </div>
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

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
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
                    value={tipoCambio.cobro}
                    onChange={(e) => setTipoCambio({ ...tipoCambio, cobro: parseFloat(e.target.value) || 0 })}
                    className="w-28 p-2 border border-red-300 rounded-lg font-mono font-bold text-lg text-red-900 bg-white"
                  />
                  <span className="font-mono font-bold text-lg text-red-800">Bs</span>
                </div>
                <p className="text-[10px] text-red-700">Utilizado para calcular equivalencias en caja rápida de cobro.</p>
              </div>

              <div className="space-y-2 pt-2">
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
            </div>
          </div>

          {/* Historial de Tipo de Cambio */}
          <div className="md:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="border-b pb-2">
              <h3 className="font-extrabold text-slate-900 text-sm uppercase">
                Historial de Variaciones de Tipo de Cambio
              </h3>
              <p className="text-xs text-slate-500">Registro histórico para auditoría de cobros anteriores</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-semibold">
                  <tr>
                    <th className="p-2.5">Fecha de Cambio</th>
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
    </div>
  );
}