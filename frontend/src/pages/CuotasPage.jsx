import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sliders, 
  Plus, 
  Users, 
  ArrowRightLeft, 
  CheckSquare, 
  Square, 
  AlertCircle, 
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { createDeudaAPI } from '../utils/api';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import AsignarCuotaModal from '../components/AsignarCuotaModal';

const INITIAL_CONCEPTOS = [
  { id: 'c1', nombre: 'SOSTENIMIENTO MENSUAL RADIO', tipo: 'Mensualidad', monto: 400.0, periodicidad: 'Mensual', sociosAfectados: 180 },
  { id: 'c2', nombre: 'MANTENIMIENTO GPS TRIMESTRAL', tipo: 'Servicio', monto: 80.0, periodicidad: 'Mensual', sociosAfectados: 165 },
  { id: 'c3', nombre: 'FALTA A ASAMBLEA GENERAL', tipo: 'Multa', monto: 100.0, periodicidad: 'Variable', sociosAfectados: 18 },
  { id: 'c4', nombre: 'RIFA ANIVERSARIO 15 DE ABRIL', tipo: 'Extraordinaria', monto: 20.0, periodicidad: 'Única', sociosAfectados: 195 },
  { id: 'c5', nombre: 'APORTE PRO-SEDE CENTRAL', tipo: 'Aporte', monto: 50.0, periodicidad: 'Mensual', sociosAfectados: 180 }
];

export default function CuotasPage({ socios = [], deudas = [], setDeudas }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIndividualModalOpen, setIsIndividualModalOpen] = useState(false);
  
  // Conceptos vigentes con persistencia
  const [conceptos, setConceptos] = useState(() => 
    loadFromStorage('siscob_conceptos', INITIAL_CONCEPTOS)
  );

  useEffect(() => {
    saveToStorage('siscob_conceptos', conceptos);
  }, [conceptos]);

  // Double list selector state for modal
  const [exentos, setExentos] = useState([]);
  const [afectados, setAfectados] = useState([]);
  const [selectedExentos, setSelectedExentos] = useState([]);
  const [selectedAfectados, setSelectedAfectados] = useState([]);

  // Inicializar selector doble al abrir modal o cargar socios
  useEffect(() => {
    if (socios.length > 0) {
      // Por defecto, todos los socios inician en afectados
      setAfectados(socios);
      setExentos([]);
      setSelectedExentos([]);
      setSelectedAfectados([]);
    }
  }, [socios, isModalOpen]);

  // Form data for new quota
  const [nuevoConcepto, setNuevoConcepto] = useState({
    nombre: '',
    tipo: 'Cobro',
    periodicidad: 'Mes',
    moneda: 'Bolivianos',
    monto: '',
    cantidadCuotas: 1,
    obligatorio: true
  });

  // Métricas calculadas en tiempo real de deudas reales
  const kpis = useMemo(() => {
    const pendientes = deudas.filter(d => !d.pagado);
    const totalMonto = pendientes.reduce((acc, d) => acc + (parseFloat(d.monto) || 0), 0);
    const multas = pendientes.filter(d => 
      (d.descripcion && d.descripcion.toUpperCase().includes('MULTA')) || d.conceptoId === 8
    );
    const totalMultasMonto = multas.reduce((acc, d) => acc + (parseFloat(d.monto) || 0), 0);

    return {
      totalPendientes: pendientes.length,
      totalMonto,
      totalMultas: multas.length,
      totalMultasMonto
    };
  }, [deudas]);

  const moveToAfectados = () => {
    const toMove = exentos.filter(s => selectedExentos.includes(s.id));
    setAfectados([...afectados, ...toMove]);
    setExentos(exentos.filter(s => !selectedExentos.includes(s.id)));
    setSelectedExentos([]);
  };

  const moveAllToAfectados = () => {
    setAfectados([...afectados, ...exentos]);
    setExentos([]);
    setSelectedExentos([]);
  };

  const moveToExentos = () => {
    const toMove = afectados.filter(s => selectedAfectados.includes(s.id));
    setExentos([...exentos, ...toMove]);
    setAfectados(afectados.filter(s => !selectedAfectados.includes(s.id)));
    setSelectedAfectados([]);
  };

  const moveAllToExentos = () => {
    setExentos([...exentos, ...afectados]);
    setAfectados([]);
    setSelectedAfectados([]);
  };

  // Filtrar rápido por categoría en el selector
  const selectOnlyCategory = (cat) => {
    const catSocios = socios.filter(s => s.categoria === cat);
    const otherSocios = socios.filter(s => s.categoria !== cat);
    setAfectados(catSocios);
    setExentos(otherSocios);
    setSelectedExentos([]);
    setSelectedAfectados([]);
  };

  // CREACIÓN Y APLICACIÓN MASIVA DE CARGOS A DEUDAS DE SOCIOS
  const handleCrearCargoMasivo = async (e) => {
    e.preventDefault();
    if (!nuevoConcepto.nombre || !nuevoConcepto.monto) {
      alert('Complete el nombre y el monto del concepto.');
      return;
    }

    if (afectados.length === 0) {
      alert('Debe haber al menos un socio en la lista de Afectados para aplicar el cargo.');
      return;
    }

    const montoNum = parseFloat(nuevoConcepto.monto);
    if (isNaN(montoNum) || montoNum <= 0) {
      alert('Ingrese un monto válido mayor a 0.');
      return;
    }

    const fechaHoy = new Date().toISOString().split('T')[0];
    const nombreConcepto = nuevoConcepto.nombre.trim().toUpperCase();

    // 1. Guardar concepto en el catálogo de conceptos
    const createdConcepto = {
      id: `c${Date.now()}`,
      nombre: nombreConcepto,
      tipo: nuevoConcepto.tipo,
      monto: montoNum,
      periodicidad: nuevoConcepto.periodicidad,
      sociosAfectados: afectados.length
    };
    setConceptos([createdConcepto, ...conceptos]);

    // 2. Generar las DEUDAS reales para cada socio afectado
    const nuevasDeudas = afectados.map((s, idx) => ({
      id: `d-cuota-${Date.now()}-${s.id}-${idx}`,
      socioId: s.id,
      conceptoId: nuevoConcepto.tipo === 'Multa' ? 8 : 1,
      descripcion: nombreConcepto,
      periodo: nuevoConcepto.periodicidad || 'Actual',
      monto: montoNum,
      pagado: false,
      fecha: fechaHoy,
      moneda: nuevoConcepto.moneda === 'Dolares' ? '$us' : 'Bs',
      cantidad: 1
    }));

    // 3. Sincronizar en segundo plano con el backend
    nuevasDeudas.forEach(d => {
      createDeudaAPI({
        socioId: d.socioId,
        conceptoId: d.conceptoId,
        descripcion: d.descripcion,
        periodo: d.periodo,
        monto: d.monto,
        fechaVencimiento: d.fecha
      });
    });

    // 4. Actualizar estado global de deudas
    if (setDeudas) {
      setDeudas(prev => [...nuevasDeudas, ...prev]);
    }

    setIsModalOpen(false);
    setNuevoConcepto({
      nombre: '',
      tipo: 'Cobro',
      periodicidad: 'Mes',
      moneda: 'Bolivianos',
      monto: '',
      cantidadCuotas: 1,
      obligatorio: true
    });

    alert(`¡Éxito! Se ha registrado el cargo "${createdConcepto.nombre}" por Bs ${montoNum.toFixed(2)} asignado a los ${afectados.length} socios seleccionados. Ya figura en sus cuentas y Kardex.`);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap justify-between items-center bg-white p-5 rounded-3xl border border-slate-200 shadow-xs gap-3">
        <div className="space-y-0.5">
          <h1 className="text-lg font-black text-slate-900 flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-red-700" />
            <span>Configuración de Cuotas, Frecuencias y Multas</span>
          </h1>
          <p className="text-xs text-slate-500">
            Gestión de cargos periódicos, multas disciplinarias y asignación directa o masiva a socios
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsIndividualModalOpen(true)}
            className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer border border-slate-200"
          >
            <ShieldAlert className="w-4 h-4 text-amber-700" />
            <span>Multar / Cargar a 1 Socio</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-1.5 bg-red-700 hover:bg-red-800 text-white px-4 py-2.5 rounded-xl text-xs font-black shadow-xs transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Cargo Masivo</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Dinámicas */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Cargos Activos */}
        <div className="md:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cargos Activos en Cartera</span>
            <span className="p-2 bg-blue-50 text-blue-700 rounded-xl"><Users className="w-4 h-4" /></span>
          </div>
          <div className="mt-2">
            <div className="text-3xl font-black text-slate-900 font-mono">{kpis.totalPendientes}</div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Bs {kpis.totalMonto.toLocaleString('es-BO', { minimumFractionDigits: 2 })} pendientes por cobrar
            </p>
          </div>
        </div>

        {/* Multas Recientes */}
        <div className="md:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Multas Registradas</span>
            <span className="p-2 bg-rose-50 text-rose-700 rounded-xl"><AlertCircle className="w-4 h-4" /></span>
          </div>
          <div className="mt-2">
            <div className="text-3xl font-black text-rose-700 font-mono">{kpis.totalMultas}</div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Bs {kpis.totalMultasMonto.toLocaleString('es-BO', { minimumFractionDigits: 2 })} en sanciones por cobrar
            </p>
          </div>
        </div>

        {/* Red Action Card */}
        <div 
          onClick={() => setIsModalOpen(true)}
          className="md:col-span-4 bg-gradient-to-br from-red-700 to-red-900 text-white p-5 rounded-2xl shadow-sm flex flex-col justify-between cursor-pointer hover:shadow-md transition group"
        >
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-200 block mb-1">
              APLICACIÓN INMEDIATA
            </span>
            <h3 className="text-lg font-extrabold leading-snug">Asignar Cargo Masivo a Socios</h3>
            <p className="text-xs text-red-100 mt-1">
              Aplica cuotas o multas a toda la categoría o padrón con selector doble interactivo.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-red-600/50 flex justify-between items-center text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
            <span>Iniciar Asignación Masiva</span>
            <span>→</span>
          </div>
        </div>
      </div>

      {/* Conceptos Vigentes Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wide">
              Conceptos Económicos y Cuotas Vigentes
            </h3>
            <p className="text-xs text-slate-500">Configuración activa de aportes, frecuencias y penalizaciones</p>
          </div>
          <span className="text-xs font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
            {conceptos.length} Conceptos Registrados
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100">
              <tr>
                <th className="p-3">Concepto / Cuota</th>
                <th className="p-3">Tipo</th>
                <th className="p-3">Periodicidad</th>
                <th className="p-3 text-right">Monto (Bs)</th>
                <th className="p-3 text-center">Última Aplicación</th>
                <th className="p-3 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {conceptos.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-bold text-slate-900 uppercase">{c.nombre}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                      c.tipo === 'Multa'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {c.tipo}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600">{c.periodicidad}</td>
                  <td className="p-3 font-mono font-bold text-right text-slate-900">Bs {c.monto.toFixed(2)}</td>
                  <td className="p-3 text-center font-mono font-bold text-blue-700">{c.sociosAfectados} socios</td>
                  <td className="p-3 text-center">
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold">
                      ACTIVO
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal with DOUBLE SELECTOR (Exact Match to Quipus Frame 60s) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 text-xs">
            <div className="bg-slate-900 text-white px-5 py-3.5 flex justify-between items-center">
              <div>
                <h3 className="font-black text-sm text-white">Configuración y Aplicación de Cargo Masivo</h3>
                <p className="text-[10px] text-slate-400">Genera deudas en las cuentas de los socios seleccionados</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white text-base">✕</button>
            </div>

            <form onSubmit={handleCrearCargoMasivo} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Nombre del Concepto *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. CUOTA FRECUENCIA OCTUBRE o MULTA REUNIÓN GENERAL"
                    value={nuevoConcepto.nombre}
                    onChange={(e) => setNuevoConcepto({ ...nuevoConcepto, nombre: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg uppercase font-bold focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tipo de Cargo</label>
                  <select
                    value={nuevoConcepto.tipo}
                    onChange={(e) => setNuevoConcepto({ ...nuevoConcepto, tipo: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-semibold focus:ring-2 focus:ring-red-500 focus:outline-none"
                  >
                    <option value="Cobro">Cobro Regular</option>
                    <option value="Amortizacion">Amortización</option>
                    <option value="Multa">Multa / Sanción</option>
                    <option value="Interes">Interés de Préstamo</option>
                    <option value="Extraordinario">Aporte Extraordinario</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Periodicidad</label>
                  <select
                    value={nuevoConcepto.periodicidad}
                    onChange={(e) => setNuevoConcepto({ ...nuevoConcepto, periodicidad: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-semibold focus:ring-2 focus:ring-red-500 focus:outline-none"
                  >
                    <option value="Mes">Mensual</option>
                    <option value="Semana">Semanal</option>
                    <option value="Dia">Diaria</option>
                    <option value="Ano">Anual</option>
                    <option value="Unica">Única vez</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Monto (Bs) *</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    placeholder="100.00"
                    value={nuevoConcepto.monto}
                    onChange={(e) => setNuevoConcepto({ ...nuevoConcepto, monto: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono font-black text-sm text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Moneda</label>
                  <select
                    value={nuevoConcepto.moneda}
                    onChange={(e) => setNuevoConcepto({ ...nuevoConcepto, moneda: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-bold"
                  >
                    <option value="Bolivianos">Bolivianos (Bs)</option>
                    <option value="Dolares">Dólares ($us)</option>
                  </select>
                </div>
              </div>

              {/* Selector Rápido por Categoría */}
              <div className="flex items-center space-x-2 pt-1">
                <span className="text-[11px] font-bold text-slate-500">Selección Rápida:</span>
                <button
                  type="button"
                  onClick={moveAllToAfectados}
                  className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px] font-bold"
                >
                  Todos ({socios.length})
                </button>
                <button
                  type="button"
                  onClick={() => selectOnlyCategory('Propietario')}
                  className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px] font-bold"
                >
                  Solo Propietarios
                </button>
                <button
                  type="button"
                  onClick={() => selectOnlyCategory('Conductores')}
                  className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px] font-bold"
                >
                  Solo Conductores
                </button>
                <button
                  type="button"
                  onClick={() => selectOnlyCategory('Inquilino')}
                  className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px] font-bold"
                >
                  Solo Inquilinos
                </button>
              </div>

              {/* Double List Selector */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold uppercase text-slate-800">
                    Asignación de Socios (Selector Doble)
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Afectados: <strong className="text-red-700">{afectados.length}</strong> | Exentos: <strong>{exentos.length}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-11 gap-2 items-center">
                  {/* Left: Socios Exentos */}
                  <div className="col-span-5 bg-white border border-slate-300 rounded-lg p-2 h-48 overflow-y-auto">
                    <span className="block font-bold text-[10px] uppercase text-slate-500 mb-1 border-b pb-1">
                      Socios Exentos ({exentos.length})
                    </span>
                    {exentos.map(s => (
                      <div
                        key={s.id}
                        onClick={() => setSelectedExentos(
                          selectedExentos.includes(s.id) 
                            ? selectedExentos.filter(id => id !== s.id) 
                            : [...selectedExentos, s.id]
                        )}
                        className={`p-1.5 rounded text-[11px] cursor-pointer transition truncate ${
                          selectedExentos.includes(s.id) ? 'bg-slate-700 text-white font-bold' : 'hover:bg-slate-100'
                        }`}
                      >
                        #{s.id} - {s.nombres} {s.apPaterno}
                      </div>
                    ))}
                  </div>

                  {/* Middle: Move Buttons */}
                  <div className="col-span-1 flex flex-col space-y-1.5 items-center">
                    <button
                      type="button"
                      onClick={moveAllToAfectados}
                      title="Mover todos a Afectados"
                      className="w-full py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded font-extrabold text-[10px]"
                    >
                      &gt;&gt;
                    </button>
                    <button
                      type="button"
                      onClick={moveToAfectados}
                      title="Mover seleccionados a Afectados"
                      className="w-full py-1 bg-red-700 hover:bg-red-800 text-white rounded font-extrabold text-[10px]"
                    >
                      &gt;
                    </button>
                    <button
                      type="button"
                      onClick={moveToExentos}
                      title="Mover seleccionados a Exentos"
                      className="w-full py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded font-extrabold text-[10px]"
                    >
                      &lt;
                    </button>
                    <button
                      type="button"
                      onClick={moveAllToExentos}
                      title="Mover todos a Exentos"
                      className="w-full py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded font-extrabold text-[10px]"
                    >
                      &lt;&lt;
                    </button>
                  </div>

                  {/* Right: Socios Afectados */}
                  <div className="col-span-5 bg-white border border-slate-300 rounded-lg p-2 h-48 overflow-y-auto">
                    <span className="block font-bold text-[10px] uppercase text-red-700 mb-1 border-b pb-1">
                      Socios Afectados ({afectados.length})
                    </span>
                    {afectados.map(s => (
                      <div
                        key={s.id}
                        onClick={() => setSelectedAfectados(
                          selectedAfectados.includes(s.id) 
                            ? selectedAfectados.filter(id => id !== s.id) 
                            : [...selectedAfectados, s.id]
                        )}
                        className={`p-1.5 rounded text-[11px] cursor-pointer transition truncate ${
                          selectedAfectados.includes(s.id) ? 'bg-red-700 text-white font-bold' : 'hover:bg-slate-100'
                        }`}
                      >
                        #{s.id} - {s.nombres} {s.apPaterno}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-red-50 rounded-xl border border-red-200 text-red-900 text-[11px]">
                <strong>Aviso Contable:</strong> Al hacer clic en "Guardar y Aplicar Cargo", se generará automáticamente una cuenta por cobrar (deuda) de <strong>Bs {nuevoConcepto.monto || '0.00'}</strong> a cada uno de los <strong>{afectados.length}</strong> socios seleccionados.
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-bold transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={afectados.length === 0}
                  className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white rounded-xl font-extrabold shadow-sm transition cursor-pointer disabled:opacity-50"
                >
                  Guardar y Aplicar Cargo a {afectados.length} Socios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para multar / cargar a un socio individual */}
      <AsignarCuotaModal
        isOpen={isIndividualModalOpen}
        onClose={() => setIsIndividualModalOpen(false)}
        socios={socios}
        setDeudas={setDeudas}
      />
    </div>
  );
}