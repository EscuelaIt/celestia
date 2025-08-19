import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  define: {
    'process.env': JSON.stringify({}),
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  test: {
    include: ['**/*.test.it.tsx'],
    name: 'integration',
    browser: {
      provider: 'playwright',
      enabled: true,
      instances: [{ browser: 'chromium' }],
    },
  },
})
