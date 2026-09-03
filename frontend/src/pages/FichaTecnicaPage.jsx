import React from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Calendar, 
  Download, 
  Printer, 
  ShieldCheck, 
  Sparkles,
  Users,
  HandCoins,
  TrendingDown,
  Landmark,
  Package,
  BarChart3,
  Sliders
} from 'lucide-react';

export default function FichaTecnicaPage() {
  const modulos = [
    {
      num: 1,
      titulo: 'Padrón de Socios / Inquilinos',
      icon: Users,
      desc: 'Cálculo automático de antigüedad en años y meses, gestión de membresías activas o en mora, control de bajas y kardex histórico individual.'
    },
    {
      num: 2,
      titulo: 'Configuración de Cuotas y Multas',
      icon: Sliders,
      desc: 'Generación periódica (diaria, semanal, mensual, anual), control de multas por inasistencia y selector doble para eximir o incluir afiliados en lote.'
    },
    {
      num: 3,
      titulo: 'Caja Rápida de Cobranzas',
      icon: HandCoins,
      desc: 'Búsqueda instantánea de socio, selección ágil con casillas de verificación (checkbox), soporte de amortizaciones a cuenta y emisión de ticket térmico.'
    },
    {
      num: 4,
      titulo: 'Control de Egresos y Gastos',
      icon: TrendingDown,
      desc: 'Clasificación por categorías, beneficiario obligatorio ("Pagado a") y emisión de Comprobante Oficial de Egreso con firmas de tesorería y beneficiario.'
    },
    {
      num: 5,
      titulo: 'Préstamos y Cajas Múltiples',
      icon: Landmark,
      desc: 'Separación contable en Caja General, Caja GPS, Caja Préstamos con interés, Caja Ahorros y simulación con emisión de Plan de Pagos amortizado.'
    },
    {
      num: 6,
      titulo: 'Almacén e Inventario',
      icon: Package,
      desc: 'Control de stock de repuestos, lubricantes e insumos institucionales, alertas de stock mínimo y reporte de Kardex Valorado en bolivianos.'
    },
    {
      num: 7,
      titulo: 'Reportes y Rendición de Cuentas',
      icon: BarChart3,
      desc: 'Matriz dinámica de deudas (Socio vs Conceptos), Balance General por Caja (Saldo Anterior + Ingresos - Egresos = Saldo Actual) y arqueo por cajero.'
    }
  ];

  const cronograma = [
    { fase: 'Fase 1', nombre: 'Núcleo y Padrón de Socios', detalle: 'Base de datos relacional, Registro de Socios, cálculo de antigüedad y membresías.', estado: 'Completado' },
    { fase: 'Fase 2', nombre: 'Cuotas y Caja Rápida', detalle: 'Generador de cuotas periódicas, multas, caja de cobro y emisión de tickets térmicos.', estado: 'Completado' },
    { fase: 'Fase 3', nombre: 'Egresos y Cajas Múltiples', detalle: 'Registro de gastos clasificados, emisión de boleta con firmas y balance de fondos.', estado: 'Completado' },
    { fase: 'Fase 4', nombre: 'Préstamos, Inventario y Reportes', detalle: 'Simulador de créditos con amortización, kardex valorado y matriz de deudas.', estado: 'Completado' },
    { fase: 'Fase 5', nombre: 'Despliegue y Capacitación', detalle: 'Instalación multiusuario en red local, configuración de impresoras térmicas y entrega final.', estado: 'En Curso' }
  ];

  const ventajas = [
    { titulo: 'Multiusuario en Red Local', desc: 'Se instala en la PC central de la oficina y todas las demás máquinas o tablets operan desde el navegador sin instalar nada.' },
    { titulo: 'Impresión Dual Flexible', desc: 'Soporta tanto impresoras térmicas de tickets (58mm / 80mm) como impresoras comunes de hojas para informes de asamblea.' },
    { titulo: 'Seguridad por Roles', desc: 'Diferenciación estricta entre Cajeros (solo cobran) y Administradores (autorizar gastos, anular cobros, condonar multas).' },
    { titulo: 'Exportación a Excel y PDF', desc: 'Todos los balances, listas de morosos y extractos se pueden descargar con un clic para análisis en hojas de cálculo.' }
  ];

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6 animate-fadeIn">
      {/* Portada Ejecutiva */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-3">
          <span className="bg-red-50 text-red-800 font-extrabold text-xs px-3 py-1 rounded-full border border-red-200 uppercase tracking-wide">
            Ficha Técnica Oficial del Proyecto
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => window.print()}
              className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-300 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir Ficha</span>
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            SISTEMA INTEGRAL DE GESTIÓN ECONÓMICA, COBRANZAS Y RENDICIÓN DE CUENTAS
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Plataforma administrativa personalizada para la empresa: <strong>RADIO MÓVIL 15 DE ABRIL</strong> • Denominación: <strong>SISCOB</strong> (Sistema de Cobranza de Socios)
          </p>
        </div>

        {/* Principio de Diseño Destacado */}
        <div className="bg-gradient-to-r from-red-700 to-red-900 text-white p-5 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center space-x-2 text-red-200 text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Principio Fundamental de Diseño</span>
          </div>
          <p className="text-base font-semibold leading-relaxed">
            "Sencillo, transparente y sin la complejidad innecesaria de un sistema contable tradicional."
          </p>
          <p className="text-xs text-red-100 leading-normal">
            No requiere profesionales en contabilidad ni asientos complejos por partida doble. Diseñado para que la directiva y cajeros puedan saber quién debe qué en segundos, cobrar con ticket inmediato y entregar a las bases balances claros de <em>Saldo Anterior + Ingresos - Egresos = Saldo Actual</em> en cada asamblea.
          </p>
        </div>

        {/* Ficha Técnica Metadata Table */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <span className="text-slate-500 block text-[11px]">Organización / Cliente:</span>
            <strong className="text-slate-900 font-bold">RADIO MÓVIL 15 DE ABRIL</strong>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <span className="text-slate-500 block text-[11px]">Nombre del Software:</span>
            <strong className="text-red-700 font-bold">SISCOB (Cobranza de Socios)</strong>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <span className="text-slate-500 block text-[11px]">Tipo de Aplicación:</span>
            <strong className="text-slate-900 font-bold">Web PWA (Multi-máquina)</strong>
          </div>
        </div>
      </div>

      {/* Desglose Exhaustivo de los 7 Módulos */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wide flex items-center space-x-2">
            <Layers className="w-5 h-5 text-red-700" />
            <span>Desglose Exhaustivo de los 7 Módulos del Sistema</span>
          </h2>
          <p className="text-xs text-slate-500">Cada módulo cubre una necesidad operativa directa de Radio Móvil 15 de Abril</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modulos.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.num} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-700 text-white p-2 rounded-lg">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-red-700 uppercase">Módulo {m.num}</span>
                    <h3 className="font-extrabold text-slate-900 text-sm">{m.titulo}</h3>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-1">
                  {m.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Flujo Operativo y Rendición en Asamblea */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wide flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-red-700" />
            <span>Flujo Operativo y Ciclo de Rendición en Asamblea</span>
          </h2>
          <p className="text-xs text-slate-500">Transparencia y trazabilidad garantizada en cada etapa del mes</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900 text-white font-semibold">
              <tr>
                <th className="p-3">Fase</th>
                <th className="p-3">Acción Operativa</th>
                <th className="p-3">Resultado en SISCOB</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              <tr>
                <td className="p-3 font-bold text-red-700">1. Apertura Periodo</td>
                <td className="p-3">El administrador genera las cuotas de frecuencia del mes o semana.</td>
                <td className="p-3 text-slate-600">Se crean en lote los saldos pendientes en las cuentas de todos los socios activos.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-red-700">2. Cobranza Diaria</td>
                <td className="p-3">El socio cancela sus aportes o multas en ventanilla.</td>
                <td className="p-3 text-slate-600">Se descuenta la deuda en tiempo real, ingresa el dinero a caja y se imprime el ticket térmico.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-red-700">3. Gastos / Egresos</td>
                <td className="p-3">Se autoriza un pago (sueldos, mantenimiento de radio, repuestos).</td>
                <td className="p-3 text-slate-600">Se genera el comprobante con firmas y se descuenta del saldo de la caja seleccionada.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-red-700">4. Rendición en Asamblea</td>
                <td className="p-3">La directiva emite el Balance General Consolidado.</td>
                <td className="p-3 text-slate-600 font-semibold text-slate-900">
                  Informe listo para imprimir: Saldo Inicial + Ingresos - Egresos = Saldo en Caja.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Especificaciones Tecnológicas y Ventajas */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wide flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-red-700" />
            <span>Especificaciones Tecnológicas y Ventajas Competitivas</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ventajas.map((v, i) => (
            <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="flex items-center space-x-2 font-bold text-slate-900 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{v.titulo}</span>
              </div>
              <p className="text-xs text-slate-600 pl-6 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cronograma Propuesto en 5 Fases */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wide flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Cronograma Propuesto de Implementación (5 Fases)</span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900 text-white font-semibold">
              <tr>
                <th className="p-3">Fase</th>
                <th className="p-3">Nombre</th>
                <th className="p-3">Entregables Principales</th>
                <th className="p-3 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {cronograma.map((c, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-red-700">{c.fase}</td>
                  <td className="p-3 font-bold text-slate-900">{c.nombre}</td>
                  <td className="p-3 text-slate-600">{c.detalle}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      c.estado === 'Completado' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {c.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}