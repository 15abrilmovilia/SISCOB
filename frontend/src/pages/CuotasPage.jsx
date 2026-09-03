import React, { useState } from 'react';
import { Sliders, Plus, Users, ArrowRightLeft, CheckSquare, Square, AlertCircle, Sparkles } from 'lucide-react';

export default function CuotasPage({ socios }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Conceptos vigentes
  const [conceptos, setConceptos] = useState([
    { id: 'c1', nombre: 'Sostenimiento Mensual Radio', tipo: 'Mensualidad', monto: 400.0, periodicidad: 'Mensual', sociosAfectados: 180 },
    { id: 'c2', nombre: 'Mantenimiento GPS Trimestral', tipo: 'Servicio', monto: 80.0, periodicidad: 'Mensual', sociosAfectados: 165 },
    { id: 'c3', nombre: 'Falta a Asamblea General', tipo: 'Multa', monto: 100.0, periodicidad: 'Variable', sociosAfectados: 18 },
    { id: 'c4', nombre: 'Rifa Aniversario 15 de Abril', tipo: 'Extraordinaria', monto: 20.0, periodicidad: 'Única', sociosAfectados: 195 },
    { id: 'c5', nombre: 'Aporte Pro-Sede Central', tipo: 'Aporte', monto: 50.0, periodicidad: 'Mensual', sociosAfectados: 180 }
  ]);

  // Double list selector state for modal
  const [exentos, setExentos] = useState(socios.slice(3));
  const [afectados, setAfectados] = useState(socios.slice(0, 3));
  const [selectedExentos, setSelectedExentos] = useState([]);
  const [selectedAfectados, setSelectedAfectados] = useState([]);

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

  const handleCrearCargoMasivo = (e) => {
    e.preventDefault();
    if (!nuevoConcepto.nombre || !nuevoConcepto.monto) {
      alert('Complete el nombre y el monto del concepto.');
      return;
    }

    const created = {
      id: `c${conceptos.length + 1}`,
      nombre: nuevoConcepto.nombre.toUpperCase(),
      tipo: nuevoConcepto.tipo,
      monto: parseFloat(nuevoConcepto.monto),
      periodicidad: nuevoConcepto.periodicidad,
      sociosAfectados: afectados.length
    };

    setConceptos([created, ...conceptos]);
    setIsModalOpen(false);
    alert(`Cargo masivo "${created.nombre}" asignado a ${afectados.length} socios.`);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-red-700" />
            <span>Configuración de Cuotas, Frecuencias y Multas</span>
          </h1>
          <p className="text-xs text-slate-500">Gestión de cargos periódicos y asignación masiva con selector doble</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-1.5 bg-red-700 hover:bg-red-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Cargo Masivo</span>
        </button>
      </div>

      {/* KPI Cards (Exact Stitch Cuotas Screen) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cargos Activos</span>
            <span className="p-2 bg-blue-50 text-blue-700 rounded-xl"><Users className="w-4 h-4" /></span>
          </div>
          <div className="mt-2">
            <div className="text-3xl font-extrabold text-slate-900 font-mono">1,245</div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Bs 45,200.00 pendientes por cobrar</p>
          </div>
        </div>

        <div className="md:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Multas Recientes</span>
            <span className="p-2 bg-rose-50 text-rose-700 rounded-xl"><AlertCircle className="w-4 h-4" /></span>
          </div>
          <div className="mt-2">
            <div className="text-3xl font-extrabold text-slate-900 font-mono">18</div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Por inasistencia a la última asamblea</p>
          </div>
        </div>

        {/* Red Action Card */}
        <div 
          onClick={() => setIsModalOpen(true)}
          className="md:col-span-4 bg-gradient-to-br from-red-700 to-red-900 text-white p-5 rounded-2xl shadow-sm flex flex-col justify-between cursor-pointer hover:shadow-md transition group"
        >
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-200 block mb-1">
              APLICACIÓN RÁPIDA
            </span>
            <h3 className="text-lg font-extrabold leading-snug">Asignar Cargo Masivo a Socios</h3>
            <p className="text-xs text-red-100 mt-1">Aplica cuotas o multas a toda la categoría o padrón con selector doble.</p>
          </div>
          <div className="mt-4 pt-3 border-t border-red-600/50 flex justify-between items-center text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
            <span>Iniciar Asignación</span>
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
            {conceptos.length} Conceptos Activos
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
                <th className="p-3 text-center">Socios Afectados</th>
                <th className="p-3 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {conceptos.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-bold text-slate-900 uppercase">{c.nombre}</td>
                  <td className="p-3">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-semibold border border-slate-200">
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
              <h3 className="font-bold text-sm">Configuración de Cargo Masivo (Selector Doble)</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white text-base">✕</button>
            </div>

            <form onSubmit={handleCrearCargoMasivo} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Nombre del Concepto *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. CUOTA FRECUENCIA OCTUBRE o MULTA REUNIÓN"
                    value={nuevoConcepto.nombre}
                    onChange={(e) => setNuevoConcepto({ ...nuevoConcepto, nombre: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg uppercase"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tipo de Cargo</label>
                  <select
                    value={nuevoConcepto.tipo}
                    onChange={(e) => setNuevoConcepto({ ...nuevoConcepto, tipo: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
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
                    className="w-full p-2 border border-slate-300 rounded-lg"
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
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono font-bold"
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

              {/* Double List Selector (Exact Match to Frame 60s in Quipus) */}
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
                          selectedExentos.includes(s.id) ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-100'
                        }`}
                      >
                        {s.id} - {s.nombres} {s.apPaterno}
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
                        {s.id} - {s.nombres} {s.apPaterno}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={afectados.length === 0}
                  className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white rounded-xl font-extrabold shadow-sm"
                >
                  Guardar y Aplicar Cargo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}