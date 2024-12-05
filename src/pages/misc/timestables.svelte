<script>
	import { newToast } from "$/toasts.svelte";
	const numbers = {
		a: 0,
		b: 0,
	};
	let input;
	let total = 0;

	function next() {
		numbers.a = Math.ceil(Math.random() * 12);
		numbers.b = Math.ceil(Math.random() * 12);
	}
	next();

	$: {
		input;

		if (input == numbers.a * numbers.b) {
			newToast({
				title: "Correct!",
				description: `${numbers.a} x ${numbers.b} = ${numbers.a * numbers.b}`,
				type: "success",
			});
			setTimeout(() => {
				next();
				input = null;
				total++;
			}, 200);
		}
	}
</script>

<div class="flex justify-center items-center text-xl">
	<p>{numbers.a} &times {numbers.b} =</p>
	<input
		type="number"
		class="bg-transparent rounded-t-md h-8 appearance-none border-0 outline-none border-b border-grey-100 focus:border-tw-inherit"
		bind:value={input}
	/>
</div>

<span class="fixed bottom-8 left-8"
	>You've completed <br /> {total} question{total !== 1 ? "s" : ""}</span
>
