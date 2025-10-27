import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

const config: Config = {
	content: ['./src/**/*.{svelte,ts,js}'],
	plugins: [forms, typography]
};

export default config;
