import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoginScreen from './components/LoginScreen';
import ArqueoCajaModal from './components/ArqueoCajaModal';
import DashboardPage from './pages/DashboardPage';
import SociosPage from './pages/SociosPage';
import CuotasPage from './pages/CuotasPage';
import CobranzasPage from './pages/CobranzasPage';
import EgresosPage from './pages/EgresosPage';
import PrestamosPage from './pages/PrestamosPage';
import WorkflowCierrePage from './pages/WorkflowCierrePage';
import BalancePage from './pages/BalancePage';
import AlmacenPage from './pages/AlmacenPage';
import ReportesPage from './pages/ReportesPage';
import ConciliacionPage from './pages/ConciliacionPage';
import AuditoriaPage from './pages/AuditoriaPage';
import FichaTecnicaPage from './pages/FichaTecnicaPage';
import ConfigPage from './pages/ConfigPage';
import UsuariosRolesPage from './pages/UsuariosRolesPage';
import NewSocioModal from './components/NewSocioModal';
import ReiniciarSistemaModal from './components/ReiniciarSistemaModal';

import { 
  INITIAL_SOCIOS, 
  INITIAL_DEUDAS, 
  INITIAL_CAJAS, 
  INITIAL_EGRESOS,
  INITIAL_PRESTAMOS,
  INITIAL_RECIBOS,
  INITIAL_USERS,
  INITIAL_ROLES
} from './data/mockData';

import { 
  loadFromStorage, 
  saveToStorage, 
  exportBackupData, 
  importBackupFile, 
  STORAGE_KEYS 
} from './utils/storage';

import { 
  getSociosAPI, 
  createSocioAPI, 
  updateSocioAPI,
  getCajasAPI, 
  getDeudasAPI, 
  getEgresosAPI,
  getUsuariosAPI,
  resetSistemaAPI
} from './utils/api';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => 
    loadFromStorage(STORAGE_KEYS.USER, null)
  );

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [socios, setSocios] = useState(() => loadFromStorage(STORAGE_KEYS.SOCIOS, INITIAL_SOCIOS));
  const [deudas, setDeudas] = useState(() => loadFromStorage(STORAGE_KEYS.DEUDAS, INITIAL_DEUDAS));
  const [cajas, setCajas] = useState(() => loadFromStorage(STORAGE_KEYS.CAJAS, INITIAL_CAJAS));
  const [egresos, setEgresos] = useState(() => loadFromStorage(STORAGE_KEYS.EGRESOS, INITIAL_EGRESOS));
  const [prestamos, setPrestamos] = useState(() => loadFromStorage(STORAGE_KEYS.PRESTAMOS, INITIAL_PRESTAMOS));
  const [recibos, setRecibos] = useState(() => loadFromStorage(STORAGE_KEYS.RECIBOS, INITIAL_RECIBOS));
  const [usuarios, setUsuarios] = useState(() => loadFromStorage(STORAGE_KEYS.USUARIOS, INITIAL_USERS));
  const [roles, setRoles] = useState(() => loadFromStorage(STORAGE_KEYS.ROLES, INITIAL_ROLES));

  // Persistir cambios en préstamos
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PRESTAMOS, prestamos);
  }, [prestamos]);

  // Persistir cambios en recibos
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.RECIBOS, recibos);
  }, [recibos]);

  // Sync with Supabase on mount
  useEffect(() => {
    async function syncCloud() {
      try {
        const [cloudSocios, cloudCajas, cloudDeudas, cloudEgresos, cloudUsuarios] = await Promise.all([
          getSociosAPI(),
          getCajasAPI(),
          getDeudasAPI(),
          getEgresosAPI(),
          getUsuariosAPI()
        ]);
        if (Array.isArray(cloudSocios)) setSocios(cloudSocios);
        if (Array.isArray(cloudCajas) && cloudCajas.length > 0) setCajas(cloudCajas);
        if (Array.isArray(cloudDeudas)) setDeudas(cloudDeudas);
        if (Array.isArray(cloudEgresos)) setEgresos(cloudEgresos);
        if (Array.isArray(cloudUsuarios) && cloudUsuarios.length > 0) setUsuarios(cloudUsuarios);
      } catch (err) {
        console.warn('Sync fallback local:', err);
      }
    }
    syncCloud();
  }, []);

  const [preselectedSocioId, setPreselectedSocioId] = useState(20);
  const [printMode, setPrintMode] = useState('termico');
  const [isNewSocioModalOpen, setIsNewSocioModalOpen] = useState(false);
  const [isArqueoModalOpen, setIsArqueoModalOpen] = useState(false);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SOCIOS, socios);
  }, [socios]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.DEUDAS, deudas);
  }, [deudas]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CAJAS, cajas);
  }, [cajas]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.EGRESOS, egresos);
  }, [egresos]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.USUARIOS, usuarios);
  }, [usuarios]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ROLES, roles);
  }, [roles]);

  useEffect(() => {
    if (currentUser) {
      saveToStorage(STORAGE_KEYS.USER, currentUser);
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleExportBackup = () => {
    exportBackupData({ 
      socios, 
      deudas, 
      cajas, 
      egresos, 
      prestamos,
      recibos: loadFromStorage(STORAGE_KEYS.RECIBOS, []),
      usuarios, 
      roles 
    });
  };

  const handleImportBackup = (file) => {
    importBackupFile(
      file,
      (data) => {
        if (data.socios) setSocios(data.socios);
        if (data.deudas) setDeudas(data.deudas);
        if (data.cajas) setCajas(data.cajas);
        if (data.egresos) setEgresos(data.egresos);
        if (data.prestamos) setPrestamos(data.prestamos);
        if (data.usuarios) setUsuarios(data.usuarios);
        if (data.roles) setRoles(data.roles);
        alert('Datos restaurados correctamente desde el respaldo.');
      },
      (error) => {
        alert(`Error al importar respaldo: ${error}`);
      }
    );
  };

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleConfirmResetSystem = async ({ saldoCajaGeneral = 0, saldoCajaGPS = 0 }) => {
    // 1. Limpieza de datos en memoria local
    setSocios([]);
    setDeudas([]);
    setEgresos([]);
    setPrestamos([]);
    setRecibos([]);

    const nuevasCajas = (cajas && cajas.length > 0 ? cajas : INITIAL_CAJAS).map(c => {
      let saldo = 0;
      if (c.id === 'c1') saldo = saldoCajaGeneral;
      if (c.id === 'c2') saldo = saldoCajaGPS;
      return {
        ...c,
        saldoAnterior: saldo,
        ingresos: 0.00,
        egresos: 0.00,
        saldoActual: saldo
      };
    });
    setCajas(nuevasCajas);

    // 2. Guardar en almacenamiento local
    saveToStorage(STORAGE_KEYS.SOCIOS, []);
    saveToStorage(STORAGE_KEYS.DEUDAS, []);
    saveToStorage(STORAGE_KEYS.EGRESOS, []);
    saveToStorage(STORAGE_KEYS.PRESTAMOS, []);
    saveToStorage(STORAGE_KEYS.RECIBOS, []);
    saveToStorage(STORAGE_KEYS.CAJAS, nuevasCajas);

    // 3. Ejecutar reinicio real en Supabase (PostgreSQL) a través de Railway
    try {
      await resetSistemaAPI({ saldoCajaGeneral, saldoCajaGPS });
    } catch (apiErr) {
      console.warn('[SISCOB] Aviso al resetear en nube:', apiErr.message);
    }

    setActiveTab('socios');
  };

  const handleGoToCobranza = (socioId) => {
    setPreselectedSocioId(socioId);
    setActiveTab('cobranzas');
  };

  const handleSaveSocio = async (newData) => {
    const assignedId = newData.customId ? parseInt(newData.customId) : (Math.max(...socios.map(s => s.id), 0) + 1);
    const newSocioPayload = {
      nombres: newData.nombres,
      apPaterno: newData.apPaterno,
      apMaterno: newData.apMaterno || '',
      ci: newData.ci,
      celular: newData.celular || '',
      placa: newData.placa || '',
      vehiculo: newData.vehiculo || '',
      fechaIngreso: newData.fechaIngreso,
      estado: "VIG",
      categoria: newData.categoria,
      observaciones: newData.observaciones || "Nuevo afiliado registrado"
    };

    // Guardar en Supabase a través de Railway
    const createdRemote = await createSocioAPI(newSocioPayload);
    const finalSocio = {
      id: createdRemote?.id || assignedId,
      ...newSocioPayload,
      ...(createdRemote || {}),
      acciones: [{ id: `10${assignedId}`, fecha: newSocioPayload.fechaIngreso, monto: 0.0, estado: "VIG", categoria: newSocioPayload.categoria }],
      obligaciones: []
    };

    if (newData.cuotaSostenimiento) {
      finalSocio.obligaciones.push({ nombre: "Sostenimiento", monto: 400.0, periodicidad: "Mensual" });
    }
    if (newData.cuotaGPS) {
      finalSocio.obligaciones.push({ nombre: "Mantenimiento GPS", monto: 80.0, periodicidad: "Mensual" });
    }

    setSocios(prev => [finalSocio, ...prev.filter(s => s.id !== finalSocio.id)]);
  };

  const handleUpdateSocio = async (updatedSocio) => {
    setSocios(prev => prev.map(s => s.id === updatedSocio.id ? updatedSocio : s));
    try {
      await updateSocioAPI(updatedSocio.id, updatedSocio);
    } catch (err) {
      console.warn('Error al actualizar socio remotamente:', err);
    }
  };

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} usuarios={usuarios} roles={roles} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-800">
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        onLogout={handleLogout}
        currentUser={currentUser}
        roles={roles}
      />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'lg:pl-64' : 'pl-0'}`}>
        <Header 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          printMode={printMode}
          setPrintMode={setPrintMode}
          setActiveTab={setActiveTab}
          currentUser={currentUser}
          onLogout={handleLogout}
          onExportBackup={handleExportBackup}
          onImportBackup={handleImportBackup}
          onOpenArqueoModal={() => setIsArqueoModalOpen(true)}
          onOpenResetModal={() => setIsResetModalOpen(true)}
        />

        <main className="flex-1 py-4">
          {activeTab === 'dashboard' && (
            <DashboardPage 
              setActiveTab={setActiveTab}
              onOpenNewSocioModal={() => setIsNewSocioModalOpen(true)}
              cajas={cajas}
              socios={socios}
              deudas={deudas}
              egresos={egresos}
              currentUser={currentUser}
              onGoToCobranza={handleGoToCobranza}
            />
          )}
          {activeTab === 'socios' && (
            <SociosPage 
              socios={socios} 
              setSocios={setSocios} 
              onGoToCobranza={handleGoToCobranza}
              deudas={deudas}
              setDeudas={setDeudas}
              onOpenNewSocioModal={() => setIsNewSocioModalOpen(true)}
              onUpdateSocio={handleUpdateSocio}
            />
          )}
          {activeTab === 'cuotas' && (
            <CuotasPage 
              socios={socios} 
              deudas={deudas}
              setDeudas={setDeudas}
            />
          )}
          {activeTab === 'cobranzas' && (
            <CobranzasPage 
              socios={socios}
              deudas={deudas}
              setDeudas={setDeudas}
              cajas={cajas}
              setCajas={setCajas}
              preselectedSocioId={preselectedSocioId}
              printMode={printMode}
              recibos={recibos}
              setRecibos={setRecibos}
            />
          )}
          {activeTab === 'egresos' && (
            <EgresosPage 
              egresos={egresos} 
              setEgresos={setEgresos} 
              cajas={cajas} 
              setCajas={setCajas} 
              socios={socios}
            />
          )}
          {activeTab === 'prestamos' && (
            <PrestamosPage 
              socios={socios}
              cajas={cajas}
              setCajas={setCajas}
              egresos={egresos}
              setEgresos={setEgresos}
              deudas={deudas}
              setDeudas={setDeudas}
              prestamos={prestamos}
              setPrestamos={setPrestamos}
              currentUser={currentUser}
            />
          )}
          {activeTab === 'workflow' && (
            <WorkflowCierrePage />
          )}
          {activeTab === 'balance' && (
            <BalancePage 
              cajas={cajas}
              egresos={egresos}
              socios={socios}
              currentUser={currentUser}
            />
          )}
          {activeTab === 'almacen' && (
            <AlmacenPage />
          )}
          {activeTab === 'reportes' && (
            <ReportesPage 
              socios={socios} 
              deudas={deudas} 
              cajas={cajas} 
              egresos={egresos} 
              prestamos={prestamos}
            />
          )}
          {activeTab === 'conciliacion' && (
            <ConciliacionPage 
              socios={socios}
              deudas={deudas}
              setDeudas={setDeudas}
              cajas={cajas}
              setCajas={setCajas}
              currentUser={currentUser}
            />
          )}
          {activeTab === 'auditoria' && (
            <AuditoriaPage />
          )}
          {activeTab === 'ficha' && (
            <FichaTecnicaPage />
          )}
          {activeTab === 'config' && (
            <ConfigPage 
              printMode={printMode}
              setPrintMode={setPrintMode}
              currentUser={currentUser}
            />
          )}
          {activeTab === 'usuarios' && (
            <UsuariosRolesPage 
              usuarios={usuarios}
              setUsuarios={setUsuarios}
              roles={roles}
              setRoles={setRoles}
              currentUser={currentUser}
            />
          )}
        </main>

        <footer className="bg-white text-slate-400 py-3 text-center text-xs border-t border-slate-200 no-print">
          <span>RADIO MÓVIL 15 DE ABRIL • <strong>SISCOB</strong> (Sistema de Cobranza de Socios) • Versión 1.0</span>
        </footer>
      </div>

      <NewSocioModal 
        isOpen={isNewSocioModalOpen}
        onClose={() => setIsNewSocioModalOpen(false)}
        onSave={handleSaveSocio}
      />

      <ArqueoCajaModal
        isOpen={isArqueoModalOpen}
        onClose={() => setIsArqueoModalOpen(false)}
        cajas={cajas}
        currentUser={currentUser}
      />

      <ReiniciarSistemaModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirmReset={handleConfirmResetSystem}
        onExportBackup={handleExportBackup}
      />
    </div>
  );
}