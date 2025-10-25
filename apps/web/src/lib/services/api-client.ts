import { createBrowserClient } from '@supabase/ssr';
import type { ApiErrorShape } from '@kbook/shared';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	console.warn('Supabase environment variables are not defined. Health checks will fail.');
}

export const supabaseClient = createBrowserClient(supabaseUrl ?? '', supabaseAnonKey ?? '', {
	auth: {
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: true
	}
});

export class ApiError extends Error {
	constructor(
		public readonly status: number,
		public readonly body: ApiErrorShape['error']
	) {
		super(body.message);
	}
}

export async function apiFetch<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
	const session = await supabaseClient.auth.getSession();
	const headers = new Headers(init?.headers);
	if (session.data.session?.access_token) {
		headers.set('Authorization', `Bearer ${session.data.session.access_token}`);
	}
	if (init?.body && !headers.has('Content-Type')) {
		headers.set('Content-Type', 'application/json');
	}
	const response = await fetch(input, { ...init, headers });
	if (!response.ok) {
		const data = (await response.json().catch(() => null)) as ApiErrorShape | null;
		throw new ApiError(
			response.status,
			data?.error ?? {
				code: `ERR_${response.status}`,
				message: response.statusText,
				timestamp: new Date().toISOString(),
				requestId: response.headers.get('x-request-id') ?? 'unknown'
			}
		);
	}
	return response.json() as Promise<T>;
}
