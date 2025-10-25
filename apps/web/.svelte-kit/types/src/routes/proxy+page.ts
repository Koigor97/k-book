// @ts-nocheck
import type { PageLoad } from './$types';
import type { HealthCheckResult } from '@kbook/shared';

export const load = async ({ fetch }: Parameters<PageLoad>[0]) => {
	const response = await fetch('/api/health');
	const health = (await response.json()) as HealthCheckResult;
	return { health };
};
