import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],
  define: {
    'process.env': import.meta.env,
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        entryFileNames: 'zsbv6.js',
      },
    },
  },
  resolve: {
    alias: {
      src: '/src',
      components: '/src/components',
      constants: '/src/constants',
      assets: '/src/assets',
      lib: '/src/lib',
      store: '/src/store',
      styles: '/src/styles',
    },
  },
});
