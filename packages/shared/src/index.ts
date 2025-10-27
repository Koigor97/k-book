export interface HealthDependencyStatus {
	name: string;
	status: 'ok' | 'error';
	message?: string;
}

export interface HealthCheckResult {
	status: 'ok' | 'degraded' | 'error';
	timestamp: string;
	dependencies: HealthDependencyStatus[];
}

export interface ApiErrorShape {
	error: {
		code: string;
		message: string;
		details?: Record<string, unknown>;
		timestamp: string;
		requestId: string;
	};
}
