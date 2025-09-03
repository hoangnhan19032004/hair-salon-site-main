// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  server: {
    host: true,          // cho phép truy cập qua IP / LAN
    port: 5173,
    allowedHosts: true, // Allow all hosts

    proxy: {
      '/api': {
        target: 'http://localhost:3000', // back‑end
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
