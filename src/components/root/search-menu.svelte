<script lang="ts">
	import { createCombobox, melt } from "@melt-ui/svelte";
	import { Check, ChevronDown, ChevronUp } from "lucide-svelte";
	import { fly } from "svelte/transition";

	import { isSearchOpen } from "$/lib";

	type Manga = {
		author: string;
		title: string;
		disabled: boolean;
	};

	let mangas: Manga[] = [
		{
			author: "Kentaro Miura",
			title: "Berserk",
			disabled: false,
		},
		{
			author: "Hajime Isayama",
			title: "Attack on Titan",
			disabled: false,
		},
		{
			author: "Junji Ito",
			title: "Uzumaki",
			disabled: false,
		},
		{
			author: "Yomi Sarachi",
			title: "Steins Gate",
			disabled: false,
		},
		{
			author: "Tite Kubo",
			title: "Bleach",
			disabled: false,
		},
		{
			author: "Masashi Kishimoto",
			title: "Naruto",
			disabled: true,
		},
		{
			author: "Katsura Hoshino",
			title: "D.Gray Man",
			disabled: false,
		},
		{
			author: "Tsugumi Ohba",
			title: "Death Note",
			disabled: false,
		},
		{
			author: "ONE",
			title: "Mob Psycho 100",
			disabled: false,
		},
		{
			author: "Hiromu Arakawa",
			title: "Fullmetal Alchemist",
			disabled: false,
		},
	];

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, touchedInput },
		helpers: { isSelected },
	} = createCombobox({
		forceVisible: true,
	});

	let debounceTimer: ReturnType<typeof setTimeout>;

	const debounce = (callback: () => void) => {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(callback, 450);
	};

	let filteredMangas = mangas;

	$: {
		if ($touchedInput) {
			debounce(() => {
				filteredMangas = mangas.filter(({ title, author }) => {
					const normalizedInput = $inputValue.toLowerCase();
					return (
						title.toLowerCase().includes(normalizedInput) ||
						author.toLowerCase().includes(normalizedInput)
					);
				});
			});
		} else {
			filteredMangas = mangas;
		}
	}
</script>

{#if $isSearchOpen}
	<div
		class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-2xl w-full max-h-96 h-full border border-grey-100/20 rounded-xl bg-grey-950/20 backdrop-blur-md overflow-x-scroll overflow-hidden"
	>
		<input
			use:melt={$input}
			class="flex h-10 items-center justify-between rounded-lg bg-white w-full
px-3 pr-12 text-black"
			placeholder="Best book ever"
		/>
		<ul
			class="z-10 flex max-h-[325px] flex-col overflow-hidden rounded-lg"
			use:melt={$menu}
			transition:fly={{ duration: 150, y: -5 }}
		>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<div
				class="flex max-h-full flex-col gap-0 overflow-y-auto px-2 py-2 text-white"
				tabindex="0"
			>
				{#each filteredMangas as book, index (index)}
					<li
						use:melt={$option({
							value: book,
							label: book.title,
							disabled: book.disabled,
						})}
						class="relative cursor-pointer scroll-my-2 rounded-md py-2 pl-4 pr-4
					data-[highlighted]:bg-old-rose/50 data-[highlighted]:text-old-rose-900
					data-[disabled]:opacity-50"
					>
						<div class="pl-4">
							<span class="font-medium">{book.title}</span>
							<span class="block text-sm opacity-75">{book.author}</span>
						</div>
					</li>
				{:else}
					<li
						class="relative cursor-pointer rounded-md py-1 pl-8 pr-4
				data-[highlighted]:bg-old-rose/20 data-[highlighted]:text-magnum-700"
					>
						No results found
					</li>
				{/each}
			</div>
		</ul>
	</div>
{/if}
