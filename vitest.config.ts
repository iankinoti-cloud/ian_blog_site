import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [],
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // Codegrade uses a plain Vite template — next and framer-motion are not installed.
      // These aliases let Vite resolve the imports at transform time so vi.mock can run.
      '@/components/shared/Link': path.resolve(__dirname, 'src/__mocks__/next-link.tsx'),
      'next/link': path.resolve(__dirname, 'src/__mocks__/next-link.tsx'),
      'framer-motion': path.resolve(__dirname, 'src/__mocks__/framer-motion.tsx'),
    },
  },
});
