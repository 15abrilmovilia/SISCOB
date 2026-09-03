import React, { useState } from 'react';
import { Landmark, Lock, User, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginScreen({ onLogin }) {
  const [usuario, setUsuario] = useState('admin33');
  const [password, setPassword] = useState('123456');
  const [rol, setRol] = useState('admin'); // 'admin' | 'cajero'

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      id: usuario,
      nombre: rol === 'admin' ? 'Administrador Central' : 'Daniela (Cajera 01)',
      rol: rol
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 flex flex-col justify-center items-center p-4">
      {/* Central Login Card (Exact Stitch Acceso al Sistema Screen) */}
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

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">USUARIO / OPERADOR:</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                required
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="ID de operador o correo"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">CONTRASEÑA:</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">ROL DE ACCESO:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => { setRol('admin'); setUsuario('admin33'); }}
                className={`py-2 px-3 rounded-xl border text-center font-bold transition cursor-pointer ${
                  rol === 'admin' 
                    ? 'bg-red-700 text-white border-red-700 shadow-xs' 
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Administrador
              </button>
              <button
                type="button"
                onClick={() => { setRol('cajero'); setUsuario('cajera01'); }}
                className={`py-2 px-3 rounded-xl border text-center font-bold transition cursor-pointer ${
                  rol === 'cajero' 
                    ? 'bg-red-700 text-white border-red-700 shadow-xs' 
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Cajero(a)
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
          <span>Conexión Segura SSL • SISCOB v1.0 • Tarija, Bolivia</span>
        </div>
      </div>
    </div>
  );
}