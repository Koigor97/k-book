import { json, type RequestHandler } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';
import type { HealthCheckResult } from '@kbook/shared';

const buildSupabaseStatus = async () => {
	const supabaseUrl = env.SUPABASE_URL;
	const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

	if (!supabaseUrl || !supabaseServiceKey) {
		return {
			status: 'error' as const,
			message: 'Missing Supabase environment variables.'
		};
	}

	try {
		const client = createClient(supabaseUrl, supabaseServiceKey, {
			auth: { persistSession: false, autoRefreshToken: false }
		});
		const { error } = await client
			.from('organizations')
			.select('id', { head: true, count: 'estimated' })
			.limit(1);
		if (error) {
			return {
				status: 'error' as const,
				message: error.message
			};
		}
		return { status: 'ok' as const };
	} catch (error) {
		return {
			status: 'error' as const,
			message: error instanceof Error ? error.message : 'Unknown Supabase error'
		};
	}
};

export const GET: RequestHandler = async () => {
	const supabaseStatus = await buildSupabaseStatus();
	const overallStatus = supabaseStatus.status === 'ok' ? 'ok' : 'error';
	const payload: HealthCheckResult = {
		status: overallStatus,
		timestamp: new Date().toISOString(),
		dependencies: [
			{
				name: 'supabase',
				status: supabaseStatus.status,
				message: supabaseStatus.message
			}
		]
	};

	return json(payload, { status: overallStatus === 'ok' ? 200 : 503 });
};
