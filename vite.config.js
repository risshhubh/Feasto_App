import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Feasto_App/',
  plugins: [
    react(),
    tailwindcss()
  ],
})
