import React, { useState, useEffect, useRef } from 'react';
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
  Plus,
  Search,
  CheckSquare,
  Square,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { downloadCSV, downloadXLSX } from '../utils/printHelper';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { 
  REPORTE_AGOSTO_CAJA1, 
  REPORTE_AGOSTO_CAJA5, 
  COLUMNAS_MODELO_CAJA1, 
  COLUMNAS_MODELO_CAJA5 
} from '../data/agostoReporteData';

export default function ConciliacionPage({ socios = [], deudas = [], setDeudas, cajas = [], setCajas, currentUser }) {
  const [activeSubTab, setActiveSubTab] = useState('importar'); // 'importar' | 'manual' | 'historial'
  const [modeloSeleccionado, setModeloSeleccionado] = useState('caja1'); // 'caja1' | 'caja5'
  const [archivoCargado, setArchivoCargado] = useState(null);
  const [stagingData, setStagingData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loteId, setLoteId] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('TODOS');
  const [busqueda, setBusqueda] = useState('');
  const fileInputRef = useRef(null);

  // Lotes históricos importados persistidos
  const [lotesHistoricos, setLotesHistoricos] = useState(() => {
    return loadFromStorage('siscob_lotes_historicos', [
      { id: 'LOTE-2026-08-01', fecha: '01/08/2026 10:15', archivo: 'recaudaciones_julio_final.xlsx', tipo: 'Caja 1', registros: 142, montoTotal: 56800.0, operador: 'admin33', estado: 'CONCILIADO' },
      { id: 'LOTE-2026-07-01', fecha: '01/07/2026 09:30', archivo: 'cuotas_iniciales_junio.xlsx', tipo: 'Caja 1', registros: 138, montoTotal: 55200.0, operador: 'admin33', estado: 'CONCILIADO' }
    ]);
  });

  useEffect(() => {
    saveToStorage('siscob_lotes_historicos', lotesHistoricos);
  }, [lotesHistoricos]);

  // Formulario Manual Asistido State
  const [manualForm, setManualForm] = useState({
    interno: '',
    socioNombre: '',
    concepto: 'PAGO FRECUENCIA MENSUAL (VARIOS)',
    mesPeriodo: '08/2026',
    monto: 200.0,
    estado: 'PAGADO',
    caja: 'c1',
    fechaCobro: '2026-08-31'
  });

  // Helper para buscar socio en padrón
  const buscarSocio = (movilStr) => {
    const num = parseInt(movilStr, 10);
    return socios.find(s => s.id === num || String(s.id) === String(movilStr) || s.numeroMovil === movilStr || s.numeroMovil === String(num));
  };

  // 1. CARGA DIRECTA CON DATOS REALES DE AGOSTO (1 Clic)
  const handleCargarReporteOficial = (tipo) => {
    setModeloSeleccionado(tipo);
    const esCaja1 = tipo === 'caja1';
    const nombreArchivo = esCaja1 
      ? 'reporte-ingresos-por-movil-montos-caja-1-20260801-20260831.pdf' 
      : 'reporte-ingresos-por-movil-montos-caja-5-20260801-20260831.pdf';
    
    setArchivoCargado(nombreArchivo);
    setLoteId(`LOTE-${new Date().toISOString().slice(0, 10)}-${esCaja1 ? 'CAJA1' : 'CAJA5'}`);

    const rawData = esCaja1 ? REPORTE_AGOSTO_CAJA1 : REPORTE_AGOSTO_CAJA5;

    const procesados = rawData.map((item, idx) => {
      const socio = buscarSocio(item.movil);
      const movilNum = parseInt(item.movil, 10);
      
      // Diagnóstico y Semáforo
      let estadoValidacion = 'VALIDO';
      let observacion = 'Listo para conciliar e ingresar a Caja.';

      // Verificar si ya tiene pagado agosto en deudas
      const yaExistePagado = deudas.some(d => 
        (d.socioId === movilNum || d.socioId === socio?.id) && 
        d.pagado && 
        (d.periodo?.includes('08/2026') || d.periodo?.toLowerCase().includes('agosto'))
      );

      if (!socio) {
        // En radio taxi algunos móviles pueden ser nuevos o invitados
        estadoValidacion = 'ADVERTENCIA';
        observacion = `Móvil #${item.movil} no vinculado a socio activo. Se registrará como ingreso institucional.`;
      } else if (yaExistePagado) {
        estadoValidacion = 'ADVERTENCIA';
        observacion = `⚠️ DUPLICIDAD DETECTADA: El socio ya tiene registro de pago de Agosto en ventanilla.`;
      }

      return {
        fila: idx + 1,
        movil: item.movil,
        socioNombre: socio ? `${socio.nombres} ${socio.apPaterno}` : `Móvil #${item.movil}`,
        socioExiste: !!socio,
        colabM202: item.colabM202 || 0,
        donacionM90: item.donacionM90 || 0,
        logotipos: item.logotipos || 0,
        adhesivosP: item.adhesivosP || 0,
        adhesivosG: item.adhesivosG || 0,
        frecuencia: item.frecuencia || 0,
        frecuenciaInquilinos: item.frecuenciaInquilinos || 0,
        monto: item.totalSocio || 0,
        cajaDestino: esCaja1 ? 'c1' : 'c5',
        estadoValidacion,
        observacion,
        incluirEnLote: true
      };
    });

    setStagingData(procesados);
  };

  // 2. LECTOR REAL DE ARCHIVOS EXCEL (.XLSX, .XLS, .CSV)
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      parsearArchivo(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) {
      parsearArchivo(file);
    }
  };

  const parsearArchivo = (file) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const buffer = evt.target.result;
        const wb = XLSX.read(buffer, { type: 'array' });
        const firstSheet = wb.Sheets[wb.SheetNames[0]];
        const aoa = XLSX.utils.sheet_to_json(firstSheet, { header: 1, defval: '' });

        if (!aoa || aoa.length === 0) {
          alert('El archivo no contiene filas con datos.');
          return;
        }

        // Buscar fila de encabezados
        let headerRowIndex = -1;
        for (let r = 0; r < Math.min(10, aoa.length); r++) {
          const rowStr = aoa[r].map(c => String(c).toUpperCase()).join(' ');
          if (rowStr.includes('MOVIL') || rowStr.includes('INTERNO') || rowStr.includes('FRECUENCIA')) {
            headerRowIndex = r;
            break;
          }
        }

        if (headerRowIndex === -1) {
          headerRowIndex = 0; // Usar primera fila por defecto
        }

        const headers = aoa[headerRowIndex].map(h => String(h).trim().toUpperCase());
        
        // Mapeo de columnas
        const colIdx = {
          movil: headers.findIndex(h => h.includes('MOVIL') || h.includes('INTERNO') || h.includes('NRO') || h === 'M'),
          c202: headers.findIndex(h => h.includes('202')),
          m90: headers.findIndex(h => h.includes('90') || h.includes('DONACION')),
          logos: headers.findIndex(h => h.includes('LOGO')),
          adhP: headers.findIndex(h => h.includes('PEQUE') || h.includes('ADHESIVO P')),
          adhG: headers.findIndex(h => h.includes('GRANDE') || h.includes('ADHESIVO G')),
          freq: headers.findIndex(h => (h.includes('FRECUENCIA') && !h.includes('INQUILINO')) || h.includes('VARIOS')),
          freqInq: headers.findIndex(h => h.includes('INQUILINO')),
          total: headers.findIndex(h => h.includes('TOTAL') || h.includes('MONTO') || h.includes('SOCIO'))
        };

        const esCaja5 = colIdx.freqInq !== -1 || file.name.toLowerCase().includes('caja-5') || file.name.toLowerCase().includes('inquilino');
        setModeloSeleccionado(esCaja5 ? 'caja5' : 'caja1');
        setArchivoCargado(file.name);
        setLoteId(`LOTE-${new Date().toISOString().slice(0, 10)}-${esCaja5 ? 'C5' : 'C1'}`);

        const filasProcesadas = [];
        let filaNum = 1;

        for (let r = headerRowIndex + 1; r < aoa.length; r++) {
          const row = aoa[r];
          if (!row || row.length === 0) continue;

          const movilVal = colIdx.movil !== -1 ? String(row[colIdx.movil]).trim() : String(row[0] || '').trim();
          if (!movilVal || movilVal.toUpperCase() === 'TOTAL' || movilVal.toUpperCase().includes('TOTAL')) {
            continue; // Omitir totales de pie de página
          }

          const c202 = colIdx.c202 !== -1 ? (parseFloat(row[colIdx.c202]) || 0) : 0;
          const m90 = colIdx.m90 !== -1 ? (parseFloat(row[colIdx.m90]) || 0) : 0;
          const logos = colIdx.logos !== -1 ? (parseFloat(row[colIdx.logos]) || 0) : 0;
          const adhP = colIdx.adhP !== -1 ? (parseFloat(row[colIdx.adhP]) || 0) : 0;
          const adhG = colIdx.adhG !== -1 ? (parseFloat(row[colIdx.adhG]) || 0) : 0;
          const freq = colIdx.freq !== -1 ? (parseFloat(row[colIdx.freq]) || 0) : 0;
          const freqInq = colIdx.freqInq !== -1 ? (parseFloat(row[colIdx.freqInq]) || 0) : 0;
          
          let totalSocio = colIdx.total !== -1 ? (parseFloat(row[colIdx.total]) || 0) : 0;
          if (totalSocio === 0) {
            totalSocio = esCaja5 ? freqInq : (c202 + m90 + logos + adhP + adhG + freq);
          }

          const socio = buscarSocio(movilVal);
          let estadoValidacion = 'VALIDO';
          let observacion = 'Fila leída correctamente desde Excel.';

          if (!socio) {
            estadoValidacion = 'ADVERTENCIA';
            observacion = `Móvil #${movilVal} no encontrado en padrón activo.`;
          }

          filasProcesadas.push({
            fila: filaNum++,
            movil: movilVal,
            socioNombre: socio ? `${socio.nombres} ${socio.apPaterno}` : `Móvil #${movilVal}`,
            socioExiste: !!socio,
            colabM202: c202,
            donacionM90: m90,
            logotipos: logos,
            adhesivosP: adhP,
            adhesivosG: adhG,
            frecuencia: freq,
            frecuenciaInquilinos: freqInq,
            monto: totalSocio,
            cajaDestino: esCaja5 ? 'c5' : 'c1',
            estadoValidacion,
            observacion,
            incluirEnLote: true
          });
        }

        setStagingData(filasProcesadas);
      } catch (err) {
        alert('Error al procesar el archivo: ' + err.message);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // 3. DESCARGAR PLANTILLA OFICIAL DE LA COOPERATIVA
  const handleDescargarPlantillaOficial = (formato = 'xlsx') => {
    const esCaja1 = modeloSeleccionado === 'caja1';
    
    let headers = [];
    let rows = [];

    if (esCaja1) {
      headers = [
        'MOVIL',
        'COLABORACION M 202',
        'DONACION COLABORACION M 90',
        'LOGOTIPOS',
        'NUMEROS ADHESIVOS PEQUEÑOS',
        'NUMEROS ADHESIVOS GRANDES',
        'PAGO FRECUENCIA MENSUAL (VARIOS)',
        'TOTAL SOCIO'
      ];
      rows = [
        ['00', 0.00, 50.00, 0.00, 0.00, 0.00, 200.00, 250.00],
        ['01', 0.00, 0.00, 0.00, 0.00, 0.00, 200.00, 200.00],
        ['02', 0.00, 50.00, 0.00, 0.00, 0.00, 200.00, 250.00],
        ['10', 0.00, 0.00, 0.00, 0.00, 0.00, 400.00, 400.00],
        ['146', 0.00, 0.00, 47.00, 5.00, 0.00, 0.00, 52.00]
      ];
    } else {
      headers = [
        'MOVIL',
        'PAGO FRECUENCIA MENSUAL INQUILINOS',
        'TOTAL SOCIO'
      ];
      rows = [
        ['12', 250.00, 250.00],
        ['112', 250.00, 250.00],
        ['263', 500.00, 500.00],
        ['284', 1000.00, 1000.00]
      ];
    }

    const filename = `Plantilla_Oficial_${esCaja1 ? 'Caja1_Socios' : 'Caja5_Inquilinos'}_15Abril`;
    
    if (formato === 'csv') {
      downloadCSV(filename, headers, rows);
    } else {
      downloadXLSX(filename, headers, rows, esCaja1 ? 'Caja 1 Ingresos' : 'Caja 5 Inquilinos');
    }
  };

  // Checkbox individual y masivo
  const toggleFila = (filaNum) => {
    setStagingData(stagingData.map(f => f.fila === filaNum ? { ...f, incluirEnLote: !f.incluirEnLote } : f));
  };

  const toggleTodas = (estado) => {
    setStagingData(stagingData.map(f => ({ ...f, incluirEnLote: estado })));
  };

  // Métricas del Lote
  const filasValidas = stagingData.filter(f => f.estadoValidacion === 'VALIDO').length;
  const filasAdvertencia = stagingData.filter(f => f.estadoValidacion === 'ADVERTENCIA').length;
  const filasError = stagingData.filter(f => f.estadoValidacion === 'ERROR').length;
  const filasParaProcesar = stagingData.filter(f => f.incluirEnLote);
  const totalMontoLote = filasParaProcesar.reduce((acc, f) => acc + f.monto, 0);

  const totalFrecuenciaLote = filasParaProcesar.reduce((acc, f) => acc + (f.frecuencia || f.frecuenciaInquilinos || 0), 0);
  const totalDonacionLote = filasParaProcesar.reduce((acc, f) => acc + (f.donacionM90 || 0), 0);
  const totalOtrosLote = filasParaProcesar.reduce((acc, f) => acc + (f.colabM202 + f.logotipos + f.adhesivosP + f.adhesivosG), 0);

  // Filtrado en Staging
  const filasFiltradas = stagingData.filter(f => {
    if (filtroEstado !== 'TODOS' && f.estadoValidacion !== filtroEstado) return false;
    if (busqueda) {
      const q = busqueda.toLowerCase();
      const matchMovil = String(f.movil).toLowerCase().includes(q);
      const matchNombre = String(f.socioNombre).toLowerCase().includes(q);
      return matchMovil || matchNombre;
    }
    return true;
  });

  // 4. CONFIRMAR E IMPACTAR EN CAJA
  const handleProcesarLote = () => {
    if (filasParaProcesar.length === 0) {
      alert('No hay filas seleccionadas para procesar.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const cajaDestinoId = modeloSeleccionado === 'caja1' ? 'c1' : 'c5';
      const cajaNombre = modeloSeleccionado === 'caja1' 
        ? 'Caja 1: Cuotas de Frecuencia' 
        : 'Caja 5: Frecuencia Inquilinos';

      // 1. Acreditar ingresos en la Caja correspondiente
      setCajas(cajas.map(c => {
        if (c.id === cajaDestinoId) {
          return {
            ...c,
            ingresos: c.ingresos + totalMontoLote,
            saldoActual: c.saldoActual + totalMontoLote
          };
        }
        return c;
      }));

      // 2. Registrar en Lotes Históricos
      const nuevoLote = {
        id: loteId,
        fecha: new Date().toLocaleString('es-BO'),
        archivo: archivoCargado,
        tipo: cajaNombre,
        registros: filasParaProcesar.length,
        montoTotal: totalMontoLote,
        operador: currentUser?.nombre || 'admin33',
        estado: 'CONCILIADO'
      };

      setLotesHistoricos([nuevoLote, ...lotesHistoricos]);

      // 3. Registrar en deudas históricas para dejar registro de solvencia de agosto
      if (setDeudas) {
        const nuevasDeudasHistoricas = filasParaProcesar.map((f, i) => ({
          id: `d-hist-${Date.now()}-${f.movil}-${i}`,
          socioId: parseInt(f.movil, 10) || 1,
          conceptoId: cajaDestinoId === 'c1' ? 1 : 5,
          descripcion: `Recaudación Agosto 2026 (${f.monto} Bs)`,
          periodo: '08/2026',
          monto: f.monto,
          pagado: true,
          fecha: '2026-08-31',
          moneda: 'Bs',
          cantidad: 1
        }));
        setDeudas(prev => [...nuevasDeudasHistoricas, ...prev]);
      }

      setIsProcessing(false);
      setStagingData([]);
      setArchivoCargado(null);

      alert(`✅ LOTE OFICIAL PROCESADO EXITOSAMENTE

Código de Lote: ${nuevoLote.id}
Caja Acreditada: ${cajaNombre}
Móviles Conciliados: ${nuevoLote.registros}
Total Ingresado: Bs ${nuevoLote.montoTotal.toLocaleString('es-BO', { minimumFractionDigits: 2 })}

Los saldos de agosto y las cuentas de socios han sido actualizados.`);
    }, 1000);
  };

  // Guardar Entrada Manual Asistida
  const handleGuardarManual = (e) => {
    e.preventDefault();
    if (!manualForm.interno || !manualForm.monto) {
      alert('Ingrese el interno y el monto.');
      return;
    }

    const socio = buscarSocio(manualForm.interno);
    const monto = parseFloat(manualForm.monto);

    if (manualForm.estado === 'PAGADO') {
      setCajas(cajas.map(c => c.id === manualForm.caja ? { ...c, ingresos: c.ingresos + monto, saldoActual: c.saldoActual + monto } : c));
    }

    if (setDeudas) {
      const nuevaDeuda = {
        id: `d-man-${Date.now()}`,
        socioId: socio ? socio.id : parseInt(manualForm.interno, 10),
        conceptoId: manualForm.caja === 'c1' ? 1 : (manualForm.caja === 'c5' ? 5 : 2),
        descripcion: manualForm.concepto,
        periodo: manualForm.mesPeriodo,
        monto: monto,
        pagado: manualForm.estado === 'PAGADO',
        fecha: manualForm.fechaCobro,
        moneda: 'Bs',
        cantidad: 1
      };
      setDeudas(prev => [nuevaDeuda, ...prev]);
    }

    alert(`Registro manual de ${manualForm.mesPeriodo} guardado con éxito para el Móvil #${manualForm.interno}.`);
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
            Control exacto adaptado al modelo oficial de recaudación por móvil de la Cooperativa Radio Móvil 15 de Abril
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

      {/* SUBVENTANA 1: IMPORTAR EXCEL CON MODELO COOPERATIVA */}
      {activeSubTab === 'importar' && (
        <div className="space-y-4">
          {/* Top Dropzone Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
            <div className="flex flex-wrap justify-between items-center gap-3">
              <div>
                <span className="text-[10px] font-extrabold text-red-700 uppercase tracking-wider block">
                  MODELO OFICIAL DE RECAUDACIÓN
                </span>
                <h3 className="font-extrabold text-slate-900 text-sm uppercase">
                  Zona de Cuarentena y Carga de Archivos
                </h3>
                <p className="text-slate-500">
                  Selecciona el formato a importar o utiliza la carga demostrativa de agosto con datos reales de la cooperativa.
                </p>
              </div>

              {/* Botones de Descarga de Plantillas */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDescargarPlantillaOficial('xlsx')}
                  className="flex items-center space-x-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs active:scale-95"
                  title="Descargar plantilla oficial con columnas exactas en formato Excel"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Plantilla Excel (.xlsx)</span>
                </button>
                <button
                  onClick={() => handleDescargarPlantillaOficial('csv')}
                  className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl text-xs font-bold border border-slate-300 transition cursor-pointer shadow-xs active:scale-95"
                  title="Descargar plantilla oficial en formato CSV"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                  <span>CSV</span>
                </button>
              </div>
            </div>

            {/* Selector de Modelo (Caja 1 o Caja 5) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModeloSeleccionado('caja1')}
                className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex items-start space-x-3 ${
                  modeloSeleccionado === 'caja1'
                    ? 'border-red-600 bg-red-50/60 ring-2 ring-red-500/20'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className={`p-2 rounded-lg ${modeloSeleccionado === 'caja1' ? 'bg-red-700 text-white' : 'bg-slate-200 text-slate-700'}`}>
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs uppercase flex items-center space-x-1.5">
                    <span>CAJA 1: Ingresos por Móvil y Tipo (Propietarios)</span>
                    {modeloSeleccionado === 'caja1' && <span className="bg-red-700 text-white text-[9px] px-1.5 py-0.2 rounded font-black">ACTIVO</span>}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Frecuencia (Bs 200), Donación M 90 (Bs 50), Colab. M 202, Logotipos y Adhesivos
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setModeloSeleccionado('caja5')}
                className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex items-start space-x-3 ${
                  modeloSeleccionado === 'caja5'
                    ? 'border-red-600 bg-red-50/60 ring-2 ring-red-500/20'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className={`p-2 rounded-lg ${modeloSeleccionado === 'caja5' ? 'bg-red-700 text-white' : 'bg-slate-200 text-slate-700'}`}>
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs uppercase flex items-center space-x-1.5">
                    <span>CAJA 5: Frecuencia Conductores Inquilinos</span>
                    {modeloSeleccionado === 'caja5' && <span className="bg-red-700 text-white text-[9px] px-1.5 py-0.2 rounded font-black">ACTIVO</span>}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Pago de frecuencia mensual para choferes e inquilinos (Bs 250)
                  </p>
                </div>
              </button>
            </div>

            {/* Simulated & Real Drag & Drop Box */}
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center space-y-3 bg-slate-50/50 hover:bg-slate-50 transition relative"
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".xlsx,.xls,.csv" 
                className="hidden" 
              />

              <div className="w-12 h-12 bg-red-50 text-red-700 rounded-2xl flex items-center justify-center mx-auto border border-red-200">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-slate-800 text-sm block">
                  Arrastra tu archivo Excel / CSV de Agosto aquí
                </span>
                <span className="text-slate-500 text-xs">
                  Soporta formatos .XLSX, .XLS y .CSV oficiales de la cooperativa
                </span>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-slate-900 hover:bg-black text-white px-4 py-2 rounded-xl font-bold shadow-xs transition cursor-pointer flex items-center space-x-1.5 text-xs"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Examinar Archivo en Computadora</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCargarReporteOficial('caja1')}
                  className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-xl font-bold shadow-xs transition cursor-pointer flex items-center space-x-1.5 text-xs"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Cargar Reporte Real Agosto (Caja 1: 183 Móviles | Bs 43,876)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCargarReporteOficial('caja5')}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-xl font-bold shadow-xs transition cursor-pointer flex items-center space-x-1.5 text-xs"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Cargar Reporte Real Agosto (Caja 5: 72 Móviles | Bs 20,250)</span>
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
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono font-black text-red-700 uppercase bg-red-50 px-2 py-0.5 rounded border border-red-200">
                      {loteId}
                    </span>
                    <span className="text-xs font-bold text-slate-600">
                      Archivo: <strong>{archivoCargado}</strong>
                    </span>
                  </div>
                  <h3 className="font-black text-slate-900 text-base mt-1">
                    Análisis Bancario y Validación de Recaudaciones
                  </h3>
                </div>

                {/* Filtros rápidos */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Buscar móvil o socio..."
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                      className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium w-44"
                    />
                  </div>

                  <button
                    onClick={() => setFiltroEstado('TODOS')}
                    className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                      filtroEstado === 'TODOS' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Todos ({stagingData.length})
                  </button>
                  <button
                    onClick={() => setFiltroEstado('VALIDO')}
                    className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg transition cursor-pointer ${
                      filtroEstado === 'VALIDO' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{filasValidas} Válidos</span>
                  </button>
                  <button
                    onClick={() => setFiltroEstado('ADVERTENCIA')}
                    className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg transition cursor-pointer ${
                      filtroEstado === 'ADVERTENCIA' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800'
                    }`}
                  >
                    <AlertTriangle className="w-3 h-3" />
                    <span>{filasAdvertencia} Advertencias</span>
                  </button>
                </div>
              </div>

              {/* Botones de Selección Masiva */}
              <div className="flex justify-between items-center text-xs text-slate-500 px-1">
                <div className="flex items-center space-x-2">
                  <button 
                    type="button"
                    onClick={() => toggleTodas(true)} 
                    className="text-blue-700 font-bold hover:underline cursor-pointer"
                  >
                    Seleccionar Todos
                  </button>
                  <span>•</span>
                  <button 
                    type="button"
                    onClick={() => toggleTodas(false)} 
                    className="text-slate-500 font-bold hover:underline cursor-pointer"
                  >
                    Deseleccionar Todos
                  </button>
                </div>
                <div>
                  Mostrando <strong>{filasFiltradas.length}</strong> de <strong>{stagingData.length}</strong> filas
                </div>
              </div>

              {/* Table of Rows con columnas del modelo de la cooperativa */}
              <div className="overflow-x-auto rounded-xl border border-slate-100 max-h-[460px]">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-700 font-bold border-b sticky top-0 z-10">
                    <tr>
                      <th className="p-2.5 text-center w-10">
                        <input
                          type="checkbox"
                          checked={filasParaProcesar.length === stagingData.length && stagingData.length > 0}
                          onChange={(e) => toggleTodas(e.target.checked)}
                          className="rounded text-red-700 cursor-pointer"
                        />
                      </th>
                      <th className="p-2.5 font-mono text-center w-16">Móvil</th>
                      <th className="p-2.5">Socio / Afiliado</th>
                      {modeloSeleccionado === 'caja1' ? (
                        <>
                          <th className="p-2.5 text-right">Colab 202</th>
                          <th className="p-2.5 text-right">Donación 90</th>
                          <th className="p-2.5 text-right">Logos</th>
                          <th className="p-2.5 text-right">Adh. P/G</th>
                          <th className="p-2.5 text-right font-bold text-red-700">Frecuencia</th>
                        </>
                      ) : (
                        <th className="p-2.5 text-right font-bold text-blue-700">Frecuencia Inquilinos</th>
                      )}
                      <th className="p-2.5 text-right font-black">Total Socio</th>
                      <th className="p-2.5 text-center">Diagnóstico</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {filasFiltradas.map((f) => (
                      <tr 
                        key={f.fila} 
                        className={`hover:bg-slate-50 transition ${!f.incluirEnLote ? 'opacity-40 bg-slate-50/50' : ''}`}
                      >
                        <td className="p-2.5 text-center">
                          <input
                            type="checkbox"
                            checked={f.incluirEnLote}
                            onChange={() => toggleFila(f.fila)}
                            className="rounded text-red-700 cursor-pointer"
                          />
                        </td>
                        <td className="p-2.5 font-mono font-black text-center text-slate-900 bg-slate-50/40">
                          #{f.movil}
                        </td>
                        <td className="p-2.5">
                          <strong className="text-slate-900 block font-sans">{f.socioNombre}</strong>
                          {f.socioExiste ? (
                            <span className="text-[10px] text-emerald-700 font-bold">Afiliado Padrón Oficial</span>
                          ) : (
                            <span className="text-[10px] text-amber-700 font-medium">Sin ficha socio directa</span>
                          )}
                        </td>

                        {modeloSeleccionado === 'caja1' ? (
                          <>
                            <td className="p-2.5 font-mono text-right text-slate-600">
                              {f.colabM202 > 0 ? `Bs ${f.colabM202.toFixed(2)}` : '-'}
                            </td>
                            <td className="p-2.5 font-mono text-right font-bold text-slate-800">
                              {f.donacionM90 > 0 ? `Bs ${f.donacionM90.toFixed(2)}` : '-'}
                            </td>
                            <td className="p-2.5 font-mono text-right text-slate-600">
                              {f.logotipos > 0 ? `Bs ${f.logotipos.toFixed(2)}` : '-'}
                            </td>
                            <td className="p-2.5 font-mono text-right text-slate-600">
                              {(f.adhesivosP + f.adhesivosG) > 0 ? `Bs ${(f.adhesivosP + f.adhesivosG).toFixed(2)}` : '-'}
                            </td>
                            <td className="p-2.5 font-mono text-right font-black text-red-700">
                              {f.frecuencia > 0 ? `Bs ${f.frecuencia.toFixed(2)}` : '-'}
                            </td>
                          </>
                        ) : (
                          <td className="p-2.5 font-mono text-right font-black text-blue-700">
                            {f.frecuenciaInquilinos > 0 ? `Bs ${f.frecuenciaInquilinos.toFixed(2)}` : '-'}
                          </td>
                        )}

                        <td className="p-2.5 font-mono font-black text-right text-slate-900 text-xs bg-slate-50/50">
                          Bs {f.monto.toFixed(2)}
                        </td>

                        <td className="p-2.5">
                          <div className={`p-1 rounded-lg text-[10px] leading-tight flex items-start space-x-1.5 ${
                            f.estadoValidacion === 'VALIDO' 
                              ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' 
                              : f.estadoValidacion === 'ADVERTENCIA' 
                              ? 'bg-amber-50 text-amber-900 border border-amber-200' 
                              : 'bg-rose-50 text-rose-900 border border-rose-200'
                          }`}>
                            {f.estadoValidacion === 'VALIDO' && <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />}
                            {f.estadoValidacion === 'ADVERTENCIA' && <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />}
                            {f.estadoValidacion === 'ERROR' && <XCircle className="w-3 h-3 text-rose-600 shrink-0 mt-0.5" />}
                            <span className="line-clamp-1">{f.observacion}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bottom Checksum & Execution Bar */}
              <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-md">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] text-amber-400 uppercase font-black tracking-wider bg-slate-800 px-2 py-0.5 rounded">
                      DESTINO: {modeloSeleccionado === 'caja1' ? 'CAJA 1 (FRECUENCIA PROPIETARIOS)' : 'CAJA 5 (INQUILINOS)'}
                    </span>
                    <span className="text-xs text-slate-300">
                      <strong>{filasParaProcesar.length}</strong> de {stagingData.length} móviles seleccionados
                    </span>
                  </div>
                  <div className="text-2xl font-black font-mono">
                    Total a Acreditar: <span className="text-emerald-400">Bs {totalMontoLote.toLocaleString('es-BO', { minimumFractionDigits: 2 })}</span>
                  </div>
                  {modeloSeleccionado === 'caja1' && (
                    <div className="text-[11px] text-slate-300 flex flex-wrap gap-x-4">
                      <span>Frecuencia: <strong>Bs {totalFrecuenciaLote.toLocaleString('es-BO', { minimumFractionDigits: 2 })}</strong></span>
                      <span>Donación M 90: <strong>Bs {totalDonacionLote.toLocaleString('es-BO', { minimumFractionDigits: 2 })}</strong></span>
                      <span>Logos y Adhesivos: <strong>Bs {totalOtrosLote.toLocaleString('es-BO', { minimumFractionDigits: 2 })}</strong></span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 w-full md:w-auto">
                  <button
                    onClick={() => {
                      setStagingData([]);
                      setArchivoCargado(null);
                    }}
                    className="flex-1 md:flex-initial px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    Descartar
                  </button>
                  <button
                    onClick={handleProcesarLote}
                    disabled={isProcessing || filasParaProcesar.length === 0}
                    className="flex-1 md:flex-initial flex items-center justify-center space-x-2 bg-red-700 hover:bg-red-800 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer shadow-md disabled:opacity-50"
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
            <p className="text-slate-500">
              Para ingresar cobros sueltos de meses pasados (Frecuencia, Donación M 90, Logotipos, Adhesivos)
            </p>
          </div>

          <form onSubmit={handleGuardarManual} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Móvil / Interno *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: 20 o 01"
                  value={manualForm.interno}
                  onChange={(e) => {
                    const id = e.target.value;
                    const s = buscarSocio(id);
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
                <label className="block font-bold text-slate-700 mb-1">Concepto Oficial de Recaudación</label>
                <select
                  value={manualForm.concepto}
                  onChange={(e) => {
                    const c = e.target.value;
                    let montoSug = manualForm.monto;
                    let cajaSug = manualForm.caja;
                    if (c.includes('FRECUENCIA MENSUAL')) { montoSug = 200; cajaSug = 'c1'; }
                    else if (c.includes('INQUILINOS')) { montoSug = 250; cajaSug = 'c5'; }
                    else if (c.includes('DONACION')) { montoSug = 50; cajaSug = 'c1'; }
                    else if (c.includes('LOGOTIPOS')) { montoSug = 47; cajaSug = 'c1'; }
                    setManualForm({ ...manualForm, concepto: c, monto: montoSug, caja: cajaSug });
                  }}
                  className="w-full p-2 border border-slate-300 rounded-xl font-bold"
                >
                  <option value="PAGO FRECUENCIA MENSUAL (VARIOS)">PAGO FRECUENCIA MENSUAL SOCIOS (Bs 200)</option>
                  <option value="DONACION COLABORACION M 90">DONACION COLABORACION M 90 (Bs 50)</option>
                  <option value="COLABORACION M 202">COLABORACION M 202</option>
                  <option value="LOGOTIPOS">LOGOTIPOS</option>
                  <option value="NUMEROS ADHESIVOS PEQUEÑOS">NUMEROS ADHESIVOS PEQUEÑOS</option>
                  <option value="NUMEROS ADHESIVOS GRANDES">NUMEROS ADHESIVOS GRANDES</option>
                  <option value="PAGO FRECUENCIA MENSUAL INQUILINOS">PAGO FRECUENCIA MENSUAL INQUILINOS (Bs 250)</option>
                  <option value="MULTA SANCION DISCIPLINARIA">MULTA SANCION DISCIPLINARIA</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Caja Destino</label>
                <select
                  value={manualForm.caja}
                  onChange={(e) => setManualForm({ ...manualForm, caja: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-xl font-bold"
                >
                  <option value="c1">Caja 1: Cuotas de Frecuencia y Ordinarios</option>
                  <option value="c2">Caja 2: Multas y Sanciones</option>
                  <option value="c3">Caja 3: Nuevos Socios</option>
                  <option value="c4">Caja 4: Préstamos</option>
                  <option value="c5">Caja 5: Frecuencia Conductores Inquilinos</option>
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
                  <option value="PAGADO">Ya fue Cancelado (Ingreso a Caja)</option>
                  <option value="PENDIENTE">Quedó Pendiente (Deuda en Kardex)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Fecha de Registro</label>
                <input
                  type="date"
                  value={manualForm.fechaCobro}
                  onChange={(e) => setManualForm({ ...manualForm, fechaCobro: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-xl font-mono font-bold"
                />
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
          <div className="border-b pb-2 flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm uppercase">
                Registro de Lotes Conciliados e Importaciones
              </h3>
              <p className="text-xs text-slate-500">Trazabilidad completa de cargas masivas para auditoría contable</p>
            </div>
            <span className="text-xs font-bold text-slate-500">
              {lotesHistoricos.length} lotes registrados
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b">
                <tr>
                  <th className="p-3">Código de Lote</th>
                  <th className="p-3">Fecha y Hora</th>
                  <th className="p-3">Tipo / Caja</th>
                  <th className="p-3">Archivo Origen</th>
                  <th className="p-3 text-center">Móviles</th>
                  <th className="p-3 text-right">Monto Total</th>
                  <th className="p-3 text-center">Operador</th>
                  <th className="p-3 text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {lotesHistoricos.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50 transition">
                    <td className="p-3 font-mono font-bold text-red-700">{l.id}</td>
                    <td className="p-3 font-mono text-slate-500">{l.fecha}</td>
                    <td className="p-3 font-bold text-slate-700">{l.tipo || 'Caja 1'}</td>
                    <td className="p-3 font-bold text-slate-800">{l.archivo}</td>
                    <td className="p-3 text-center font-mono font-bold">{l.registros} móviles</td>
                    <td className="p-3 font-mono font-bold text-right text-emerald-700">
                      Bs {parseFloat(l.montoTotal).toLocaleString('es-BO', { minimumFractionDigits: 2 })}
                    </td>
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