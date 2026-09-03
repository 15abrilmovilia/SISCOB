import React, { useState } from 'react';
import { UserPlus, X } from 'lucide-react';

export default function NewSocioModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    nombres: '',
    apPaterno: '',
    apMaterno: '',
    ci: '',
    celular: '',
    fechaIngreso: new Date().toISOString().split('T')[0],
    categoria: 'Conductores',
    observaciones: '',
    cuotaSostenimiento: true,
    cuotaGPS: true
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombres || !formData.apPaterno || !formData.ci) {
      alert('Por favor complete Nombres, Apellido Paterno y C.I.');
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
        <div className="bg-blue-900 text-white px-5 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <UserPlus className="w-5 h-5 text-blue-300" />
            <h3 className="font-bold text-sm">Registrar Nuevo Socio / Afiliado</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nombres *</label>
              <input
                type="text"
                required
                value={formData.nombres}
                onChange={(e) => setFormData({ ...formData, nombres: e.target.value.toUpperCase() })}
                placeholder="Ej. JUAN CARLOS"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs uppercase focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Apellido Paterno *</label>
              <input
                type="text"
                required
                value={formData.apPaterno}
                onChange={(e) => setFormData({ ...formData, apPaterno: e.target.value.toUpperCase() })}
                placeholder="Ej. CONDORI"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs uppercase focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Apellido Materno</label>
              <input
                type="text"
                value={formData.apMaterno}
                onChange={(e) => setFormData({ ...formData, apMaterno: e.target.value.toUpperCase() })}
                placeholder="Ej. GARCIA"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs uppercase focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Cédula de Identidad (C.I.) *</label>
              <input
                type="text"
                required
                value={formData.ci}
                onChange={(e) => setFormData({ ...formData, ci: e.target.value })}
                placeholder="Ej. 7141199"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Celular / Teléfono</label>
              <input
                type="text"
                value={formData.celular}
                onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
                placeholder="Ej. 75483109"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Fecha de Ingreso</label>
              <input
                type="date"
                value={formData.fechaIngreso}
                onChange={(e) => setFormData({ ...formData, fechaIngreso: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Categoría</label>
              <select
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Conductores">Conductores</option>
                <option value="Inquilinos">Inquilinos</option>
                <option value="Directorio">Directorio</option>
                <option value="Pasivos / Honorarios">Pasivos / Honorarios</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2">
            <span className="block text-xs font-bold text-slate-700">Obligaciones Iniciales Asignadas:</span>
            <label className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.cuotaSostenimiento}
                onChange={(e) => setFormData({ ...formData, cuotaSostenimiento: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Sostenimiento Mensual (Bs 400.00)</span>
            </label>
            <label className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.cuotaGPS}
                onChange={(e) => setFormData({ ...formData, cuotaGPS: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Mantenimiento GPS Mensual (Bs 80.00)</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Observaciones</label>
            <textarea
              rows="2"
              value={formData.observaciones}
              onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
              placeholder="Notas o datos del vehículo..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-semibold transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-xs transition"
            >
              Guardar Socio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}