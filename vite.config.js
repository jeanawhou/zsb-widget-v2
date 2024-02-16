import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '');
  const defineEnv = {};

  // add double underscore to the variables
  for (const key in env) {
    if (key.includes('VITE')) {
      defineEnv[`__${key}__`] = JSON.stringify(env[key]);
    }
  }

  return {
    plugins: [react()],
    define: defineEnv,
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      target: 'es2015',
      lib: {
        entry: 'src/main.jsx',
        name: 'zsb widget v2',
        fileName: 'zsbv6',
      },
      rollupOptions: {
        external: ['react', 'vue', 'angular', 'next', 'gatsby', 'remix'],
        output: {
          entryFileNames: 'zsbv6.js',
          globals: {
            react: 'React',
            vue: 'Vue',
            angular: 'angular',
          },
        },
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
    esbuild: {
      jsxInject: `import 'react';`,
    },
  };
});
