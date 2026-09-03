// Cliente API REST SISCOB para conectar con Railway y Supabase
const API_BASE = import.meta.env.VITE_API_URL || 'https://siscob-production.up.railway.app';

export async function getSociosAPI() {
  try {
    const res = await fetch(`${API_BASE}/api/socios`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[SISCOB API] Error al obtener socios remotos, usando fallback local:', err.message);
    return null;
  }
}

export async function createSocioAPI(socioData) {
  try {
    const res = await fetch(`${API_BASE}/api/socios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(socioData)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('[SISCOB API] Error al guardar socio en Supabase:', err.message);
    return null;
  }
}

export async function updateSocioAPI(id, socioData) {
  try {
    const res = await fetch(`${API_BASE}/api/socios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(socioData)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('[SISCOB API] Error al actualizar socio en Supabase:', err.message);
    return null;
  }
}

export async function deleteSocioAPI(id) {
  try {
    const res = await fetch(`${API_BASE}/api/socios/${id}`, {
      method: 'DELETE'
    });
    return res.ok;
  } catch (err) {
    console.error('[SISCOB API] Error al eliminar socio:', err.message);
    return false;
  }
}

export async function getCajasAPI() {
  try {
    const res = await fetch(`${API_BASE}/api/cajas`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[SISCOB API] Error al obtener cajas remotas:', err.message);
    return null;
  }
}

export async function getDeudasAPI() {
  try {
    const res = await fetch(`${API_BASE}/api/deudas`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[SISCOB API] Error al obtener deudas remotas:', err.message);
    return null;
  }
}

export async function createDeudaAPI(deudaData) {
  try {
    const res = await fetch(`${API_BASE}/api/deudas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deudaData)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('[SISCOB API] Error al crear deuda:', err.message);
    return null;
  }
}

export async function getEgresosAPI() {
  try {
    const res = await fetch(`${API_BASE}/api/egresos`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[SISCOB API] Error al obtener egresos remotos:', err.message);
    return null;
  }
}

export async function createEgresoAPI(egresoData) {
  try {
    const res = await fetch(`${API_BASE}/api/egresos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(egresoData)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('[SISCOB API] Error al registrar egreso:', err.message);
    return null;
  }
}

export async function registrarCobranzaAPI(cobranzaData) {
  try {
    const res = await fetch(`${API_BASE}/api/cobranzas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cobranzaData)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('[SISCOB API] Error al registrar cobranza:', err.message);
    return null;
  }
}

export async function anularCobranzaAPI(reversalData) {
  try {
    const res = await fetch(`${API_BASE}/api/cobranzas/anular`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reversalData)
    });
    return res.ok;
  } catch (err) {
    console.warn('[SISCOB API] Error al anular cobranza remota:', err.message);
    return false;
  }
}

export async function deleteEgresoAPI(id) {
  try {
    const res = await fetch(`${API_BASE}/api/egresos/${id}`, {
      method: 'DELETE'
    });
    return res.ok;
  } catch (err) {
    console.warn('[SISCOB API] Error al eliminar egreso:', err.message);
    return false;
  }
}

// Usuarios y Roles API
export async function getUsuariosAPI() {
  try {
    const res = await fetch(`${API_BASE}/api/usuarios`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[SISCOB API] Fallback usuarios locales:', err.message);
    return null;
  }
}

export async function createUsuarioAPI(usuarioData) {
  try {
    const res = await fetch(`${API_BASE}/api/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuarioData)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[SISCOB API] Error al guardar usuario remoto:', err.message);
    return null;
  }
}

export async function updateUsuarioAPI(id, usuarioData) {
  try {
    const res = await fetch(`${API_BASE}/api/usuarios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuarioData)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[SISCOB API] Error al actualizar usuario remoto:', err.message);
    return null;
  }
}

export async function deleteUsuarioAPI(id) {
  try {
    const res = await fetch(`${API_BASE}/api/usuarios/${id}`, {
      method: 'DELETE'
    });
    return res.ok;
  } catch (err) {
    console.warn('[SISCOB API] Error al eliminar usuario remoto:', err.message);
    return false;
  }
}
