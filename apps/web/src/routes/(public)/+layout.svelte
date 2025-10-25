<script lang="ts">
	let { children } = $props();
</script>

<main class="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-4 py-12">
	{@render children?.()}
</main>
