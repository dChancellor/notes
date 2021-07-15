<script>
  import Chapters from '../lib/SortableList.svelte';
  import { activeBook, editable } from '../lib/storeBook';
  import { fade } from 'svelte/transition';
  import { bgFade } from '../lib/dictionary';
  import EditToggleButton from '../components/SubComponents/EditButton.svelte';
  import DeleteButton from '../components/SubComponents/DeleteButton.svelte';
</script>

<div class="app">
  {#if !$activeBook}
    <h2 in:fade={{ duration: 500 }} class="no-active-book">Select a book on the left to get started</h2>
  {:else}
    <div class="header">
      <EditToggleButton />
      <!-- REVIEW This is ugly, would like to transition this to a single HTML element or my Textarea/Span fix -->
      {#if !$editable}
        <div in:fade={{ duration: 0, delay: 500 }} class="title">
          {$activeBook.title}
        </div>
      {:else if $editable}
        <div out:bgFade class="editable title" contenteditable="true" bind:textContent={$activeBook.title} />
        <div class="trash-container">
          <DeleteButton object={$activeBook} />
        </div>
      {/if}
      <!-- END REVIEW -->
    </div>
    <!-- REVIEW Perhaps clean this up and re-make it into universal tooling. But this works for now -->
    <Chapters editable={$editable} />
  {/if}
</div>

<style>
  .app {
    height: calc(100vh - 40px);
    width: 100%;
    background-color: var(--clr-main-background);
    padding: 40px 0px 0px 40px;
    overflow: auto;
  }
  .header {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    max-width: 55vw;
    width: auto;
    position: relative;
    margin-bottom: 1.5rem;
  }
  .title {
    margin-left: 0.4rem;
    color: var(--clr-main-lightText);
    background-color: var(--clr-main-background);
    font-size: clamp(1.7rem, 4vw, 2.5rem);
    padding: 0.4rem 1rem 0.4rem 1rem;
    max-width: 70vw;
  }
  .title.editable {
    background-color: var(--clr-sidebar-searchBox);
    box-shadow: var(--clr-main-textAreaInsetShadow);
    border-radius: 5px;
  }
  .title:focus {
    box-shadow: var(--clr-main-textAreaDropShadow);
    outline: none;
  }
  .no-active-book {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .trash-container {
    position: relative;
    display: flex;
    align-items: center;
  }
</style>
