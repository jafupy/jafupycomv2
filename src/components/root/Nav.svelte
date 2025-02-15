<script lang="ts">
	import { assets, cn } from "$/lib";
	import {
		Command,
		FolderKanban,
		Hammer,
		MenuIcon,
		Newspaper,
		User,
		XIcon,
	} from "lucide-svelte";

	import Search from "./search-button.svelte";
	import { fly } from "svelte/transition";

	interface Props {
		light?: boolean;
	}

	const { children, light, locals } = $props();

	let isNavOpen = $state(false);
</script>

<header class="fixed inset-x-4 top-4 z-50 p-0">
	<nav
		class={cn(
			"not-prose group flex list-none items-center justify-center rounded-xl border p-1 text-sm backdrop-px gap-4",
			light
				? " border-grey-900/10 hover:border-grey-900/20"
				: " border-grey-100/10 hover:border-grey-100/20"
		)}
	>
		<a
			href="/"
			class="flex items-center justify-between gap-2 pr-4 mr-auto"
		>
			<img
				src={assets.logo}
				alt="Logo"
				class="h-10 w-10 rounded-lg"
			/>
			<span class="text-sm">Jafu.py</span>
		</a>
		<ul class="items-center gap-2 hidden sm:flex">
			<li class="group flex items-center">
				<a href="/#bio">
					<User
						strokeWidth={1}
						class="mr-2 inline h-4 w-4 text-old-rose"
					/>
					Bio</a
				>
			</li>
			<li class="group-[li] flex items-center mx-4">
				<a href="/blog?projects">
					<FolderKanban
						strokeWidth={1}
						class="mr-2 inline h-4 w-4 text-old-rose"
					/>
					Projects</a
				>
			</li>
			<li class="group flex items-center">
				<a href="/blog"
					><Newspaper
						strokeWidth="1"
						class="mr-2 inline h-4 w-4 text-old-rose"
					/> Blog</a
				>
			</li>

			<Search {locals} />
		</ul>
		<button
			onclick={() => (isNavOpen = !isNavOpen)}
			class="flex items-center justify-center rounded-lg h-10 aspect-square m-0 p-2 border border-grey-100/20 sm:hidden relative"
		>
			{#if !isNavOpen}
				<span
					in:fly={{ duration: 100, y: -20 }}
					out:fly={{ duration: 100, y: 20 }}
					class="absolute inset-0 flex items-center justify-center"
				>
					<MenuIcon
						strokeWidth="1"
						class="h-4 w-4"
					/>
				</span>
			{:else}
				<span
					class="absolute inset-0 flex items-center justify-center"
					in:fly={{ duration: 100, y: 20 }}
					out:fly={{ duration: 100, y: -20 }}
				>
					<XIcon
						strokeWidth="1"
						class="h-4 w-4"
					/>
				</span>
			{/if}
		</button>
	</nav>
</header>
{#if isNavOpen}
	<ul
		class="items-center gap-4 text-base flex flex-col fixed inset-x-4 bottom-4 top-1/3 bg-black/20 px-12 py-5 rounded-xl border border-grey-100/10 backdrop-blur-md"
	>
		<li class="group flex items-center">
			<a href="/#bio">
				<User
					strokeWidth={1}
					class="mr-2 inline h-4 w-4 text-old-rose"
				/>
				Bio</a
			>
		</li>
		<li class="group-[li] flex items-center mx-4">
			<a href="/blog?projects">
				<FolderKanban
					strokeWidth={1}
					class="mr-2 inline h-4 w-4 text-old-rose"
				/>
				Projects</a
			>
		</li>
		<li class="group flex items-center">
			<a href="/blog"
				><Newspaper
					strokeWidth="1"
					class="mr-2 inline h-4 w-4 text-old-rose"
				/> Blog</a
			>
		</li>

		<Search
			request={_req}
			class="w-full flex-none"
		/>
	</ul>
{/if}
