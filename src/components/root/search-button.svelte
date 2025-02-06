<script>
	import { cn } from "$/lib";
	import { newToast } from "$/toasts.svelte";
	import { Command } from "lucide-svelte";

	const { request, class: className } = $props();

	// import { isSearchOpen } from "$/lib";
	import { onDestroy, onMount } from "svelte";

	let isMac;
	try {
		isMac = navigator?.userAgentData?.platform === "macOS";
	} catch (e) {
		isMac = /Macintosh|Mac OS X/i.test(request);
	}

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
		if ((isMac ? event.metaKey : event.ctrlKey) && event.key === "k") {
			event.preventDefault(); // Prevents default browser behaviour
			openSearch();
		}
	}

	$effect(() => {
		window.addEventListener("keydown", handleKeydown);

		return () => {
			window.removeEventListener("keydown", handleKeydown);
		};
	});
</script>

<button
	disabled
	onclick={openSearch}
	class={cn(
		"flex-nowrap cursor-not-allowed items-center rounded-lg border border-grey-100/10 px-3 py-1 flex-row h-10 text-sm opacity-50 md:flex",
		className
	)}
	>Search
	<span class="ml-2 flex items-center gap-1 font-mono text-xs">
		<kbd>
			{#if isMac}
				<Command class="h-3 w-3 text-grey-500" />
			{:else}
				ctrl
			{/if}
		</kbd>+<kbd class=" text-grey-500">K</kbd>
	</span>
</button>
