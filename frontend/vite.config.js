import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icon-512x512.svg'],
      manifest: {
        name: 'SISCOB - Radio Móvil 15 de Abril',
        short_name: 'SISCOB',
        description: 'Sistema Integral de Gestión Económica y Cobranza de Socios',
        theme_color: '#b91c1c',
        background_color: '#f8fafc',
        display: 'standalone',
        orientation: 'portrait-primary',
        icons: [
          {
            src: '/favicon.svg',
            sizes: '192x192 512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: '/icon-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://siscob-production.up.railway.app',
        changeOrigin: true
      }
    }
  }
})