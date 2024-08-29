import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 5173,      // Set the port (optional, defaults to 3000 if not specified)
    strictPort: true, // Prevents Vite from automatically using a different port if the specified one is in use
  },
})
