import React, { useState } from 'react';
import { TrendingDown, Plus, FileText, Printer, CheckCircle, Search, User, X, Trash2 } from 'lucide-react';
import VoucherModal from '../components/VoucherModal';
import { createEgresoAPI, deleteEgresoAPI } from '../utils/api';

export default function EgresosPage({ egresos, setEgresos, cajas, setCajas, socios = [] }) {
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  
  // Beneficiario mode: 'socio' | 'otro'
  const [tipoBeneficiario, setTipoBeneficiario] = useState('socio');
  const [socioSearch, setSocioSearch] = useState('');
  const [selectedSocio, setSelectedSocio] = useState(null);

  const [formData, setFormData] = useState({
    grupo: 'DEVOLUCION DE AHORRO DE SOCIO',
    descripcion: '',
    pagadoA: '',
    monto: '',
    moneda: 'Bs',
    conDocumento: 'SOLICITUD FIRMADA Y RECIBO',
    cajaId: 'c1',
    observaciones: ''
  });

  // Helper when selecting a socio
  const handleSelectSocio = (socio) => {
    setSelectedSocio(socio);
    const nombreCompleto = `${socio.nombres} ${socio.apPaterno} ${socio.apMaterno || ''}`.trim();
    const pagadoAText = `(MÓVIL ${socio.id}) ${nombreCompleto} - CI: ${socio.ci}`;
    
    let conceptoSugerido = formData.descripcion;
    if (!conceptoSugerido || conceptoSugerido.includes('SOCIO') || conceptoSugerido === '') {
      if (formData.grupo === 'DEVOLUCION DE AHORRO DE SOCIO') {
        conceptoSugerido = `DEVOLUCIÓN DE AHORROS DE SOCIO ${nombreCompleto} (MÓVIL ${socio.id})`;
      } else if (formData.grupo === 'DESEMBOLSO DE PRÉSTAMO') {
        conceptoSugerido = `DESEMBOLSO DE CRÉDITO INSTITUCIONAL SOCIO ${nombreCompleto} (MÓVIL ${socio.id})`;
      } else if (formData.grupo === 'BENEFICIOS FÚNEBRE / SOLIDARIDAD') {
        conceptoSugerido = `AUXILIO Y SOLIDARIDAD PARA SOCIO ${nombreCompleto} (MÓVIL ${socio.id})`;
      } else {
        conceptoSugerido = `${formData.grupo} - ${nombreCompleto} (MÓVIL ${socio.id})`;
      }
    }

    setFormData(prev => ({
      ...prev,
      pagadoA: pagadoAText,
      descripcion: conceptoSugerido,
      observaciones: `Celular: ${socio.celular || 'S/N'} • Categoría: ${socio.categoria}`
    }));
  };

  const handleClearSocio = () => {
    setSelectedSocio(null);
    setSocioSearch('');
    setFormData(prev => ({
      ...prev,
      pagadoA: '',
      descripcion: '',
      observaciones: ''
    }));
  };

  // Filtrado de socios en el buscador modal
  const sociosFiltrados = socios.filter(s => {
    if (!socioSearch.trim()) return false;
    const term = socioSearch.toLowerCase();
    return (
      s.id.toString().includes(term) ||
      s.nombres.toLowerCase().includes(term) ||
      s.apPaterno.toLowerCase().includes(term) ||
      (s.apMaterno && s.apMaterno.toLowerCase().includes(term)) ||
      s.ci.includes(term)
    );
  });

  const handleSaveEgreso = async (e) => {
    e.preventDefault();
    if (!formData.descripcion || !formData.pagadoA || !formData.monto) {
      alert('Por favor complete la descripción, el beneficiario y el monto.');
      return;
    }

    const montoNum = parseFloat(formData.monto);
    const nroBoleta = `EGR-${Date.now().toString().slice(-5)}`;
    const egresoPayload = {
      nroBoleta,
      cajaId: formData.cajaId,
      categoria: formData.grupo,
      beneficiario: formData.pagadoA.toUpperCase(),
      concepto: formData.descripcion.toUpperCase(),
      monto: montoNum,
      responsable: 'DANIELA'
    };

    // Guardar en Supabase a través de Railway
    const savedRemote = await createEgresoAPI(egresoPayload);
    const newEgreso = savedRemote || {
      id: Math.max(...egresos.map(eg => eg.id), 11800) + 1,
      fecha: new Date().toISOString().split('T')[0],
      grupo: formData.grupo,
      descripcion: formData.descripcion.toUpperCase(),
      pagadoA: formData.pagadoA.toUpperCase(),
      monto: montoNum,
      moneda: formData.moneda,
      conDocumento: formData.conDocumento.toUpperCase(),
      cajaId: formData.cajaId,
      usuario: 'DANIELA',
      observaciones: formData.observaciones
    };

    setEgresos([newEgreso, ...egresos]);

    // Update Caja Egresos
    const updatedCajas = cajas.map(c => 
      c.id === formData.cajaId 
        ? { ...c, egresos: c.egresos + montoNum, saldoActual: (c.saldoActual || c.saldoAnterior || 0) - montoNum } 
        : c
    );
    setCajas(updatedCajas);

    setIsNewModalOpen(false);
    setSelectedVoucher(newEgreso);
    handleClearSocio();
  };

  // ANULAR / ELIMINAR EGRESO REGISTRADO POR ERROR
  const handleAnularEgreso = async (eg) => {
    const confirmar = window.confirm(
      `¿Está seguro de ANULAR el comprobante de egreso #${eg.nroBoleta || eg.id} por Bs ${parseFloat(eg.monto).toFixed(2)} emitido a ${eg.pagadoA}?\n\n` +
      `Efecto: El dinero se reintegrará automáticamente a la caja de origen para cuadrar el saldo.`
    );
    if (!confirmar) return;

    const montoNum = parseFloat(eg.monto);
    // 1. Devolver dinero a la Caja
    setCajas(prev => prev.map(c => 
      c.id === (eg.cajaId || 'c1')
        ? { ...c, egresos: Math.max(0, (c.egresos || 0) - montoNum), saldoActual: (c.saldoActual || c.saldoAnterior || 0) + montoNum }
        : c
    ));

    // 2. Eliminar del estado local
    setEgresos(prev => prev.filter(item => (item.id !== eg.id && item.nroBoleta !== eg.nroBoleta)));

    // 3. Eliminar de Supabase
    if (eg.id) {
      await deleteEgresoAPI(eg.id);
    }

    alert(`¡Comprobante de egreso #${eg.nroBoleta || eg.id} anulado! El dinero fue devuelto a la caja.`);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-4 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
            <TrendingDown className="w-5 h-5 text-rose-600" />
            <span>Módulo de Control de Egresos y Gastos</span>
          </h1>
          <p className="text-xs text-slate-500">Registro de salidas de dinero, descargos y emisión de boletas oficiales</p>
        </div>
        <button
          onClick={() => {
            setIsNewModalOpen(true);
            setTipoBeneficiario('socio');
          }}
          className="flex items-center space-x-1.5 bg-rose-700 hover:bg-rose-800 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Egreso</span>
        </button>
      </div>

      {/* Egresos Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900 text-white font-semibold">
              <tr>
                <th className="p-3">Boleta</th>
                <th className="p-3">Descripción / Concepto</th>
                <th className="p-3 text-right">Monto</th>
                <th className="p-3">Pagado a (Beneficiario)</th>
                <th className="p-3">Grupo / Rubro</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">Responsable</th>
                <th className="p-3 text-center">Comprobante</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {egresos.map((eg) => (
                <tr key={eg.id || eg.nroBoleta} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-mono font-bold text-blue-700">#{eg.nroBoleta || eg.id}</td>
                  <td className="p-3 font-medium uppercase text-slate-900">{eg.descripcion}</td>
                  <td className="p-3 font-mono font-bold text-right text-rose-700">
                    Bs {parseFloat(eg.monto).toFixed(2)}
                  </td>
                  <td className="p-3 uppercase text-slate-800 font-semibold">{eg.pagadoA}</td>
                  <td className="p-3">
                    <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[10px] font-bold border border-slate-200">
                      {eg.grupo || eg.categoria}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-slate-600">{eg.fecha}</td>
                  <td className="p-3 font-bold text-slate-500 text-[11px]">{eg.usuario}</td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center space-x-1.5">
                      <button
                        onClick={() => setSelectedVoucher(eg)}
                        className="flex items-center space-x-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-2.5 py-1 rounded-lg text-xs font-bold border border-blue-200 transition cursor-pointer"
                        title="Ver comprobante"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Ver Boleta</span>
                      </button>
                      <button
                        onClick={() => handleAnularEgreso(eg)}
                        className="flex items-center space-x-1 bg-rose-50 hover:bg-rose-100 text-rose-700 px-2.5 py-1 rounded-lg text-xs font-bold border border-rose-200 transition cursor-pointer active:scale-95"
                        title="Anular este comprobante y reintegrar dinero a la caja"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Anular</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Egreso Modal with Intelligent Socio Autocomplete */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
            <div className="bg-rose-900 text-white px-5 py-3.5 flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-sm tracking-wide uppercase">Registrar Nuevo Egreso / Pago</h3>
                <p className="text-[10px] text-rose-200">Comprobante oficial de salida de fondos</p>
              </div>
              <button 
                onClick={() => { setIsNewModalOpen(false); handleClearSocio(); }} 
                className="text-rose-300 hover:text-white cursor-pointer text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEgreso} className="p-5 space-y-3.5 text-xs">
              {/* Selector de Tipo de Beneficiario */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">¿A quién se realiza el pago?</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => { setTipoBeneficiario('socio'); }}
                    className={`py-2 px-3 rounded-xl border text-center font-bold transition cursor-pointer ${
                      tipoBeneficiario === 'socio' 
                        ? 'bg-rose-700 text-white border-rose-700 shadow-xs' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    🚗 Socio / Afiliado (Auto-llenar)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setTipoBeneficiario('otro'); handleClearSocio(); }}
                    className={`py-2 px-3 rounded-xl border text-center font-bold transition cursor-pointer ${
                      tipoBeneficiario === 'otro' 
                        ? 'bg-rose-700 text-white border-rose-700 shadow-xs' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    🏢 Proveedor / Servicio General
                  </button>
                </div>
              </div>

              {/* Buscador de Socio en Tiempo Real */}
              {tipoBeneficiario === 'socio' && (
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                  <label className="block font-extrabold text-slate-800">
                    Buscar Socio (Por Móvil, Nombre o Carnet CI):
                  </label>
                  
                  {!selectedSocio ? (
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Escribe número de móvil, nombre o CI..."
                        value={socioSearch}
                        onChange={(e) => setSocioSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />

                      {/* Lista de resultados de búsqueda */}
                      {socioSearch.trim() && (
                        <div className="absolute left-0 right-0 top-11 bg-white border border-slate-200 rounded-xl shadow-xl max-h-48 overflow-y-auto z-20 divide-y divide-slate-100">
                          {sociosFiltrados.length > 0 ? (
                            sociosFiltrados.map((s) => (
                              <div
                                key={s.id}
                                onClick={() => { handleSelectSocio(s); setSocioSearch(''); }}
                                className="p-2.5 hover:bg-rose-50 cursor-pointer flex justify-between items-center transition"
                              >
                                <div>
                                  <div className="font-extrabold text-slate-900">
                                    Móvil #{s.id} • {s.nombres} {s.apPaterno} {s.apMaterno || ''}
                                  </div>
                                  <div className="text-[10px] text-slate-500 font-mono">
                                    CI: {s.ci} | Cel: {s.celular || 'S/N'}
                                  </div>
                                </div>
                                <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                  {s.categoria}
                                </span>
                              </div>
                            ))
                          ) : (
                            <div className="p-3 text-center text-slate-400 font-medium">
                              No se encontró ningún socio con "{socioSearch}"
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Tarjeta de Socio Seleccionado */
                    <div className="bg-white p-3 rounded-xl border-2 border-rose-200 flex justify-between items-center">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-9 h-9 rounded-full bg-rose-700 text-white font-black flex items-center justify-center text-xs">
                          #{selectedSocio.id}
                        </div>
                        <div>
                          <div className="font-black text-slate-900 text-xs">
                            {selectedSocio.nombres} {selectedSocio.apPaterno} {selectedSocio.apMaterno || ''}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            CI: {selectedSocio.ci} • Cel: {selectedSocio.celular || 'S/N'} • {selectedSocio.categoria}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleClearSocio}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-700 hover:bg-rose-50 cursor-pointer"
                        title="Cambiar socio"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Grupo de Egreso */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Grupo de Egreso Contable</label>
                <select
                  value={formData.grupo}
                  onChange={(e) => {
                    const newGrupo = e.target.value;
                    setFormData(prev => {
                      let desc = prev.descripcion;
                      if (selectedSocio) {
                        const nombre = `${selectedSocio.nombres} ${selectedSocio.apPaterno}`;
                        if (newGrupo === 'DEVOLUCION DE AHORRO DE SOCIO') desc = `DEVOLUCIÓN DE AHORROS DE SOCIO ${nombre} (MÓVIL ${selectedSocio.id})`;
                        else if (newGrupo === 'DESEMBOLSO DE PRÉSTAMO') desc = `DESEMBOLSO DE CRÉDITO INSTITUCIONAL SOCIO ${nombre} (MÓVIL ${selectedSocio.id})`;
                        else if (newGrupo === 'BENEFICIOS FÚNEBRE / SOLIDARIDAD') desc = `AUXILIO Y SOLIDARIDAD PARA SOCIO ${nombre} (MÓVIL ${selectedSocio.id})`;
                        else desc = `${newGrupo} - ${nombre} (MÓVIL ${selectedSocio.id})`;
                      }
                      return { ...prev, grupo: newGrupo, descripcion: desc };
                    });
                  }}
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-bold bg-white"
                >
                  <option value="DEVOLUCION DE AHORRO DE SOCIO">DEVOLUCION DE AHORRO DE SOCIO</option>
                  <option value="DESEMBOLSO DE PRÉSTAMO">DESEMBOLSO DE PRÉSTAMO</option>
                  <option value="BENEFICIOS FÚNEBRE / SOLIDARIDAD">BENEFICIOS FÚNEBRE / SOLIDARIDAD</option>
                  <option value="PAGO DE SUELDOS">PAGO DE SUELDOS Y PERSONAL</option>
                  <option value="ASIGNACIONES A DIRECTORIO">ASIGNACIONES A DIRECTORIO Y VIÁTICOS</option>
                  <option value="MANTENIMIENTO GPS">MANTENIMIENTO GPS Y FRECUENCIA</option>
                  <option value="MATERIAL DE ESCRITORIO">MATERIAL DE ESCRITORIO Y SEDE</option>
                  <option value="GASTOS VARIOS">GASTOS VARIOS</option>
                </select>
              </div>

              {/* Pagado a (Beneficiario) */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Pagado a (Beneficiario) *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. CLEMENTE CHURQUI o NOMBRE DE EMPRESA"
                  value={formData.pagadoA}
                  onChange={(e) => setFormData({ ...formData, pagadoA: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl uppercase font-bold text-slate-900"
                />
              </div>

              {/* Descripción / Concepto */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Descripción / Concepto Oficial *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. RETIRO DE AHORROS PARA GASTOS MÉDICOS"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl uppercase font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Monto (Bs) *</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    placeholder="0.00"
                    value={formData.monto}
                    onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-mono font-bold text-base text-rose-700"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Afectar a Caja</label>
                  <select
                    value={formData.cajaId}
                    onChange={(e) => setFormData({ ...formData, cajaId: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-bold bg-white"
                  >
                    {cajas.map(c => (
                      <option key={c.id} value={c.id}>{c.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Documento de Respaldo</label>
                <input
                  type="text"
                  value={formData.conDocumento}
                  onChange={(e) => setFormData({ ...formData, conDocumento: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-xl uppercase"
                  placeholder="Ej: RECIBO NRO 450, SOLICITUD FIRMADA"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => { setIsNewModalOpen(false); handleClearSocio(); }}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-rose-700 hover:bg-rose-800 text-white rounded-xl font-bold shadow-xs transition cursor-pointer active:scale-95"
                >
                  Guardar y Emitir Boleta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Voucher Modal */}
      <VoucherModal
        voucher={selectedVoucher}
        onClose={() => setSelectedVoucher(null)}
      />
    </div>
  );
}