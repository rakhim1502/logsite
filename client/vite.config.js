import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Faqat node_modules ichidagi fayllarni guruhlaymiz
          if (id.includes('node_modules')) {
            if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/react-router-dom/')) {
              return 'vendor-react';
            }
            if (id.includes('/framer-motion/')) {
              return 'vendor-motion';
            }
            if (id.includes('/react-hook-form/')) {
              return 'vendor-forms';
            }
            if (id.includes('/axios/') || id.includes('/lucide-react/')) {
              return 'vendor-utils';
            }

            // Qolgan barcha kutubxonalar uchun umumiy chunk (ixtiyoriy)
            return 'vendor-other';
          }
        }
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});