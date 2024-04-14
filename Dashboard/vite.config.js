import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port:5175, // Change the port to your desired port number
    host: 'localhost', // Change 'customlocalhost' to your desired hostname
  },
})
