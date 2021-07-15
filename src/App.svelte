<script>
  import { books, activeBook } from './lib/storeBook';
  import { modal } from './lib/storeModal';
  import { theme } from './lib/storeTheme';
  import Modal from './views/Modal.svelte';
  import Sidebar from './views/Sidebar.svelte';
  import Book from './views/ActiveBook.svelte';
  $: console.log($activeBook);
</script>

<main style={$theme}>
  {#if $modal.visible}
    <Modal />
  {/if}
  {#if !books}
    <!-- TODO Insert a cool loading animation here -->
    <h1>Loading books...!</h1>
  {:else}
    <Sidebar />
    <Book />
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-flow: row nowrap;
    height: 100vh;
    width: 100vw;
    background-color: var(--clr-main-background);
    justify-content: center;
    align-items: center;
  }
</style>
