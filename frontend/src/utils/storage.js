// LocalStorage persistence & Backup / Restore helpers
const STORAGE_KEYS = {
  SOCIOS: 'siscob_socios',
  DEUDAS: 'siscob_deudas',
  CAJAS: 'siscob_cajas',
  EGRESOS: 'siscob_egresos',
  USER: 'siscob_auth_user',
  SETTINGS: 'siscob_settings',
  USUARIOS: 'siscob_usuarios',
  ROLES: 'siscob_roles'
};

export function loadFromStorage(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error(`Error loading ${key} from storage:`, e);
    return defaultValue;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

export function exportBackupData(data) {
  const backup = {
    sistema: 'SISCOB - Radio Móvil 15 de Abril',
    version: '1.0',
    timestamp: new Date().toISOString(),
    fechaFormato: new Date().toLocaleDateString('es-BO'),
    data: {
      socios: data.socios,
      deudas: data.deudas,
      cajas: data.cajas,
      egresos: data.egresos,
      usuarios: data.usuarios,
      roles: data.roles
    }
  };

  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(backup, null, 2))}`;
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', jsonString);
  downloadAnchor.setAttribute('download', `SISCOB_BACKUP_15ABRIL_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function importBackupFile(file, onSuccess, onError) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed.data && parsed.data.socios && parsed.data.cajas) {
        onSuccess(parsed.data);
      } else {
        onError('El archivo no contiene un formato de respaldo válido de SISCOB.');
      }
    } catch (err) {
      onError('Error al leer el archivo JSON.');
    }
  };
  reader.readAsText(file);
}

export { STORAGE_KEYS };