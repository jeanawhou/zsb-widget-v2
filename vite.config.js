/* eslint-disable no-undef */
import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  const defineEnv = {};

  // add double underscore to the variables
  for (const key in env) {
    if (key.includes('VITE')) {
      defineEnv[`__${key}__`] = JSON.stringify(env[key]);
    }
  }

  const commonConfig = {
    plugins: [react()],
    define: defineEnv,
    optimizeDeps: {
      include: ['linked-dep'],
    },
    build: {
      commonjsOptions: {
        include: [/linked-dep/, /node_modules/],
      },
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          entryFileNames: 'zsbv6.js',
          chunkFileNames: 'chunks/[name]-[hash].js',
          assetFileNames: '[name].[ext]',
          globals: {
            react: 'React',
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
  };

  if (mode === 'library') {
    return {
      ...commonConfig,
      build: {
        ...commonConfig.build,
        lib: {
          entry: resolve(__dirname, 'src/main.jsx'),
          name: 'zsb-widget-v2',
          fileName: 'zsbv6',
        },
        rollupOptions: {
          ...commonConfig.build.rollupOptions,
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
    };
  }

  if (mode === 'vanillajs') {
    return {
      ...commonConfig,
      plugins: [...commonConfig.plugins, { apply: 'build' }],
    };
  }

  return commonConfig;
});
