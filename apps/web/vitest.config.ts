import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

const kitPlugin = sveltekit();

export default defineConfig({
	plugins: [kitPlugin],
	test: {
		environment: 'node',
		include: ['src/**/*.{test,spec}.{ts,js}']
	}
});
