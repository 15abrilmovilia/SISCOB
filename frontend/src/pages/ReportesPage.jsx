import React, { useState, useMemo } from 'react';
import { 
  FileSpreadsheet, 
  Printer, 
  Search, 
  Filter, 
  Download, 
  FileText,
  AlertTriangle,
  TrendingUp,
  Layers,
  Database
} from 'lucide-react';
import { printIsolatedDocument, downloadCSV } from '../utils/printHelper';

// Datos de Ingresos Recaudados Históricos (Fiel a JasperViewer)
const RAW_INGRESOS = [
  { interno: 1, nombre: 'SANTIAGO LLANOS', cat: 'Conductores', caja: 'c1', moneda: 'Bs', cajero: 'DANIELA', ahorro: 6.0, jefeLinea: 18.0, gpsJulio: 24.0, gpsMarzo: 24.0, minPunta: 10.0, proMarzo: 90.0, sostenimiento: 96.0, pandemia: 10.0, retrasado: 72.0, colaboracion: 0.0, prestamo: 0.0, interes: 0.0, proSede: 0.0, proGps2: 0.0 },
  { interno: 3, nombre: 'CARLOS MAXI', cat: 'Conductores', caja: 'c1', moneda: 'Bs', cajero: 'DANIELA', ahorro: 17.0, jefeLinea: 51.0, gpsJulio: 68.0, gpsMarzo: 0.0, minPunta: 25.0, proMarzo: 0.0, sostenimiento: 272.0, pandemia: 40.0, retrasado: 0.0, colaboracion: 30.0, prestamo: 482.0, interes: 0.0, proSede: 0.0, proGps2: 0.0 },
  { interno: 5, nombre: 'RUBEN AGUIRRE', cat: 'Conductores', caja: 'c2', moneda: 'Bs', cajero: 'ADMIN', ahorro: 0.0, jefeLinea: 0.0, gpsJulio: 80.0, gpsMarzo: 12.0, minPunta: 0.0, proMarzo: 45.0, sostenimiento: 320.0, pandemia: 0.0, retrasado: 48.0, colaboracion: 0.0, prestamo: 0.0, interes: 0.0, proSede: 0.0, proGps2: 0.0 },
  { interno: 7, nombre: 'FERMIN ARELLANO', cat: 'Conductores', caja: 'c1', moneda: 'Bs', cajero: 'DANIELA', ahorro: 19.0, jefeLinea: 51.0, gpsJulio: 68.0, gpsMarzo: 8.0, minPunta: 20.0, proMarzo: 30.0, sostenimiento: 272.0, pandemia: 50.0, retrasado: 32.0, colaboracion: 30.0, prestamo: 340.0, interes: 0.0, proSede: 0.0, proGps2: 0.0 },
  { interno: 8, nombre: 'BRAULIO COLQUE', cat: 'Conductores', caja: 'c1', moneda: 'Bs', cajero: 'CARLOS', ahorro: 78.0, jefeLinea: 21.0, gpsJulio: 28.0, gpsMarzo: 12.0, minPunta: 10.0, proMarzo: 45.0, sostenimiento: 112.0, pandemia: 40.0, retrasado: 48.0, colaboracion: 26.0, prestamo: 0.0, interes: 0.0, proSede: 0.0, proGps2: 0.0 },
  { interno: 9, nombre: 'HERNAN CHAMBI', cat: 'Conductores', caja: 'c1', moneda: 'Bs', cajero: 'DANIELA', ahorro: 110.0, jefeLinea: 45.0, gpsJulio: 60.0, gpsMarzo: 12.0, minPunta: 10.0, proMarzo: 45.0, sostenimiento: 240.0, pandemia: 30.0, retrasado: 48.0, colaboracion: 0.0, prestamo: 0.0, interes: 0.0, proSede: 0.0, proGps2: 0.0 },
  { interno: 10, nombre: 'LEODAN HUIZA', cat: 'Conductores', caja: 'c2', moneda: 'Bs', cajero: 'ADMIN', ahorro: 2.0, jefeLinea: 6.0, gpsJulio: 8.0, gpsMarzo: 0.0, minPunta: 5.0, proMarzo: 32.0, sostenimiento: 32.0, pandemia: 20.0, retrasado: 0.0, colaboracion: 0.0, prestamo: 0.0, interes: 0.0, proSede: 0.0, proGps2: 0.0 },
  { interno: 11, nombre: 'JHONNY SALAZAR', cat: 'Conductores', caja: 'c1', moneda: 'Bs', cajero: 'DANIELA', ahorro: 2.0, jefeLinea: 6.0, gpsJulio: 8.0, gpsMarzo: 0.0, minPunta: 0.0, proMarzo: 43.0, sostenimiento: 32.0, pandemia: 10.0, retrasado: 0.0, colaboracion: 9.0, prestamo: 0.0, interes: 0.0, proSede: 0.0, proGps2: 0.0 },
  { interno: 13, nombre: 'CARRILLO MELITON', cat: 'Conductores', caja: 'c1', moneda: 'Bs', cajero: 'DANIELA', ahorro: 43.0, jefeLinea: 36.0, gpsJulio: 48.0, gpsMarzo: 4.0, minPunta: 20.0, proMarzo: 15.0, sostenimiento: 192.0, pandemia: 40.0, retrasado: 16.0, colaboracion: 0.0, prestamo: 246.0, interes: 0.0, proSede: 0.0, proGps2: 0.0 },
  { interno: 14, nombre: 'MAX VERA', cat: 'Conductores', caja: 'c1', moneda: 'Bs', cajero: 'DANIELA', ahorro: 17.0, jefeLinea: 45.0, gpsJulio: 60.0, gpsMarzo: 20.0, minPunta: 0.0, proMarzo: 75.0, sostenimiento: 240.0, pandemia: 50.0, retrasado: 191.0, colaboracion: 0.0, prestamo: 72.0, interes: 50.0, proSede: 0.0, proGps2: 0.0 },
  { interno: 15, nombre: 'RAFAEL LEONARDO', cat: 'Conductores', caja: 'c1', moneda: 'Bs', cajero: 'CARLOS', ahorro: 238.0, jefeLinea: 42.0, gpsJulio: 56.0, gpsMarzo: 8.0, minPunta: 20.0, proMarzo: 30.0, sostenimiento: 224.0, pandemia: 40.0, retrasado: 32.0, colaboracion: 30.0, prestamo: 0.0, interes: 0.0, proSede: 0.0, proGps2: 0.0 },
  { interno: 16, nombre: 'SEVERO PARI', cat: 'Conductores', caja: 'c2', moneda: 'Bs', cajero: 'DANIELA', ahorro: 4.0, jefeLinea: 12.0, gpsJulio: 16.0, gpsMarzo: 16.0, minPunta: 0.0, proMarzo: 60.0, sostenimiento: 64.0, pandemia: 10.0, retrasado: 0.0, colaboracion: 0.0, prestamo: 0.0, interes: 0.0, proSede: 18.0, proGps2: 0.0 },
  { interno: 17, nombre: 'ALEX ROBERT', cat: 'Conductores', caja: 'c1', moneda: 'Bs', cajero: 'DANIELA', ahorro: 17.0, jefeLinea: 51.0, gpsJulio: 68.0, gpsMarzo: 0.0, minPunta: 15.0, proMarzo: 0.0, sostenimiento: 272.0, pandemia: 40.0, retrasado: 0.0, colaboracion: 0.0, prestamo: 432.0, interes: 0.0, proSede: 0.0, proGps2: 0.0 },
  { interno: 18, nombre: 'MARIO QUISPE', cat: 'Conductores', caja: 'c1', moneda: 'Bs', cajero: 'DANIELA', ahorro: 328.0, jefeLinea: 42.0, gpsJulio: 56.0, gpsMarzo: 8.0, minPunta: 3.0, proMarzo: 30.0, sostenimiento: 224.0, pandemia: 50.0, retrasado: 32.0, colaboracion: 30.0, prestamo: 0.0, interes: 0.0, proSede: 0.0, proGps2: 0.0 },
  { interno: 19, nombre: 'BRAULIO NAVARRO', cat: 'Conductores', caja: 'c1', moneda: 'Bs', cajero: 'DANIELA', ahorro: 14.0, jefeLinea: 42.0, gpsJulio: 56.0, gpsMarzo: 20.0, minPunta: 10.0, proMarzo: 75.0, sostenimiento: 224.0, pandemia: 20.0, retrasado: 80.0, colaboracion: 0.0, prestamo: 0.0, interes: 0.0, proSede: 0.0, proGps2: 95.0 },
  { interno: 20, nombre: 'REMBERTO TORRICO', cat: 'Conductores', caja: 'c1', moneda: 'Bs', cajero: 'DANIELA', ahorro: 247.0, jefeLinea: 33.0, gpsJulio: 44.0, gpsMarzo: 0.0, minPunta: 15.0, proMarzo: 0.0, sostenimiento: 176.0, pandemia: 50.0, retrasado: 0.0, colaboracion: 0.0, prestamo: 0.0, interes: 0.0, proSede: 0.0, proGps2: 0.0 },
  { interno: 25, nombre: 'PAULINO MUNOZ', cat: 'Conductores', caja: 'c2', moneda: 'Bs', cajero: 'ADMIN', ahorro: 9.0, jefeLinea: 27.0, gpsJulio: 36.0, gpsMarzo: 0.0, minPunta: 5.0, proMarzo: 127.0, sostenimiento: 144.0, pandemia: 40.0, retrasado: 31.0, colaboracion: 0.0, prestamo: 0.0, interes: 0.0, proSede: 36.0, proGps2: 0.0 }
];

// Datos de Deudas Pendientes Históricos
const RAW_DEUDAS_PENDIENTES = [
  { interno: 1, nombre: 'SANTIAGO LLANOS', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 248.0, inasistencia: 0.0, gpsJulio: 56.0, pandemia: 650.0, interes: 0.0, prestamo: 0.0, colaboracion: 0.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 },
  { interno: 2, nombre: 'CARLOS MAXI', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 320.0, inasistencia: 0.0, gpsJulio: 80.0, pandemia: 660.0, interes: 125.0, prestamo: 2060.0, colaboracion: 30.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 },
  { interno: 3, nombre: 'CARLOS LA FUENTE', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 48.0, inasistencia: 0.0, gpsJulio: 12.0, pandemia: 620.0, interes: 125.0, prestamo: 1618.0, colaboracion: 0.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 },
  { interno: 4, nombre: 'JOAQUIN CHURQUI', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 480.0, inasistencia: 0.0, gpsJulio: 80.0, pandemia: 660.0, interes: 130.0, prestamo: 1992.0, colaboracion: 30.0, promanten: 150.0, guardaBarro: 80.0, llanta: 1177.0, gpsMarzo: 40.0 },
  { interno: 5, nombre: 'RUBEN AGUIRRE', cat: 'Conductores', caja: 'c2', moneda: 'Bs', retrasado: 0.0, inasistencia: 0.0, gpsJulio: 0.0, pandemia: 660.0, interes: 0.0, prestamo: 0.0, colaboracion: 0.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 },
  { interno: 6, nombre: 'GUIDO ESTEVEZ', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 336.0, inasistencia: 0.0, gpsJulio: 80.0, pandemia: 660.0, interes: 0.0, prestamo: 0.0, colaboracion: 30.0, promanten: 15.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 4.0 },
  { interno: 7, nombre: 'FERMIN ARELLANO', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 48.0, inasistencia: 0.0, gpsJulio: 12.0, pandemia: 610.0, interes: 21.0, prestamo: 4460.0, colaboracion: 0.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 },
  { interno: 8, nombre: 'BRAULIO COLQUE', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 208.0, inasistencia: 0.0, gpsJulio: 52.0, pandemia: 620.0, interes: 333.0, prestamo: 7400.0, colaboracion: 4.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 },
  { interno: 9, nombre: 'HERNAN CHAMBI', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 80.0, inasistencia: 0.0, gpsJulio: 20.0, pandemia: 630.0, interes: 0.0, prestamo: 0.0, colaboracion: 0.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 },
  { interno: 10, nombre: 'LEODAN HUIZA', cat: 'Conductores', caja: 'c2', moneda: 'Bs', retrasado: 336.0, inasistencia: 0.0, gpsJulio: 72.0, pandemia: 640.0, interes: 99.0, prestamo: 1272.0, colaboracion: 0.0, promanten: 13.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 12.0 },
  { interno: 11, nombre: 'JHONNY SALAZAR', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 416.0, inasistencia: 0.0, gpsJulio: 72.0, pandemia: 650.0, interes: 35.0, prestamo: 265.0, colaboracion: 0.0, promanten: 77.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 32.0 },
  { interno: 12, nombre: 'ADRIAN CARRIZO', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 640.0, inasistencia: 0.0, gpsJulio: 0.0, pandemia: 660.0, interes: 0.0, prestamo: 0.0, colaboracion: 30.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 },
  { interno: 13, nombre: 'CARRILLO MELITON', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 128.0, inasistencia: 0.0, gpsJulio: 32.0, pandemia: 620.0, interes: 250.0, prestamo: 3212.0, colaboracion: 0.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 },
  { interno: 14, nombre: 'MAX VERA', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 80.0, inasistencia: 0.0, gpsJulio: 20.0, pandemia: 610.0, interes: 250.0, prestamo: 3564.0, colaboracion: 0.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 },
  { interno: 15, nombre: 'RAFAEL LEONARDO', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 96.0, inasistencia: 0.0, gpsJulio: 24.0, pandemia: 620.0, interes: 100.0, prestamo: 2000.0, colaboracion: 0.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 },
  { interno: 16, nombre: 'SEVERO PARI', cat: 'Conductores', caja: 'c2', moneda: 'Bs', retrasado: 320.0, inasistencia: 0.0, gpsJulio: 64.0, pandemia: 650.0, interes: 160.0, prestamo: 2667.0, colaboracion: 0.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 },
  { interno: 17, nombre: 'ALEX ROBERT', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 320.0, inasistencia: 0.0, gpsJulio: 80.0, pandemia: 660.0, interes: 0.0, prestamo: 0.0, colaboracion: 0.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 },
  { interno: 18, nombre: 'MARIO QUISPE', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 48.0, inasistencia: 0.0, gpsJulio: 12.0, pandemia: 620.0, interes: 175.0, prestamo: 3691.0, colaboracion: 0.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 },
  { interno: 20, nombre: 'REMBERTO TORRICO', cat: 'Conductores', caja: 'c1', moneda: 'Bs', retrasado: 144.0, inasistencia: 0.0, gpsJulio: 36.0, pandemia: 610.0, interes: 0.0, prestamo: 0.0, colaboracion: 0.0, promanten: 0.0, guardaBarro: 0.0, llanta: 0.0, gpsMarzo: 0.0 }
];

export default function ReportesPage({ 
  socios = [], 
  deudas = [], 
  cajas = [], 
  egresos = [], 
  prestamos = [] 
}) {
  const [reportTab, setReportTab] = useState('recaudados'); // 'recaudados' | 'deudas'
  const [dataSource, setDataSource] = useState('real'); // 'real' | 'historico'
  const [soloConDeuda, setSoloConDeuda] = useState(false);

  // Shared Filter States (amplio por defecto para cubrir operaciones reales del año 2026)
  const [fechaDesde, setFechaDesde] = useState('2026-01-01');
  const [fechaHasta, setFechaHasta] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCategoria, setSelectedCategoria] = useState('TODOS');
  const [selectedMoneda, setSelectedMoneda] = useState('TODAS');
  const [selectedCaja, setSelectedCaja] = useState('TODAS');
  const [selectedCajero, setSelectedCajero] = useState('TODOS');
  const [searchTerm, setSearchTerm] = useState('');

  // 1. CONSTRUCCIÓN DINÁMICA DE LA MATRIZ REAL DE INGRESOS RECAUDADOS
  const realIngresos = useMemo(() => {
    return socios.map(s => {
      const nombreCompleto = `${s.nombres || ''} ${s.apPaterno || ''} ${s.apMaterno || ''}`.trim();
      const paidDeudas = deudas.filter(d => {
        if (d.socioId !== s.id || !d.pagado) return false;
        if (fechaDesde && d.fecha && d.fecha < fechaDesde) return false;
        if (fechaHasta && d.fecha && d.fecha > fechaHasta) return false;
        if (selectedMoneda !== 'TODAS' && d.moneda && d.moneda !== selectedMoneda) return false;
        if (selectedCaja !== 'TODAS' && d.cajaId && d.cajaId !== selectedCaja) return false;
        return true;
      });

      const sumDesc = (patterns) => {
        return paidDeudas
          .filter(d => {
            const desc = (d.descripcion || '').toUpperCase();
            return patterns.some(p => desc.includes(p));
          })
          .reduce((sum, d) => sum + (parseFloat(d.monto) || 0), 0);
      };

      const ahorro = sumDesc(['AHORRO']);
      const jefeLinea = sumDesc(['JEFE', 'LINEA', 'LÍNEA']);
      const gpsMarzo = sumDesc(['GPS MARZO', 'GPS ANT']);
      const gpsJulio = Math.max(0, sumDesc(['GPS']) - gpsMarzo);
      const minPunta = sumDesc(['PUNTA', 'MINUTO']);
      const proMarzo = sumDesc(['PRO MARZO']);
      const sostenimiento = sumDesc(['SOSTENIMIENTO', 'MENSUALIDAD', 'CUOTA MENSUAL']);
      const pandemia = sumDesc(['PANDEMIA']);
      const retrasado = sumDesc(['RETRAS', 'MORA', 'VENCID']);
      const prestamo = sumDesc(['PRÉSTAMO', 'PRESTAMO', 'AMORTIZ']);
      const interes = sumDesc(['INTERÉS', 'INTERES']);
      const proSede = sumDesc(['SEDE', 'PRO-SEDE']);
      const proGps2 = sumDesc(['GPS 2', 'GPS2']);
      
      const subtotalConceptos = ahorro + jefeLinea + gpsJulio + gpsMarzo + minPunta + proMarzo + sostenimiento + pandemia + retrasado + prestamo + interes + proSede + proGps2;
      const totalPagadoSocio = paidDeudas.reduce((sum, d) => sum + (parseFloat(d.monto) || 0), 0);
      const colaboracion = Math.max(0, totalPagadoSocio - subtotalConceptos);

      return {
        interno: s.id,
        nombre: nombreCompleto,
        cat: s.categoria || 'Conductores',
        caja: 'c1',
        moneda: 'Bs',
        cajero: 'ADMIN',
        ahorro,
        jefeLinea,
        gpsJulio,
        gpsMarzo,
        minPunta,
        proMarzo,
        sostenimiento,
        pandemia,
        retrasado,
        colaboracion,
        prestamo,
        interes,
        proSede,
        proGps2,
        total: totalPagadoSocio
      };
    });
  }, [socios, deudas, fechaDesde, fechaHasta, selectedMoneda, selectedCaja]);

  // 2. CONSTRUCCIÓN DINÁMICA DE LA MATRIZ REAL DE DEUDAS PENDIENTES
  const realDeudas = useMemo(() => {
    return socios.map(s => {
      const nombreCompleto = `${s.nombres || ''} ${s.apPaterno || ''} ${s.apMaterno || ''}`.trim();
      const pendDeudas = deudas.filter(d => {
        if (d.socioId !== s.id || d.pagado) return false;
        if (fechaHasta && d.fecha && d.fecha > fechaHasta) return false;
        if (selectedMoneda !== 'TODAS' && d.moneda && d.moneda !== selectedMoneda) return false;
        if (selectedCaja !== 'TODAS' && d.cajaId && d.cajaId !== selectedCaja) return false;
        return true;
      });

      const sumDesc = (patterns) => {
        return pendDeudas
          .filter(d => {
            const desc = (d.descripcion || '').toUpperCase();
            return patterns.some(p => desc.includes(p));
          })
          .reduce((sum, d) => sum + (parseFloat(d.monto) || 0), 0);
      };

      const retrasado = sumDesc(['SOSTENIMIENTO', 'RETRAS', 'MENSUAL', 'CUOTA']);
      const inasistencia = sumDesc(['INASISTENCIA', 'REUNION', 'REUNIÓN', 'ASAMBLEA', 'MULTA', 'FALTA']) +
        pendDeudas.filter(d => d.conceptoId === 8 && !['MULTA', 'FALTA', 'INASISTENCIA', 'REUNION'].some(w => (d.descripcion || '').toUpperCase().includes(w))).reduce((sum, d) => sum + (parseFloat(d.monto) || 0), 0);
      const gpsJulio = sumDesc(['GPS']);
      const pandemia = sumDesc(['PANDEMIA']);
      const interes = sumDesc(['INTERÉS', 'INTERES']);
      
      let prestamoMonto = sumDesc(['PRÉSTAMO', 'PRESTAMO', 'AMORTIZ']);
      if (prestamoMonto === 0 && prestamos && prestamos.length > 0) {
        const prestamosSocio = prestamos.filter(p => (p.socioId === s.id || p.id === s.id) && p.estado !== 'PAGADO');
        prestamoMonto = prestamosSocio.reduce((sum, p) => sum + (parseFloat(p.saldo) || 0), 0);
      }

      const promanten = sumDesc(['PROMANTEN', 'MANTEN']);
      const guardaBarro = sumDesc(['GUARDA', 'BARRO', 'REPUESTO']);
      const llanta = sumDesc(['LLANTA', 'NEUMATIC']);
      const gpsMarzo = sumDesc(['GPS MARZO', 'GPS ANT']);

      const subtotalClasificado = retrasado + inasistencia + gpsJulio + pandemia + interes + prestamoMonto + promanten + guardaBarro + llanta + gpsMarzo;
      const totalDeudaSocio = pendDeudas.reduce((sum, d) => sum + (parseFloat(d.monto) || 0), 0) + 
        (prestamoMonto > 0 && pendDeudas.every(d => !['PRÉSTAMO', 'PRESTAMO'].some(w => (d.descripcion || '').toUpperCase().includes(w))) ? prestamoMonto : 0);
      const colaboracion = Math.max(0, totalDeudaSocio - subtotalClasificado);

      return {
        interno: s.id,
        nombre: nombreCompleto,
        cat: s.categoria || 'Conductores',
        caja: 'c1',
        moneda: 'Bs',
        retrasado,
        inasistencia,
        gpsJulio,
        pandemia,
        interes,
        prestamo: prestamoMonto,
        colaboracion,
        promanten,
        guardaBarro,
        llanta,
        gpsMarzo,
        total: totalDeudaSocio
      };
    });
  }, [socios, deudas, prestamos, fechaHasta, selectedMoneda, selectedCaja]);

  // Selección de fuente de datos activa
  const activeIngresosList = dataSource === 'real' ? realIngresos : RAW_INGRESOS;
  const activeDeudasList = dataSource === 'real' ? realDeudas : RAW_DEUDAS_PENDIENTES;

  // 3. Filtrado para Ingresos Recaudados
  const filteredIngresos = useMemo(() => {
    return activeIngresosList.filter(item => {
      const matchCat = selectedCategoria === 'TODOS' || item.cat === selectedCategoria;
      const matchMoneda = selectedMoneda === 'TODAS' || item.moneda === selectedMoneda;
      const matchCaja = selectedCaja === 'TODAS' || item.caja === selectedCaja;
      const matchCajero = selectedCajero === 'TODOS' || item.cajero === selectedCajero;
      const matchSearch = searchTerm === '' || 
        `${item.interno} ${item.nombre}`.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchMoneda && matchCaja && matchCajero && matchSearch;
    });
  }, [activeIngresosList, selectedCategoria, selectedMoneda, selectedCaja, selectedCajero, searchTerm]);

  // Totales Ingresos
  const totalsIngresos = useMemo(() => {
    const sum = (key) => filteredIngresos.reduce((acc, curr) => acc + (curr[key] || 0), 0);
    return {
      ahorro: sum('ahorro'),
      jefeLinea: sum('jefeLinea'),
      gpsJulio: sum('gpsJulio'),
      gpsMarzo: sum('gpsMarzo'),
      minPunta: sum('minPunta'),
      proMarzo: sum('proMarzo'),
      sostenimiento: sum('sostenimiento'),
      pandemia: sum('pandemia'),
      retrasado: sum('retrasado'),
      colaboracion: sum('colaboracion'),
      prestamo: sum('prestamo'),
      interes: sum('interes'),
      proSede: sum('proSede'),
      proGps2: sum('proGps2'),
    };
  }, [filteredIngresos]);
  const grandTotalIngresos = Object.values(totalsIngresos).reduce((a, b) => a + b, 0);

  // 4. Filtrado para Deudas Pendientes
  const filteredDeudas = useMemo(() => {
    return activeDeudasList.filter(item => {
      const matchCat = selectedCategoria === 'TODOS' || item.cat === selectedCategoria;
      const matchMoneda = selectedMoneda === 'TODAS' || item.moneda === selectedMoneda;
      const matchCaja = selectedCaja === 'TODAS' || item.caja === selectedCaja;
      const matchSearch = searchTerm === '' || 
        `${item.interno} ${item.nombre}`.toLowerCase().includes(searchTerm.toLowerCase());
      const matchSoloConDeuda = !soloConDeuda || (item.total && item.total > 0);
      return matchCat && matchMoneda && matchCaja && matchSearch && matchSoloConDeuda;
    });
  }, [activeDeudasList, selectedCategoria, selectedMoneda, selectedCaja, searchTerm, soloConDeuda]);

  // Totales Deudas
  const totalsDeudas = useMemo(() => {
    const sum = (key) => filteredDeudas.reduce((acc, curr) => acc + (curr[key] || 0), 0);
    return {
      retrasado: sum('retrasado'),
      inasistencia: sum('inasistencia'),
      gpsJulio: sum('gpsJulio'),
      pandemia: sum('pandemia'),
      interes: sum('interes'),
      prestamo: sum('prestamo'),
      colaboracion: sum('colaboracion'),
      promanten: sum('promanten'),
      guardaBarro: sum('guardaBarro'),
      llanta: sum('llanta'),
      gpsMarzo: sum('gpsMarzo'),
    };
  }, [filteredDeudas]);
  const grandTotalDeudas = Object.values(totalsDeudas).reduce((a, b) => a + b, 0);

  // 5. EXPORTAR A EXCEL / CSV REAL (Descarga directa con datos reales del sistema)
  const handleExportExcel = (tipo) => {
    if (tipo === 'Ingresos') {
      const headers = [
        'Interno', 'Nombre Socio', 'Ahorro', 'Jefe Línea', 'GPS Julio', 'GPS Marzo', 
        'Minuto Punta', 'Pro Marzo', 'Sostenimiento', 'Pandemia', 'Retrasado', 
        'Colaboración', 'Préstamo', 'Interés', 'Pro Sede', 'Pro GPS 2', 'Total General'
      ];
      const rows = filteredIngresos.map(r => {
        const total = r.ahorro + r.jefeLinea + r.gpsJulio + r.gpsMarzo + r.minPunta + 
                      r.proMarzo + r.sostenimiento + r.pandemia + r.retrasado + 
                      r.colaboracion + r.prestamo + r.interes + r.proSede + r.proGps2;
        return [
          r.interno, r.nombre, r.ahorro, r.jefeLinea, r.gpsJulio, r.gpsMarzo,
          r.minPunta, r.proMarzo, r.sostenimiento, r.pandemia, r.retrasado,
          r.colaboracion, r.prestamo, r.interes, r.proSede, r.proGps2, total
        ];
      });
      // Añadir fila de totales
      rows.push([
        'TOTALES', `(${filteredIngresos.length} Registros)`, totalsIngresos.ahorro, totalsIngresos.jefeLinea, totalsIngresos.gpsJulio,
        totalsIngresos.gpsMarzo, totalsIngresos.minPunta, totalsIngresos.proMarzo, totalsIngresos.sostenimiento,
        totalsIngresos.pandemia, totalsIngresos.retrasado, totalsIngresos.colaboracion, totalsIngresos.prestamo,
        totalsIngresos.interes, totalsIngresos.proSede, totalsIngresos.proGps2, grandTotalIngresos
      ]);
      downloadCSV(`Matriz_Ingresos_${dataSource}_${fechaDesde}_${fechaHasta}`, headers, rows);
    } else {
      const headers = [
        'Interno', 'Nombre Socio', 'Sostenimiento Retrasado', 'Inasistencia', 'GPS Julio', 
        'Pandemia', 'Interés', 'Préstamo', 'Colaboración', 'Promanten', 'Guarda Barro', 
        'Llanta', 'GPS Marzo', 'Total Deuda'
      ];
      const rows = filteredDeudas.map(r => {
        const total = r.retrasado + r.inasistencia + r.gpsJulio + r.pandemia + r.interes + 
                      r.prestamo + r.colaboracion + r.promanten + r.guardaBarro + r.llanta + r.gpsMarzo;
        return [
          r.interno, r.nombre, r.retrasado, r.inasistencia, r.gpsJulio, r.pandemia,
          r.interes, r.prestamo, r.colaboracion, r.promanten, r.guardaBarro, r.llanta, r.gpsMarzo, total
        ];
      });
      rows.push([
        'TOTALES', `(${filteredDeudas.length} Registros)`, totalsDeudas.retrasado, totalsDeudas.inasistencia, totalsDeudas.gpsJulio,
        totalsDeudas.pandemia, totalsDeudas.interes, totalsDeudas.prestamo, totalsDeudas.colaboracion,
        totalsDeudas.promanten, totalsDeudas.guardaBarro, totalsDeudas.llanta, totalsDeudas.gpsMarzo, grandTotalDeudas
      ]);
      downloadCSV(`Matriz_Deudas_${dataSource}_${fechaHasta}`, headers, rows);
    }
  };

  // 4. IMPRIMIR VISTA JASPER AISLADA PROFESIONAL (Sin botones ni captura de ventana)
  const handlePrintJasper = () => {
    const isIngresos = reportTab === 'recaudados';
    const title = isIngresos ? 'Ingresos Recaudados por Socio' : 'Deudas Pendientes por Socio';
    const subtitle = isIngresos 
      ? `Desde: ${fechaDesde} hasta: ${fechaHasta} | cajero(s): ${selectedCajero} | categoria: ${selectedCategoria} | moneda: ${selectedMoneda} | caja(s): ${selectedCaja}`
      : `A la fecha: ${fechaHasta} | categoria: ${selectedCategoria} | moneda: ${selectedMoneda} | caja(s): ${selectedCaja}`;

    let theadHTML = '';
    let tbodyHTML = '';
    let tfootHTML = '';

    if (isIngresos) {
      theadHTML = `
        <tr style="background: #0f172a; color: #ffffff; font-size: 8px; text-transform: uppercase;">
          <th style="padding: 4px; border: 1px solid #475569;">Int.</th>
          <th style="padding: 4px; border: 1px solid #475569; text-align: left;">Nombre Socio</th>
          <th style="padding: 4px; border: 1px solid #475569;">Ahorro</th>
          <th style="padding: 4px; border: 1px solid #475569;">J.Línea</th>
          <th style="padding: 4px; border: 1px solid #475569;">GPS Jul</th>
          <th style="padding: 4px; border: 1px solid #475569;">GPS Mar</th>
          <th style="padding: 4px; border: 1px solid #475569;">M.Punta</th>
          <th style="padding: 4px; border: 1px solid #475569;">Pro Mar</th>
          <th style="padding: 4px; border: 1px solid #475569;">Sostenim.</th>
          <th style="padding: 4px; border: 1px solid #475569;">Pandemia</th>
          <th style="padding: 4px; border: 1px solid #475569;">Retraso</th>
          <th style="padding: 4px; border: 1px solid #475569;">Colabor.</th>
          <th style="padding: 4px; border: 1px solid #475569;">Préstamo</th>
          <th style="padding: 4px; border: 1px solid #475569;">Interés</th>
          <th style="padding: 4px; border: 1px solid #475569;">P.Sede</th>
          <th style="padding: 4px; border: 1px solid #475569;">P.GPS2</th>
          <th style="padding: 4px; border: 1px solid #475569; background: #b91c1c;">TOTAL</th>
        </tr>
      `;

      tbodyHTML = filteredIngresos.length === 0 
        ? `<tr><td colspan="17" style="padding: 20px; text-align: center; color: #64748b;">No hay registros de recaudación para mostrar con los filtros seleccionados.</td></tr>`
        : filteredIngresos.map(r => {
            const total = r.ahorro + r.jefeLinea + r.gpsJulio + r.gpsMarzo + r.minPunta + 
                          r.proMarzo + r.sostenimiento + r.pandemia + r.retrasado + 
                          r.colaboracion + r.prestamo + r.interes + r.proSede + r.proGps2;
            return `
              <tr style="border-bottom: 1px solid #cbd5e1; font-family: monospace; font-size: 9px;">
                <td style="padding: 3px; text-align: center; font-weight: bold; background: #f8fafc;">${r.interno}</td>
                <td style="padding: 3px; text-align: left; font-family: sans-serif; font-size: 8.5px;">${r.nombre}</td>
                <td style="padding: 3px; text-align: right;">${r.ahorro.toFixed(1)}</td>
                <td style="padding: 3px; text-align: right;">${r.jefeLinea.toFixed(1)}</td>
                <td style="padding: 3px; text-align: right;">${r.gpsJulio.toFixed(1)}</td>
                <td style="padding: 3px; text-align: right;">${r.gpsMarzo.toFixed(1)}</td>
                <td style="padding: 3px; text-align: right;">${r.minPunta.toFixed(1)}</td>
                <td style="padding: 3px; text-align: right;">${r.proMarzo.toFixed(1)}</td>
                <td style="padding: 3px; text-align: right; font-weight: bold;">${r.sostenimiento.toFixed(1)}</td>
                <td style="padding: 3px; text-align: right;">${r.pandemia.toFixed(1)}</td>
                <td style="padding: 3px; text-align: right;">${r.retrasado.toFixed(1)}</td>
                <td style="padding: 3px; text-align: right;">${r.colaboracion.toFixed(1)}</td>
                <td style="padding: 3px; text-align: right; color: #1d4ed8; font-weight: bold;">${r.prestamo.toFixed(1)}</td>
                <td style="padding: 3px; text-align: right;">${r.interes.toFixed(1)}</td>
                <td style="padding: 3px; text-align: right;">${r.proSede.toFixed(1)}</td>
                <td style="padding: 3px; text-align: right;">${r.proGps2.toFixed(1)}</td>
                <td style="padding: 3px; text-align: right; font-weight: bold; background: #f1f5f9;">${total.toFixed(1)}</td>
              </tr>
            `;
          }).join('');

      tfootHTML = `
        <tr style="background: #e2e8f0; font-weight: bold; font-family: monospace; font-size: 9px; border-top: 2px solid #0f172a;">
          <td style="padding: 5px; text-align: center;" colspan="2">TOTALES (${filteredIngresos.length})</td>
          <td style="padding: 5px; text-align: right;">${totalsIngresos.ahorro.toFixed(1)}</td>
          <td style="padding: 5px; text-align: right;">${totalsIngresos.jefeLinea.toFixed(1)}</td>
          <td style="padding: 5px; text-align: right;">${totalsIngresos.gpsJulio.toFixed(1)}</td>
          <td style="padding: 5px; text-align: right;">${totalsIngresos.gpsMarzo.toFixed(1)}</td>
          <td style="padding: 5px; text-align: right;">${totalsIngresos.minPunta.toFixed(1)}</td>
          <td style="padding: 5px; text-align: right;">${totalsIngresos.proMarzo.toFixed(1)}</td>
          <td style="padding: 5px; text-align: right;">${totalsIngresos.sostenimiento.toFixed(1)}</td>
          <td style="padding: 5px; text-align: right;">${totalsIngresos.pandemia.toFixed(1)}</td>
          <td style="padding: 5px; text-align: right;">${totalsIngresos.retrasado.toFixed(1)}</td>
          <td style="padding: 5px; text-align: right;">${totalsIngresos.colaboracion.toFixed(1)}</td>
          <td style="padding: 5px; text-align: right; color: #1d4ed8;">${totalsIngresos.prestamo.toFixed(1)}</td>
          <td style="padding: 5px; text-align: right;">${totalsIngresos.interes.toFixed(1)}</td>
          <td style="padding: 5px; text-align: right;">${totalsIngresos.proSede.toFixed(1)}</td>
          <td style="padding: 5px; text-align: right;">${totalsIngresos.proGps2.toFixed(1)}</td>
          <td style="padding: 5px; text-align: right; background: #fee2e2; color: #991b1b; font-weight: 900;">Bs ${grandTotalIngresos.toFixed(1)}</td>
        </tr>
      `;
    } else {
      theadHTML = `
        <tr style="background: #0f172a; color: #ffffff; font-size: 8px; text-transform: uppercase;">
          <th style="padding: 4px; border: 1px solid #475569;">Int.</th>
          <th style="padding: 4px; border: 1px solid #475569; text-align: left;">Nombre Socio</th>
          <th style="padding: 4px; border: 1px solid #475569;">Retrasado</th>
          <th style="padding: 4px; border: 1px solid #475569;">Inasist.</th>
          <th style="padding: 4px; border: 1px solid #475569;">GPS Jul</th>
          <th style="padding: 4px; border: 1px solid #475569;">Pandemia</th>
          <th style="padding: 4px; border: 1px solid #475569;">Interés</th>
          <th style="padding: 4px; border: 1px solid #475569;">Préstamo</th>
          <th style="padding: 4px; border: 1px solid #475569;">Colabor.</th>
          <th style="padding: 4px; border: 1px solid #475569;">Promanten</th>
          <th style="padding: 4px; border: 1px solid #475569;">GuardaB.</th>
          <th style="padding: 4px; border: 1px solid #475569;">Llanta</th>
          <th style="padding: 4px; border: 1px solid #475569;">GPS Mar</th>
          <th style="padding: 4px; border: 1px solid #475569; background: #b91c1c;">TOTAL DEUDA</th>
        </tr>
      `;

      tbodyHTML = filteredDeudas.length === 0
        ? `<tr><td colspan="14" style="padding: 20px; text-align: center; color: #64748b;">No hay deudas pendientes registradas para mostrar con los filtros seleccionados.</td></tr>`
        : filteredDeudas.map(r => {
            const total = r.retrasado + r.inasistencia + r.gpsJulio + r.pandemia + r.interes + 
                          r.prestamo + r.colaboracion + r.promanten + r.guardaBarro + r.llanta + r.gpsMarzo;
            return `
              <tr style="border-bottom: 1px solid #cbd5e1; font-family: monospace; font-size: 9px;">
                <td style="padding: 3px; text-align: center; font-weight: bold; background: #f8fafc;">${r.interno}</td>
                <td style="padding: 3px; text-align: left; font-family: sans-serif; font-size: 8.5px;">${r.nombre}</td>
                <td style="padding: 3px; text-align: right;">${r.retrasado.toFixed(1)}</td>
                <td style="padding: 3px; text-align: right; color: #e11d48; font-weight: bold;">${r.inasistencia.toFixed(1)}</td>
                <td style="padding: 3px; text-align: right;">${r.gpsJulio.toFixed(1)}</td>
                <td style="padding: 3px; text-align: right;">${r.pandemia.toFixed(1)}</td>
                <td style="padding: 3px; text-align: right;">${r.interes.toFixed(1)}</td>
                <td style="padding: 3px; text-align: right; color: #1d4ed8; font-weight: bold;">${r.prestamo.toFixed(1)}</td>
                <td style="padding: 3px; text-align: right;">${r.colaboracion.toFixed(1)}</td>
                <td style="padding: 3px; text-align: right;">${r.promanten.toFixed(1)}</td>
                <td style="padding: 3px; text-align: right;">${r.guardaBarro.toFixed(1)}</td>
                <td style="padding: 3px; text-align: right;">${r.llanta.toFixed(1)}</td>
                <td style="padding: 3px; text-align: right;">${r.gpsMarzo.toFixed(1)}</td>
                <td style="padding: 3px; text-align: right; font-weight: 900; background: #fee2e2; color: #991b1b;">${total.toFixed(1)}</td>
              </tr>
            `;
          }).join('');

      tfootHTML = `
        <tr style="background: #e2e8f0; font-weight: bold; font-family: monospace; font-size: 9px; border-top: 2px solid #0f172a;">
          <td style="padding: 5px; text-align: center;" colspan="2">TOTALES (${filteredDeudas.length})</td>
          <td style="padding: 5px; text-align: right;">${totalsDeudas.retrasado.toFixed(1)}</td>
          <td style="padding: 5px; text-align: right; color: #e11d48;">${totalsDeudas.inasistencia.toFixed(1)}</td>
          <td style="padding: 5px; text-align: right;">${totalsDeudas.gpsJulio.toFixed(1)}</td>
          <td style="padding: 5px; text-align: right;">${totalsDeudas.pandemia.toFixed(1)}</td>
          <td style="padding: 5px; text-align: right;">${totalsDeudas.interes.toFixed(1)}</td>
          <td style="padding: 5px; text-align: right; color: #1d4ed8;">${totalsDeudas.prestamo.toFixed(1)}</td>
          <td style="padding: 5px; text-align: right;">${totalsDeudas.colaboracion.toFixed(1)}</td>
          <td style="padding: 5px; text-align: right;">${totalsDeudas.promanten.toFixed(1)}</td>
          <td style="padding: 5px; text-align: right;">${totalsDeudas.guardaBarro.toFixed(1)}</td>
          <td style="padding: 5px; text-align: right;">${totalsDeudas.llanta.toFixed(1)}</td>
          <td style="padding: 5px; text-align: right;">${totalsDeudas.gpsMarzo.toFixed(1)}</td>
          <td style="padding: 5px; text-align: right; background: #fecaca; color: #7f1d1d; font-weight: 900;">Bs ${grandTotalDeudas.toFixed(1)}</td>
        </tr>
      `;
    }

    const html = `
      <div style="width: 100%; margin: 0 auto; font-family: 'Inter', sans-serif;">
        <div style="text-align: center; border-bottom: 2px solid #b91c1c; padding-bottom: 8px; margin-bottom: 10px;">
          <h2 style="font-size: 15px; font-weight: 900; text-transform: uppercase; color: #0f172a;">RADIO MÓVIL 15 DE ABRIL S.R.L.</h2>
          <h3 style="font-size: 13px; font-weight: 800; color: #b91c1c; text-transform: uppercase;">${title}</h3>
          <p style="font-size: 9px; color: #64748b; font-family: monospace; margin-top: 2px;">${subtitle}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; border: 1px solid #94a3b8;">
          <thead>${theadHTML}</thead>
          <tbody>${tbodyHTML}</tbody>
          <tfoot>${tfootHTML}</tfoot>
        </table>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px; font-size: 9px; color: #64748b; font-family: monospace; border-top: 1px solid #cbd5e1; padding-top: 4px;">
          <span>SISCOB - Sistema Integral de Cobranza</span>
          <span>Fecha de Emisión: ${new Date().toLocaleString('es-BO')}</span>
          <span>JasperViewer Engine v6.20</span>
        </div>

        <div style="display: flex; justify-content: space-around; text-align: center; font-size: 10px; margin-top: 35px;" class="avoid-break">
          <div style="width: 35%; border-top: 1px solid #0f172a; padding-top: 4px;">
            <strong>Firma Presidente</strong><br>
            <span style="font-size: 9px; color: #64748b;">Directorio Radio Móvil 15 de Abril</span>
          </div>
          <div style="width: 35%; border-top: 1px solid #0f172a; padding-top: 4px;">
            <strong>Firma Tesorero General</strong><br>
            <span style="font-size: 9px; color: #64748b;">Secretaría de Finanzas</span>
          </div>
        </div>
      </div>
    `;

    printIsolatedDocument(html, title);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-5 animate-fadeIn">
      {/* Top Title & Navigation Tabs */}
      <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-xs no-print gap-3">
        <div>
          <h1 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
            <FileSpreadsheet className="w-5 h-5 text-red-700" />
            <span>Módulo de Matrices y Rendición de Cuentas (JasperReports)</span>
          </h1>
          <p className="text-xs text-slate-500">
            Reportes matriciales consolidados por socio con exportación a Excel e impresión limpia
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Selector de Fuente de Datos: Real vs Histórico Demo */}
          <div className="flex bg-slate-100 p-1 rounded-xl space-x-1 text-xs font-bold border border-slate-200">
            <button
              onClick={() => setDataSource('real')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center space-x-1.5 ${
                dataSource === 'real' 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Datos Reales del Sistema ({socios.length} Socios)</span>
            </button>
            <button
              onClick={() => setDataSource('historico')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center space-x-1.5 ${
                dataSource === 'historico' 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Planilla Histórica (Demo)</span>
            </button>
          </div>

          {/* Tab Switcher: Ingresos vs Deudas */}
          <div className="flex bg-slate-100 p-1 rounded-xl space-x-1 text-xs font-bold border border-slate-200">
            <button
              onClick={() => setReportTab('recaudados')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center space-x-1.5 ${
                reportTab === 'recaudados' 
                  ? 'bg-red-700 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Ingresos Recaudados</span>
            </button>
            <button
              onClick={() => setReportTab('deudas')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center space-x-1.5 ${
                reportTab === 'deudas' 
                  ? 'bg-red-700 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Deudas Pendientes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3 no-print">
        <div className="flex items-center space-x-2 text-xs font-extrabold text-slate-800 uppercase border-b border-slate-100 pb-2">
          <Filter className="w-4 h-4 text-red-700" />
          <span>
            Filtros para: {reportTab === 'recaudados' ? 'Ingresos Recaudados por Socio' : 'Deudas Pendientes por Socio'}
          </span>
          <span className="ml-auto text-[11px] font-bold text-slate-500 lowercase">
            {dataSource === 'real' ? `modo: datos del sistema (${socios.length} afiliados)` : 'modo: archivo histórico demo'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div>
            <label className="block font-bold text-slate-600 mb-1">Desde:</label>
            <input
              type="date"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-xl font-mono text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-600 mb-1">Hasta / Al:</label>
            <input
              type="date"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-xl font-mono text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-600 mb-1">Categoría:</label>
            <select
              value={selectedCategoria}
              onChange={(e) => setSelectedCategoria(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <option value="TODOS">TODAS</option>
              <option value="Conductores">Conductores</option>
              <option value="Propietario">Propietario</option>
              <option value="Inquilinos">Inquilinos</option>
              <option value="Directorio">Directorio</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-600 mb-1">Moneda:</label>
            <select
              value={selectedMoneda}
              onChange={(e) => setSelectedMoneda(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <option value="TODAS">TODAS</option>
              <option value="Bs">Bolivianos (Bs)</option>
              <option value="$us">Dólares ($us)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-600 mb-1">Caja(s):</label>
            <select
              value={selectedCaja}
              onChange={(e) => setSelectedCaja(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <option value="TODAS">TODAS LAS CAJAS</option>
              <option value="c1">Caja General</option>
              <option value="c2">Caja GPS y Mantenimiento</option>
              <option value="c3">Caja Préstamos</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-600 mb-1">
              {reportTab === 'recaudados' ? 'Cajero(s):' : 'Operador:'}
            </label>
            <select
              value={selectedCajero}
              onChange={(e) => setSelectedCajero(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <option value="TODOS">TODOS</option>
              <option value="DANIELA">Daniela</option>
              <option value="CARLOS">Carlos</option>
              <option value="ADMIN">Admin33</option>
            </select>
          </div>
        </div>

        {/* Quick Actions, Filtro de Deuda & Search */}
        <div className="flex flex-wrap justify-between items-center gap-3 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por interno o nombre de socio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-xl text-xs"
              />
            </div>

            {reportTab === 'deudas' && (
              <label className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={soloConDeuda}
                  onChange={(e) => setSoloConDeuda(e.target.checked)}
                  className="rounded text-red-700 focus:ring-red-500 w-3.5 h-3.5 cursor-pointer"
                />
                <span>Solo socios con saldo pendiente</span>
              </label>
            )}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => handleExportExcel(reportTab === 'recaudados' ? 'Ingresos' : 'Deudas')}
              className="flex items-center space-x-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs active:scale-95"
              title="Descargar archivo CSV compatible con Excel"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Excel (.csv)</span>
            </button>
            <button
              onClick={handlePrintJasper}
              className="flex items-center space-x-1.5 bg-red-700 hover:bg-red-800 text-white px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs active:scale-95"
              title="Imprimir reporte sin capturar la pantalla"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir Vista Jasper</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VISTA 1: INGRESOS RECAUDADOS POR SOCIO */}
      {/* ========================================================================= */}
      {reportTab === 'recaudados' && (
        <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden p-6 text-slate-800">
          <div className="bg-slate-200/80 border border-slate-300 rounded-lg p-2 flex items-center justify-between text-xs text-slate-600 mb-4 no-print">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-red-700" />
              <span className="font-bold text-slate-800">
                JasperViewer - Ingresos Recaudados por Socio ({dataSource === 'real' ? 'Datos Reales' : 'Histórico Demo'})
              </span>
            </div>
            <div className="flex items-center space-x-3 text-[11px] font-mono">
              <span className="font-bold text-slate-900">
                {filteredIngresos.length} Registros {dataSource === 'real' ? `(de ${socios.length} en sistema)` : ''}
              </span>
              <span>Zoom: 100%</span>
            </div>
          </div>

          <div className="text-center pb-3 border-b-2 border-slate-800 mb-4 space-y-1">
            <h3 className="font-extrabold text-base tracking-wider uppercase text-slate-900">
              RADIO MÓVIL 15 DE ABRIL
            </h3>
            <h2 className="text-lg font-black text-slate-900 tracking-wide uppercase">
              Ingresos Recaudados por Socio
            </h2>
            <p className="text-xs font-mono text-slate-700 font-semibold">
              Desde: <strong>{fechaDesde}</strong> hasta: <strong>{fechaHasta}</strong> | cajero(s): <strong>{selectedCajero}</strong> | categoria: <strong>{selectedCategoria}</strong> | moneda: <strong>{selectedMoneda}</strong> | caja(s): <strong>{selectedCaja}</strong>
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[11px] text-left border-collapse border border-slate-400 font-mono">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-400">
                <tr className="divide-x divide-slate-300 text-center">
                  <th className="p-2 w-14 bg-slate-200 text-slate-900 font-sans">Interno</th>
                  <th className="p-2 text-left min-w-[130px] font-sans">Nombre Afiliado</th>
                  <th className="p-2">Ahorro<br/><span className="text-[9px] text-slate-500">Bs</span></th>
                  <th className="p-2">Jefe de<br/>línea Bs</th>
                  <th className="p-2">Mantenim.<br/>GPS Julio</th>
                  <th className="p-2">Mantenim.<br/>GPS Marzo</th>
                  <th className="p-2">Minuto<br/>punta Bs</th>
                  <th className="p-2">Promanten.<br/>Marzo Bs</th>
                  <th className="p-2">Sostenim.<br/>Bs</th>
                  <th className="p-2">Sostenim.<br/>Pandemia</th>
                  <th className="p-2">Sostenim.<br/>Retrasado</th>
                  <th className="p-2">Colaborac.<br/>Int 25 Bs</th>
                  <th className="p-2">Préstamo<br/>Nuevo Bs</th>
                  <th className="p-2">Interés<br/>Nuevo Bs</th>
                  <th className="p-2">PRO<br/>SEDE Bs</th>
                  <th className="p-2">PRO<br/>GPS 2 Bs</th>
                  <th className="p-2 bg-slate-200 font-extrabold text-slate-900 font-sans">TOTAL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredIngresos.length === 0 ? (
                  <tr>
                    <td colSpan="17" className="py-12 text-center text-slate-400">
                      <FileSpreadsheet className="w-10 h-10 mx-auto mb-2 text-slate-300 stroke-1" />
                      <p className="font-bold text-slate-700 text-sm">
                        {dataSource === 'real' && socios.length === 0 
                          ? 'Padrón de Socios en Cero (0 Registros en Sistema)'
                          : 'Sin registros de recaudación para los filtros seleccionados'}
                      </p>
                      <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                        {dataSource === 'real' && socios.length === 0
                          ? 'El sistema está en blanco tras la puesta a cero. Al registrar nuevos afiliados en el Padrón y cobrar cuotas, aparecerán aquí automáticamente con sus números de interno reales.'
                          : 'Verifique el rango de fechas, categoría o término de búsqueda seleccionado.'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredIngresos.map((row) => {
                    const rowTotal = row.ahorro + row.jefeLinea + row.gpsJulio + row.gpsMarzo + 
                      row.minPunta + row.proMarzo + row.sostenimiento + row.pandemia + row.retrasado + 
                      row.colaboracion + row.prestamo + row.interes + row.proSede + row.proGps2;

                    return (
                      <tr key={row.interno} className="divide-x divide-slate-200 hover:bg-red-50/50 transition">
                        <td className="p-1.5 text-center font-bold text-slate-900 bg-slate-50/80 font-sans">
                          {row.interno}
                        </td>
                        <td className="p-1.5 text-left font-sans font-semibold text-slate-800 truncate max-w-[150px]">
                          {row.nombre}
                        </td>
                        <td className="p-1.5 text-right">{row.ahorro.toFixed(1)}</td>
                        <td className="p-1.5 text-right">{row.jefeLinea.toFixed(1)}</td>
                        <td className="p-1.5 text-right">{row.gpsJulio.toFixed(1)}</td>
                        <td className="p-1.5 text-right">{row.gpsMarzo.toFixed(1)}</td>
                        <td className="p-1.5 text-right">{row.minPunta.toFixed(1)}</td>
                        <td className="p-1.5 text-right">{row.proMarzo.toFixed(1)}</td>
                        <td className="p-1.5 text-right font-semibold">{row.sostenimiento.toFixed(1)}</td>
                        <td className="p-1.5 text-right">{row.pandemia.toFixed(1)}</td>
                        <td className="p-1.5 text-right">{row.retrasado.toFixed(1)}</td>
                        <td className="p-1.5 text-right">{row.colaboracion.toFixed(1)}</td>
                        <td className="p-1.5 text-right text-blue-700 font-bold">{row.prestamo.toFixed(1)}</td>
                        <td className="p-1.5 text-right">{row.interes.toFixed(1)}</td>
                        <td className="p-1.5 text-right">{row.proSede.toFixed(1)}</td>
                        <td className="p-1.5 text-right">{row.proGps2.toFixed(1)}</td>
                        <td className="p-1.5 text-right font-extrabold bg-slate-50 text-slate-900 font-sans">
                          {rowTotal.toFixed(1)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
              <tfoot className="bg-slate-100 font-bold border-t-2 border-slate-500 divide-x divide-slate-300">
                <tr className="text-right">
                  <td className="p-2 text-center text-slate-900 uppercase font-sans" colSpan={2}>
                    TOTALES ({filteredIngresos.length})
                  </td>
                  <td className="p-2">{totalsIngresos.ahorro.toFixed(1)}</td>
                  <td className="p-2">{totalsIngresos.jefeLinea.toFixed(1)}</td>
                  <td className="p-2">{totalsIngresos.gpsJulio.toFixed(1)}</td>
                  <td className="p-2">{totalsIngresos.gpsMarzo.toFixed(1)}</td>
                  <td className="p-2">{totalsIngresos.minPunta.toFixed(1)}</td>
                  <td className="p-2">{totalsIngresos.proMarzo.toFixed(1)}</td>
                  <td className="p-2 text-slate-900">{totalsIngresos.sostenimiento.toFixed(1)}</td>
                  <td className="p-2">{totalsIngresos.pandemia.toFixed(1)}</td>
                  <td className="p-2">{totalsIngresos.retrasado.toFixed(1)}</td>
                  <td className="p-2">{totalsIngresos.colaboracion.toFixed(1)}</td>
                  <td className="p-2 text-blue-800">{totalsIngresos.prestamo.toFixed(1)}</td>
                  <td className="p-2">{totalsIngresos.interes.toFixed(1)}</td>
                  <td className="p-2">{totalsIngresos.proSede.toFixed(1)}</td>
                  <td className="p-2">{totalsIngresos.proGps2.toFixed(1)}</td>
                  <td className="p-2 bg-red-100 text-red-900 text-xs font-black font-sans">
                    Bs {grandTotalIngresos.toFixed(1)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-300 flex justify-between items-center text-[10px] text-slate-500 font-mono">
            <span>Reporte: ingresos_recaudados_por_socio.jrxml</span>
            <span>Generado por: admin33 • Sistema SISCOB</span>
            <span>Página 1 de 1</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VISTA 2: DEUDAS PENDIENTES POR SOCIO */}
      {/* ========================================================================= */}
      {reportTab === 'deudas' && (
        <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden p-6 text-slate-800">
          <div className="bg-slate-200/80 border border-slate-300 rounded-lg p-2 flex items-center justify-between text-xs text-slate-600 mb-4 no-print">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-red-700" />
              <span className="font-bold text-slate-800">
                JasperViewer - Deudas Pendientes por Socio ({dataSource === 'real' ? 'Datos Reales' : 'Histórico Demo'})
              </span>
            </div>
            <div className="flex items-center space-x-3 text-[11px] font-mono">
              <span className="font-bold text-slate-900">
                {filteredDeudas.length} Registros {dataSource === 'real' ? `(de ${socios.length} en sistema)` : ''}
              </span>
              <span>Zoom: 100%</span>
            </div>
          </div>

          <div className="text-center pb-3 border-b-2 border-slate-800 mb-4 space-y-1">
            <h3 className="font-extrabold text-base tracking-wider uppercase text-slate-900">
              RADIO MÓVIL 15 DE ABRIL
            </h3>
            <h2 className="text-lg font-black text-slate-900 tracking-wide uppercase">
              Deudas Pendientes por Socio
            </h2>
            <p className="text-xs font-mono text-slate-700 font-semibold">
              A la fecha: <strong>{fechaHasta}</strong> | categoria: <strong>{selectedCategoria}</strong> | moneda: <strong>{selectedMoneda}</strong> | caja(s): <strong>{selectedCaja}</strong>
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[11px] text-left border-collapse border border-slate-400 font-mono">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-400">
                <tr className="divide-x divide-slate-300 text-center">
                  <th className="p-2 w-14 bg-slate-200 text-slate-900 font-sans">Interno</th>
                  <th className="p-2 text-left min-w-[130px] font-sans">Nombre Afiliado</th>
                  <th className="p-2">Sostenim.<br/>Retrasado</th>
                  <th className="p-2">Inasistenc.<br/>Reunión Bs</th>
                  <th className="p-2">Mantenim.<br/>GPS Julio</th>
                  <th className="p-2">Sostenim.<br/>Pandemia</th>
                  <th className="p-2">Interés<br/>Nuevo Bs</th>
                  <th className="p-2">Préstamo<br/>Nuevo Bs</th>
                  <th className="p-2">Colaborac.<br/>Int 25 Bs</th>
                  <th className="p-2">Promanten.<br/>Marzo Bs</th>
                  <th className="p-2">Guarda<br/>Barro Bs</th>
                  <th className="p-2">Llanta West<br/>Lake Bs</th>
                  <th className="p-2">Mantenim.<br/>GPS Marzo</th>
                  <th className="p-2 bg-red-100 font-extrabold text-red-900 font-sans">TOTAL DEUDA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredDeudas.length === 0 ? (
                  <tr>
                    <td colSpan="14" className="py-12 text-center text-slate-400">
                      <AlertTriangle className="w-10 h-10 mx-auto mb-2 text-slate-300 stroke-1" />
                      <p className="font-bold text-slate-700 text-sm">
                        {dataSource === 'real' && socios.length === 0 
                          ? 'Padrón de Socios en Cero (0 Registros en Sistema)'
                          : 'Sin registros de deudas pendientes para los filtros seleccionados'}
                      </p>
                      <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                        {dataSource === 'real' && socios.length === 0
                          ? 'El sistema está en blanco tras la puesta a cero. Al registrar nuevos afiliados en el Padrón y asignarles cuotas, aparecerán aquí automáticamente con sus números de interno reales.'
                          : 'No hay socios con saldos pendientes según los criterios actuales.'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredDeudas.map((row) => {
                    const rowTotal = row.retrasado + row.inasistencia + row.gpsJulio + row.pandemia + 
                      row.interes + row.prestamo + row.colaboracion + row.promanten + row.guardaBarro + 
                      row.llanta + row.gpsMarzo;

                    return (
                      <tr key={row.interno} className="divide-x divide-slate-200 hover:bg-red-50/50 transition">
                        <td className="p-1.5 text-center font-bold text-slate-900 bg-slate-50/80 font-sans">
                          {row.interno}
                        </td>
                        <td className="p-1.5 text-left font-sans font-semibold text-slate-800 truncate max-w-[150px]">
                          {row.nombre}
                        </td>
                        <td className="p-1.5 text-right">{row.retrasado.toFixed(1)}</td>
                        <td className="p-1.5 text-right text-rose-600 font-bold">{row.inasistencia.toFixed(1)}</td>
                        <td className="p-1.5 text-right">{row.gpsJulio.toFixed(1)}</td>
                        <td className="p-1.5 text-right font-semibold">{row.pandemia.toFixed(1)}</td>
                        <td className="p-1.5 text-right">{row.interes.toFixed(1)}</td>
                        <td className="p-1.5 text-right text-blue-700 font-bold">{row.prestamo.toFixed(1)}</td>
                        <td className="p-1.5 text-right">{row.colaboracion.toFixed(1)}</td>
                        <td className="p-1.5 text-right">{row.promanten.toFixed(1)}</td>
                        <td className="p-1.5 text-right">{row.guardaBarro.toFixed(1)}</td>
                        <td className="p-1.5 text-right">{row.llanta.toFixed(1)}</td>
                        <td className="p-1.5 text-right">{row.gpsMarzo.toFixed(1)}</td>
                        <td className="p-1.5 text-right font-black bg-red-50 text-red-900 font-sans">
                          {rowTotal.toFixed(1)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
              <tfoot className="bg-slate-100 font-bold border-t-2 border-slate-500 divide-x divide-slate-300">
                <tr className="text-right">
                  <td className="p-2 text-center text-slate-900 uppercase font-sans" colSpan={2}>
                    TOTALES ({filteredDeudas.length})
                  </td>
                  <td className="p-2">{totalsDeudas.retrasado.toFixed(1)}</td>
                  <td className="p-2 text-rose-700">{totalsDeudas.inasistencia.toFixed(1)}</td>
                  <td className="p-2">{totalsDeudas.gpsJulio.toFixed(1)}</td>
                  <td className="p-2 text-slate-900">{totalsDeudas.pandemia.toFixed(1)}</td>
                  <td className="p-2">{totalsDeudas.interes.toFixed(1)}</td>
                  <td className="p-2 text-blue-800">{totalsDeudas.prestamo.toFixed(1)}</td>
                  <td className="p-2">{totalsDeudas.colaboracion.toFixed(1)}</td>
                  <td className="p-2">{totalsDeudas.promanten.toFixed(1)}</td>
                  <td className="p-2">{totalsDeudas.guardaBarro.toFixed(1)}</td>
                  <td className="p-2">{totalsDeudas.llanta.toFixed(1)}</td>
                  <td className="p-2">{totalsDeudas.gpsMarzo.toFixed(1)}</td>
                  <td className="p-2 bg-red-200 text-red-950 text-xs font-black font-sans">
                    Bs {grandTotalDeudas.toFixed(1)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-300 flex justify-between items-center text-[10px] text-slate-500 font-mono">
            <span>Reporte: deudas_pendientes_por_socio.jrxml</span>
            <span>Generado por: admin33 • Sistema SISCOB</span>
            <span>Página 1 de 1</span>
          </div>
        </div>
      )}
    </div>
  );
}