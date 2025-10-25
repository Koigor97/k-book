import type { HealthCheckResult } from '@kbook/shared';
import { apiFetch } from './api-client';

export const fetchHealth = () => apiFetch<HealthCheckResult>('/api/health');
