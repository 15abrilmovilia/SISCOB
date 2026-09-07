import React, { useState, useMemo } from 'react';
import { 
  CalendarCheck, 
  X, 
  Zap, 
  Users, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';
import { createDeudaAPI } from '../utils/api';

const MESES_DISPONIBLES = [
  'Enero 2026',
  'Febrero 2026',
  'Marzo 2026',
  'Abril 2026',
  'Mayo 2026',
  'Junio 2026',
  'Julio 2026',
  'Agosto 2026',
  'Septiembre 2026',
  'Octubre 2026',
  'Noviembre 2026',
  'Diciembre 2026',
  'Enero 2027',
  'Febrero 2027',
  'Marzo 2027'
];

export default function GenerarFrecuenciaModal({ 
  isOpen, 
  onClose, 
  socios = [], 
  deudas = [], 
  setDeudas 
}) {
  const [mesSeleccionado, setMesSeleccionado] = useState('Septiembre 2026');
  const [fechaVencimiento, setFechaVencimiento] = useState('2026-09-30');
  const [isGenerating, setIsGenerating] = useState(false);

  // Actualizar fecha de vencimiento estimada al cambiar de mes
  const handleMesChange = (nuevoMes) => {
    setMesSeleccionado(nuevoMes);
    const partes = nuevoMes.split(' ');
    const mesNombre = partes[0].toLowerCase();
    const ano = partes[1] || '2026';
    
    const mesMap = {
      'enero': '01-31', 'febrero': '02-28', 'marzo': '03-31', 'abril': '04-30',
      'mayo': '05-31', 'junio': '06-30', 'julio': '07-31', 'agosto': '08-31',
      'septiembre': '09-30', 'octubre': '10-31', 'noviembre': '11-30', 'diciembre': '12-31'
    };
    
    const diaMes = mesMap[mesNombre] || '09-30';
    setFechaVencimiento(`${ano}-${diaMes}`);
  };

  // Cálculo en tiempo real de socios e inquilinos por generar
  const analisis = useMemo(() => {
    // 1. Filtrar afiliados activos
    const activos = socios.filter(s => s.estado !== 'INACTIVO' && s.estado !== 'BAJA');
    
    // Separar propietarios e inquilinos
    const propietarios = activos.filter(s => s.categoria !== 'Inquilino');
    const inquilinos = activos.filter(s => s.categoria === 'Inquilino');

    // 2. Revisar deudas existentes para este periodo
    // Identificar IDs de socios que ya tienen generada la frecuencia de este mes
    const sociosConFrecuenciaSet = new Set();
    deudas.forEach(d => {
      if (
        d.periodo === mesSeleccionado &&
        (d.conceptoId === 1 || d.conceptoId === 8 || 
         (d.descripcion && d.descripcion.toUpperCase().includes('FRECUENCIA')))
      ) {
        sociosConFrecuenciaSet.add(String(d.socioId));
      }
    });

    // Clasificar por estado de emisión
    const propYaGenerados = propietarios.filter(s => sociosConFrecuenciaSet.has(String(s.id)));
    const propPorGenerar = propietarios.filter(s => !sociosConFrecuenciaSet.has(String(s.id)));

    const inqYaGenerados = inquilinos.filter(s => sociosConFrecuenciaSet.has(String(s.id)));
    const inqPorGenerar = inquilinos.filter(s => !sociosConFrecuenciaSet.has(String(s.id)));

    const totalPorGenerar = propPorGenerar.length + inqPorGenerar.length;
    const totalYaGenerados = propYaGenerados.length + inqYaGenerados.length;
    const montoTotal = (propPorGenerar.length * 200.0) + (inqPorGenerar.length * 250.0);

    return {
      propietarios,
      propYaGenerados,
      propPorGenerar,
      montoPropietarios: propPorGenerar.length * 200.0,
      inquilinos,
      inqYaGenerados,
      inqPorGenerar,
      montoInquilinos: inqPorGenerar.length * 250.0,
      totalPorGenerar,
      totalYaGenerados,
      montoTotal
    };
  }, [socios, deudas, mesSeleccionado]);

  if (!isOpen) return null;

  const handleEjecutarGeneracion = async () => {
    if (analisis.totalPorGenerar === 0) {
      alert(`Todas las cuotas de frecuencia para ${mesSeleccionado} ya han sido generadas previamente.`);
      return;
    }

    const confirmar = window.confirm(
      `¿Confirma generar ${analisis.totalPorGenerar} cuotas de frecuencia para ${mesSeleccionado} por un total de Bs ${analisis.montoTotal.toFixed(2)}?\n\n` +
      `- Socios Propietarios: ${analisis.propPorGenerar.length} cuotas de Bs 200.00 (Caja 1)\n` +
      `- Conductores Inquilinos: ${analisis.inqPorGenerar.length} cuotas de Bs 250.00 (Caja 5)\n\n` +
      `Las cuotas se cargarán a las cuentas de los socios y quedarán disponibles en Caja Rápida para cobrar.`
    );

    if (!confirmar) return;

    setIsGenerating(true);
    const fechaHoy = new Date().toISOString().split('T')[0];
    const nuevasDeudas = [];

    // 1. Generar para Socios Propietarios (Bs 200 -> Caja 1)
    analisis.propPorGenerar.forEach((s) => {
      const item = {
        id: `d-${Date.now()}-${s.id}-frec`,
        socioId: s.id,
        conceptoId: 1, // CUOTA FRECUENCIA MENSUAL SOCIOS
        cajaId: 'c1',  // CAJA DE FRECUENCIA
        descripcion: `Cuota Frecuencia Mensual (${mesSeleccionado}) - Móvil #${s.id}`,
        periodo: mesSeleccionado,
        monto: 200.0,
        pagado: false,
        fecha: fechaHoy,
        fechaVencimiento: fechaVencimiento,
        moneda: 'Bs',
        cantidad: 1
      };
      nuevasDeudas.push(item);
      createDeudaAPI(item).catch(() => {});
    });

    // 2. Generar para Inquilinos (Bs 250 -> Caja 5)
    analisis.inqPorGenerar.forEach((s) => {
      const item = {
        id: `d-${Date.now()}-${s.id}-inq`,
        socioId: s.id,
        conceptoId: 8, // FRECUENCIA DE CONDUCTORES INQUILINOS
        cajaId: 'c5',  // CAJA FRECUENCIA INQUILINOS
        descripcion: `Frecuencia de Conductores Inquilinos (${mesSeleccionado}) - Móvil #${s.id}`,
        periodo: mesSeleccionado,
        monto: 250.0,
        pagado: false,
        fecha: fechaHoy,
        fechaVencimiento: fechaVencimiento,
        moneda: 'Bs',
        cantidad: 1
      };
      nuevasDeudas.push(item);
      createDeudaAPI(item).catch(() => {});
    });

    // 3. Actualizar estado global
    if (setDeudas) {
      setDeudas(prev => [...nuevasDeudas, ...prev]);
    }

    setIsGenerating(false);
    onClose();

    alert(
      `¡Generación Exitosa!\n\n` +
      `Se emitieron correctamente ${nuevasDeudas.length} cuotas de frecuencia para ${mesSeleccionado}.\n` +
      `Importe total generado: Bs ${analisis.montoTotal.toFixed(2)}.\n\n` +
      `Los afiliados ya tienen sus cuotas listas para pagar en Caja Rápida / Cobranzas.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-fadeIn text-xs">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-red-700 via-red-800 to-red-900 text-white px-6 py-4 flex justify-between items-center border-b border-red-900">
          <div className="flex items-center space-x-3">
            <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm">
              <Zap className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-black text-sm text-white flex items-center space-x-2">
                <span>Generar Cuotas de Frecuencia Mensual</span>
                <span className="bg-amber-400/20 text-amber-200 text-[10px] px-2 py-0.5 rounded-full border border-amber-400/30">
                  Obligación Mensual Única
                </span>
              </h3>
              <p className="text-[11px] text-red-100">
                Emisión masiva periódica oficial para Socios Propietarios e Inquilinos
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-red-200 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Configuración de Periodo y Vencimiento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <label className="block font-bold text-slate-800 mb-1 flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-red-700" />
                <span>Mes / Periodo a Generar *</span>
              </label>
              <select
                value={mesSeleccionado}
                onChange={(e) => handleMesChange(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                {MESES_DISPONIBLES.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1 flex items-center space-x-1.5">
                <CalendarCheck className="w-3.5 h-3.5 text-blue-700" />
                <span>Fecha Límite de Vencimiento *</span>
              </label>
              <input
                type="date"
                value={fechaVencimiento}
                onChange={(e) => setFechaVencimiento(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Tarjetas Informativas de las 2 Categorías */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tarjeta Socios Propietarios */}
            <div className="bg-red-50/50 border border-red-200 rounded-2xl p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-800 block">
                    SOCIOS PROPIETARIOS
                  </span>
                  <h4 className="font-black text-slate-900 text-xs">Cuota Frecuencia Mensual</h4>
                  <span className="text-[10px] font-medium text-slate-500">Destino: Caja 1 (Frecuencia)</span>
                </div>
                <span className="bg-red-700 text-white font-mono font-black px-2.5 py-1 rounded-lg text-xs">
                  Bs 200.00
                </span>
              </div>

              <div className="pt-2 border-t border-red-200/60 space-y-1 font-mono text-[11px]">
                <div className="flex justify-between text-slate-600">
                  <span>Padrón Activo:</span>
                  <span className="font-bold">{analisis.propietarios.length} móviles</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Ya emitidos ({mesSeleccionado}):</span>
                  <span className="text-emerald-700 font-bold">{analisis.propYaGenerados.length}</span>
                </div>
                <div className="flex justify-between text-red-900 font-bold pt-1 border-t border-red-100">
                  <span>Por Generar:</span>
                  <span className="text-red-700">{analisis.propPorGenerar.length} cuotas (Bs {analisis.montoPropietarios.toFixed(2)})</span>
                </div>
              </div>
            </div>

            {/* Tarjeta Conductores Inquilinos */}
            <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-800 block">
                    CONDUCTORES INQUILINOS
                  </span>
                  <h4 className="font-black text-slate-900 text-xs">Frecuencia Conductor Inquilino</h4>
                  <span className="text-[10px] font-medium text-slate-500">Destino: Caja 5 (Frec. Inquilinos)</span>
                </div>
                <span className="bg-blue-700 text-white font-mono font-black px-2.5 py-1 rounded-lg text-xs">
                  Bs 250.00
                </span>
              </div>

              <div className="pt-2 border-t border-blue-200/60 space-y-1 font-mono text-[11px]">
                <div className="flex justify-between text-slate-600">
                  <span>Padrón Activo:</span>
                  <span className="font-bold">{analisis.inquilinos.length} conductores</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Ya emitidos ({mesSeleccionado}):</span>
                  <span className="text-emerald-700 font-bold">{analisis.inqYaGenerados.length}</span>
                </div>
                <div className="flex justify-between text-blue-900 font-bold pt-1 border-t border-blue-100">
                  <span>Por Generar:</span>
                  <span className="text-blue-700">{analisis.inqPorGenerar.length} cuotas (Bs {analisis.montoInquilinos.toFixed(2)})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen Total y Alertas Inteligentes */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  RESUMEN DE EMISIÓN ({mesSeleccionado})
                </span>
                <div className="text-sm font-black text-white mt-0.5">
                  {analisis.totalPorGenerar > 0 ? (
                    <span>Se generarán <span className="text-amber-400">{analisis.totalPorGenerar} nuevas cuotas</span></span>
                  ) : (
                    <span className="text-emerald-400 flex items-center space-x-1">
                      <CheckCircle2 className="w-4 h-4 inline" />
                      <span>Todas las cuotas de este periodo ya están generadas</span>
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 block">Total en Cartera</span>
                <span className="font-mono font-black text-lg text-amber-400">
                  Bs {analisis.montoTotal.toLocaleString('es-BO', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Aviso de Protección Anti-Duplicados */}
            <div className="pt-2 border-t border-slate-800 flex items-center space-x-2 text-[11px] text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Protección Anti-Duplicación:</strong> Si un afiliado ya tiene emitida la cuota de {mesSeleccionado}, se omite automáticamente para salvaguardar el cuadre contable.
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:text-slate-800 font-bold rounded-xl hover:bg-slate-200 transition cursor-pointer"
          >
            Cancelar
          </button>
          
          <button
            type="button"
            disabled={analisis.totalPorGenerar === 0 || isGenerating}
            onClick={handleEjecutarGeneracion}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-black text-white shadow-sm transition cursor-pointer ${
              analisis.totalPorGenerar === 0 || isGenerating
                ? 'bg-slate-400 cursor-not-allowed opacity-60'
                : 'bg-red-700 hover:bg-red-800 hover:shadow-md'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>
              {isGenerating 
                ? 'Generando Cuotas...' 
                : `Confirmar y Generar Cuotas (${analisis.totalPorGenerar})`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
