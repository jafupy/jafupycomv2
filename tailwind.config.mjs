import tw, { transparent, yellow } from "tailwindcss/colors";
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";

export const colors = {
	grey: {
		50: "#EEF6F8",
		100: "#D3DFE1",
		200: "#B8C8CB",
		300: "#9FAFB4",
		400: "#87969D",
		500: "#717D87",
		600: "#5B6570",
		700: "#464F59",
		800: "#333A42",
		900: "#20262C",
		950: "#0F1315",
	},
	green: tw.emerald,
	red: tw.rose,
	blue: {
		50: "#EBECF0",
		100: "#C8CDE9",
		200: "#A3A9D9",
		300: "#7F85C3",
		400: "#5C5FA0",
		500: "#454687",
		600: "#343260",
		700: "#282645",
		800: "#181626",
		900: "#1F1D34",
		950: "#15131F",
	},
	yellow: {
		50: "#13140E",
		100: "#F3F7ED",
		200: "#EFF3D2",
		300: "#E3E9BA",
		400: "#D4D39F",
		500: "#B5B47F",
		600: "#82814F",
		700: "#515732",
		800: "#353922",
		900: "#26281A",
		950: "#1B1D14",
	},
	black: tw.black,
	white: tw.white,
	transparent: tw.transparent,
	tw,
};

/** @type {import('tailwindcss').Config} */
const config = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	prefix: "",
	theme: {
		fontFamily: {
			sans: ["Manrope", "sans-serif"],
			mono: ["JetBrains Mono", "monospace"],
			serif: ['"Brygada 1918"', "serif"],
		},
		colors,
		extend: {
			typography: ({ theme }) => ({
				grey: {
					css: {
						"--tw-prose-body": theme("colors.grey[200]"),
						"--tw-prose-headings": theme("colors.grey[100]"),
						"--tw-prose-lead": theme("colors.grey[300]"),
						"--tw-prose-links": theme("colors.grey[100]"),
						"--tw-prose-bold": theme("colors.grey[100]"),
						"--tw-prose-counters": theme("colors.grey[400]"),
						"--tw-prose-bullets": theme("colors.grey[600]"),
						"--tw-prose-hr": theme("colors.grey[700]"),
						"--tw-prose-quotes": theme("colors.grey[100]"),
						"--tw-prose-quote-borders": theme("colors.grey[700]"),
						"--tw-prose-captions": theme("colors.grey[100]"),
						"--tw-prose-code": theme("colors.grey[100]"),
						"--tw-prose-pre-code": theme("colors.grey[900]"),
						"--tw-prose-pre-bg": theme("colors.grey[900]"),
						"--tw-prose-th-borders": theme("colors.grey[700]"),
						"--tw-prose-td-borders": theme("colors.grey[800]"),

						"--tw-prose-invert-body": theme("colors.grey[200]"),
						"--tw-prose-invert-headings": theme("colors.white"),
						"--tw-prose-invert-lead": theme("colors.grey[300]"),
						"--tw-prose-invert-links": theme("colors.white"),
						"--tw-prose-invert-bold": theme("colors.white"),
						"--tw-prose-invert-counters": theme("colors.grey[400]"),
						"--tw-prose-invert-bullets": theme("colors.grey[600]"),
						"--tw-prose-invert-hr": theme("colors.grey[700]"),
						"--tw-prose-invert-quotes": theme("colors.grey[100]"),
						"--tw-prose-invert-quote-borders": theme("colors.grey[700]"),
						"--tw-prose-invert-captions": theme("colors.grey[400]"),
						"--tw-prose-invert-code": theme("colors.white"),
						"--tw-prose-invert-pre-code": theme("colors.grey[300]"),
						"--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
						"--tw-prose-invert-th-borders": theme("colors.grey[600]"),
						"--tw-prose-invert-td-borders": theme("colors.grey[700]"),
					},
				},
			}),
			colors: {
				"old-rose": {
					DEFAULT: "hsl(359deg, 38.1%, 67.1%)" /* #CB8B8C */,
					200: "hsl(0deg, 16.7%, 92.9%)",
					300: "hsl(0deg, 22.2%, 89.4%)",
					400: "hsl(0deg, 32.7%, 79.6%)",
					500: "hsl(359deg, 38.1%, 67.1%)",
					600: "hsl(0deg, 24.4%, 44.1%)",
					700: "hsl(358deg, 26.2%, 20.2%)",
					800: "hsl(0deg, 24%, 9.8%)",
				},
				"prussian-blue": {
					DEFAULT: "#1E293B",
					200: "#EAEFEB",
					300: "#DCE1DE",
					400: "#AEC1B8",
					500: "#668988",
					600: "#354D5D",
					700: "#1E293B",
					800: "#12151F",
				},
			},
			spacing: {
				"ch-sm": "60ch",
				"ch-md": "75ch",
				"ch-lg": "90ch",
				"ch-xl": "120ch",
			},
			keyframes: {
				"accordion-down": {
					from: { width: "0" },
					to: { width: "initial" },
				},
				"accordion-up": {
					from: { width: "initial" },
					to: { width: "0" },
				},
				"h-open": {
					from: { height: "0" },
					to: { height: "initial" },
				},
				"h-close": {
					from: { height: "initial" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [typography, forms],
};

export default config;
