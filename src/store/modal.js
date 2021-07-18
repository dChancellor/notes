import { writable } from "svelte/store";

function base() {
  // const { subscribe, set } = writable({ visible: false });
  const { subscribe, set } = writable({ visible: true, variant: "add-book" });
  return {
    subscribe,
    show: ({ variant, data }) => set({ visible: true, variant, data }),
    hide: () => set({ visible: false }),
  };
}

export const modal = base();
