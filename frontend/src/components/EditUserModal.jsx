import React, { useState, useEffect } from 'react';
import { 
  X, 
  UserCheck, 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  Mail, 
  Phone, 
  User, 
  Save, 
  AlertCircle 
} from 'lucide-react';

export default function EditUserModal({ isOpen, onClose, user, onSave, roles }) {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [rolId, setRolId] = useState('cajero');
  const [estado, setEstado] = useState('ACTIVO');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setNombreCompleto(user.nombreCompleto || '');
      setPassword('');
      setEmail(user.email || '');
      setCelular(user.celular || '');
      setRolId(user.rolId || 'cajero');
      setEstado(user.estado || 'ACTIVO');
      setError('');
    }
  }, [user, isOpen]);

  if (!isOpen || !user) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!nombreCompleto.trim()) {
      setError('El nombre completo es obligatorio.');
      return;
    }

    const updatedUser = {
      ...user,
      nombreCompleto: nombreCompleto.trim().toUpperCase(),
      email: email.trim().toLowerCase(),
      celular: celular.trim(),
      rolId: rolId,
      estado: estado
    };

    // Si escribió una nueva contraseña, actualizarla
    if (password.trim()) {
      if (password.length < 3) {
        setError('La nueva contraseña debe tener al menos 3 caracteres.');
        return;
      }
      updatedUser.password = password.trim();
    }

    onSave(updatedUser);
    onClose();
  };

  const selectedRol = roles.find(r => r.id === rolId);

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150 my-auto">
        
        {/* Modal Header */}
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-700/80 rounded-xl">
              <UserCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-wide">Editar Usuario: @{user.usuario}</h3>
              <p className="text-xs text-slate-400">Modificar permisos, perfil y contraseña de acceso</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2 text-red-700 font-bold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Nombre Completo */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Nombre Completo del Operador <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                required
                value={nombreCompleto}
                onChange={(e) => setNombreCompleto(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Usuario (Solo lectura) */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Identificador de Usuario</label>
              <input
                type="text"
                disabled
                value={user.usuario}
                className="w-full px-3 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-mono font-bold cursor-not-allowed"
              />
              <span className="text-[10px] text-slate-400">El ID de usuario no se puede cambiar</span>
            </div>

            {/* Rol de Acceso */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Rol / Nivel de Acceso <span className="text-red-600">*</span>
              </label>
              <select
                value={rolId}
                onChange={(e) => setRolId(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition cursor-pointer"
              >
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Información del rol seleccionado */}
          {selectedRol && (
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start space-x-2 text-[11px] text-slate-600">
              <Shield className="w-4 h-4 text-red-700 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-slate-800">{selectedRol.nombre}: </span>
                <span>{selectedRol.descripcion}</span>
              </div>
            </div>
          )}

          {/* Nueva Contraseña (Opcional) */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-700">
                Cambiar Contraseña <span className="text-slate-400 font-normal">(Dejar en blanco para mantener la actual)</span>
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[10px] font-bold text-red-700 hover:text-red-800 cursor-pointer flex items-center space-x-1"
              >
                {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                <span>{showPassword ? 'Ocultar' : 'Ver'}</span>
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Escriba aquí solo si desea cambiar la clave"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Contacto: Celular y Correo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Teléfono / WhatsApp</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={celular}
                  onChange={(e) => setCelular(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Correo Electrónico</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
                />
              </div>
            </div>
          </div>

          {/* Estado de la cuenta */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800 block">Estado de la cuenta:</span>
              <span className="text-[11px] text-slate-400">Las cuentas inactivas no pueden ingresar al sistema</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setEstado('ACTIVO')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                  estado === 'ACTIVO'
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                Activo
              </button>
              <button
                type="button"
                onClick={() => setEstado('INACTIVO')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                  estado === 'INACTIVO'
                    ? 'bg-rose-700 text-white border-rose-700 shadow-xs'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                Inactivo
              </button>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-bold hover:bg-slate-50 transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-black tracking-wide shadow-md flex items-center space-x-2 transition cursor-pointer"
            >
              <Save className="w-4 h-4 text-emerald-400" />
              <span>GUARDAR CAMBIOS</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
