import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export type AdminClient = SupabaseClient;

export const createAdminClient = () => {
	if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
		throw new Error('Missing Supabase admin credentials');
	}
	return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
		auth: { autoRefreshToken: false, persistSession: false }
	});
};
