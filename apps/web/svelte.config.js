import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'node:path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			$components: resolve('./src/lib/components'),
			$services: resolve('./src/lib/services'),
			$stores: resolve('./src/lib/stores'),
			$utils: resolve('./src/lib/utils')
		},
		env: {
			dir: resolve('../..')
		}
	}
};

export default config;
