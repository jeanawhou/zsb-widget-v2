import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '');
  const defineEnv = {};

  // add double underscore to the variables
  for (const key in env) {
    defineEnv[`__${key}__`] = JSON.stringify(env[key]);
  }

  return {
    plugins: [react(), splitVendorChunkPlugin()],
    define: defineEnv,
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      lib: {
        // eslint-disable-next-line no-undef
        entry: resolve(__dirname, 'src/main.jsx'),
        name: 'zsb widget v2',
        fileName: 'zsbv6',
      },
      rollupOptions: {
        output: {
          entryFileNames: 'zsbv6.js',
          globals: {
            react: 'React ',
          },
        },
        external: ['react'],
      },
    },
    resolve: {
      alias: {
        src: '/src',
        '@': '/src',
        components: '/src/components',
        constants: '/src/constants',
        '@assets': '/src/assets',
        lib: '/src/lib',
        store: '/src/store',
        styles: '/src/styles',
      },
    },
  };
});
