<script>
  import { books } from './store/book';
  import { modal } from './store/modal';
  import { theme } from './store/theme';
  import Modal from './views/ModalSelector.svelte';
  import Sidebar from './views/Sidebar.svelte';
  import Book from './views/ActiveBook.svelte';
  // REVIEW Delete this for production
  let development = false;
</script>

<main style={$theme}>
  <!-- REVIEW Delete this block for production -->
  {#if development}
    <div class="portfolio-bar">
      <p class="verbage">This is an example sandbox experience - you can try various modes here:</p>
      <div class="buttons">
        <button on:click={() => books.swap('short')} class="portfolio-button">Small Data</button>
        <button on:click={() => books.swap('long')} class="portfolio-button">Large Data</button>
        <!-- TODO Add functionality back to this button once I load in personal notes -->
        <button class="portfolio-button">My Data</button>
      </div>
    </div>
  {/if}
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
  .portfolio-bar {
    display: flex;
    align-items: center;
    width: 40rem;
    background-image: var(--clr-sidebar-background);
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 1.2rem;
    z-index: 997;
    padding: 1rem 5rem;
    border-radius: 10px 0px 0px 0px;
    box-shadow: -1px -1px 2px 2px rgba(19, 19, 19, 0.321);
    text-align: end;
    font-family: 'Poppins', sans-serif;
    color: var(--clr-main-lightText);
    font-size: 1.4rem;
  }
  .buttons {
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
    margin-left: 3rem;
  }
  .portfolio-button {
    padding: 0.4rem 4rem;
    background-image: linear-gradient(hsl(180, 80%, 40%), hsl(180, 90%, 25%));
    color: var(--clr-main-background);
    cursor: pointer;
    font-size: 1.1rem;
    font-family: 'Poppins', sans-serif;
    border-radius: 10px;
    box-shadow: var(--clr-main-textAreaDropShadow);
  }
  .portfolio-button:hover {
    filter: brightness(150%);
  }
  @media screen and (max-width: 900px) {
    .portfolio-bar {
      width: auto;
      margin: 1rem 1rem;
      padding: 1rem;
      left: 0;
      right: 0;
    }
  }
</style>
