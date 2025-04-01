import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import checker from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx,js}"',
      },
    }),
  ],
  resolve: {
    alias: {
      SRC: fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
