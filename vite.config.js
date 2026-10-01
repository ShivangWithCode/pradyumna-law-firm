import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: false,
    host: true
  },
  build: {
    target: 'esnext',
    cssMinify: true,
    assetsInlineLimit: 4096
  }
});
