import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

import sanity from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
	integrations: [
		svelte(),
		tailwind(),
		react(),
		sanity({
			projectId: "mtg067gg",
			dataset: "production",
			// Set useCdn to false if you're building statically.
			useCdn: false,
		}),
	],

	server: {
		port: 3210,
		host: true,
	},

	vite: {
		resolve: {
			alias: {
				$: "/src",
			},
		},
	},
});
