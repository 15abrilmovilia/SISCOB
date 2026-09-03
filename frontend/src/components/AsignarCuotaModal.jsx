import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { createDeudaAPI } from '../utils/api';

const CONCEPTOS_RAPIDOS = [
  { nombre: 'MULTA POR INASISTENCIA A ASAMBLEA', monto: 100, tipo: 'Multa' },
  { nombre: 'MULTA POR INASISTENCIA A REUNIÓN ORDINARIA', monto: 50, tipo: 'Multa' },
  { nombre: 'MULTA POR FALTA A MARCHA / PARO', monto: 50, tipo: 'Multa' },
  { nombre: 'CUOTA SOSTENIMIENTO MENSUAL', monto: 400, tipo: 'Cobro' },
  { nombre: 'MANTENIMIENTO GPS MENSUAL', monto: 80, tipo: 'Cobro' },
  { nombre: 'APORTE EXTRAORDINARIO PRO-SEDE', monto: 20, tipo: 'Extraordinario' },
  { nombre: 'PAGO DE FRECUENCIA MENSUAL', monto: 200, tipo: 'Cobro' }
];

export default function AsignarCuotaModal({ isOpen, onClose, socio, socios = [], setDeudas }) {
  const [selectedSocioId, setSelectedSocioId] = useState(socio?.id || (socios[0]?.id || ''));
  const [formData, setFormData] = useState({
    tipo: 'Multa',
    descripcion: '',
    monto: '',
    periodo: new Date().toLocaleString('es-BO', { month: 'long', year: 'numeric' }),
    moneda: 'Bs'
  });

  useEffect(() => {
    if (socio) {
      setSelectedSocioId(socio.id);
    }
  }, [socio]);

  if (!isOpen) return null;

  const currentSocio = socios.find(s => s.id === Number(selectedSocioId)) || socio;

  const handleSelectRapido = (rapido) => {
    setFormData({
      ...formData,
      descripcion: rapido.nombre,
      monto: rapido.monto.toString(),
      tipo: rapido.tipo
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSocioId || !formData.descripcion || !formData.monto) {
      alert('Por favor complete el socio, la descripción y el monto.');
      return;
    }

    const montoNum = parseFloat(formData.monto);
    if (isNaN(montoNum) || montoNum <= 0) {
      alert('El monto debe ser un número positivo.');
      return;
    }

    const fechaHoy = new Date().toISOString().split('T')[0];
    const newDeuda = {
      id: `d-${Date.now()}-${selectedSocioId}`,
      socioId: Number(selectedSocioId),
      conceptoId: formData.tipo === 'Multa' ? 8 : 1,
      descripcion: formData.descripcion.trim().toUpperCase(),
      periodo: formData.periodo || 'Actual',
      monto: montoNum,
      moneda: formData.moneda,
      cantidad: 1,
      fecha: fechaHoy,
      pagado: false
    };

    // Sincronizar con backend si está disponible
    createDeudaAPI({
      socioId: newDeuda.socioId,
      conceptoId: newDeuda.conceptoId,
      descripcion: newDeuda.descripcion,
      periodo: newDeuda.periodo,
      monto: newDeuda.monto,
      fechaVencimiento: newDeuda.fecha
    });

    if (setDeudas) {
      setDeudas(prev => [newDeuda, ...prev]);
    }

    alert(`Cargo registrado con éxito: "${newDeuda.descripcion}" por Bs ${newDeuda.monto.toFixed(2)} al Móvil #${selectedSocioId}.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-fadeIn text-xs text-slate-700">
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="bg-red-700 p-1.5 rounded-lg text-white">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-sm text-white">Asignar Multa o Cuota a Socio</h3>
              <p className="text-[11px] text-slate-400">Registro directo en cuenta por cobrar y kardex del afiliado</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[82vh] overflow-y-auto">
          {/* Socio Selector / Display */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
            <label className="block font-bold text-slate-900 text-[11px] uppercase tracking-wider">
              Afiliado / Móvil Destinatario
            </label>
            <select
              value={selectedSocioId}
              onChange={(e) => setSelectedSocioId(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-bold text-slate-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              {socios.map(s => (
                <option key={s.id} value={s.id}>
                  Móvil #{s.id} — {s.nombres} {s.apPaterno} {s.apMaterno || ''} (CI: {s.ci})
                </option>
              ))}
            </select>
            {currentSocio && (
              <div className="flex justify-between text-[11px] text-slate-500 font-mono pt-1">
                <span>Categoría: <strong className="text-slate-800">{currentSocio.categoria}</strong></span>
                <span>Placa: <strong className="text-slate-800">{currentSocio.placa || 'S/P'}</strong></span>
              </div>
            )}
          </div>

          {/* Plantillas Rápidas */}
          <div className="space-y-1.5">
            <span className="block font-bold text-slate-500 text-[10px] uppercase tracking-wider">
              Conceptos Frecuentes (Clic para rellenar rápido):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {CONCEPTOS_RAPIDOS.map((c, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectRapido(c)}
                  className="px-2 py-1 bg-slate-100 hover:bg-red-50 hover:text-red-700 hover:border-red-200 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 transition cursor-pointer text-left"
                >
                  {c.nombre} (Bs {c.monto})
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block font-bold mb-1">Tipo de Cargo</label>
              <select
                value={formData.tipo}
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-semibold focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                <option value="Multa">Multa / Sanción Disciplinaria</option>
                <option value="Cobro">Cuota Ordinaria / Sostenimiento</option>
                <option value="Extraordinario">Aporte Extraordinario / Rifa</option>
                <option value="Amortizacion">Amortización de Deuda</option>
                <option value="Otros">Otro Concepto</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1">Periodo / Fecha</label>
              <input
                type="text"
                value={formData.periodo}
                onChange={(e) => setFormData({ ...formData, periodo: e.target.value })}
                placeholder="Ej. Septiembre 2026"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none capitalize"
              />
            </div>

            <div className="col-span-2">
              <label className="block font-bold mb-1">Descripción del Cargo / Motivo de la Multa *</label>
              <input
                type="text"
                required
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value.toUpperCase() })}
                placeholder="Ej. MULTA POR INASISTENCIA A REUNIÓN DEL 02/09"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl uppercase font-bold focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Monto (Bs) *</label>
              <div className="relative">
                <span className="absolute left-3 top-2 font-mono font-bold text-slate-400">Bs</span>
                <input
                  type="number"
                  step="0.5"
                  required
                  value={formData.monto}
                  onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
                  placeholder="50.00"
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl font-mono font-black text-sm text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1">Moneda</label>
              <select
                value={formData.moneda}
                onChange={(e) => setFormData({ ...formData, moneda: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                <option value="Bs">Bolivianos (Bs)</option>
                <option value="$us">Dólares ($us)</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
            <strong>Nota:</strong> Al guardar, este cargo se sumará inmediatamente a la deuda pendiente del socio en el Padrón, en su Kardex individual y quedará disponible para cobro en Caja Rápida / Ventanilla.
          </div>

          {/* Footer Buttons */}
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
              className="flex items-center space-x-1.5 px-5 py-2 bg-red-700 hover:bg-red-800 text-white rounded-xl font-extrabold shadow-sm transition cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Aplicar Cargo a Cuenta</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
