import React, { useState, useEffect } from 'react';
import { 
  Landmark, 
  Calculator, 
  Printer, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Plus, 
  Search, 
  User, 
  X,
  Clock,
  TrendingDown,
  Trash2
} from 'lucide-react';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { createEgresoAPI, createDeudaAPI, deleteDeudasPrestamosAPI } from '../utils/api';
import { printIsolatedDocument, generatePlanDePagosHTML } from '../utils/printHelper';

export default function PrestamosPage({ 
  socios = [], 
  cajas = [], 
  setCajas, 
  egresos = [], 
  setEgresos, 
  deudas = [], 
  setDeudas, 
  prestamos: propPrestamos,
  setPrestamos: propSetPrestamos,
  currentUser 
}) {
  const [localPrestamos, setLocalPrestamos] = useState(() => loadFromStorage('siscob_prestamos', []));
  const prestamos = propPrestamos !== undefined ? propPrestamos : localPrestamos;
  const setPrestamos = propSetPrestamos || setLocalPrestamos;

  useEffect(() => {
    // Si el padrón de socios está en cero (puesta a cero activa), limpiar automáticamente préstamos ficticios
    if (socios.length === 0 && prestamos.some(p => ['PR-2026-0891', 'PR-2026-0942', 'PR-2026-1005', 'PR-2025-0450'].includes(p.folio))) {
      setPrestamos([]);
      saveToStorage('siscob_prestamos', []);
    }
  }, [socios, prestamos, setPrestamos]);

  useEffect(() => {
    saveToStorage('siscob_prestamos', prestamos);
  }, [prestamos]);

  // Simulator State
  const [monto, setMonto] = useState(15000);
  const [plazo, setPlazo] = useState(12);
  const [tasaAnual, setTasaAnual] = useState(12); // 12% anual = 1% mensual
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [activePlanData, setActivePlanData] = useState(null);

  // New Loan Modal State
  const [isNewLoanModalOpen, setIsNewLoanModalOpen] = useState(false);
  const [socioSearch, setSocioSearch] = useState('');
  const [selectedSocio, setSelectedSocio] = useState(null);
  const [cajaDesembolso, setCajaDesembolso] = useState('c4'); // c4 = Caja Préstamos
  const [loanSuccessMsg, setLoanSuccessMsg] = useState(null);

  // Loan calculation logic with exact payment deadline dates (fechas límite)
  const calcularDetallesPrestamo = (pMonto, pPlazo, pTasaAnual, pDiaPago = 15) => {
    const tasaMensual = (pTasaAnual / 100) / 12;
    const cuotaMensual = (pMonto * (tasaMensual * Math.pow(1 + tasaMensual, pPlazo))) / (Math.pow(1 + tasaMensual, pPlazo) - 1);
    const totalPagar = cuotaMensual * pPlazo;
    const totalInteres = totalPagar - pMonto;

    const planPagos = [];
    let saldoRestante = pMonto;
    const hoy = new Date();

    for (let i = 1; i <= pPlazo; i++) {
      const interesCuota = saldoRestante * tasaMensual;
      const capitalCuota = cuotaMensual - interesCuota;
      saldoRestante -= capitalCuota;

      // Calcular fecha límite mensual sucesiva (día 15 de cada mes)
      const d = new Date(hoy.getFullYear(), hoy.getMonth() + i, pDiaPago);
      const fechaISO = d.toISOString().split('T')[0];
      const diaStr = String(d.getDate()).padStart(2, '0');
      const mesStr = String(d.getMonth() + 1).padStart(2, '0');
      const anioStr = d.getFullYear();
      const fechaFormateada = `${diaStr}/${mesStr}/${anioStr}`;

      planPagos.push({
        nro: i,
        fechaLimite: fechaFormateada,
        fechaLimiteISO: fechaISO,
        cuota: cuotaMensual,
        capital: capitalCuota,
        interes: interesCuota,
        saldo: Math.max(0, saldoRestante),
        pagado: false
      });
    }

    return { tasaMensual, cuotaMensual, totalPagar, totalInteres, planPagos };
  };

  const currentCalc = calcularDetallesPrestamo(monto, plazo, tasaAnual);

  // Filter socios for new loan modal
  const sociosFiltrados = socios.filter(s => {
    if (!socioSearch.trim()) return false;
    const term = socioSearch.toLowerCase();
    const movil = (s.nroMovil || s.id || '').toString().toLowerCase();
    return (
      movil.includes(term) ||
      s.id.toString().includes(term) ||
      (s.nombres && s.nombres.toLowerCase().includes(term)) ||
      (s.apPaterno && s.apPaterno.toLowerCase().includes(term)) ||
      (s.ci && s.ci.toLowerCase().includes(term))
    );
  });

  // Handler to approve and disburse loan
  const handleAprobarPrestamo = async (e) => {
    e.preventDefault();
    if (!selectedSocio) {
      alert('Por favor seleccione un socio beneficiario.');
      return;
    }
    if (!monto || monto <= 0) {
      alert('Ingrese un monto válido para el préstamo.');
      return;
    }

    const { cuotaMensual, planPagos } = currentCalc;
    const folio = `PR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const nombreCompleto = `${selectedSocio.nombres} ${selectedSocio.apPaterno} ${selectedSocio.apMaterno || ''}`.trim();
    const primeraCuota = planPagos[0];

    // 1. Crear Préstamo en Estado con cronograma de pagos y fechas límite
    const nuevoPrestamo = {
      folio,
      socio: nombreCompleto,
      socioId: selectedSocio.id,
      socioMovil: selectedSocio.nroMovil || selectedSocio.id,
      socioCI: selectedSocio.ci,
      original: monto,
      saldo: monto,
      cuota: cuotaMensual,
      plazo,
      tasaAnual,
      fechaDesembolso: new Date().toISOString().split('T')[0],
      vencimiento: primeraCuota ? primeraCuota.fechaLimite : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('es-BO'),
      proximoVencimiento: primeraCuota ? primeraCuota.fechaLimiteISO : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      planPagos,
      estado: 'AL DÍA'
    };

    setPrestamos([nuevoPrestamo, ...prestamos]);

    // 2. Registrar Egreso Contable de Desembolso en Caja 4 (Supabase + Local)
    const egresoPayload = {
      nroBoleta: `EGR-${folio.replace('PR-', 'DES-')}`,
      cajaId: cajaDesembolso,
      categoria: 'DESEMBOLSO DE PRÉSTAMO',
      beneficiario: `(MÓVIL #${selectedSocio.nroMovil || selectedSocio.id}) ${nombreCompleto} - CI: ${selectedSocio.ci}`,
      concepto: `DESEMBOLSO DE CRÉDITO INSTITUCIONAL ${folio} A ${plazo} MESES`,
      monto: monto,
      responsable: currentUser?.nombre || 'Administrador Central'
    };

    await createEgresoAPI(egresoPayload);

    if (setEgresos) {
      setEgresos(prev => [{
        id: Date.now(),
        fecha: new Date().toISOString().split('T')[0],
        grupo: 'DESEMBOLSO DE PRÉSTAMO',
        descripcion: egresoPayload.concepto,
        pagadoA: egresoPayload.beneficiario,
        monto: monto,
        moneda: 'Bs',
        conDocumento: `PLAN DE PAGOS ${folio}`,
        cajaId: cajaDesembolso,
        usuario: currentUser?.nombre || 'Admin'
      }, ...prev]);
    }

    // 3. Descontar dinero de la Caja de Desembolso (Caja 4)
    if (setCajas) {
      setCajas(prev => prev.map(c => 
        c.id === cajaDesembolso 
          ? { ...c, egresos: (c.egresos || 0) + monto, saldoActual: (c.saldoActual || c.saldoAnterior || 0) - monto } 
          : c
      ));
    }

    // 4. Generar las Cuotas Mensuales con FECHA LÍMITE para cobrar en Caja Rápida
    const nuevasDeudas = [];
    for (let i = 1; i <= Math.min(plazo, 12); i++) {
      const cuotaItem = planPagos[i - 1];
      const fechaVencISO = cuotaItem?.fechaLimiteISO || new Date(Date.now() + i * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const fechaVencFormatted = cuotaItem?.fechaLimite || `${15}/${i}/2026`;

      const deudaItem = {
        id: `d-pr-${Date.now()}-${i}`,
        socioId: selectedSocio.id,
        conceptoId: 7, // Amortización de Préstamo (Caja 4)
        cajaId: 'c4',
        descripcion: `Cuota Préstamo ${i}/${plazo} (${folio}) - Vence: ${fechaVencFormatted}`,
        periodo: `Cuota ${i} (${fechaVencFormatted})`,
        monto: parseFloat(cuotaMensual.toFixed(2)),
        pagado: false,
        fecha: fechaVencISO,
        fechaVencimiento: fechaVencISO,
        moneda: 'Bs',
        cantidad: 1
      };

      nuevasDeudas.push(deudaItem);
      // Guardar en Supabase
      createDeudaAPI({
        socioId: selectedSocio.id,
        conceptoId: 7,
        descripcion: deudaItem.descripcion,
        periodo: deudaItem.periodo,
        monto: deudaItem.monto,
        fechaVencimiento: deudaItem.fechaVencimiento
      });
    }

    if (setDeudas) {
      setDeudas(prev => [...nuevasDeudas, ...prev]);
    }

    setIsNewLoanModalOpen(false);
    setSelectedSocio(null);
    setSocioSearch('');

    // Abrir el plan de pagos oficial para imprimir
    setActivePlanData({
      folio,
      socio: nombreCompleto,
      socioCI: selectedSocio.ci,
      socioMovil: selectedSocio.id,
      monto,
      plazo,
      tasaAnual,
      cuotaMensual,
      planPagos
    });
    setShowPlanModal(true);

    setLoanSuccessMsg(`¡Préstamo ${folio} aprobado y desembolsado exitosamente! Se generó el comprobante de egreso y las cuotas en Caja Rápida.`);
    setTimeout(() => setLoanSuccessMsg(null), 5000);
  };

  const handleVaciarCartera = async () => {
    if (window.confirm('¿Está seguro de reiniciar la cartera de préstamos a cero? Esta acción eliminará todos los préstamos registrados y sus cuotas pendientes en el sistema.')) {
      setPrestamos([]);
      saveToStorage('siscob_prestamos', []);

      if (setDeudas) {
        setDeudas(prev => {
          const limpias = prev.filter(d => {
            const desc = (d.descripcion || '').toUpperCase();
            return !(d.conceptoId === 7 || desc.includes('PRÉSTAMO') || desc.includes('PRESTAMO') || desc.includes('AMORTIZ') || desc.includes('PR-2026-'));
          });
          saveToStorage('siscob_deudas', limpias);
          return limpias;
        });
      }

      try {
        await deleteDeudasPrestamosAPI();
      } catch (err) {
        console.warn('Aviso al limpiar deudas de préstamos remotas:', err);
      }

      setLoanSuccessMsg('Cartera de préstamos y cuotas pendientes reiniciadas a cero.');
      setTimeout(() => setLoanSuccessMsg(null), 4000);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Toast Notificación */}
      {loanSuccessMsg && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-700 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 text-xs font-bold animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <span>{loanSuccessMsg}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-xs no-print gap-3">
        <div>
          <h1 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
            <Landmark className="w-5 h-5 text-red-700" />
            <span>Módulo de Préstamos y Fondo de Créditos</span>
          </h1>
          <p className="text-xs text-slate-500">Gestión de cartera, simulador de cuotas y desembolsos automáticos para afiliados</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {prestamos.length > 0 && (
            <button
              onClick={handleVaciarCartera}
              className="flex items-center space-x-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer"
              title="Borrar todos los préstamos y dejar cartera en cero"
            >
              <Trash2 className="w-4 h-4" />
              <span>Vaciar a Cero</span>
            </button>
          )}
          <button
            onClick={() => {
              setActivePlanData(null);
              setShowPlanModal(true);
            }}
            className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            <span>Simulador</span>
          </button>
          <button
            onClick={() => setIsNewLoanModalOpen(true)}
            className="flex items-center space-x-1.5 bg-red-700 hover:bg-red-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs transition cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>+ Otorgar Préstamo a Socio</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 cols: Kardex de Préstamos Activos */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wide">
              Kardex de Préstamos Institucionales
            </h3>
            <span className="text-xs font-bold text-slate-500">{prestamos.length} créditos registrados</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100">
                <tr>
                  <th className="p-3">Folio / Socio</th>
                  <th className="p-3 text-right">Monto Original</th>
                  <th className="p-3 text-right">Saldo Restante</th>
                  <th className="p-3 text-right">Cuota Mensual</th>
                  <th className="p-3 text-center">Plazo</th>
                  <th className="p-3 text-center">Fecha Límite / Vencimiento</th>
                  <th className="p-3 text-center">Estado</th>
                  <th className="p-3 text-center">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {prestamos.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-12 text-center text-slate-400">
                      <Landmark className="w-10 h-10 mx-auto mb-2 text-slate-300 stroke-1" />
                      <p className="font-bold text-slate-600 text-sm">Cartera de Préstamos en Cero (0 créditos activos)</p>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                        {socios.length === 0 
                          ? 'El sistema está en blanco para operaciones limpias. Registre socios para otorgar créditos.'
                          : 'Haga clic en "+ Otorgar Préstamo a Socio" para registrar un crédito.'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  prestamos.map((p) => (
                    <tr key={p.folio} className="hover:bg-slate-50 transition">
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{p.socio}</div>
                        <div className="text-[10px] font-mono text-slate-400">{p.folio} • Móvil #{p.socioMovil || p.socioId || p.id}</div>
                      </td>
                      <td className="p-3 font-mono font-bold text-right text-slate-800">Bs {p.original.toLocaleString()}</td>
                      <td className="p-3 font-mono font-bold text-right text-red-700">Bs {p.saldo.toLocaleString()}</td>
                      <td className="p-3 font-mono font-semibold text-right text-slate-700">Bs {parseFloat(p.cuota).toFixed(2)}</td>
                      <td className="p-3 text-center font-mono">{p.plazo || 12}m</td>
                      <td className="p-3 text-center font-mono">
                        <span className="inline-flex items-center space-x-1 font-bold text-red-800 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md text-[11px]">
                          <Clock className="w-3 h-3 text-red-600" />
                          <span>{p.vencimiento || p.proximoVencimiento || 'Al día'}</span>
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          p.estado === 'AL DÍA' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : p.estado === 'ATRASO' || p.estado === 'VENCIDO'
                            ? 'bg-rose-100 text-rose-800' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {p.estado}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => {
                            setActivePlanData(p);
                            setShowPlanModal(true);
                          }}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-bold transition cursor-pointer flex items-center space-x-1 mx-auto"
                          title="Ver cronograma y fechas límite de cuotas"
                        >
                          <FileText className="w-3.5 h-3.5 text-red-700" />
                          <span>Ver Plan</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 4 cols: Calculadora / Simulador */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-2">
            <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block">Calculadora Rápida</span>
            <h3 className="font-extrabold text-slate-900 text-sm">Simulador de Cuotas</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Monto a Simular (Bs)</label>
              <input
                type="number"
                step="1000"
                value={monto}
                onChange={(e) => setMonto(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Plazo (Meses)</label>
                <select
                  value={plazo}
                  onChange={(e) => setPlazo(parseInt(e.target.value))}
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-bold bg-white"
                >
                  <option value={6}>6 Meses</option>
                  <option value={12}>12 Meses</option>
                  <option value={24}>24 Meses</option>
                  <option value={36}>36 Meses</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tasa Anual (%)</label>
                <input
                  type="number"
                  step="0.5"
                  value={tasaAnual}
                  onChange={(e) => setTasaAnual(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-bold font-mono"
                />
              </div>
            </div>

            {/* Cuota Estimada Result Card */}
            <div className="bg-red-50 p-4 rounded-xl border border-red-200 space-y-1 text-center">
              <span className="text-[10px] font-bold text-red-800 uppercase block">Cuota Mensual Fija</span>
              <div className="text-2xl font-black font-mono text-red-700">
                Bs {currentCalc.cuotaMensual ? currentCalc.cuotaMensual.toFixed(2) : '0.00'}
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-red-200/60 text-[11px]">
                <div>
                  <span className="text-slate-500 block">Total a Pagar:</span>
                  <strong className="font-mono text-slate-800">Bs {currentCalc.totalPagar.toFixed(2)}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Interés Total:</span>
                  <strong className="font-mono text-red-800">Bs {currentCalc.totalInteres.toFixed(2)}</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setActivePlanData(null);
                setShowPlanModal(true);
              }}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-extrabold text-xs transition cursor-pointer shadow-xs"
            >
              VER TABLA DE AMORTIZACIÓN
            </button>
          </div>
        </div>
      </div>

      {/* Modal: Otorgar y Desembolsar Préstamo Directo */}
      {isNewLoanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
            <div className="bg-red-800 text-white px-5 py-3.5 flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-sm tracking-wide uppercase">Otorgar Nuevo Préstamo</h3>
                <p className="text-[10px] text-red-200">Asignación, desembolso en caja y programación de cuotas</p>
              </div>
              <button 
                onClick={() => { setIsNewLoanModalOpen(false); setSelectedSocio(null); setSocioSearch(''); }} 
                className="text-red-300 hover:text-white cursor-pointer text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAprobarPrestamo} className="p-5 space-y-3.5 text-xs">
              {/* Buscador de Socio con Auto-llenado */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                <label className="block font-extrabold text-slate-800">
                  Seleccionar Socio Beneficiario (Por Móvil, Nombre o CI):
                </label>

                {!selectedSocio ? (
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Escribe número de móvil, nombre o CI..."
                      value={socioSearch}
                      onChange={(e) => setSocioSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />

                    {socioSearch.trim() && (
                      <div className="absolute left-0 right-0 top-11 bg-white border border-slate-200 rounded-xl shadow-xl max-h-48 overflow-y-auto z-20 divide-y divide-slate-100">
                        {sociosFiltrados.length > 0 ? (
                          sociosFiltrados.map((s) => (
                            <div
                              key={s.id}
                              onClick={() => { setSelectedSocio(s); setSocioSearch(''); }}
                              className="p-2.5 hover:bg-red-50 cursor-pointer flex justify-between items-center transition"
                            >
                              <div>
                                <div className="font-extrabold text-slate-900">
                                  Móvil #{s.id} • {s.nombres} {s.apPaterno} {s.apMaterno || ''}
                                </div>
                                <div className="text-[10px] text-slate-500 font-mono">
                                  CI: {s.ci} | Cel: {s.celular || 'S/N'}
                                </div>
                              </div>
                              <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
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
                  <div className="bg-white p-3 rounded-xl border-2 border-red-200 flex justify-between items-center">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-9 h-9 rounded-full bg-red-700 text-white font-black flex items-center justify-center text-xs">
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
                      onClick={() => setSelectedSocio(null)}
                      className="p-1 rounded-lg text-slate-400 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                      title="Cambiar socio"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Condiciones Financieras */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Monto a Prestar (Bs) *</label>
                  <input
                    type="number"
                    step="500"
                    required
                    value={monto}
                    onChange={(e) => setMonto(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-mono font-bold text-base text-red-700"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Plazo de Devolución</label>
                  <select
                    value={plazo}
                    onChange={(e) => setPlazo(parseInt(e.target.value))}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-bold bg-white"
                  >
                    <option value={6}>6 Meses</option>
                    <option value={12}>12 Meses</option>
                    <option value={24}>24 Meses</option>
                    <option value={36}>36 Meses</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tasa Anual (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={tasaAnual}
                    onChange={(e) => setTasaAnual(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Desembolsar de Caja:</label>
                  <select
                    value={cajaDesembolso}
                    onChange={(e) => setCajaDesembolso(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-bold bg-white"
                  >
                    {cajas.map(c => (
                      <option key={c.id} value={c.id}>{c.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Resumen de la Cuota a pagar */}
              <div className="bg-red-50 p-3 rounded-xl border border-red-200 text-center space-y-1">
                <span className="text-[10px] font-bold text-red-800 uppercase block">Cuota Mensual Automática</span>
                <span className="text-xl font-black font-mono text-red-700">
                  Bs {currentCalc.cuotaMensual.toFixed(2)} / mes
                </span>
                <p className="text-[10px] text-slate-500">
                  Esta cuota se programará en <strong>Caja Rápida</strong> para ser cobrada mensualmente al socio.
                </p>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsNewLoanModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-xl font-bold shadow-xs transition cursor-pointer active:scale-95"
                >
                  Aprobar y Desembolsar Crédito
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Plan de Pagos Modal */}
      {showPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200">
            <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center no-print">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-red-400" />
                <div>
                  <h3 className="font-extrabold text-sm tracking-wide uppercase">
                    {activePlanData ? `Plan de Pagos Oficial (${activePlanData.folio})` : 'Plan de Pagos / Tabla de Amortización'}
                  </h3>
                  <p className="text-[10px] text-slate-400">Documento contractual oficial para firma del socio y directorio</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    const data = activePlanData || {
                      folio: 'PR-2026-SIM',
                      socio: selectedSocio ? `${selectedSocio.nombres} ${selectedSocio.apPaterno}` : 'Socio Solicitante',
                      socioCI: selectedSocio?.ci || 'S/N',
                      socioMovil: selectedSocio?.id || '0',
                      monto,
                      plazo,
                      tasaAnual,
                      cuotaMensual: currentCalc.cuotaMensual,
                      planPagos: currentCalc.planPagos
                    };
                    const html = generatePlanDePagosHTML(data);
                    printIsolatedDocument(html, `Plan_de_Pagos_${data.folio}`);
                  }}
                  className="flex items-center space-x-1.5 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs active:scale-95"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir Plan Limpio</span>
                </button>
                <button onClick={() => setShowPlanModal(false)} className="text-slate-400 hover:text-white cursor-pointer p-1 font-bold text-lg">✕</button>
              </div>
            </div>

            <div className="p-6 text-xs space-y-4 max-h-[75vh] overflow-y-auto bg-slate-50">
              {/* Preview Container styled as Paper Document */}
              <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4">
                <div className="text-center border-b-2 border-red-700 pb-3 space-y-1">
                  <h2 className="font-black text-lg uppercase tracking-wider text-slate-900">
                    ASOCIACIÓN DE TRANSPORTE "RADIO MÓVIL 15 DE ABRIL" S.R.L.
                  </h2>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Personería Jurídica N° 458/98 • NIT: 1028374029 • Tarija, Bolivia
                  </p>
                  <div className="inline-block bg-red-700 text-white font-extrabold text-xs px-4 py-1 rounded mt-1 uppercase tracking-wide">
                    TABLA DE AMORTIZACIÓN Y PLAN DE PAGOS OFICIAL
                  </div>
                </div>

                {/* Info Cards Grid */}
                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-extrabold text-[10px] text-red-700 uppercase block border-b pb-1">
                      Datos del Prestatario (Socio)
                    </span>
                    <div><span className="text-slate-500">Socio:</span> <strong>{activePlanData?.socio || 'Socio Solicitante'}</strong></div>
                    <div><span className="text-slate-500">Móvil Interno:</span> <strong className="font-mono text-red-700 font-bold">#{activePlanData?.socioMovil || '0'}</strong></div>
                    <div><span className="text-slate-500">C.I.:</span> <strong>{activePlanData?.socioCI || 'S/N'}</strong></div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1 font-mono">
                    <span className="font-extrabold text-[10px] text-red-700 uppercase block border-b pb-1 font-sans">
                      Condiciones del Crédito
                    </span>
                    <div><span className="text-slate-500 font-sans">Folio:</span> <strong className="text-red-700">{activePlanData?.folio || 'PR-2026-SIM'}</strong></div>
                    <div><span className="text-slate-500 font-sans">Capital:</span> <strong>Bs {(activePlanData?.monto || monto).toLocaleString()}</strong></div>
                    <div><span className="text-slate-500 font-sans">Plazo:</span> <strong>{activePlanData?.plazo || plazo} Meses</strong> | Tasa: <strong>{activePlanData?.tasaAnual || tasaAnual}% Anual</strong></div>
                  </div>
                </div>

                {/* Card Cuota Mensual Fija */}
                <div className="flex justify-between items-center bg-red-50 p-3 rounded-xl border border-red-200">
                  <div>
                    <span className="text-[10px] font-bold text-red-800 uppercase block">Cuota Mensual Fija:</span>
                    <div className="text-xl font-black font-mono text-red-700">
                      Bs {(activePlanData?.cuotaMensual || currentCalc.cuotaMensual).toFixed(2)}
                    </div>
                  </div>
                  <div className="text-right font-mono text-[11px]">
                    <div><span className="text-slate-500 font-sans">Total a Pagar:</span> <strong>Bs {(activePlanData ? (activePlanData.cuotaMensual * activePlanData.plazo) : currentCalc.totalPagar).toFixed(2)}</strong></div>
                    <div><span className="text-slate-500 font-sans">Interés Total:</span> <strong className="text-red-700">Bs {(activePlanData ? ((activePlanData.cuotaMensual * activePlanData.plazo) - activePlanData.monto) : currentCalc.totalInteres).toFixed(2)}</strong></div>
                  </div>
                </div>

                {/* Table */}
                <table className="w-full text-left font-mono border-collapse">
                  <thead className="bg-slate-900 text-white font-bold text-[10px] uppercase">
                    <tr>
                      <th className="p-2 text-center">Nro</th>
                      <th className="p-2 text-center text-amber-300">Fecha Límite Pago</th>
                      <th className="p-2 text-right">Cuota Fija (Bs)</th>
                      <th className="p-2 text-right">Capital</th>
                      <th className="p-2 text-right">Interés</th>
                      <th className="p-2 text-right">Saldo Deudor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {(activePlanData?.planPagos || currentCalc.planPagos).map((p) => (
                      <tr key={p.nro} className="hover:bg-slate-50">
                        <td className="p-2 text-center font-bold text-slate-500">{p.nro}</td>
                        <td className="p-2 text-center font-bold text-red-700 bg-red-50/50">{p.fechaLimite || 'Por definir'}</td>
                        <td className="p-2 text-right font-bold text-slate-900">{p.cuota.toFixed(2)}</td>
                        <td className="p-2 text-right text-emerald-700 font-semibold">{p.capital.toFixed(2)}</td>
                        <td className="p-2 text-right text-amber-700 font-semibold">{p.interes.toFixed(2)}</td>
                        <td className="p-2 text-right text-slate-800 font-bold">{p.saldo.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Legal & Signatures */}
                <div className="border border-dashed border-slate-300 p-2.5 rounded-lg text-[10px] text-slate-600">
                  <strong>COMPROMISO DE PAGO:</strong> El socio se compromete a cancelar puntualmente sus cuotas en Caja Central hasta el 15 de cada mes.
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 text-center text-[10px] text-slate-600">
                  <div className="border-t border-slate-400 pt-2 font-bold">
                    Firma Prestatario
                    <br /><span className="text-[9px] font-normal">Huella Dactilar</span>
                  </div>
                  <div className="border-t border-slate-400 pt-2 font-bold">
                    Secretaría General
                    <br /><span className="text-[9px] font-normal">Radio Móvil 15 de Abril</span>
                  </div>
                  <div className="border-t border-slate-400 pt-2 font-bold">
                    Tesorería General
                    <br /><span className="text-[9px] font-normal">Radio Móvil 15 de Abril</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}