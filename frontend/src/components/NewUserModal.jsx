import React, { useState } from 'react';
import { 
  X, 
  UserPlus, 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  Mail, 
  Phone, 
  User, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function NewUserModal({ isOpen, onClose, onSave, roles, existingUsers = [] }) {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [rolId, setRolId] = useState(roles && roles.length > 0 ? roles[1]?.id || roles[0]?.id : 'cajero');
  const [estado, setEstado] = useState('ACTIVO');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const cleanUser = usuario.trim().toLowerCase();
    if (!cleanUser || cleanUser.length < 3) {
      setError('El nombre de usuario debe tener al menos 3 caracteres.');
      return;
    }

    if (!nombreCompleto.trim()) {
      setError('El nombre completo es obligatorio.');
      return;
    }

    if (password.length < 3) {
      setError('La contraseña debe tener al menos 3 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden. Verifíquelas.');
      return;
    }

    // Verificar usuario único
    const userExists = existingUsers.some(u => u.usuario.toLowerCase() === cleanUser);
    if (userExists) {
      setError(`El usuario "${cleanUser}" ya existe en el sistema. Elija otro identificador.`);
      return;
    }

    const newUser = {
      id: `u-${Date.now()}`,
      usuario: cleanUser,
      password: password,
      nombreCompleto: nombreCompleto.trim().toUpperCase(),
      email: email.trim().toLowerCase(),
      celular: celular.trim(),
      rolId: rolId,
      estado: estado,
      fechaCreacion: new Date().toISOString().split('T')[0],
      ultimoAcceso: 'Sin ingresos registrados'
    };

    onSave(newUser);
    // Limpiar formulario
    setNombreCompleto('');
    setUsuario('');
    setPassword('');
    setConfirmPassword('');
    setEmail('');
    setCelular('');
    onClose();
  };

  const selectedRol = roles.find(r => r.id === rolId);

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150 my-auto">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-red-800 to-red-700 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <UserPlus className="w-5 h-5 text-red-100" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-wide">Nuevo Usuario del Sistema</h3>
              <p className="text-xs text-red-200">Asigne credenciales y perfil de acceso para el operador</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-red-200 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
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
              Nombre Completo del Operador / Funcionario <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                required
                value={nombreCompleto}
                onChange={(e) => setNombreCompleto(e.target.value)}
                placeholder="Ej. MARCO ANTONIO ROCHA"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Usuario / Login */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Usuario / Login <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={usuario}
                onChange={(e) => setUsuario(e.target.value.replace(/\s+/g, ''))}
                placeholder="ej. mrocha, cajero02"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition lowercase"
              />
              <span className="text-[10px] text-slate-400">Sin espacios, minúsculas</span>
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

          {/* Contraseñas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-slate-700">
                  Contraseña <span className="text-red-600">*</span>
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
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Confirmar Contraseña <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
                />
              </div>
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
                  placeholder="Ej. 7141199"
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
                  placeholder="operador@radiomovil15.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
                />
              </div>
            </div>
          </div>

          {/* Estado de la cuenta */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="font-bold text-slate-700">Estado inicial de la cuenta:</span>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setEstado('ACTIVO')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                  estado === 'ACTIVO'
                    ? 'bg-emerald-700 text-white border-emerald-700'
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
                    ? 'bg-rose-700 text-white border-rose-700'
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
              className="px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-black tracking-wide shadow-md flex items-center space-x-2 transition cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>CREAR USUARIO</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
