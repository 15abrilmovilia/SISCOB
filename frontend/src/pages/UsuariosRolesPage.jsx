import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Shield, 
  ShieldCheck, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  KeyRound, 
  CheckCircle2, 
  XCircle, 
  Phone, 
  Mail, 
  Lock, 
  Sliders, 
  CheckSquare, 
  Square, 
  Save, 
  UserPlus, 
  MessageSquare, 
  FileSpreadsheet, 
  Info 
} from 'lucide-react';
import { ALL_SYSTEM_MODULES } from '../data/mockData';
import NewUserModal from '../components/NewUserModal';
import EditUserModal from '../components/EditUserModal';

export default function UsuariosRolesPage({ 
  usuarios = [], 
  setUsuarios, 
  roles = [], 
  setRoles, 
  currentUser 
}) {
  const [activeTab, setActiveTab] = useState('usuarios'); // 'usuarios' | 'roles'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRol, setFilterRol] = useState('TODOS');
  const [filterEstado, setFilterEstado] = useState('TODOS');
  
  // Modales
  const [isNewUserOpen, setIsNewUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Rol seleccionado para edición de permisos
  const [selectedRolId, setSelectedRolId] = useState(roles[0]?.id || 'admin');
  const [rolEditDraft, setRolEditDraft] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Seleccionar rol y clonar para editar
  const activeRol = useMemo(() => {
    return roles.find(r => r.id === selectedRolId) || roles[0];
  }, [roles, selectedRolId]);

  // Sincronizar borrador de permisos cuando cambia el rol seleccionado
  React.useEffect(() => {
    if (activeRol) {
      setRolEditDraft({
        ...activeRol,
        modulos: [...(activeRol.modulos || [])],
        permisos: { ...(activeRol.permisos || { ver: true, crear: false, editar: false, anular: false, exportar: false }) }
      });
    }
  }, [activeRol]);

  // KPIs
  const totalUsuarios = usuarios.length;
  const activosCount = usuarios.filter(u => u.estado === 'ACTIVO').length;
  const inactivosCount = totalUsuarios - activosCount;
  const totalRoles = roles.length;

  // Filtrado de usuarios
  const filteredUsers = useMemo(() => {
    return usuarios.filter(u => {
      const matchSearch = searchTerm === '' || 
        u.nombreCompleto?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.usuario?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.celular?.includes(searchTerm);

      const matchRol = filterRol === 'TODOS' || u.rolId === filterRol;
      const matchEstado = filterEstado === 'TODOS' || u.estado === filterEstado;

      return matchSearch && matchRol && matchEstado;
    });
  }, [usuarios, searchTerm, filterRol, filterEstado]);

  // Handlers para Usuarios
  const handleCreateUser = (newUser) => {
    setUsuarios(prev => [newUser, ...prev]);
    showToast(`Usuario @${newUser.usuario} creado exitosamente.`);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsuarios(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    showToast(`Usuario @${updatedUser.usuario} actualizado correctamente.`);
  };

  const handleToggleEstado = (user) => {
    if (user.id === currentUser?.id || user.usuario === currentUser?.id) {
      alert('No puedes desactivar tu propia cuenta en sesión activa.');
      return;
    }
    const nuevoEstado = user.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
    const updated = { ...user, estado: nuevoEstado };
    setUsuarios(prev => prev.map(u => u.id === user.id ? updated : u));
    showToast(`Usuario @${user.usuario} ahora está ${nuevoEstado}.`);
  };

  const handleDeleteUser = (user) => {
    if (user.id === currentUser?.id || user.usuario === currentUser?.id) {
      alert('No puedes eliminar la cuenta actualmente en uso.');
      return;
    }
    if (user.usuario === 'admin33' || user.rolId === 'admin') {
      const confirmSuper = window.confirm(`ATENCIÓN: @${user.usuario} tiene rol de Administrador Central. ¿Confirma la eliminación definitiva?`);
      if (!confirmSuper) return;
    } else {
      const confirmDelete = window.confirm(`¿Está seguro de eliminar al usuario @${user.usuario} (${user.nombreCompleto})?`);
      if (!confirmDelete) return;
    }

    setUsuarios(prev => prev.filter(u => u.id !== user.id));
    showToast(`Usuario @${user.usuario} eliminado del sistema.`);
  };

  const handleSendWhatsAppCredenciales = (user) => {
    if (!user.celular) {
      alert(`El usuario @${user.usuario} no tiene número de teléfono registrado.`);
      return;
    }
    const cleanPhone = user.celular.replace(/\D/g, '');
    const phone = cleanPhone.startsWith('591') ? cleanPhone : `591${cleanPhone}`;
    const rolName = roles.find(r => r.id === user.rolId)?.nombre || user.rolId;
    const msg = encodeURIComponent(
      `Estimado(a) ${user.nombreCompleto}, le enviamos sus credenciales de acceso al SISCOB (Radio Móvil 15 de Abril):\n\n` +
      `👤 *Usuario:* ${user.usuario}\n` +
      `🛡️ *Rol:* ${rolName}\n` +
      `🌐 *Sistema:* https://siscob-production.up.railway.app/\n\n` +
      `Por seguridad, recuerde cambiar su contraseña al iniciar sesión.`
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  // Handlers para Matriz de Roles
  const handleToggleModuloInDraft = (moduloId) => {
    if (!rolEditDraft) return;
    const exists = rolEditDraft.modulos?.includes(moduloId);
    let newModulos;
    if (exists) {
      newModulos = rolEditDraft.modulos.filter(m => m !== moduloId);
    } else {
      newModulos = [...(rolEditDraft.modulos || []), moduloId];
    }
    setRolEditDraft(prev => ({ ...prev, modulos: newModulos }));
  };

  const handleTogglePermisoGranular = (permKey) => {
    if (!rolEditDraft) return;
    setRolEditDraft(prev => ({
      ...prev,
      permisos: {
        ...prev.permisos,
        [permKey]: !prev.permisos?.[permKey]
      }
    }));
  };

  const handleSaveRolPermissions = () => {
    if (!rolEditDraft) return;
    setRoles(prev => prev.map(r => r.id === rolEditDraft.id ? rolEditDraft : r));
    showToast(`Permisos del rol "${rolEditDraft.nombre}" actualizados correctamente.`);
  };

  const showToast = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Toast Notification */}
      {successMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-emerald-500/50 flex items-center space-x-3 text-xs font-bold animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* 1. Cabecera Ejecutiva */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 bg-red-100 text-red-800 text-[10px] font-black rounded-full uppercase tracking-wider">
              Control de Acceso & Seguridad RBAC
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-slate-500 text-xs font-medium">Radio Móvil 15 de Abril</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1 flex items-center space-x-2.5">
            <ShieldCheck className="w-7 h-7 text-red-700" />
            <span>USUARIOS Y ROLES DE ACCESO</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Administración de operadores, cajeros, directiva y matriz de permisos por módulo
          </p>
        </div>

        {/* Botones de acción principales */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setIsNewUserOpen(true)}
            className="flex items-center space-x-2 bg-red-700 hover:bg-red-800 text-white px-4 py-2.5 rounded-xl text-xs font-black shadow-md transition cursor-pointer transform hover:-translate-y-0.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ NUEVO USUARIO</span>
          </button>
        </div>
      </div>

      {/* 2. Tarjetas KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-1">
            <span>TOTAL USUARIOS</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{totalUsuarios}</div>
          <div className="text-[11px] text-emerald-700 font-bold mt-1">
            {activosCount} activos • {inactivosCount} inactivos
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-1">
            <span>ROLES DEFINIDOS</span>
            <Shield className="w-4 h-4 text-red-700" />
          </div>
          <div className="text-2xl font-black text-slate-900">{totalRoles}</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Admin, Cajero, Hacienda, Operador
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-1">
            <span>OPERADORES CAJA</span>
            <KeyRound className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {usuarios.filter(u => u.rolId === 'cajero').length}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Cobranza en ventanilla
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-1">
            <span>TU SESIÓN ACTUAL</span>
            <Lock className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-sm font-black text-slate-900 truncate">
            {currentUser?.nombre || 'Administrador Central'}
          </div>
          <div className="text-[11px] text-red-700 font-bold mt-1 uppercase">
            Rol: {currentUser?.rol || 'admin'}
          </div>
        </div>
      </div>

      {/* 3. Selector de Pestañas Principales */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('usuarios')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-black transition cursor-pointer ${
            activeTab === 'usuarios'
              ? 'bg-red-700 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>USUARIOS DEL SISTEMA ({totalUsuarios})</span>
        </button>

        <button
          onClick={() => setActiveTab('roles')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-black transition cursor-pointer ${
            activeTab === 'roles'
              ? 'bg-red-700 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>MATRIZ DE ROLES Y PERMISOS ({totalRoles})</span>
        </button>
      </div>

      {/* 4. CONTENIDO PESTAÑA 1: GESTIÓN DE USUARIOS */}
      {activeTab === 'usuarios' && (
        <div className="space-y-4">
          
          {/* Barra de Filtros y Búsqueda */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            {/* Buscador */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre, usuario (@login), celular o correo..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
              />
            </div>

            {/* Filtro por Rol */}
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-500">Rol:</span>
              <select
                value={filterRol}
                onChange={(e) => setFilterRol(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="TODOS">Todos los Roles</option>
                {roles.map(r => (
                  <option key={r.id} value={r.id}>{r.nombre}</option>
                ))}
              </select>
            </div>

            {/* Filtro por Estado */}
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-500">Estado:</span>
              <select
                value={filterEstado}
                onChange={(e) => setFilterEstado(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="TODOS">Todos</option>
                <option value="ACTIVO">Activos</option>
                <option value="INACTIVO">Inactivos</option>
              </select>
            </div>
          </div>

          {/* Tabla de Usuarios */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-600 font-extrabold text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-4">Operador / Usuario</th>
                    <th className="py-3 px-4">Rol Asignado</th>
                    <th className="py-3 px-4">Contacto / Notificación</th>
                    <th className="py-3 px-4">Alta & Último Acceso</th>
                    <th className="py-3 px-4 text-center">Estado</th>
                    <th className="py-3 px-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-slate-400">
                        <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
                        <p className="font-bold text-sm">No se encontraron usuarios</p>
                        <p className="text-xs mt-0.5">Intente cambiar los filtros o cree un nuevo usuario</p>
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => {
                      const userRol = roles.find(r => r.id === user.rolId);
                      const isSelf = user.id === currentUser?.id || user.usuario === currentUser?.id;
                      const isActivo = user.estado === 'ACTIVO';

                      return (
                        <tr key={user.id} className="hover:bg-slate-50/80 transition group">
                          
                          {/* Usuario & Nombre */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center space-x-3">
                              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs text-white shadow-xs ${
                                user.rolId === 'admin' ? 'bg-red-700' :
                                user.rolId === 'hacienda' ? 'bg-emerald-700' :
                                user.rolId === 'cajero' ? 'bg-blue-600' : 'bg-slate-700'
                              }`}>
                                {user.nombreCompleto ? user.nombreCompleto.charAt(0) : user.usuario.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-black text-slate-900 text-xs flex items-center space-x-1.5">
                                  <span>{user.nombreCompleto}</span>
                                  {isSelf && (
                                    <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[9px] font-extrabold rounded-md">
                                      TÚ
                                    </span>
                                  )}
                                </div>
                                <div className="font-mono text-red-700 text-[11px] font-bold">
                                  @{user.usuario}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Rol */}
                          <td className="py-3.5 px-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wide border ${
                              user.rolId === 'admin' 
                                ? 'bg-red-50 text-red-800 border-red-200' 
                                : user.rolId === 'hacienda'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : user.rolId === 'cajero'
                                ? 'bg-blue-50 text-blue-800 border-blue-200'
                                : 'bg-slate-100 text-slate-700 border-slate-200'
                            }`}>
                              <Shield className="w-3 h-3 mr-1" />
                              {userRol?.nombre || user.rolId}
                            </span>
                          </td>

                          {/* Contacto */}
                          <td className="py-3.5 px-4">
                            <div className="space-y-0.5">
                              {user.celular && (
                                <div className="flex items-center space-x-1.5 text-slate-700 font-bold text-xs">
                                  <Phone className="w-3 h-3 text-slate-400" />
                                  <span>{user.celular}</span>
                                </div>
                              )}
                              {user.email && (
                                <div className="flex items-center space-x-1.5 text-slate-500 text-[11px]">
                                  <Mail className="w-3 h-3 text-slate-400" />
                                  <span className="truncate max-w-[180px]">{user.email}</span>
                                </div>
                              )}
                              {!user.celular && !user.email && (
                                <span className="text-slate-400 italic text-[11px]">Sin datos de contacto</span>
                              )}
                            </div>
                          </td>

                          {/* Alta & Último acceso */}
                          <td className="py-3.5 px-4">
                            <div className="text-[11px]">
                              <span className="text-slate-500 block font-medium">
                                Creado: {user.fechaCreacion || '10/01/2025'}
                              </span>
                              <span className="text-slate-700 font-bold block">
                                Último: {user.ultimoAcceso || 'Hoy'}
                              </span>
                            </div>
                          </td>

                          {/* Estado */}
                          <td className="py-3.5 px-4 text-center">
                            <button
                              onClick={() => handleToggleEstado(user)}
                              disabled={isSelf}
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black transition cursor-pointer ${
                                isActivo
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                  : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                              } ${isSelf ? 'opacity-60 cursor-not-allowed' : ''}`}
                              title={isSelf ? 'No puedes desactivar tu propia cuenta' : 'Clic para cambiar estado'}
                            >
                              {isActivo ? (
                                <>
                                  <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                                  <span>ACTIVO</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-3 h-3 mr-1 text-rose-600" />
                                  <span>INACTIVO</span>
                                </>
                              )}
                            </button>
                          </td>

                          {/* Acciones */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end space-x-1.5">
                              {/* WhatsApp Credenciales */}
                              {user.celular && (
                                <button
                                  onClick={() => handleSendWhatsAppCredenciales(user)}
                                  className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg transition cursor-pointer"
                                  title="Enviar credenciales por WhatsApp"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                </button>
                              )}

                              {/* Editar Usuario */}
                              <button
                                onClick={() => {
                                  setSelectedUser(user);
                                  setIsEditUserOpen(true);
                                }}
                                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition cursor-pointer"
                                title="Editar perfil y contraseña"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              {/* Eliminar Usuario */}
                              <button
                                onClick={() => handleDeleteUser(user)}
                                disabled={isSelf}
                                className={`p-1.5 rounded-lg transition ${
                                  isSelf 
                                    ? 'bg-slate-50 text-slate-300 cursor-not-allowed' 
                                    : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 cursor-pointer'
                                }`}
                                title={isSelf ? 'No puedes eliminar tu cuenta' : 'Eliminar usuario'}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 5. CONTENIDO PESTAÑA 2: MATRIZ DE ROLES Y PERMISOS */}
      {activeTab === 'roles' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Columna Izquierda: Lista de Roles */}
          <div className="lg:col-span-1 space-y-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-black text-slate-900 tracking-wide">ROLES DEL SISTEMA</h3>
                <span className="text-xs text-slate-400 font-bold">{roles.length} roles</span>
              </div>

              <div className="space-y-2">
                {roles.map((r) => {
                  const isSelected = r.id === selectedRolId;
                  const userCount = usuarios.filter(u => u.rolId === r.id).length;

                  return (
                    <div
                      key={r.id}
                      onClick={() => setSelectedRolId(r.id)}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition ${
                        isSelected
                          ? 'bg-red-700 text-white border-red-700 shadow-md'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-black text-xs ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                          {r.nombre}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {userCount} usuarios
                        </span>
                      </div>
                      <p className={`text-[11px] leading-snug line-clamp-2 ${
                        isSelected ? 'text-red-100' : 'text-slate-500'
                      }`}>
                        {r.descripcion}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cuadro informativo */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start space-x-3 text-xs text-amber-900">
              <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Seguridad por Roles (RBAC):</span>
                <span>
                  Los permisos asignados a un rol se aplican automáticamente a todos los operadores que tengan ese perfil.
                </span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Matriz de Permisos del Rol Seleccionado */}
          <div className="lg:col-span-2 space-y-4">
            {rolEditDraft ? (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
                
                {/* Cabecera del Rol en edición */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-red-700 uppercase tracking-wide">
                      Editando Permisos de Rol
                    </span>
                    <h2 className="text-xl font-black text-slate-900">{rolEditDraft.nombre}</h2>
                    <p className="text-xs text-slate-500 mt-0.5">{rolEditDraft.descripcion}</p>
                  </div>

                  <button
                    onClick={handleSaveRolPermissions}
                    className="flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-xl text-xs font-black shadow-md transition cursor-pointer self-start sm:self-auto"
                  >
                    <Save className="w-4 h-4" />
                    <span>GUARDAR PERMISOS</span>
                  </button>
                </div>

                {/* Permisos Granulares de Acción */}
                <div>
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2.5">
                    Permisos de Operación Global:
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs font-bold">
                    {[
                      { key: 'ver', label: 'Ver / Consultar' },
                      { key: 'crear', label: 'Crear Registros' },
                      { key: 'editar', label: 'Modificar Datos' },
                      { key: 'anular', label: 'Anular Recibos' },
                      { key: 'exportar', label: 'Exportar Reportes' }
                    ].map(({ key, label }) => {
                      const enabled = rolEditDraft.permisos?.[key];
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handleTogglePermisoGranular(key)}
                          className={`p-2.5 rounded-xl border flex items-center space-x-2 text-left transition cursor-pointer ${
                            enabled
                              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                              : 'bg-slate-50 text-slate-400 border-slate-200'
                          }`}
                        >
                          {enabled ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400 shrink-0" />
                          )}
                          <span className="text-[11px]">{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Matriz de Módulos del Sistema */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                      Módulos Habilitados para este Rol:
                    </h4>
                    <span className="text-xs font-bold text-red-700">
                      {rolEditDraft.modulos?.length || 0} de {ALL_SYSTEM_MODULES.length} activos
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ALL_SYSTEM_MODULES.map((mod) => {
                      const isAllowed = rolEditDraft.modulos?.includes(mod.id);

                      return (
                        <div
                          key={mod.id}
                          onClick={() => handleToggleModuloInDraft(mod.id)}
                          className={`p-3.5 rounded-xl border flex items-start space-x-3 cursor-pointer transition ${
                            isAllowed
                              ? 'bg-red-50/70 border-red-200 text-slate-900 shadow-xs'
                              : 'bg-slate-50/60 border-slate-200 text-slate-400 hover:bg-slate-100'
                          }`}
                        >
                          <div className="mt-0.5">
                            {isAllowed ? (
                              <CheckSquare className="w-4 h-4 text-red-700" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-300" />
                            )}
                          </div>
                          <div className="text-xs">
                            <span className={`font-black block ${isAllowed ? 'text-slate-900' : 'text-slate-500'}`}>
                              {mod.label}
                            </span>
                            <span className={`text-[11px] leading-tight block mt-0.5 ${
                              isAllowed ? 'text-slate-600' : 'text-slate-400'
                            }`}>
                              {mod.descripcion}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            ) : null}
          </div>

        </div>
      )}

      {/* Modales de Usuario */}
      <NewUserModal
        isOpen={isNewUserOpen}
        onClose={() => setIsNewUserOpen(false)}
        onSave={handleCreateUser}
        roles={roles}
        existingUsers={usuarios}
      />

      <EditUserModal
        isOpen={isEditUserOpen}
        onClose={() => setIsEditUserOpen(false)}
        user={selectedUser}
        onSave={handleUpdateUser}
        roles={roles}
      />

    </div>
  );
}
