import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default function createNodeConfig({ tsconfigPath = './tsconfig.json' } = {}) {
	return tseslint.config(
		{
			ignores: ['dist', 'build']
		},
		js.configs.recommended,
		...tseslint.configs.recommended,
		{
			files: ['**/*.{ts,js}'],
			languageOptions: {
				parserOptions: {
					tsconfigRootDir: process.cwd(),
					project: tsconfigPath
				},
				globals: globals.node
			}
		},
		prettier
	);
}
