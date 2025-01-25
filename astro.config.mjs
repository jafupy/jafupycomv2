import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sanity from "@sanity/astro";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
	output: "static",

	integrations: [
		svelte(),
		tailwind(),
		react(),
		sanity({
			projectId: "mtg067gg",
			dataset: "production",
			projectId: "mtg067gg",
			dataset: "production",
			useCdn: true,

			studioBasePath: "/sanity",
		}),
	],

	server: {
		port: 3210,
		host: true,
	},

	vite: {
		build: {
			rollupOptions: {
				external: ["html2canvas"],
			},
		},
		resolve: {
			alias: {
				$: "/src",
			},
		},
	},

	experimental: {
		svg: true,
	},

	adapter: vercel({
		// isr: true,
		// maxDuration: 7 * 24 * 60 * 60, // Weekly
		// excludeFiles
	}),
});
