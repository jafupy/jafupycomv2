import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { writable } from "svelte/store";

import Banner from "./assets/Banner.png";
import Wikiredesign from "./assets/wikiredesign.png";

/**
 * Appends strings of classes. If non-truthy values are passed, they are ignored.
 * Uses tailwind-merge to merge tailwind classes.
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}
export const assets = {
	logo: "https://utfs.io/f/d9850d67-72a8-49ad-898e-0fb355fd9671-1zbfv.svg",
	banner: Banner,
	projects: {
		Wikiredesign,
	},
};
export const ghCDNConfig = {
	user: "jafupy",
	repo: "site-cdn",
};

export const tw = {
	prussianBlue: {
		200: "#EAEFEB",
		300: "#DCE1DE",
		400: "#AEC1B8",
		500: "#668988",
		600: "#354D5D",
		700: "#1E293B",
		800: "#12151F",
	},
};

/**
 * Hashes a string using SHA-256 and returns the hexadecimal digest.
 *
 * @param {string} inputString - The string to hash.
 * @return {Promise<string>} The hexadecimal hash of the string.
 */
async function hashString(inputString) {
	const encoder = new TextEncoder();
	const data = encoder.encode(inputString);

	const hashBuffer = await crypto.subtle.digest("SHA-256", data); // Hash the data

	// Convert the hash to a hexadecimal string
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");

	return hashHex;
}

// export const isSearchOpen = new writable(false);
console.log(await hashString("jafupy"));
