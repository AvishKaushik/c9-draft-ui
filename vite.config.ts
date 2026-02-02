import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    proxy: {
      '/api/insights': 'http://localhost:8001',
      '/api/macro': 'http://localhost:8001',
      '/api/whatif': 'http://localhost:8001',
      '/api/report': 'http://localhost:8002',
      '/api/draft': 'http://localhost:8003',
      '/api/recommendations': 'http://localhost:8003',
    }
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          query: ['@tanstack/react-query'],
        }
      }
    }
  }
})
