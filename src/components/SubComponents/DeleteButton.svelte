<script>
  import { fly, fade } from 'svelte/transition';
  import { modal } from '../../store/modal';
  export let type;
  export let id;
</script>

<div class="trash-container" transition:fly={{ x: -40, duration: 500 }}>
  <svg
    out:fade={{ duration: 200 }}
    on:click={() => modal.show({ variant: 'delete', data: { type, id } })}
    xmlns="http://www.w3.org/2000/svg"
    class="delete"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
</div>

<style>
  .trash-container {
    position: absolute;
    display: flex;
    align-items: center;
    margin-right: 1.7rem;
    right: -4rem;
  }
  .delete {
    cursor: pointer;
    color: #8f1818;
    height: 1.5rem;
  }
  .delete:hover {
    filter: brightness(200%);
  }
</style>
