import React, { useState, useEffect } from 'react';
import { UserCheck, X, Car, Shield, Phone, CreditCard, Save } from 'lucide-react';

export default function EditSocioModal({ isOpen, onClose, socio, onSave }) {
  const [formData, setFormData] = useState({
    nombres: '',
    apPaterno: '',
    apMaterno: '',
    ci: '',
    celular: '',
    fechaIngreso: '',
    categoria: 'Propietario',
    estado: 'VIG',
    vehiculo: '',
    placa: '',
    observaciones: ''
  });

  useEffect(() => {
    if (socio) {
      setFormData({
        nombres: socio.nombres || '',
        apPaterno: socio.apPaterno || '',
        apMaterno: socio.apMaterno || '',
        ci: socio.ci || '',
        celular: socio.celular || '',
        fechaIngreso: socio.fechaIngreso || '',
        categoria: socio.categoria || 'Propietario',
        estado: socio.estado || 'VIG',
        vehiculo: socio.vehiculo || '',
        placa: socio.placa || '',
        observaciones: socio.observaciones || ''
      });
    }
  }, [socio]);

  if (!isOpen || !socio) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombres || !formData.apPaterno || !formData.ci) {
      alert('Nombres, Apellido Paterno y C.I. son obligatorios.');
      return;
    }

    onSave({
      ...socio,
      ...formData
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 animate-fadeIn">
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="bg-red-700 p-1.5 rounded-lg text-white">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">
                Editar Afiliado: Móvil #{socio.id}
              </h3>
              <p className="text-[11px] text-slate-400">Actualización de datos personales, gremiales y de la unidad</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[82vh] overflow-y-auto text-xs text-slate-700">
          {/* Section 1: Datos Personales */}
          <div className="space-y-2.5">
            <span className="font-extrabold text-slate-900 text-[11px] uppercase tracking-wider block border-b pb-1">
              1. Datos Personales del Afiliado
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="block font-bold mb-1">Nombres *</label>
                <input
                  type="text"
                  required
                  value={formData.nombres}
                  onChange={(e) => setFormData({ ...formData, nombres: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl uppercase font-semibold focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Apellido Paterno *</label>
                <input
                  type="text"
                  required
                  value={formData.apPaterno}
                  onChange={(e) => setFormData({ ...formData, apPaterno: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl uppercase font-semibold focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Apellido Materno</label>
                <input
                  type="text"
                  value={formData.apMaterno}
                  onChange={(e) => setFormData({ ...formData, apMaterno: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl uppercase font-semibold focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Cédula de Identidad (C.I.) *</label>
                <input
                  type="text"
                  required
                  value={formData.ci}
                  onChange={(e) => setFormData({ ...formData, ci: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Celular / WhatsApp</label>
                <input
                  type="text"
                  value={formData.celular}
                  onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
                  placeholder="Ej. 7141199"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Datos Institucionales y Estado */}
          <div className="space-y-2.5">
            <span className="font-extrabold text-slate-900 text-[11px] uppercase tracking-wider block border-b pb-1">
              2. Categoría y Estado Institucional
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold mb-1">Fecha de Ingreso</label>
                <input
                  type="date"
                  value={formData.fechaIngreso}
                  onChange={(e) => setFormData({ ...formData, fechaIngreso: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Categoría</label>
                <select
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-semibold focus:ring-2 focus:ring-red-500 focus:outline-none"
                >
                  <option value="Propietario">Propietario</option>
                  <option value="Inquilino">Inquilino / Relevo</option>
                  <option value="Conductores">Conductores</option>
                  <option value="Directorio">Directorio</option>
                  <option value="Pasivos / Honorarios">Pasivos / Honorarios</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1">Estado Gremial</label>
                <select
                  value={formData.estado}
                  onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold focus:ring-2 focus:ring-red-500 focus:outline-none"
                >
                  <option value="VIG">VIGENTE / ACTIVO</option>
                  <option value="SUSP">SUSPENDIDO (Mora / Sanción)</option>
                  <option value="BAJA">RETIRADO / BAJA</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Datos de la Unidad Móvil */}
          <div className="space-y-2.5">
            <span className="font-extrabold text-slate-900 text-[11px] uppercase tracking-wider block border-b pb-1">
              3. Datos del Vehículo / Unidad Móvil
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold mb-1">Placa de Control</label>
                <input
                  type="text"
                  placeholder="Ej. 2841-XYZ"
                  value={formData.placa}
                  onChange={(e) => setFormData({ ...formData, placa: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl uppercase font-mono font-bold focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Marca, Modelo y Color</label>
                <input
                  type="text"
                  placeholder="Ej. TOYOTA CALDINA BLANCO"
                  value={formData.vehiculo}
                  onChange={(e) => setFormData({ ...formData, vehiculo: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl uppercase focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Observaciones */}
          <div className="space-y-1">
            <label className="block font-bold mb-1">Observaciones / Notas Disciplinarias</label>
            <textarea
              rows="2"
              value={formData.observaciones}
              onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
              placeholder="Anotaciones sobre asignación de turno, compromisos de pago o acuerdos..."
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end items-center space-x-2 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center space-x-1.5 px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-xl font-bold shadow-xs transition cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
