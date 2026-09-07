import React, { useState, useEffect } from 'react';
import { X, Tag, Save, CheckCircle2, DollarSign, Layers, Info } from 'lucide-react';

const CAJAS_OPCIONES = [
  { id: 'c1', nombre: 'CAJA 1: CAJA DE FRECUENCIA' },
  { id: 'c2', nombre: 'CAJA 2: CAJA DE MULTAS E INFRACCIONES' },
  { id: 'c3', nombre: 'CAJA 3: CAJA NUEVOS SOCIOS' },
  { id: 'con-c4', idReal: 'c4', nombre: 'CAJA 4: CAJA PRÉSTAMOS' },
  { id: 'c5', nombre: 'CAJA 5: CAJA FRECUENCIA INQUILINOS' }
];

const TIPOS_CONCEPTO = [
  'Mensualidad',
  'Colaboración',
  'Insumo / Venta',
  'Multa',
  'Inscripción',
  'Aporte Extraordinario',
  'Otro Ingreso'
];

const PERIODICIDADES = [
  'Mensual',
  'Variable',
  'A demanda',
  'Única',
  'Anual'
];

export default function ConceptoModal({ 
  isOpen, 
  onClose, 
  conceptoToEdit = null, 
  onSaveConcepto 
}) {
  const [formData, setFormData] = useState({
    nombre: '',
    cajaId: 'c1',
    tipo: 'Insumo / Venta',
    monto: '0.00',
    periodicidad: 'A demanda',
    descripcion: ''
  });

  useEffect(() => {
    if (conceptoToEdit) {
      setFormData({
        nombre: conceptoToEdit.nombre || '',
        cajaId: conceptoToEdit.cajaId || 'c1',
        tipo: conceptoToEdit.tipo || 'Insumo / Venta',
        monto: conceptoToEdit.monto !== undefined ? String(conceptoToEdit.monto) : '0.00',
        periodicidad: conceptoToEdit.periodicidad || 'A demanda',
        descripcion: conceptoToEdit.descripcion || ''
      });
    } else {
      setFormData({
        nombre: '',
        cajaId: 'c1',
        tipo: 'Insumo / Venta',
        monto: '0.00',
        periodicidad: 'A demanda',
        descripcion: ''
      });
    }
  }, [conceptoToEdit, isOpen]);

  if (!isOpen) return null;

  const isEditing = Boolean(conceptoToEdit);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
      alert('Por favor ingrese el nombre del concepto de ingreso.');
      return;
    }

    const montoNum = parseFloat(formData.monto);
    if (isNaN(montoNum) || montoNum < 0) {
      alert('Por favor ingrese un monto válido mayor o igual a 0.');
      return;
    }

    const cajaMap = {
      'c1': 'CAJA DE FRECUENCIA',
      'c2': 'CAJA DE MULTAS E INFRACCIONES',
      'c3': 'CAJA NUEVOS SOCIOS',
      'c4': 'CAJA PRÉSTAMOS',
      'c5': 'CAJA FRECUENCIA INQUILINOS'
    };

    const finalConcepto = {
      id: conceptoToEdit?.id || `con-${Date.now()}`,
      cajaId: formData.cajaId,
      cajaNombre: cajaMap[formData.cajaId] || 'CAJA GENERAL',
      nombre: formData.nombre.trim().toUpperCase(),
      tipo: formData.tipo,
      monto: montoNum,
      periodicidad: formData.periodicidad,
      descripcion: formData.descripcion.trim()
    };

    onSaveConcepto(finalConcepto);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 text-xs">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-6 py-4 flex justify-between items-center border-b border-slate-700">
          <div className="flex items-center space-x-2.5">
            <div className="bg-red-700 p-2 rounded-xl text-white">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-sm text-white">
                {isEditing ? 'Modificar Concepto de Ingreso' : 'Crear Nuevo Concepto de Ingreso'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {isEditing 
                  ? 'Edita el nombre, caja recaudadora o monto del concepto' 
                  : 'Registra un nuevo concepto para cobrar en ventanilla de caja'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[82vh] overflow-y-auto">
          {/* Nombre del Concepto */}
          <div>
            <label className="block font-bold text-slate-900 mb-1">
              Nombre del Concepto de Ingreso *
            </label>
            <input
              type="text"
              required
              placeholder="Ej: DONACION COLABORACION M 90, LOGOTIPOS, NUMEROS ADHESIVOS..."
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value.toUpperCase() })}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-xl font-bold uppercase text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
            <p className="text-[10px] text-slate-500 mt-1">
              Este nombre exacto aparecerá en el recibo y en los reportes de caja por móvil.
            </p>
          </div>

          {/* Caja Destino */}
          <div>
            <label className="block font-bold text-slate-900 mb-1 flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-700" />
              <span>Caja Destino (Donde ingresa el dinero) *</span>
            </label>
            <select
              value={formData.cajaId}
              onChange={(e) => setFormData({ ...formData, cajaId: e.target.value })}
              className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <option value="c1">Caja 1: CAJA DE FRECUENCIA (Logotipos, Donaciones, Adhesivos, Frecuencia)</option>
              <option value="c2">Caja 2: CAJA DE MULTAS E INFRACCIONES</option>
              <option value="c3">Caja 3: CAJA NUEVOS SOCIOS (Inscripciones y Aportes)</option>
              <option value="c4">Caja 4: CAJA PRÉSTAMOS</option>
              <option value="c5">Caja 5: CAJA FRECUENCIA INQUILINOS</option>
            </select>
          </div>

          {/* Tipo y Periodicidad */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Tipo de Ingreso</label>
              <select
                value={formData.tipo}
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                {TIPOS_CONCEPTO.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Periodicidad</label>
              <select
                value={formData.periodicidad}
                onChange={(e) => setFormData({ ...formData, periodicidad: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                {PERIODICIDADES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Monto Sugerido */}
          <div>
            <label className="block font-bold text-slate-900 mb-1 flex items-center space-x-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
              <span>Monto Sugerido en Bolivianos (Bs) *</span>
            </label>
            <input
              type="number"
              step="0.5"
              min="0"
              required
              value={formData.monto}
              onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
              placeholder="0.00"
              className="w-full px-3 py-2.5 border border-slate-300 rounded-xl font-mono font-black text-sm text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
            <p className="text-[10px] text-slate-500 mt-1">
              Si se coloca 0.00 o un monto base, el cajero puede ajustar el valor en ventanilla al momento de cobrar.
            </p>
          </div>

          {/* Descripción */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">Descripción / Notas Contables</label>
            <textarea
              rows="2"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              placeholder="Detalle sobre el destino de este aporte o características del insumo..."
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Banner Informativo */}
          <div className="bg-blue-50 p-3 rounded-2xl border border-blue-200 text-blue-900 flex items-start space-x-2 text-[11px]">
            <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <span>
              Al guardar este concepto, estará disponible de forma inmediata en la <strong>Caja Rápida / Cobranzas</strong> para ser cobrado a cualquier socio por ventanilla.
            </span>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:text-slate-800 font-bold rounded-xl hover:bg-slate-100 transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white font-extrabold rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Guardar Cambios' : 'Crear Concepto de Ingreso'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
