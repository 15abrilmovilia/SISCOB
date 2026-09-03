import React, { useState } from 'react';
import { UserPlus, X, Car, Shield, DollarSign } from 'lucide-react';

export default function NewSocioModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    customId: '',
    nombres: '',
    apPaterno: '',
    apMaterno: '',
    ci: '',
    celular: '',
    placa: '',
    vehiculo: '',
    fechaIngreso: new Date().toISOString().split('T')[0],
    categoria: 'Propietario',
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
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-fadeIn">
        {/* Header con identidad SISCOB */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="bg-red-700 p-1.5 rounded-lg text-white">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Registrar Nuevo Afiliado / Socio</h3>
              <p className="text-[11px] text-slate-400">Padrón General • Radio Móvil 15 de Abril</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[82vh] overflow-y-auto text-xs text-slate-700">
          {/* Identificación y Móvil */}
          <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Nº Móvil / Interno</label>
              <input
                type="number"
                value={formData.customId}
                onChange={(e) => setFormData({ ...formData, customId: e.target.value })}
                placeholder="Auto"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-400">Dejar vacío si es automático</span>
            </div>
            <div className="col-span-2">
              <label className="block font-bold text-slate-800 mb-1">Categoría del Afiliado</label>
              <select
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                <option value="Propietario">Propietario</option>
                <option value="Inquilino">Inquilino / Relevo</option>
                <option value="Conductores">Conductor</option>
                <option value="Directorio">Directorio</option>
                <option value="Pasivos / Honorarios">Pasivos / Honorarios</option>
              </select>
            </div>
          </div>

          {/* Datos Personales */}
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block font-bold text-slate-800 mb-1">Nombres *</label>
              <input
                type="text"
                required
                value={formData.nombres}
                onChange={(e) => setFormData({ ...formData, nombres: e.target.value.toUpperCase() })}
                placeholder="Ej. JUAN CARLOS"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs uppercase font-semibold focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">Apellido Paterno *</label>
              <input
                type="text"
                required
                value={formData.apPaterno}
                onChange={(e) => setFormData({ ...formData, apPaterno: e.target.value.toUpperCase() })}
                placeholder="Ej. CONDORI"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs uppercase font-semibold focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">Apellido Materno</label>
              <input
                type="text"
                value={formData.apMaterno}
                onChange={(e) => setFormData({ ...formData, apMaterno: e.target.value.toUpperCase() })}
                placeholder="Ej. GARCIA"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs uppercase font-semibold focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">Cédula de Identidad (C.I.) *</label>
              <input
                type="text"
                required
                value={formData.ci}
                onChange={(e) => setFormData({ ...formData, ci: e.target.value })}
                placeholder="Ej. 7141199"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">Celular / WhatsApp</label>
              <input
                type="text"
                value={formData.celular}
                onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
                placeholder="Ej. 75483109"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Datos del Vehículo */}
          <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Placa del Vehículo</label>
              <input
                type="text"
                value={formData.placa}
                onChange={(e) => setFormData({ ...formData, placa: e.target.value.toUpperCase() })}
                placeholder="Ej. 2841-XYZ"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs uppercase font-mono font-bold focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">Marca / Modelo / Color</label>
              <input
                type="text"
                value={formData.vehiculo}
                onChange={(e) => setFormData({ ...formData, vehiculo: e.target.value.toUpperCase() })}
                placeholder="Ej. Toyota Caldina Blanco"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs uppercase focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
            <div className="col-span-2">
              <label className="block font-bold text-slate-800 mb-1">Fecha de Ingreso</label>
              <input
                type="date"
                value={formData.fechaIngreso}
                onChange={(e) => setFormData({ ...formData, fechaIngreso: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Obligaciones Iniciales */}
          <div className="bg-red-50/50 p-3 rounded-xl border border-red-200/60 space-y-2">
            <span className="block font-extrabold text-red-950 text-[11px] uppercase tracking-wider">
              Obligaciones Iniciales Asignadas:
            </span>
            <div className="space-y-1.5">
              <label className="flex items-center space-x-2 cursor-pointer font-medium text-slate-800">
                <input
                  type="checkbox"
                  checked={formData.cuotaSostenimiento}
                  onChange={(e) => setFormData({ ...formData, cuotaSostenimiento: e.target.checked })}
                  className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                />
                <span>Sostenimiento Mensual (Bs 400.00)</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer font-medium text-slate-800">
                <input
                  type="checkbox"
                  checked={formData.cuotaGPS}
                  onChange={(e) => setFormData({ ...formData, cuotaGPS: e.target.checked })}
                  className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                />
                <span>Mantenimiento GPS Mensual (Bs 80.00)</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Observaciones / Notas</label>
            <textarea
              rows="2"
              value={formData.observaciones}
              onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
              placeholder="Notas sobre turno, garaje, o documentación pendiente..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white rounded-xl font-bold shadow-xs transition cursor-pointer"
            >
              Registrar Afiliado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}