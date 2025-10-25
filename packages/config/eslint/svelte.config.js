import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import svelteParser from 'svelte-eslint-parser';
import tseslint from 'typescript-eslint';

export default function createSvelteConfig({ tsconfigPath = './tsconfig.json' } = {}) {
	return tseslint.config(
		{
			ignores: [
				'dist',
				'build',
				'.svelte-kit/**',
				'coverage/**',
				'node_modules/**',
				'babel.config.cjs',
				'babel.config.js',
				'eslint.config.js'
			]
		},
		js.configs.recommended,
		...tseslint.configs.recommended,
		...svelte.configs['flat/recommended'],
		{
			files: ['**/*.svelte'],
			languageOptions: {
				parser: svelteParser,
				parserOptions: {
					parser: {
						ts: '@typescript-eslint/parser'
					},
					tsconfigRootDir: process.cwd(),
					project: tsconfigPath,
					extraFileExtensions: ['.svelte']
				},
				globals: {
					...globals.browser,
					...globals.node
				}
			}
		},
		{
			files: ['**/*.{ts,tsx,cts,mts,js,mjs,cjs}'],
			languageOptions: {
				parserOptions: {
					tsconfigRootDir: process.cwd(),
					project: tsconfigPath
				},
				globals: {
					...globals.browser,
					...globals.node
				}
			}
		},
		prettier
	);
}
