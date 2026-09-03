import React, { useState } from 'react';
import { Landmark, Lock, User, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function LoginScreen({ onLogin, usuarios = [], roles = [] }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const cleanUser = usuario.trim().toLowerCase();
    
    // Buscar en la lista dinámica de usuarios
    const foundUser = usuarios.find(
      u => u.usuario.toLowerCase() === cleanUser || (u.email && u.email.toLowerCase() === cleanUser)
    );

    if (foundUser) {
      if (foundUser.estado === 'INACTIVO') {
        setError('Esta cuenta de usuario se encuentra INACTIVA o suspendida. Comuníquese con la administración.');
        return;
      }

      // Validar contraseña (si tiene password configurada)
      if (foundUser.password && foundUser.password !== password) {
        setError('Contraseña incorrecta. Verifique sus credenciales.');
        return;
      }

      const rolObj = roles.find(r => r.id === foundUser.rolId);

      onLogin({
        id: foundUser.usuario,
        nombre: foundUser.nombreCompleto || foundUser.usuario,
        rol: foundUser.rolId || 'cajero',
        rolNombre: rolObj?.nombre || foundUser.rolId,
        modulos: rolObj?.modulos || []
      });
      return;
    }

    // Fallback para usuarios rápidos predeterminados si la lista aún no cargó
    if (cleanUser === 'admin' || cleanUser === 'admin33') {
      onLogin({
        id: 'admin33',
        nombre: 'Administrador Central',
        rol: 'admin',
        rolNombre: 'Super Administrador / Directorio'
      });
      return;
    }

    if (cleanUser === 'cajero' || cleanUser === 'cajera01') {
      onLogin({
        id: 'cajera01',
        nombre: 'Daniela Condori (Cajera)',
        rol: 'cajero',
        rolNombre: 'Cajero(a) de Ventanilla'
      });
      return;
    }

    if (cleanUser === 'hacienda' || cleanUser === 'hacienda15') {
      onLogin({
        id: 'hacienda15',
        nombre: 'Rubén Aguirre (Hacienda)',
        rol: 'hacienda',
        rolNombre: 'Secretaría de Hacienda'
      });
      return;
    }

    // Si no coincide con ninguno
    setError(`El usuario "${cleanUser}" no está registrado en el sistema.`);
  };

  const handleQuickFill = (userLogin, userPass) => {
    setUsuario(userLogin);
    setPassword(userPass);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 flex flex-col justify-center items-center p-4">
      {/* Central Login Card */}
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-slate-200 space-y-6 animate-fadeIn">
        <div className="text-center space-y-2">
          <div className="inline-flex bg-red-700 text-white p-4 rounded-2xl shadow-md">
            <Landmark className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-wider">SISCOB</h1>
          <p className="text-xs font-bold text-red-700 uppercase tracking-wide">
            RADIO MÓVIL 15 DE ABRIL
          </p>
          <p className="text-xs text-slate-500">
            Plataforma Institucional de Gestión Económica y Cobranzas
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-2.5 text-xs text-red-700 font-bold animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">USUARIO / OPERADOR:</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                required
                value={usuario}
                onChange={(e) => { setUsuario(e.target.value); setError(''); }}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                placeholder="ej. admin33, cajera01"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-700">CONTRASEÑA:</label>
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
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Accesos rápidos de prueba */}
          <div>
            <label className="block font-bold text-slate-500 text-[10px] uppercase mb-1.5">
              Cuentas Rápidas de Demostración:
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickFill('admin33', '123')}
                className="py-1.5 px-2 bg-slate-50 hover:bg-red-50 text-slate-700 hover:text-red-800 rounded-lg border border-slate-200 text-center font-bold text-[11px] transition cursor-pointer"
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('cajera01', '123')}
                className="py-1.5 px-2 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-800 rounded-lg border border-slate-200 text-center font-bold text-[11px] transition cursor-pointer"
              >
                Cajera
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('hacienda15', '123')}
                className="py-1.5 px-2 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 rounded-lg border border-slate-200 text-center font-bold text-[11px] transition cursor-pointer"
              >
                Hacienda
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-700 hover:bg-red-800 text-white rounded-xl font-black tracking-wide text-xs uppercase shadow-md flex items-center justify-center space-x-2 transition cursor-pointer active:scale-95"
          >
            <span>Ingresar al Sistema</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-[10px] text-slate-400 pt-2 border-t border-slate-100">
          <span>Control de Acceso Seguro RBAC • SISCOB v1.0 • Tarija, Bolivia</span>
        </div>
      </div>
    </div>
  );
}