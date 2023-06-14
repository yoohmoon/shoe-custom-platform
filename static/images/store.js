import { writable } from "svelte/store";

// export const theme = writable(false);
const theme = writable("light");

export { theme };
