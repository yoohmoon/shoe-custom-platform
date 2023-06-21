/* 
단순한 전역 상태 관리에는 적절한 방식이 아닐 수 있다.
modal의 depth가 깊지 않다면, store을 쓰지 않는게 나을 수 있다.

import { get, writable } from "svelte/store";

// let showModal = false;

const initialState = {
  showModal: false,
};

export const createModalState = () => {
  const modalState = writable(initialState);

  const toggleModal = () => {
    get(modalState).showModal.update((value) => !value);
    // get(modalState).showModal = !get(modalState).showModal;
  };

  return {
    toggleModal,
    set: modalState.set,
    update: modalState.update,
    subscribe: modalState.subscribe,
  };
};
 */
