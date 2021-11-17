import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import { VitePWA, Options as VitePWAOptions } from 'vite-plugin-pwa';
import manifest from './src/assets/manifest.json';

const pwaOptions: Partial<VitePWAOptions> = {
  manifest,
};

export default defineConfig({
  plugins: [solid(), VitePWA(pwaOptions)],
  assetsInclude: ['**/*.md'],
  optimizeDeps: {
    include: [
    ],
    exclude: ['@solid.js/docs'],
  },
  build: {
    polyfillDynamicImport: false,
    target: 'esnext',
    terserOptions: {
      compress: {
        unsafe: true,
        unsafe_arrows: true,
        unsafe_Function: true,
        unsafe_math: true,
        unsafe_symbols: true,
        unsafe_methods: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        passes: 3,
      },
    },
  },
});
