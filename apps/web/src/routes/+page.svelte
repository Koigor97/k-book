<script lang="ts">
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
</script>

<section class="space-y-6 py-10">
	<div>
		<h1 class="text-3xl font-semibold">KBook Project Scaffold</h1>
		<p class="text-muted-foreground">Baseline workspace with health check connectivity.</p>
	</div>

	<article class="border-border bg-card/60 rounded-lg border p-6 shadow-sm">
		<header class="mb-3 flex items-center justify-between">
			<h2 class="text-lg font-semibold">Health Status</h2>
			<span
				class={`text-sm font-medium ${data.health.status === 'ok' ? 'text-emerald-600' : 'text-red-600'}`}
			>
				{data.health.status.toUpperCase()}
			</span>
		</header>
		<ul class="space-y-2 text-sm">
			{#each data.health.dependencies as dependency (dependency.name)}
				<li
					class="border-border/60 bg-background/80 flex items-center justify-between rounded-md border px-3 py-2"
				>
					<span class="font-medium">{dependency.name}</span>
					<span
						class={`font-semibold ${dependency.status === 'ok' ? 'text-emerald-600' : 'text-red-600'}`}
					>
						{dependency.status}
					</span>
				</li>
			{/each}
		</ul>
		<p class="text-muted-foreground mt-4 text-xs">
			Last checked {new Date(data.health.timestamp).toLocaleString()}
		</p>
	</article>
</section>
