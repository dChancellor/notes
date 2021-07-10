<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function sendClick() {
    dispatch('edit');
  }
</script>

<svg on:click={sendClick} xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <title>A chapter edit button.</title>
  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
  <path
    fillRule="evenodd"
    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
    clipRule="evenodd"
  />
</svg>

<style>
  .h-5 {
    height: 1.5rem;
    cursor: pointer;
    filter: invert(30%);
    margin-left: auto;
    fill: rgba(221, 221, 221, 0.411);
  }
  .h-5:hover {
    filter: drop-shadow(0px 0px 3px 4px #d4d4d456), brightness(150%);
    -webkit-filter: drop-shadow(0px 0px 5px #d4d4d456);
  }
</style>
