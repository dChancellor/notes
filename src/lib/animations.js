import { quartOut } from "svelte/easing";

// TODO - Refactor this to take in a color and dynamically change background opacity to 0
export function bgFade(node, params) {
  return {
    delay: params.delay || 0,
    duration: params.duration || 500,
    easing: params.easing || quartOut,
    css: (t, u) => `background-color: hsl(0, 0%, 25%, ${t}); box-shadow:none;`,
  };
}
