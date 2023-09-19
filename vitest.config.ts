import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      exclude: ['/output/', '/example/'],
      excludeNodeModules: true,
    },
  },
});
