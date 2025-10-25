import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: 'e2e',
	testMatch: /.*\.test\.ts/,
	webServer: {
		command: 'pnpm --filter web build && pnpm --filter web preview -- --port 4173',
		port: 4173,
		reuseExistingServer: !process.env.CI
	},
	use: {
    baseURL: 'http://localhost:4173'
  }
});
