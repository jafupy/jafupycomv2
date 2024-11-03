import { vitePreprocess } from "@astrojs/svelte";
import { preprocessMeltUI, sequence } from "@melt-ui/pp";

export default {
	preprocess: sequence([
		// ... other preprocessors
		vitePreprocess(),
		preprocessMeltUI(), // add to the end!
	]),
};
