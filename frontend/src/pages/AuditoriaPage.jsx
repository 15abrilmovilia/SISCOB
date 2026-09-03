import React, { useState } from 'react';
import { ShieldCheck, Search, Filter, AlertTriangle, CheckCircle2, Clock, UserCheck, Printer, RefreshCw } from 'lucide-react';

export default function AuditoriaPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState('TODOS');

  const logs = [
    { id: 104, fecha: '02/09/2026 18:45', operador: 'admin33', rol: 'ADMIN', tipo: 'COBRO', detalle: 'Cobro de cuota mensual Bs 400.00 a Socio #20 (Remberto Torrico) - Recibo N° 1084', estado: 'EXITOSO' },
    { id: 103, fecha: '02/09/2026 17:30', operador: 'daniela', rol: 'CAJERO', tipo: 'COBRO', detalle: 'Cobro de cuota sostenimiento Bs 400.00 a Socio #7 (Fermín Arellano) - Recibo N° 1083', estado: 'EXITOSO' },
    { id: 102, fecha: '02/09/2026 16:15', operador: 'daniela', rol: 'CAJERO', tipo: 'EGRESO', detalle: 'Pago combustible móvil auxilio Bs 150.00 a favor de Chofer Guardia - Boleta N° 402', estado: 'EXITOSO' },
    { id: 101, fecha: '02/09/2026 15:10', operador: 'admin33', rol: 'ADMIN', tipo: 'CONFIG', detalle: 'Ajuste de Tipo de Cambio de Cobro a 1 $us = 9.80 Bs', estado: 'REGISTRADO' },
    { id: 100, fecha: '02/09/2026 14:05', operador: 'carlos', rol: 'CAJERO', tipo: 'INTENTO_ANULACION', detalle: 'Intento de anulación de recibo N° 1079 sin privilegios de administrador', estado: 'BLOQUEADO' },
    { id: 99, fecha: '02/09/2026 12:00', operador: 'daniela', rol: 'CAJERO', tipo: 'ARQUEO', detalle: 'Cierre y arqueo de caja turno mañana: Gaveta cuadrada exacta en Bs 8,530.00', estado: 'EXITOSO' },
    { id: 98, fecha: '01/09/2026 18:00', operador: 'admin33', rol: 'ADMIN', tipo: 'MASIVO', detalle: 'Asignación masiva de Cuota Sostenimiento Septiembre a 180 socios', estado: 'EXITOSO' },
  ];

  const filteredLogs = logs.filter(l => {
    const matchSearch = `${l.operador} ${l.detalle}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTipo = filterTipo === 'TODOS' || l.tipo === filterTipo;
    return matchSearch && matchTipo;
  });

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-4 animate-fadeIn">
      <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-xs gap-3">
        <div>
          <h1 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-red-700" />
            <span>Bitácora de Auditoría y Seguridad del Sistema</span>
          </h1>
          <p className="text-xs text-slate-500">Registro cronológico inmutable de operaciones, cobros, egresos y accesos</p>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Imprimir Bitácora</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap justify-between items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por operador, socio o detalle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterTipo}
            onChange={(e) => setFilterTipo(e.target.value)}
            className="p-2 border border-slate-300 rounded-xl font-bold text-slate-700"
          >
            <option value="TODOS">TODAS LAS OPERACIONES</option>
            <option value="COBRO">Cobros de Ventanilla</option>
            <option value="EGRESO">Egresos y Gastos</option>
            <option value="ARQUEO">Arqueos y Cortes de Caja</option>
            <option value="INTENTO_ANULACION">Intentos de Anulación</option>
            <option value="CONFIG">Cambios de Configuración</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100">
              <tr>
                <th className="p-3">ID / Fecha y Hora</th>
                <th className="p-3">Operador / Rol</th>
                <th className="p-3">Tipo Operación</th>
                <th className="p-3">Detalle de la Acción</th>
                <th className="p-3 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="p-3">
                    <span className="font-mono font-bold text-slate-800 block">#{log.id}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{log.fecha}</span>
                  </td>
                  <td className="p-3">
                    <div className="font-bold text-slate-900">{log.operador}</div>
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                      log.rol === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {log.rol}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="bg-slate-100 text-slate-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-slate-200">
                      {log.tipo}
                    </span>
                  </td>
                  <td className="p-3 text-slate-700 font-medium max-w-md">
                    {log.detalle}
                  </td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      log.estado === 'EXITOSO' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : log.estado === 'BLOQUEADO' 
                        ? 'bg-rose-100 text-rose-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {log.estado}
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