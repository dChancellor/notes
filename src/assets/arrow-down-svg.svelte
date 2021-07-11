<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function sendClick() {
    dispatch('reorder-down');
  }
</script>

<svg on:click={sendClick} xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <title>An arrow button pointed down to move order of the chapter down 1.</title>
  <path
    fillRule="evenodd"
    d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
    clipRule="evenodd"
  />
</svg>

<style>
  .h-5 {
    height: 1.5rem;
    cursor: pointer;
    filter: invert(100%);
    /* padding: 1rem; */
  }
</style>
