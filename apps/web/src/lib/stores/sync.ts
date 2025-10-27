import { writable } from 'svelte/store';
import { syncQueue, type SyncQueueItem } from '@kbook/offline-core';

export type SyncStatus = 'online' | 'offline' | 'syncing';

export const syncStatusStore = writable<SyncStatus>('online');
export const pendingQueueStore = writable<Array<SyncQueueItem>>([]);

export function enqueueOffline<T>(payload: T) {
	const item = syncQueue.enqueue(payload);
	pendingQueueStore.update((list) => [...list, item]);
	syncStatusStore.set('offline');
	return item;
}

export function markSynced(id: string) {
	const updated = syncQueue.markSynced(id);
	if (updated) {
		pendingQueueStore.update((list) => list.filter((item) => item.id !== id));
		if (syncQueue.all().every((item) => item.status === 'synced')) {
			syncStatusStore.set('online');
		}
	}
	return updated;
}
