import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Calendar, 
  DollarSign, 
  ChevronRight, 
  UserCheck, 
  Plus, 
  FileText,
  Clock,
  Car,
  QrCode
} from 'lucide-react';
import KardexModal from '../components/KardexModal';
import CredencialModal from '../components/CredencialModal';

export default function SociosPage({ socios, setSocios, onGoToCobranza, deudas }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('TODOS');
  const [selectedSocio, setSelectedSocio] = useState(null);
  const [isKardexModalOpen, setIsKardexModalOpen] = useState(false);
  const [isCredencialModalOpen, setIsCredencialModalOpen] = useState(false);

  // Helper para calcular antigüedad en "X Años Y Meses"
  const calcularAntiguedad = (fechaIngresoStr) => {
    if (!fechaIngresoStr) return '0 Meses';
    const [d, m, y] = fechaIngresoStr.split('/');
    const fechaIng = new Date(`${y}-${m}-${d}`);
    const hoy = new Date();
    let anos = hoy.getFullYear() - fechaIng.getFullYear();
    let meses = hoy.getMonth() - fechaIng.getMonth();
    if (meses < 0) {
      anos--;
      meses += 12;
    }
    if (anos <= 0) return `${meses} Meses`;
    return `${anos} Años ${meses} Meses`;
  };

  const filteredSocios = socios.filter((s) => {
    const matchesSearch = 
      `${s.nombres} ${s.apPaterno} ${s.apMaterno} ${s.ci} ${s.id}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategoria === 'TODOS' || s.categoria === selectedCategoria;
    return matchesSearch && matchesCat;
  });

  const handleOpenKardex = (socio) => {
    setSelectedSocio(socio);
    setIsKardexModalOpen(true);
  };

  const handleOpenCredencial = (socio) => {
    setSelectedSocio(socio);
    setIsCredencialModalOpen(true);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-4">
      {/* Header Bar */}
      <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-xs gap-3">
        <div>
          <h1 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
            <Users className="w-5 h-5 text-red-700" />
            <span>Padrón General de Socios e Inquilinos</span>
          </h1>
          <p className="text-xs text-slate-500">Gestión de membresías, credenciales con QR, antigüedad y extractos de cuenta</p>
        </div>
        <div className="flex space-x-2">
          <span className="bg-red-50 text-red-800 text-xs font-extrabold px-3 py-1.5 rounded-xl border border-red-200">
            {filteredSocios.length} Afiliados Registrados
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap justify-between items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, CI o número de interno/móvil..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedCategoria}
            onChange={(e) => setSelectedCategoria(e.target.value)}
            className="p-2 border border-slate-300 rounded-xl font-bold text-slate-700 focus:outline-none"
          >
            <option value="TODOS">TODAS LAS CATEGORÍAS</option>
            <option value="Propietario">Propietario</option>
            <option value="Inquilino">Inquilino / Relevo</option>
            <option value="Conductores">Conductores</option>
          </select>
        </div>
      </div>

      {/* Socios Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100">
              <tr>
                <th className="p-3">Móvil</th>
                <th className="p-3">Socio Afiliado</th>
                <th className="p-3">C.I. / Teléfono</th>
                <th className="p-3">Fecha Ingreso</th>
                <th className="p-3">Antigüedad Exacta</th>
                <th className="p-3">Categoría</th>
                <th className="p-3 text-center">Estado</th>
                <th className="p-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredSocios.map((s) => {
                const antiguedad = calcularAntiguedad(s.fechaIngreso);
                return (
                  <tr key={s.id} className="hover:bg-slate-50 transition">
                    <td className="p-3">
                      <span className="bg-slate-900 text-white font-mono font-bold px-2 py-1 rounded-lg text-xs">
                        #{s.id}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="font-black text-slate-900">{s.nombres} {s.apPaterno} {s.apMaterno}</div>
                      <span className="text-[10px] text-slate-400">{s.observaciones}</span>
                    </td>
                    <td className="p-3">
                      <div className="font-mono text-slate-700 font-bold">{s.ci}</div>
                      <span className="text-[10px] text-slate-400">{s.celular || 'Sin celular'}</span>
                    </td>
                    <td className="p-3 font-mono text-slate-600">{s.fechaIngreso}</td>
                    <td className="p-3">
                      <span className="bg-blue-50 text-blue-800 text-[11px] font-bold px-2 py-0.5 rounded-full border border-blue-200">
                        {antiguedad}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-slate-700">{s.categoria}</td>
                    <td className="p-3 text-center">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                        VIGENTE
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end space-x-1.5">
                        <button
                          onClick={() => handleOpenCredencial(s)}
                          className="flex items-center space-x-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 px-2 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer"
                          title="Imprimir Credencial / Carnet con QR"
                        >
                          <QrCode className="w-3.5 h-3.5 text-amber-700" />
                          <span>Carnet</span>
                        </button>
                        <button
                          onClick={() => handleOpenKardex(s)}
                          className="flex items-center space-x-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer"
                          title="Ver Kardex / Extracto de Cuenta"
                        >
                          <FileText className="w-3.5 h-3.5 text-blue-600" />
                          <span>Kardex</span>
                        </button>
                        <button
                          onClick={() => onGoToCobranza(s.id)}
                          className="flex items-center space-x-1 bg-red-700 hover:bg-red-800 text-white px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer shadow-xs"
                          title="Cobrar en Ventanilla"
                        >
                          <DollarSign className="w-3.5 h-3.5" />
                          <span>Cobrar</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <KardexModal
        isOpen={isKardexModalOpen}
        onClose={() => setIsKardexModalOpen(false)}
        socio={selectedSocio}
        deudas={deudas}
      />

      <CredencialModal
        isOpen={isCredencialModalOpen}
        onClose={() => setIsCredencialModalOpen(false)}
        socio={selectedSocio}
      />
    </div>
  );
}