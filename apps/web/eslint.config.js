import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import tseslint from 'typescript-eslint';

const tsconfigUrl = new URL('./tsconfig.json', import.meta.url);
const tsconfigPath = tsconfigUrl.pathname;
const tsconfigRoot = new URL('.', import.meta.url).pathname;

const svelteConfigs = svelte.configs['flat/recommended'].map((config) => {
	const languageOptions = {
		...(config.languageOptions ?? {}),
		parserOptions: {
			...((config.languageOptions ?? {}).parserOptions ?? {}),
			project: tsconfigPath,
			tsconfigRootDir: tsconfigRoot,
			extraFileExtensions: ['.svelte'],
			parser: {
				// Forward to TypeScript parser for <script lang="ts"> blocks
				ts: '@typescript-eslint/parser'
			}
		},
		globals: {
			...globals.browser,
			...globals.node
		}
	};

	const rules = {
		...(config.rules ?? {})
	};

	if (config.processor === 'svelte/svelte') {
		rules['@typescript-eslint/await-thenable'] = 'off';
		rules['@typescript-eslint/no-floating-promises'] = 'off';
		rules['@typescript-eslint/no-misused-promises'] = 'off';
	}

	return {
		...config,
		languageOptions,
		rules
	};
});

export default [
	{
		ignores: [
			'.svelte-kit/**',
			'build/**',
			'dist/**',
			'coverage/**',
			'node_modules/**',
			'babel.config.js',
			'eslint.config.js'
		]
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['**/*.{ts,tsx,cts,mts}'],
		languageOptions: {
			parserOptions: {
				project: tsconfigPath,
				tsconfigRootDir: tsconfigRoot
			},
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	...svelteConfigs,
	prettier
];
