import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 基座固定 7000 端口（与子应用 entry 约定一致，见 doc/arch/子应用接入协议.md）
export default defineConfig({
  plugins: [react()],
  server: {
    port: 7000,
    host: 'localhost',
    cors: true,
  },
  preview: {
    port: 7000,
  },
  build: {
    outDir: 'dist',
  },
});
