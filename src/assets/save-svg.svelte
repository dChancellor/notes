<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function sendClick() {
    dispatch('edit');
  }
</script>

<svg on:click={sendClick} xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <title>A chapter save edits button.</title>
  <path
    fillRule="evenodd"
    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
    clipRule="evenodd"
  />
</svg>

<style>
  .h-5 {
    height: 1.5rem;
    cursor: pointer;
    filter: invert(30%);
    margin-left: auto;
    fill: rgb(0, 151, 0);
  }
  .h-5:hover {
    filter: drop-shadow(0px 0px 3px 4px #d4d4d456), brightness(150%);
    -webkit-filter: drop-shadow(0px 0px 5px #d4d4d456);
  }
</style>
