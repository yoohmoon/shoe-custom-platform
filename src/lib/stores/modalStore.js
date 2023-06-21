import { writable } from "svelte/store";

export const showModal = writable(false);

export const toggleModal = () => {
  showModal.update((value) => !value);
};
