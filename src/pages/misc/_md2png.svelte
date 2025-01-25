<script>
	import { DownloadIcon, ClipboardIcon } from "lucide-svelte";
	import html2canvas from "html2canvas";
	import { createTooltip, melt } from "@melt-ui/svelte";
	import { fly } from "svelte/transition";
	import { cn } from "$/lib";
	import { newToast } from "$/toasts.svelte";

	const {
		elements: { trigger, content, arrow },
		states: { open },
	} = createTooltip({
		positioning: {
			placement: "right",
		},
		openDelay: 500,
		closeDelay: 0,
		closeOnPointerDown: true,
		forceVisible: true,
	});

	let container;
	let previewContainer;
	let snippet = $state("");
	let imageURL = $state(null);

	const download = async () => {
		if (!snippet) {
			newToast({
				title: "No snippet!",
				description: "Please enter some HTML markup first!",
				variant: "error",
			});
			return;
		}
		const canvas = await html2canvas(container, {
			backgroundColor: "#0F1315",
			scale: 5,
		});
		imageURL = canvas.toDataURL();
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
		const canvas = await html2canvas(container, {
			backgroundColor: "#0F1315",
			scale: 5,
		});
		imageURL = canvas.toDataURL();
		const blob = await (await fetch(imageURL)).blob();
		await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
		newToast({
			title: "Copied!",
			description: "Your image has been copied to your clipboard!",
			variant: "success",
		});
	}
</script>

<aside
	class="w-full max-w-xs px-4 py-2 pt-24 h-screen bg-grey-950/20 backdrop-blur-md flex flex-col justify-center items-center gap-4"
>
	<h1 class="text-3xl font-semibold font-serif">WebFrame</h1>
	<p class="prose prose-grey">Create Pictures from HTML with ease.</p>
	<textarea
		placeholder="Enter your HTML Markup here..."
		name="input"
		id="input"
		class=" bg-black/20 rounded-md backdrop-blur-md border border-grey-100/10 p-4 resize-none w-full h-full font-mono"
		bind:value={snippet}
	></textarea>
	<div class="flex gap-0 items-center w-full">
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
			use:melt={$trigger}
			><ClipboardIcon class="h-4 w-4" />
			<span class="sr-only">Copy to Clipboard</span></button
		>

		{#if $open}
			<div
				use:melt={$content}
				transition:fly={{ duration: 100, x: -20 }}
				class="z-50 rounded-lg shadow bg-grey-950/20 backdrop-blur-md border border-grey-100/10"
			>
				<div use:melt={$arrow} />
				<p class="px-4 py-1 text-sm">Add item to library</p>
			</div>
		{/if}
	</div>
</aside>

<main
	class="prose-grey justify-center prose prose-invert mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center px-0 py-12 pt-24"
>
	<div bind:this={container}>
		<div class="p-12 grid place-items-center">
			<div>
				{@html snippet}
			</div>
		</div>
	</div>
</main>
