<script>
	import { newToast } from "$/toasts.svelte";
	import { Command } from "lucide-svelte";

	// import { isSearchOpen } from "$/lib";
	import { onDestroy, onMount } from "svelte";

	const openSearch = () => {
		// console.log("Click!");

		// if (!$isSearchOpen) {
		newToast({
			title: "Coming Soon",
			description: "The robots are still working on this feature.",
			variant: "error",
		});
		// }

		// $isSearchOpen = !$isSearchOpen;
	};

	function handleKeydown(event) {
		isMac = navigator.userAgentData.platform === "macOS";
		if ((isMac ? event.metaKey : event.ctrlKey) && event.key === "k") {
			event.preventDefault(); // Prevents default browser behaviour
			openSearch();
		}
	}

	onMount(() => {
		window.addEventListener("keydown", handleKeydown);
	});
	onDestroy(() => {
		window.removeEventListener("keydown", handleKeydown);
	});
</script>

<button
	on:click={openSearch}
	class=" cursor-not-allowed items-center rounded-lg border border-grey-100/10 px-3 py-1 h-10 text-sm opacity-50 md:flex"
	>Search
	<span class="ml-2 flex items-center gap-1 font-mono text-xs">
		<kbd>
			{#if navigator.userAgentData.platform === "macOS"}
				<Command class="h-3 w-3 text-grey-500" />
			{:else}
				ctrl
			{/if}
		</kbd>+<kbd class=" text-grey-500">K</kbd>
	</span>
</button>
