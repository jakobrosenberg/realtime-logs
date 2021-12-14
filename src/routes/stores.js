import { writable } from "svelte/store";

export const HOST = "//127.0.0.1:4512";

export const lastUpdatedFile = writable("");
export const files = writable([]);
