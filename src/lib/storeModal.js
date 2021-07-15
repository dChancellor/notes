import { writable } from "svelte/store";

function base() {
  const { subscribe, set } = writable({ visible: false });
  return {
    subscribe,
    show: (variant) => set({ visible: true, variant }),
    hide: () => set({ visible: false }),
  };
}

export const modal = base();
