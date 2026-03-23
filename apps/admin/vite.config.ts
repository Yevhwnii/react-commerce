import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  resolve: {
    alias: {
      "@commerce-ui": path.resolve(__dirname, "../../packages/ui/src")
    }
  },
  optimizeDeps: {
    include: ["commerce-ui"]
  },
  server: {
    port: 3001
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})
