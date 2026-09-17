# SISCOB Backend — Guia de Instalacion y Despliegue

**Sistema de Cobranza de Socios — Radio Movil 15 de Abril**
API REST Node.js + Express — Base de datos: Supabase (PostgreSQL)

---

## Requisitos

- Node.js v18 o superior
- Cuenta en Railway (https://railway.app) — hosting del backend
- Proyecto en Supabase (https://supabase.com) — base de datos PostgreSQL

---

## Instalacion Local (Desarrollo)

  npm install
  copy .env.example .env
  (Editar .env con credenciales)
  npm start

El servidor estara disponible en http://localhost:4000

---

## Configuracion del archivo .env

  PORT=4000
  DATABASE_URL=postgresql://postgres:TU_PASS@db.[TU_PROYECTO].supabase.co:5432/postgres
  NODE_ENV=production
  CORS_ORIGIN=https://TU-FRONTEND.vercel.app

### Obtener DATABASE_URL desde Supabase:
1. Ir a supabase.com, tu proyecto
2. Settings -> Database -> Connection string -> URI
3. Reemplazar [YOUR-PASSWORD] con la clave del proyecto

---

## Inicializacion Automatica de la Base de Datos

Al conectar por primera vez, el servidor siembra automaticamente:
  - 206 socios propietarios (nomina oficial)
  - 8 conceptos economicos oficiales
  - Cuotas de frecuencia mensual (Bs 200)
  - Las 5 cajas institucionales

---

## Despliegue en Railway

1. Crear proyecto en railway.app
2. Conectar repositorio GitHub
3. En Settings > Variables agregar:
   - DATABASE_URL (desde Supabase)
   - NODE_ENV=production
   - CORS_ORIGIN=https://TU-DOMINIO.vercel.app
4. Railway despliega automaticamente en cada push a main

---

## Endpoints Principales

  GET    /api/health         Estado del sistema
  GET    /api/socios         Padron de socios
  POST   /api/socios         Nuevo socio
  PUT    /api/socios/:id     Actualizar socio
  GET    /api/cajas          Saldos de las 5 cajas
  GET    /api/deudas         Cuentas por cobrar
  POST   /api/cobranzas      Registrar pago
  POST   /api/cobranzas/anular  Anular cobranza
  GET    /api/recibos        Historial de recibos
  GET    /api/egresos        Gastos registrados
  POST   /api/egresos        Registrar egreso
  GET    /api/conceptos      Catalogo de conceptos
  POST   /api/sistema/reset  Cierre contable

---

## Usuarios Predeterminados

  admin33    / 123  -> Administrador
  cajera01   / 123  -> Cajero(a)
  hacienda15 / 123  -> Hacienda

IMPORTANTE: Cambiar contrasenas antes de poner en produccion.

---

## Version

- SISCOB API: v1.2.0
- Compatible con frontend SISCOB v1.0+
