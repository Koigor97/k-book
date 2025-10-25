import { nanoid } from 'nanoid';

export const withRequestId = (provided?: string) => provided ?? nanoid();

export const json = <T>(payload: T, init?: ResponseInit) =>
	new Response(JSON.stringify(payload), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
			...(init?.headers ?? {})
		},
		...init
	});

export const jsonError = (status: number, message: string, details?: Record<string, unknown>) => {
	const requestId = nanoid();
	return json(
		{
			error: {
				code: `ERR_${status}`,
				message,
				details,
				timestamp: new Date().toISOString(),
				requestId
			}
		},
		{
			status,
			headers: { 'x-request-id': requestId }
		}
	);
};
