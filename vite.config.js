import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base:"/etv-win-ui/",
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://stagingott.etvwin.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
