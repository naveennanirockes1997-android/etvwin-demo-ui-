import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // base:"//naveennanirockes1997-android.github.io/etvwin-demo-ui-/",
  base:process.env.VITE_BASE_PATH || "/etvwin-demo-ui-",
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
