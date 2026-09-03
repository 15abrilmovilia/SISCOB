import React, { useState } from 'react';
import { TrendingDown, Plus, FileText, Printer, CheckCircle } from 'lucide-react';
import VoucherModal from '../components/VoucherModal';
import { createEgresoAPI } from '../utils/api';

export default function EgresosPage({ egresos, setEgresos, cajas, setCajas }) {
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    grupo: 'PAGO DE SUELDOS',
    descripcion: '',
    pagadoA: '',
    monto: '',
    moneda: 'Bs',
    conDocumento: 'RESOLUCION DIRECTORIO',
    cajaId: 'c1',
    observaciones: ''
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
      c.id === formData.cajaId ? { ...c, egresos: c.egresos + montoNum, saldoActual: c.saldoActual - montoNum } : c
    );
    setCajas(updatedCajas);

    setIsNewModalOpen(false);
    setSelectedVoucher(newEgreso);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-4">
      <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
            <TrendingDown className="w-5 h-5 text-rose-600" />
            <span>Módulo de Control de Egresos y Gastos</span>
          </h1>
          <p className="text-xs text-slate-500">Registro de pagos con comprobante oficial y firmas de descargo</p>
        </div>
        <button
          onClick={() => setIsNewModalOpen(true)}
          className="flex items-center space-x-1.5 bg-rose-700 hover:bg-rose-600 text-white px-3.5 py-2 rounded-lg text-xs font-bold shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Egreso</span>
        </button>
      </div>

      {/* Egresos Table (Exact match to Frame 124s) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900 text-white font-semibold">
              <tr>
                <th className="p-3">Boleta</th>
                <th className="p-3">Descripción</th>
                <th className="p-3 text-right">Monto</th>
                <th className="p-3">Pagado a</th>
                <th className="p-3">Grupo / Rubro</th>
                <th className="p-3">Fecha Egreso</th>
                <th className="p-3">Usuario</th>
                <th className="p-3 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {egresos.map((eg) => (
                <tr key={eg.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-blue-700">#{eg.id}</td>
                  <td className="p-3 font-medium uppercase text-slate-900">{eg.descripcion}</td>
                  <td className="p-3 font-mono font-bold text-right text-rose-700">
                    {eg.moneda} {eg.monto.toFixed(2)}
                  </td>
                  <td className="p-3 uppercase text-slate-700 font-semibold">{eg.pagadoA}</td>
                  <td className="p-3">
                    <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[11px] font-semibold border border-slate-200">
                      {eg.grupo}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-slate-600">{eg.fecha}</td>
                  <td className="p-3 font-bold text-slate-500 text-[11px]">{eg.usuario}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => setSelectedVoucher(eg)}
                      className="flex items-center space-x-1 mx-auto bg-blue-50 hover:bg-blue-100 text-blue-700 px-2.5 py-1 rounded text-[11px] font-bold border border-blue-200 transition"
                    >
                      <FileText className="w-3 h-3" />
                      <span>Ver Boleta</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Egreso Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
            <div className="bg-rose-900 text-white px-5 py-3 flex justify-between items-center">
              <h3 className="font-bold text-sm">Registrar Nuevo Egreso / Pago</h3>
              <button onClick={() => setIsNewModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleSaveEgreso} className="p-5 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Grupo de Egreso</label>
                <select
                  value={formData.grupo}
                  onChange={(e) => setFormData({ ...formData, grupo: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                >
                  <option value="PAGO DE SUELDOS">PAGO DE SUELDOS</option>
                  <option value="ASIGNACIONES A DIRECTORIO">ASIGNACIONES A DIRECTORIO</option>
                  <option value="DEVOLUCION DE AHORRO DE SOCIO">DEVOLUCION DE AHORRO DE SOCIO</option>
                  <option value="MANTENIMIENTO GPS">MANTENIMIENTO GPS</option>
                  <option value="GASTOS VARIOS">GASTOS VARIOS</option>
                  <option value="MATERIAL DE ESCRITORIO">MATERIAL DE ESCRITORIO</option>
                  <option value="BENEFICIOS FUNEBRE">BENEFICIOS FÚNEBRE</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Descripción / Concepto *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. PAGO DE SUELDO A SERENO MES DE AGOSTO"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg uppercase"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pagado a (Beneficiario) *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. CLEMENTE CHURQUI o NOMBRE DE EMPRESA"
                  value={formData.pagadoA}
                  onChange={(e) => setFormData({ ...formData, pagadoA: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Monto *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    placeholder="1600.00"
                    value={formData.monto}
                    onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Afectar a Caja</label>
                  <select
                    value={formData.cajaId}
                    onChange={(e) => setFormData({ ...formData, cajaId: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  >
                    {cajas.map(c => (
                      <option key={c.id} value={c.id}>{c.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Documento de Respaldo</label>
                <input
                  type="text"
                  value={formData.conDocumento}
                  onChange={(e) => setFormData({ ...formData, conDocumento: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg uppercase"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-700 hover:bg-rose-600 text-white rounded-lg font-bold"
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