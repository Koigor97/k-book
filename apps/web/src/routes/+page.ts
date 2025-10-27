import type { PageLoad } from './$types';
import type { HealthCheckResult } from '@kbook/shared';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('/api/health');
	const health = (await response.json()) as HealthCheckResult;
	return { health };
};
