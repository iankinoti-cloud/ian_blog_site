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
      // Alias both the local Link wrapper and next/link directly.
      // Codegrade runs plain Vite without Next.js, so these must resolve
      // to our stub before Vite's static import analysis runs.
      '@/components/shared/Link': path.resolve(__dirname, 'src/__mocks__/next-link.tsx'),
      'next/link': path.resolve(__dirname, 'src/__mocks__/next-link.tsx'),
    },
  },
});
