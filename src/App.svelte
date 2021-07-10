<script>
  import { activeBook, books, pinnedBooks, theme, deleteThis } from './lib/store.js';
  import DeleteModal from './components/DeleteModal.svelte';
  import Sidebar from './components/Sidebar.svelte';
  import Main from './components/Main.svelte';
  const { data, savedPins, lastActive } = $books;
  $: pinnedBooks.define(savedPins);
  $: activeBook.define(lastActive);
</script>

<main style={$theme}>
  {#if !data}
    <h1 class="loading">Loading books...!</h1>
  {/if}
  {#if $deleteThis.show}
    <DeleteModal />
  {/if}
  <Sidebar />
  <Main />
</main>

<style>
  main {
    display: flex;
    flex-flow: row nowrap;
    overflow: none;
    --clr-main-background: var(--main-background);
    --clr-main-lightText: var(--main-lightText);
    --clr-main-darkText: var(--main-darkText);
    --clr-main-textAreaDropShadow: var(--main-textAreaDropShadow);
    --clr-main-textAreaInsetShadow: var(--main-textAreaInsetShadow);
    --clr-sidebar-background: var(--sidebar-background);
    --clr-sidebar-pinnedBook: var(--sidebar-pinnedBook);
    --clr-sidebar-activeBook: var(--sidebar-activeBook);
    --clr-sidebar-defaultBook: var(--sidebar-defaultBook);
    --clr-sidebar-authorText: var(--sidebar-authorText);
    --clr-sidebar-searchBox: var(--sidebar-searchBox);
    --clr-sidebar-scrollThumb: var(--sidebar-scrollThumb);
    --clr-sidebar-scrollBackground: var(--sidebar-scrollBackground);
    --clr-sidebar-unlocked: var(--sidebar-unlocked);
    --clr-sidebar-locked: var(--sidebar-locked);
    --clr-sidebar-activeGradient: var(--sidebar-activeGradient);
    --clr-sidebar-pinnedGradient: var(--sidebar-pinnedGradient);
    --clr-sidebar-bookwise: var(--sidebar-bookwise);
    --clr-notes-quote: var(--notes-quote);
    --clr-notes-quoteBackground: var(--notes-quoteBackground);
    --clr-notes-connection: var(--notes-connection);
    --clr-notes-connectionBackground: var(--notes-connectionBackground);
    --clr-notes-thought: var(--notes-thought);
    --clr-notes-thoughtBackground: var(--notes-thoughtBackground);
    --clr-notes-concept: var(--notes-concept);
    --clr-notes-conceptBackground: var(--notes-conceptBackground);
    --clr-notes-definition: var(--notes-definition);
    --clr-notes-definitionBackground: var(--notes-definitionBackground);
  }
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
  }
</style>
