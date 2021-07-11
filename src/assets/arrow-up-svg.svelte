<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function sendClick() {
    dispatch('reorder-up');
  }
</script>

<svg on:click={sendClick} xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <title>An arrow buttonpointed up to move order of the chapter up 1.</title>
  <path
    fillRule="evenodd"
    d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
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
