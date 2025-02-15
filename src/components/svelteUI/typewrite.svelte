<script lang="ts">
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let { text, ...props }: { text: string } = $props();
	let newText = $state(text);
	function hacker() {
		let interval: any = null;

		let iteration = 0;

		clearInterval(interval);

		interval = setInterval(() => {
			newText = newText
				.split("")
				.map((letter, index) => {
					if (index < iteration) {
						return text[index];
					}

					return letters[Math.floor(Math.random() * 26)];
				})
				.join("");

			if (iteration >= text.length) {
				clearInterval(interval);
			}

			iteration += 1 / 5;
		}, 30);
	}
</script>

<span
	onmouseover={hacker}
	{...props}>{newText}</span
>
