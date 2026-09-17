import React, { useState } from 'react';
import { portalLoginAPI, getPortalDeudasAPI, getPortalHistorialAPI } from '../utils/api';

// ============================================================
// PORTAL DEL SOCIO — Radio Movil 15 de Abril
// Acceso publico sin login de cajera. Login por CI o N Movil.
// ============================================================

export default function PortalSocioPage() {
  const [step, setStep] = useState('login');
  const [loginMode, setLoginMode] = useState('ci');
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [socio, setSocio] = useState(null);
  const [deudas, setDeudas] = useState([]);
  const [totalPendiente, setTotalPendiente] = useState(0);
  const [historial, setHistorial] = useState([]);
  const [activeTab, setActiveTab] = useState('deudas');
  const [qrExpandido, setQrExpandido] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setLoading(true);
    setError('');
    try {
      const ci = loginMode === 'ci' ? inputValue.trim() : undefined;
      const nroMovil = loginMode === 'movil' ? inputValue.trim() : undefined;
      const socioData = await portalLoginAPI(ci, nroMovil);
      setSocio(socioData);
      const [deudasData, historialData] = await Promise.all([
        getPortalDeudasAPI(socioData.id),
        getPortalHistorialAPI(socioData.id)
      ]);
      setDeudas(deudasData.deudas || []);
      setTotalPendiente(deudasData.totalPendiente || 0);
      setHistorial(historialData || []);
      setStep('deudas');
    } catch (err) {
      setError(err.message || 'Socio no encontrado. Verifique su CI o numero de Movil.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setSocio(null); setDeudas([]); setHistorial([]);
    setInputValue(''); setError(''); setStep('login');
  };

  const generarRef = (s, d) => {
    const mov = (s?.nroMovil || s?.id || '000').toString().padStart(3,'0');
    const per = (d.periodo || '').replace(/\s+/g,'').toUpperCase().slice(0,8);
    const tip = (d.conceptoTipo || 'FREC').toUpperCase().slice(0,4);
    return 'M' + mov + '-' + per + '-' + tip;
  };

  const badge = (e) => {
    if (e === 'VIG') return { label:'Al Dia', cls:'bg-green-100 text-green-800 border border-green-200' };
    if (e === 'MORA') return { label:'En Mora', cls:'bg-red-100 text-red-800 border border-red-200' };
    return { label: e || 'Activo', cls:'bg-gray-100 text-gray-700 border border-gray-200' };
  };

  if (step === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-red-800 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white/10 border-4 border-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">&#128663;</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-widest">SISCOB</h1>
            <p className="text-red-200 text-sm font-semibold tracking-widest uppercase mt-1">Portal del Socio</p>
            <p className="text-slate-300 text-xs mt-2">Radio Movil 15 de Abril &mdash; Tarija</p>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl p-6">
            <h2 className="text-lg font-bold text-slate-800 text-center mb-1">Consultar mis Deudas</h2>
            <p className="text-slate-500 text-sm text-center mb-5">Sin contrasena. Solo tu CI o N de Movil.</p>
            <div className="flex rounded-lg overflow-hidden border border-slate-200 mb-4">
              <button type="button"
                onClick={() => { setLoginMode('ci'); setInputValue(''); setError(''); }}
                className={"flex-1 py-2 text-sm font-semibold transition-colors " + (loginMode === 'ci' ? 'bg-red-700 text-white' : 'bg-white text-slate-600 hover:bg-slate-50')}
              >Por C.I.</button>
              <button type="button"
                onClick={() => { setLoginMode('movil'); setInputValue(''); setError(''); }}
                className={"flex-1 py-2 text-sm font-semibold transition-colors " + (loginMode === 'movil' ? 'bg-red-700 text-white' : 'bg-white text-slate-600 hover:bg-slate-50')}
              >Por N Movil</button>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  {loginMode === 'ci' ? 'Cedula de Identidad' : 'Numero de Movil / Interno'}
                </label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => { setInputValue(e.target.value); setError(''); }}
                  placeholder={loginMode === 'ci' ? 'Ej: 7584321' : 'Ej: 042'}
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-lg font-bold text-slate-800 focus:border-red-500 focus:outline-none text-center tracking-widest"
                  autoFocus
                />
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 text-center">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading || !inputValue.trim()}
                className="w-full bg-red-700 hover:bg-red-800 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-base transition-colors"
              >
                {loading ? 'Buscando...' : 'Ver Mis Deudas'}
              </button>
            </form>
            <p className="text-center text-xs text-slate-400 mt-5">
              Problemas para ingresar? Consulta en la oficina.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const b = badge(socio?.estado);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-red-800 text-white px-4 py-4 shadow-lg">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div>
            <p className="text-red-300 text-xs font-semibold tracking-widest uppercase">Portal del Socio</p>
            <h2 className="text-lg font-black leading-tight">{socio?.nombres} {socio?.apPaterno}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-slate-300 text-xs">Movil: {socio?.nroMovil || '-'}</span>
              <span className={"text-xs px-2 py-0.5 rounded-full font-bold " + b.cls}>{b.label}</span>
            </div>
          </div>
          <button onClick={handleLogout}
            className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-2 rounded-lg font-semibold border border-white/20">
            Salir
          </button>
        </div>
      </div>

      {/* Resumen */}
      {totalPendiente > 0 && (
        <div className="bg-red-600 text-white text-center py-3 px-4">
          <span className="text-sm font-semibold">Total pendiente: </span>
          <span className="text-xl font-black">Bs {totalPendiente.toFixed(2)}</span>
        </div>
      )}
      {totalPendiente === 0 && deudas.length === 0 && (
        <div className="bg-green-600 text-white text-center py-3 px-4">
          <span className="text-sm font-semibold">Estas al dia! No tienes deudas pendientes.</span>
        </div>
      )}

      {/* Tabs */}
      <div className="max-w-lg mx-auto px-4 mt-4">
        <div className="flex rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
          <button onClick={() => setActiveTab('deudas')}
            className={"flex-1 py-2.5 text-sm font-bold transition-colors " + (activeTab === 'deudas' ? 'bg-red-700 text-white' : 'text-slate-600 hover:bg-slate-50')}>
            Deudas Pendientes {deudas.length > 0 && <span>({deudas.length})</span>}
          </button>
          <button onClick={() => setActiveTab('historial')}
            className={"flex-1 py-2.5 text-sm font-bold transition-colors " + (activeTab === 'historial' ? 'bg-red-700 text-white' : 'text-slate-600 hover:bg-slate-50')}>
            Historial {historial.length > 0 && <span>({historial.length})</span>}
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-lg mx-auto px-4 pb-10 mt-4 space-y-4">

        {/* DEUDAS */}
        {activeTab === 'deudas' && (
          deudas.length === 0
            ? <div className="bg-white rounded-2xl shadow p-8 text-center">
                <div className="text-5xl mb-3">&#9989;</div>
                <h3 className="font-bold text-slate-700 text-lg">Sin deudas pendientes</h3>
                <p className="text-slate-500 text-sm mt-1">Estas completamente al dia con el sindicato.</p>
              </div>
            : deudas.map(deuda => (
                <div key={deuda.id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100">
                  <div className="bg-slate-800 text-white px-4 py-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                          {deuda.conceptoTipo === 'Multa' ? 'Multa / Infraccion' :
                           deuda.conceptoTipo === 'Amortizacion' ? 'Cuota Prestamo' : 'Cuota Mensual'}
                        </p>
                        <h3 className="font-bold text-base leading-tight mt-0.5">{deuda.descripcion}</h3>
                        <p className="text-slate-400 text-xs mt-1">{deuda.periodo}</p>
                      </div>
                      <div className="text-right ml-3 shrink-0">
                        <p className="text-2xl font-black text-red-400">Bs {deuda.monto.toFixed(2)}</p>
                        <p className="text-xs text-slate-400">{deuda.cajaNombre}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl px-3 py-2 mb-3">
                      <p className="text-blue-800 text-xs font-semibold">
                        Escanea el QR con tu app bancaria y transfiere exactamente:
                      </p>
                      <p className="text-blue-900 text-xl font-black mt-0.5">Bs {deuda.monto.toFixed(2)}</p>
                      <p className="text-blue-700 text-xs mt-1">
                        Referencia: <span className="font-bold font-mono bg-blue-100 px-1 rounded">{generarRef(socio, deuda)}</span>
                      </p>
                    </div>

                    {deuda.qrImage ? (
                      <div className="text-center">
                        <button onClick={() => setQrExpandido(qrExpandido === deuda.id ? null : deuda.id)} className="w-full">
                          <img
                            src={deuda.qrImage}
                            alt={"QR de pago " + deuda.cajaNombre}
                            className={"mx-auto rounded-xl border-2 border-slate-200 shadow cursor-pointer hover:border-red-400 transition-all " + (qrExpandido === deuda.id ? 'max-w-full' : 'max-w-[220px]')}
                          />
                          <p className="text-slate-400 text-xs mt-2 font-medium">
                            {qrExpandido === deuda.id ? 'Toca para reducir' : 'Toca para ampliar el QR'}
                          </p>
                        </button>
                      </div>
                    ) : (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
                        <p className="text-amber-800 text-sm font-semibold">QR no configurado aun</p>
                        <p className="text-amber-700 text-xs mt-1">
                          La administracion configurara el QR de {deuda.cajaNombre} proximamente.
                          Acercate a la oficina para pagar en efectivo.
                        </p>
                      </div>
                    )}

                    <div className="bg-slate-50 rounded-xl px-3 py-2 mt-3">
                      <p className="text-slate-600 text-xs">
                        <strong>Despues de pagar:</strong> Envia la captura a la cajera por WhatsApp o presentate en la oficina con el comprobante para que registren tu pago.
                      </p>
                    </div>
                  </div>
                </div>
              ))
        )}

        {/* HISTORIAL */}
        {activeTab === 'historial' && (
          historial.length === 0
            ? <div className="bg-white rounded-2xl shadow p-8 text-center">
                <h3 className="font-bold text-slate-700 text-lg">Sin pagos registrados</h3>
                <p className="text-slate-500 text-sm mt-1">No se encontraron pagos anteriores en el sistema.</p>
              </div>
            : <div className="bg-white rounded-2xl shadow overflow-hidden">
                <div className="bg-slate-800 text-white px-4 py-3">
                  <h3 className="font-bold text-sm">Ultimos {historial.length} pagos registrados</h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {historial.map((pago, i) => (
                    <div key={i} className="px-4 py-3 flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 text-sm">{pago.cajaNombre}</p>
                        <p className="text-slate-400 text-xs mt-0.5">{pago.fecha} &bull; {pago.metodoPago}</p>
                        <p className="text-slate-400 text-xs">Recibo: {pago.nroRecibo}</p>
                      </div>
                      <div className="text-right ml-3">
                        <p className="font-black text-green-700 text-lg">Bs {pago.total.toFixed(2)}</p>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">PAGADO</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
        )}

        <div className="text-center pt-2 pb-4">
          <p className="text-slate-400 text-xs">SISCOB v1.0 &mdash; Sindicato Radio Movil 15 de Abril &mdash; Tarija, Bolivia</p>
        </div>
      </div>
    </div>
  );
}
