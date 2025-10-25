<script lang="ts">
	let { children } = $props();
</script>

<section class="bg-background min-h-screen">
	<header class="border-border bg-card/60 border-b px-4 py-3">
		<h1 class="text-lg font-semibold">Reception Console</h1>
	</header>
	<main class="px-4 py-6">
		{@render children?.()}
	</main>
</section>
