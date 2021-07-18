<script>
  import { modal } from '../store/modal';
  import Delete from '../components/Modals/Delete.svelte';
  import AddBook from '../components/Modals/AddBook.svelte';

  const modals = [
    { name: 'add-book', component: AddBook },
    { name: 'delete', component: Delete },
  ];
  $: selected = modals.find((mod) => mod.name === $modal.variant);
</script>

<div on:click={modal.hide} class="backdrop" />
<svelte:component this={selected.component} data={$modal.data} />

<style>
  .backdrop {
    height: 100vh;
    width: 100vw;
    background-color: rgba(54, 54, 54, 0.712);
    z-index: 998;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
