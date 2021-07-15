<script>
  import { fly, fade } from 'svelte/transition';
</script>

<div transition:fly={{ x: 40, duration: 500 }} class="dots-container">
  <svg transition:fade={{ duration: 150 }} xmlns="http://www.w3.org/2000/svg" class="dots" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
    />
  </svg>
</div>

<style>
  .dots-container {
    position: absolute;
    left: -40px;
    z-index: 99;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .dots {
    fill: hsl(180, 19%,20%);
    stroke: hsl(180, 19%, 20%);
    stroke-width: 2px;
    height: 3rem;
    cursor: pointer;
    z-index: 1;
  }
  .dots:hover {
    filter: brightness(150%);
  }
</style>
