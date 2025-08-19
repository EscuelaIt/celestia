import tsconfigPaths from 'vite-tsconfig-paths'
import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  {
    plugins: [tsconfigPaths()],
    test: {
      include: ['**/*.test.unit.ts'],
      name: 'unit',
      environment: 'node',
      server: {
        deps: {
          inline: ['next'],
        },
      },
    },
  },
  './vitest.config.browser.ts',
])
