export interface SyncQueueItem<TPayload = unknown> {
	id: string;
	payload: TPayload;
	createdAt: string;
	status: 'pending' | 'synced' | 'error';
}

export class InMemorySyncQueue<TPayload = unknown> {
	private queue: SyncQueueItem<TPayload>[] = [];

	enqueue(payload: TPayload) {
		const item: SyncQueueItem<TPayload> = {
			id: crypto.randomUUID(),
			payload,
			createdAt: new Date().toISOString(),
			status: 'pending'
		};
		this.queue.push(item);
		return item;
	}

	all() {
		return [...this.queue];
	}

	markSynced(id: string) {
		const match = this.queue.find((item) => item.id === id);
		if (match) {
			match.status = 'synced';
		}
		return match;
	}
}

export const syncQueue = new InMemorySyncQueue();
