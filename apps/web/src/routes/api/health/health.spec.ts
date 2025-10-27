import { afterEach, describe, expect, it, vi } from 'vitest';
import { GET } from './+server';

const mocks = vi.hoisted(() => {
	const limitMock = vi.fn();
	const selectMock = vi.fn();
	const fromMock = vi.fn(() => ({ select: selectMock }));
	const createClientMock = vi.fn(() => ({ from: fromMock }));

	return { selectMock, fromMock, createClientMock, limitMock };
});

vi.mock('$env/dynamic/private', () => ({
	env: {
		SUPABASE_URL: 'https://example.supabase.co',
		SUPABASE_SERVICE_ROLE_KEY: 'service-role-key'
	}
}));

vi.mock('@supabase/supabase-js', () => ({
	createClient: mocks.createClientMock
}));

const buildEvent = () => ({}) as Parameters<typeof GET>[0];

describe('GET /api/health', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('returns ok when Supabase is reachable', async () => {
		mocks.limitMock.mockResolvedValueOnce({ error: null });
		mocks.selectMock.mockReturnValueOnce({ limit: mocks.limitMock });
		mocks.fromMock.mockReturnValueOnce({ select: mocks.selectMock });

		const response = await GET(buildEvent());
		expect(response.status).toBe(200);
		const body = (await response.json()) as {
			status: string;
			dependencies: Array<{ status: string }>;
		};
		expect(body.status).toBe('ok');
		expect(body.dependencies[0]?.status).toBe('ok');
	});

	it('returns error when Supabase check fails', async () => {
		mocks.limitMock.mockResolvedValueOnce({ error: { message: 'connection refused' } });
		mocks.selectMock.mockReturnValueOnce({ limit: mocks.limitMock });
		mocks.fromMock.mockReturnValueOnce({ select: mocks.selectMock });

		const response = await GET(buildEvent());
		expect(response.status).toBe(503);
		const body = (await response.json()) as {
			status: string;
			dependencies: Array<{ status: string }>;
		};
		expect(body.status).toBe('error');
		expect(body.dependencies[0]?.status).toBe('error');
	});
});
