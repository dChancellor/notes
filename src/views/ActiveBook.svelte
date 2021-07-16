<script>
  import { fade } from 'svelte/transition';
  import { activeBook, editable } from '../lib/storeBook';
  import { bgFade } from '../lib/dictionary';
  import Chapters from '../lib/SortableList.svelte';
  import EditToggleButton from '../components/SubComponents/EditButton.svelte';
  import DeleteButton from '../components/SubComponents/DeleteButton.svelte';
  let transitionReady = true;
</script>

<div class="app">
  {#if !$activeBook}
    <h2 in:fade={{ duration: 500 }} class="no-active-book">Select a book on the left to get started</h2>
  {:else}
    <div class="header" out:fade={{ duration: 500 }}>
      <EditToggleButton />
      <!-- REVIEW This is ugly, would like to transition this to a single HTML element or my Textarea/Span fix -->
      {#if !$editable && transitionReady}
        <div class="title">
          {$activeBook.title}
        </div>
      {:else if $editable}
        <div
          transition:bgFade
          on:introstart={() => (transitionReady = false)}
          on:outroend={() => (transitionReady = true)}
          class="editable title"
          contenteditable="true"
          bind:textContent={$activeBook.title}
          on:blur={() => $activeBook.save}
        />
        <div class="trash-container">
          <DeleteButton type={'book'} id={$activeBook.isbn} />
        </div>
      {/if}
      <!-- END REVIEW -->
      <button on:click={activeBook.addChapter} class="add-chapter-button">Add Chapter</button>
    </div>
    <!-- REVIEW Perhaps clean this up and re-make it into universal tooling. But this works for now -->
    <Chapters />
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
    width: 80%;
    position: relative;
    margin-bottom: 1.5rem;
  }
  @media screen (max-width: 900px) {
    .header {
      margin-left: 4rem;
      width: 75%;
    }
  }
  .title {
    margin-left: 0.4rem;
    color: var(--clr-main-lightText);
    background-color: var(--clr-main-background);
    font-size: clamp(1.7rem, 4vw, 2.5rem);
    padding: 0.4rem 1rem 0.4rem 1rem;
    max-width: 65%;
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
  .add-chapter-button {
    padding: 0.7rem 1.8rem;
    border-radius: 10px;
    background-color: aqua;
    color: var(--clr-main-background);
    font-size: 1.2rem;
    box-shadow: var(--clr-main-textAreaDropShadow);
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    margin-left: auto;
    font-size: clamp(0.8rem, 1.2vw, 1rem);
  }
  .add-chapter-button:hover {
    filter: brightness(150%);
  }
  .add-chapter-button:active {
    filter: brightness(85%);
  }
</style>
