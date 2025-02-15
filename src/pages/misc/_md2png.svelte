<script>
	import { DownloadIcon, ClipboardIcon, X, GroupIcon } from "lucide-svelte";
	import html2canvas from "html2canvas";
	import { createTooltip, melt } from "@melt-ui/svelte";
	import { fade, fly } from "svelte/transition";
	import { cn } from "$/lib";
	import { newToast } from "$/toasts.svelte";
	import Stepper from "$/components/svelteUI/stepper.svelte";

	const {
		elements: { trigger: tooltipTrigger, content: tooltipContent },
		states: { open: tooltipOpen },
	} = createTooltip({
		positioning: {
			placement: "right",
		},
		openDelay: 500,
		closeDelay: 0,
		closeOnPointerDown: true,
		forceVisible: true,
	});

	let container = $state();
	let previewContainer;
	let snippet = $state("");
	let imageURL = $state(null);
	let showPreview = $state(false);

	let options = new (class {
		width = $state(0);
		height = $state(0);
		aspectRatio = $state(16 / 9);
		backgroundColor = $state("#0F1315");
		padding = $state([0, 0]);
	})();

	async function render() {
		const canvas = await html2canvas(container, {
			backgroundColor: "#0F1315",
			scale: 5,
		});
		imageURL = canvas.toDataURL();
	}

	const download = async () => {
		if (!snippet) {
			newToast({
				title: "No snippet!",
				description: "Please enter some HTML markup first!",
				variant: "error",
			});
			return;
		}
		await render();
		const downloadLink = document.createElement("a");
		downloadLink.href = imageURL;
		downloadLink.download = "image.png";
		downloadLink.click();
		newToast({
			title: "Downloaded!",
			description: "Your image has been downloaded!",
			variant: "success",
		});
	};
	async function copyToClipboard() {
		if (!snippet) {
			newToast({
				title: "No snippet!",
				description: "Please enter some HTML markup first!",
				variant: "error",
			});
			return;
		}

		const blob = await (await fetch(imageURL)).blob();
		await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
		newToast({
			title: "Copied!",
			description: "Your image has been copied to your clipboard!",
			variant: "success",
		});
	}

	$effect(() => {
		newToast({
			title: "Webframe is still in development!",
			description:
				"Webframe is not yet complete, but you're welcome to play with it anyways. ",
			variant: "warning",
		});
	});
</script>

<aside
	class="w-full max-w-xs px-4 py-2 pt-24 h-screen bg-grey-950/20 backdrop-blur-md flex flex-col justify-center items-center gap-4"
>
	<textarea
		placeholder="Enter your HTML Markup here..."
		name="input"
		id="input"
		class=" bg-black/20 rounded-md backdrop-blur-md border border-grey-100/10 p-4 resize-none w-full h-full font-mono"
		bind:value={snippet}
		oninput={render}
	></textarea>

	<!--  -->
	<span class="flex gap-0 items-center text-sm">
		<span
			class="border border-grey-100/10 p-1 rounded-l-md px-2 pl-2 h-full items-center flex"
			><GroupIcon class="size-5 " /></span
		>
		<Stepper
			bind:value={options.width}
			min={0}
			max={999}
			buttonClass="rounded-md"
			class="border rounded-l-none border-l-0 border-grey-100/10 rounded-r-lg p-1  bg-grey-800/20"
		/>
	</span>

	<!--  -->

	<div class="flex gap-0 items-center w-full transition-all">
		<button
			onclick={download}
			disabled={!snippet}
			class="rounded-l-lg px-4 py-2 text-sm font-semibold bg-grey-950/20 border border-grey-100/10 hover:border-grey-100/20 flex items-center h-9 rounded-r-sm w-full disabled:opacity-50"
			><DownloadIcon class="mr-2 h-4 w-4" /> Download PNG</button
		>
		<button
			onclick={copyToClipboard}
			class="rounded-r-lg px-4 py-2 text-sm font-semibold bg-grey-950/20 border border-grey-100/10 hover:border-grey-100/20 flex items-center h-9 disabled:opacity-50"
			disabled={!snippet}
			use:melt={$tooltipTrigger}
			><ClipboardIcon class="h-4 w-4" />
			<span class="sr-only">Copy Image to Clipboard</span></button
		>

		{#if $tooltipOpen}
			<div
				use:melt={$tooltipContent}
				transition:fly={{ duration: 100, x: -20 }}
				class="z-50 rounded-lg shadow bg-grey-950/20 backdrop-blur-md border border-grey-100/10"
			>
				<!-- <div use:melt={$arrow} /> -->
				<p class="px-4 py-1 text-sm">Copy Image to clipboard</p>
			</div>
		{/if}
	</div>
</aside>

<main
	class="relative prose-grey justify-center prose prose-invert mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center px-0 py-12 pt-24"
>
	{#if snippet}
		<div
			bind:this={container}
			in:fade={{ delay: 200, duration: 200 }}
			out:fade={{ duration: 200 }}
		>
			<div class="p-12 grid place-items-center">
				<div>
					{@html snippet}
				</div>
			</div>
		</div>
	{:else}
		<div
			class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
			in:fly={{ delay: 200, duration: 200, y: 20 }}
			out:fly={{ duration: 200, y: 20 }}
		>
			<h1 class="text-3xl font-semibold font-serif text-white">WebFrame</h1>
			<p class="">Create Pictures from HTML with ease.</p>
		</div>
	{/if}
</main>
