/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Permite usar 'describe', 'it', 'expect' globalmente sin importar
    environment: 'jsdom', // Simula un entorno de navegador para renderizar componentes
    setupFiles: './src/setupTests.ts', // Archivo para configurar el entorno de tests (ej. matchers de jest-dom)
    css: true, // Habilita el procesamiento de CSS en los tests
  },
})
