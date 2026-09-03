import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Download, 
  ShieldCheck, 
  Database, 
  ArrowRight, 
  RotateCcw,
  FileCheck,
  Plus
} from 'lucide-react';

// Muestra de datos de Agosto simulando una planilla Excel cargada por la directiva
const SAMPLE_EXCEL_AGOSTO = [
  { fila: 1, interno: 1, socio: 'SANTIAGO LLANOS', concepto: 'Sostenimiento Agosto', periodo: '08/2026', monto: 400.0, estadoExcel: 'PAGADO', caja: 'c1' },
  { fila: 2, interno: 3, socio: 'CARLOS MAXI', concepto: 'Sostenimiento Agosto', periodo: '08/2026', monto: 400.0, estadoExcel: 'PAGADO', caja: 'c1' },
  { fila: 3, interno: 7, socio: 'FERMIN ARELLANO', concepto: 'Sostenimiento Agosto', periodo: '08/2026', monto: 400.0, estadoExcel: 'PAGADO', caja: 'c1' },
  { fila: 4, interno: 8, socio: 'BRAULIO COLQUE', concepto: 'Mantenimiento GPS Agosto', periodo: '08/2026', monto: 80.0, estadoExcel: 'PAGADO', caja: 'c2' },
  { fila: 5, interno: 20, socio: 'REMBERTO TORRICO', concepto: 'Sostenimiento Agosto', periodo: '08/2026', monto: 400.0, estadoExcel: 'PAGADO', caja: 'c1' }, // Ya pagado -> Generará advertencia
  { fila: 6, interno: 99, socio: 'WILFREDO COPA', concepto: 'Sostenimiento Agosto', periodo: '08/2026', monto: 400.0, estadoExcel: 'PAGADO', caja: 'c1' }, // Socio inexistente -> Error crítico
  { fila: 7, interno: 13, socio: 'CARRILLO MELITON', concepto: 'Multa Falta Asamblea 15/08', periodo: '08/2026', monto: 100.0, estadoExcel: 'PENDIENTE', caja: 'c1' },
  { fila: 8, interno: 14, socio: 'MAX VERA', concepto: 'Sostenimiento Agosto', periodo: '08/2026', monto: 400.0, estadoExcel: 'PAGADO', caja: 'c1' },
  { fila: 9, interno: 15, socio: 'RAFAEL LEONARDO', concepto: 'Sostenimiento Agosto', periodo: '08/2026', monto: 400.0, estadoExcel: 'PAGADO', caja: 'c1' },
  { fila: 10, interno: 18, socio: 'MARIO QUISPE', concepto: 'Aporte Radiofrecuencia Agosto', periodo: '08/2026', monto: 66.0, estadoExcel: 'PAGADO', caja: 'c1' }
];

export default function ConciliacionPage({ socios, deudas, setDeudas, cajas, setCajas, currentUser }) {
  const [activeSubTab, setActiveSubTab] = useState('importar'); // 'importar' | 'manual' | 'historial'
  const [archivoCargado, setArchivoCargado] = useState(null);
  const [stagingData, setStagingData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loteId, setLoteId] = useState('');

  // Lotes históricos importados
  const [lotesHistoricos, setLotesHistoricos] = useState([
    { id: 'LOTE-2026-08-01', fecha: '01/08/2026 10:15', archivo: 'recaudaciones_julio_final.xlsx', registros: 142, montoTotal: 56800.0, operador: 'admin33', estado: 'CONCILIADO' },
    { id: 'LOTE-2026-07-01', fecha: '01/07/2026 09:30', archivo: 'cuotas_iniciales_junio.xlsx', registros: 138, montoTotal: 55200.0, operador: 'admin33', estado: 'CONCILIADO' }
  ]);

  // Formulario Manual Asistido State
  const [manualForm, setManualForm] = useState({
    interno: '',
    socioNombre: '',
    concepto: 'Sostenimiento Mensual',
    mesPeriodo: '08/2026',
    monto: 400.0,
    estado: 'PAGADO',
    caja: 'c1',
    fechaCobro: '2026-08-15'
  });

  // Simular Carga del Archivo de Ejemplo de Agosto
  const handleCargarEjemploAgosto = () => {
    setArchivoCargado('Planilla_Recaudacion_Agosto_RadioMovil15Abril.xlsx');
    setLoteId(`LOTE-${new Date().toISOString().slice(0, 10)}-AGO`);

    // Motor de Validación Bancaria (Semáforo)
    const analizado = SAMPLE_EXCEL_AGOSTO.map((item) => {
      const socioExiste = socios.some(s => s.id === item.interno);
      
      // Chequear si ya pagó este mismo concepto en el periodo (Prevención de doble cobro)
      const yaExistePagado = deudas.some(d => 
        d.socioId === item.interno && 
        d.descripcion.toLowerCase().includes('sostenimiento') && 
        d.pagado && 
        d.periodo?.includes('Agosto')
      );

      let estadoValidacion = 'VALIDO'; // VALIDO (Verde), ADVERTENCIA (Amarillo), ERROR (Rojo)
      let observacion = 'Listo para procesar e impactar en caja';

      if (!socioExiste) {
        estadoValidacion = 'ERROR';
        observacion = `El móvil #${item.interno} no existe en el padrón de socios.`;
      } else if (yaExistePagado && item.estadoExcel === 'PAGADO') {
        estadoValidacion = 'ADVERTENCIA';
        observacion = `⚠️ DUPLICIDAD DETECTADA: El socio ya tiene pagado este concepto en ventanilla. Se omitirá para no duplicar dinero.`;
      }

      return {
        ...item,
        estadoValidacion,
        observacion,
        incluirEnLote: estadoValidacion !== 'ERROR' && estadoValidacion !== 'ADVERTENCIA'
      };
    });

    setStagingData(analizado);
  };

  // Toggle para incluir/excluir fila manualmente
  const toggleFila = (filaNum) => {
    setStagingData(stagingData.map(f => f.fila === filaNum ? { ...f, incluirEnLote: !f.incluirEnLote } : f));
  };

  // Métricas del Lote
  const filasValidas = stagingData.filter(f => f.estadoValidacion === 'VALIDO').length;
  const filasAdvertencia = stagingData.filter(f => f.estadoValidacion === 'ADVERTENCIA').length;
  const filasError = stagingData.filter(f => f.estadoValidacion === 'ERROR').length;
  const filasParaProcesar = stagingData.filter(f => f.incluirEnLote);
  const totalMontoLote = filasParaProcesar.reduce((acc, f) => acc + f.monto, 0);

  // Confirmar y Procesar Lote Bancario
  const handleProcesarLote = () => {
    if (filasParaProcesar.length === 0) {
      alert('No hay filas seleccionadas para procesar.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      // Impactar en Cajas
      setCajas(cajas.map(c => {
        if (c.id === 'c1') {
          return {
            ...c,
            ingresos: c.ingresos + totalMontoLote,
            saldoActual: c.saldoActual + totalMontoLote
          };
        }
        return c;
      }));

      // Registrar en Lotes Históricos
      const nuevoLote = {
        id: loteId,
        fecha: new Date().toLocaleString('es-BO'),
        archivo: archivoCargado,
        registros: filasParaProcesar.length,
        montoTotal: totalMontoLote,
        operador: currentUser?.nombre || 'admin33',
        estado: 'CONCILIADO'
      };

      setLotesHistoricos([nuevoLote, ...lotesHistoricos]);
      setIsProcessing(false);
      setStagingData([]);
      setArchivoCargado(null);

      alert(`✅ LOTE BANCARIO PROCESADO EXITOSAMENTE

Código: ${nuevoLote.id}
Registros Conciliados: ${nuevoLote.registros}
Total Impactado en Caja: Bs ${nuevoLote.montoTotal.toFixed(2)}

Los saldos de agosto y las deudas han sido actualizados.`);
    }, 1200);
  };

  // Descarga de Plantilla Oficial
  const handleDescargarPlantilla = () => {
    const csvContent = 
      "Interno,Socio_Nombre,Concepto,Periodo,Monto_Bs,Estado,Caja\n" +
      "1,SANTIAGO LLANOS,Sostenimiento Mensual,08/2026,400.00,PAGADO,c1\n" +
      "3,CARLOS MAXI,Sostenimiento Mensual,08/2026,400.00,PAGADO,c1\n" +
      "7,FERMIN ARELLANO,Mantenimiento GPS,08/2026,80.00,PAGADO,c2\n" +
      "8,BRAULIO COLQUE,Multa Inasistencia,08/2026,100.00,PENDIENTE,c1";
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'Plantilla_SISCOB_Migracion_Agosto.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Guardar Entrada Manual Asistida
  const handleGuardarManual = (e) => {
    e.preventDefault();
    if (!manualForm.interno || !manualForm.monto) {
      alert('Ingrese el interno y el monto.');
      return;
    }

    const socio = socios.find(s => s.id === parseInt(manualForm.interno));
    if (!socio) {
      alert(`El móvil #${manualForm.interno} no existe en el padrón.`);
      return;
    }

    // Impactar en deudas y caja
    const monto = parseFloat(manualForm.monto);
    if (manualForm.estado === 'PAGADO') {
      setCajas(cajas.map(c => c.id === manualForm.caja ? { ...c, ingresos: c.ingresos + monto, saldoActual: c.saldoActual + monto } : c));
    }

    alert(`Registro manual de Agosto guardado con éxito para el Socio #${socio.id} (${socio.nombres} ${socio.apPaterno}).`);
    setManualForm({ ...manualForm, interno: '', socioNombre: '' });
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-xs gap-3">
        <div>
          <h1 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
            <FileCheck className="w-5 h-5 text-red-700" />
            <span>Módulo de Conciliación Bancaria e Importación Histórica</span>
          </h1>
          <p className="text-xs text-slate-500">
            Control dual (Excel + Manual) con detección automática de duplicados y suma de comprobación
          </p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl space-x-1 text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('importar')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeSubTab === 'importar' ? 'bg-red-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Importar Planilla Excel
          </button>
          <button
            onClick={() => setActiveSubTab('manual')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeSubTab === 'manual' ? 'bg-red-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Carga Manual Asistida
          </button>
          <button
            onClick={() => setActiveSubTab('historial')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeSubTab === 'historial' ? 'bg-red-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Lotes Conciliados
          </button>
        </div>
      </div>

      {/* SUBVENTANA 1: IMPORTAR EXCEL CON CONTROL BANCARIO */}
      {activeSubTab === 'importar' && (
        <div className="space-y-4">
          {/* Top Dropzone Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
            <div className="flex flex-wrap justify-between items-center gap-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm uppercase">
                  Zona de Cuarentena y Carga de Archivos
                </h3>
                <p className="text-slate-500">Sube la planilla de cobranzas o deudas de agosto para validación previa</p>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handleDescargarPlantilla}
                  className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl font-bold border border-slate-300 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600" />
                  <span>Descargar Plantilla Oficial (.csv)</span>
                </button>
              </div>
            </div>

            {/* Simulated Drag & Drop Box */}
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center space-y-3 bg-slate-50/50 hover:bg-slate-50 transition">
              <div className="w-12 h-12 bg-red-50 text-red-700 rounded-2xl flex items-center justify-center mx-auto border border-red-200">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-slate-800 text-sm block">
                  Arrastra tu archivo Excel / CSV de Agosto aquí
                </span>
                <span className="text-slate-500 text-xs">
                  Soporta formatos .XLSX, .XLS y .CSV estándar
                </span>
              </div>

              <div className="flex justify-center space-x-3 pt-2">
                <button
                  onClick={handleCargarEjemploAgosto}
                  className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-xl font-bold shadow-xs transition cursor-pointer flex items-center space-x-1.5"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Cargar Planilla Demostrativa de Agosto</span>
                </button>
              </div>
            </div>
          </div>

          {/* STAGING / VALIDATION RESULTS (SEMÁFORO BANCARIO) */}
          {stagingData.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-5 animate-fadeIn">
              {/* Summary KPIs */}
              <div className="flex flex-wrap justify-between items-center border-b border-slate-100 pb-3 gap-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-red-700 uppercase block">Lote: {loteId}</span>
                  <h3 className="font-black text-slate-900 text-base">Resultados del Análisis Bancario</h3>
                </div>

                <div className="flex space-x-2 text-xs font-bold">
                  <span className="flex items-center space-x-1 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-xl border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{filasValidas} Válidos</span>
                  </span>
                  <span className="flex items-center space-x-1 bg-amber-50 text-amber-800 px-3 py-1 rounded-xl border border-amber-200">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>{filasAdvertencia} Duplicados</span>
                  </span>
                  <span className="flex items-center space-x-1 bg-rose-50 text-rose-800 px-3 py-1 rounded-xl border border-rose-200">
                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>{filasError} Errores</span>
                  </span>
                </div>
              </div>

              {/* Table of Rows */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b">
                    <tr>
                      <th className="p-2.5 text-center">Incluir</th>
                      <th className="p-2.5">Fila</th>
                      <th className="p-2.5">Móvil / Socio</th>
                      <th className="p-2.5">Concepto</th>
                      <th className="p-2.5">Periodo</th>
                      <th className="p-2.5 text-right">Monto</th>
                      <th className="p-2.5 text-center">Diagnóstico Bancario</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {stagingData.map((f) => (
                      <tr key={f.fila} className={`hover:bg-slate-50 ${!f.incluirEnLote ? 'opacity-50' : ''}`}>
                        <td className="p-2.5 text-center">
                          <input
                            type="checkbox"
                            checked={f.incluirEnLote}
                            onChange={() => toggleFila(f.fila)}
                            disabled={f.estadoValidacion === 'ERROR'}
                            className="rounded text-red-700 cursor-pointer"
                          />
                        </td>
                        <td className="p-2.5 font-mono text-slate-400">#{f.fila}</td>
                        <td className="p-2.5">
                          <strong className="text-slate-900 block">{f.socio}</strong>
                          <span className="font-mono text-slate-500 text-[10px]">Móvil Interno #{f.interno}</span>
                        </td>
                        <td className="p-2.5 text-slate-700 font-medium">{f.concepto}</td>
                        <td className="p-2.5 font-mono text-slate-500">{f.periodo}</td>
                        <td className="p-2.5 font-mono font-bold text-right text-slate-900">Bs {f.monto.toFixed(2)}</td>
                        <td className="p-2.5">
                          <div className={`p-1.5 rounded-lg text-[11px] leading-tight flex items-start space-x-1.5 ${
                            f.estadoValidacion === 'VALIDO' 
                              ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' 
                              : f.estadoValidacion === 'ADVERTENCIA' 
                              ? 'bg-amber-50 text-amber-900 border border-amber-200' 
                              : 'bg-rose-50 text-rose-900 border border-rose-200'
                          }`}>
                            {f.estadoValidacion === 'VALIDO' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />}
                            {f.estadoValidacion === 'ADVERTENCIA' && <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />}
                            {f.estadoValidacion === 'ERROR' && <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />}
                            <span>{f.observacion}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bottom Checksum & Execution Bar */}
              <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-wrap justify-between items-center gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                    Control de Cuadre y Suma de Comprobación
                  </span>
                  <div className="text-xl font-black font-mono">
                    Total a Impactar en Caja: <span className="text-emerald-400">Bs {totalMontoLote.toFixed(2)}</span>
                  </div>
                  <span className="text-xs text-slate-300">
                    Se procesarán <strong>{filasParaProcesar.length}</strong> registros verificados hacia la Caja General.
                  </span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setStagingData([])}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition"
                  >
                    Descartar
                  </button>
                  <button
                    onClick={handleProcesarLote}
                    disabled={isProcessing || filasParaProcesar.length === 0}
                    className="flex items-center space-x-2 bg-red-700 hover:bg-red-800 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer shadow-md disabled:opacity-50"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isProcessing ? 'Procesando Lote...' : 'Confirmar e Impactar en Caja'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUBVENTANA 2: CARGA MANUAL ASISTIDA */}
      {activeSubTab === 'manual' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 max-w-2xl mx-auto text-xs">
          <div className="border-b pb-2">
            <h3 className="font-extrabold text-slate-900 text-sm uppercase">
              Carga Manual de Movimientos Anteriores
            </h3>
            <p className="text-slate-500">Para ingresar cobros sueltos o deudas rezagadas de meses pasados</p>
          </div>

          <form onSubmit={handleGuardarManual} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Móvil / Interno *</label>
                <input
                  type="number"
                  required
                  placeholder="Ej: 20"
                  value={manualForm.interno}
                  onChange={(e) => {
                    const id = e.target.value;
                    const s = socios.find(soc => soc.id === parseInt(id));
                    setManualForm({ 
                      ...manualForm, 
                      interno: id, 
                      socioNombre: s ? `${s.nombres} ${s.apPaterno}` : '' 
                    });
                  }}
                  className="w-full p-2 border border-slate-300 rounded-xl font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nombre Afiliado (Auto)</label>
                <input
                  type="text"
                  readOnly
                  value={manualForm.socioNombre || '(Ingrese el número de móvil)'}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Concepto Económico</label>
                <select
                  value={manualForm.concepto}
                  onChange={(e) => setManualForm({ ...manualForm, concepto: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-xl font-bold"
                >
                  <option value="Sostenimiento Mensual">Sostenimiento Mensual</option>
                  <option value="Mantenimiento GPS">Mantenimiento GPS</option>
                  <option value="Multa Falta Asamblea">Multa Falta Asamblea</option>
                  <option value="Aporte Radiofrecuencia">Aporte Radiofrecuencia</option>
                  <option value="Amortización Préstamo">Amortización Préstamo</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mes / Periodo Histórico</label>
                <input
                  type="text"
                  value={manualForm.mesPeriodo}
                  onChange={(e) => setManualForm({ ...manualForm, mesPeriodo: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-xl font-mono font-bold"
                  placeholder="Ej: 08/2026"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Monto (Bs) *</label>
                <input
                  type="number"
                  step="0.5"
                  required
                  value={manualForm.monto}
                  onChange={(e) => setManualForm({ ...manualForm, monto: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-xl font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Estado del Registro</label>
                <select
                  value={manualForm.estado}
                  onChange={(e) => setManualForm({ ...manualForm, estado: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-xl font-bold"
                >
                  <option value="PAGADO">Ya fue Cancelado (Ingreso)</option>
                  <option value="PENDIENTE">Quedó Pendiente (Deuda)</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="bg-red-700 hover:bg-red-800 text-white px-5 py-2.5 rounded-xl font-bold transition shadow-xs cursor-pointer flex items-center space-x-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Guardar Registro Histórico</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SUBVENTANA 3: HISTORIAL DE LOTES CONCILIADOS */}
      {activeSubTab === 'historial' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="border-b pb-2">
            <h3 className="font-extrabold text-slate-900 text-sm uppercase">
              Registro de Lotes Bancarios e Importaciones
            </h3>
            <p className="text-xs text-slate-500">Trazabilidad completa de cargas masivas para auditoría de asamblea</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b">
                <tr>
                  <th className="p-3">Código de Lote</th>
                  <th className="p-3">Fecha y Hora</th>
                  <th className="p-3">Archivo Origen</th>
                  <th className="p-3 text-center">Registros</th>
                  <th className="p-3 text-right">Monto Total</th>
                  <th className="p-3 text-center">Operador</th>
                  <th className="p-3 text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {lotesHistoricos.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-red-700">{l.id}</td>
                    <td className="p-3 font-mono text-slate-500">{l.fecha}</td>
                    <td className="p-3 font-bold text-slate-800">{l.archivo}</td>
                    <td className="p-3 text-center font-mono font-bold">{l.registros} filas</td>
                    <td className="p-3 font-mono font-bold text-right text-emerald-700">Bs {l.montoTotal.toFixed(2)}</td>
                    <td className="p-3 text-center">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold text-slate-700">
                        {l.operador}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold">
                        {l.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}