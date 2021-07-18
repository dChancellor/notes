<script>
  import { fade } from 'svelte/transition';
  import { activeBook, editable } from '../store/book';
  import Chapters from '../components/SortableChapters.svelte';
  import EditToggleButton from '../components/SubComponents/EditButton.svelte';
  import DeleteButton from '../components/SubComponents/DeleteButton.svelte';
  import TextField from '../components/SubComponents/TextField.svelte';
</script>

<div class="app">
  {#if !$activeBook}
    <h2 in:fade={{ duration: 500 }} class="no-active-book">Select a book on the left to get started</h2>
  {:else}
    <div class="header" out:fade={{ duration: 500 }}>
      <div class="edit-container">
        <EditToggleButton />
      </div>
      <TextField
        placeholder={'Unnamed Book'}
        textContent={$activeBook.title}
        id={`active-book-title`}
        on:save={({ detail: content }) => ($activeBook.title = content)}
      />
      {#if $editable}
        <div class="delete-container">
          <DeleteButton type={'book'} id={$activeBook.isbn} />
        </div>
      {/if}
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
    align-items: center;
    width: 90%;
    position: relative;
    margin-bottom: 1.5rem;
    font-size: clamp(1.7rem, 4vw, 2.5rem);
    font-weight: 800;
  }
  @media screen and (max-width: 900px) {
    .header {
      margin-left: 4rem;
      width: 75%;
    }
  }
  .no-active-book {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .delete-container {
    position: relative;
    height: 1.5rem;
    width: 1.5rem;
    right: 1rem;
  }
  .edit-container {
    position: absolute;
    height: 1.5rem;
    width: 1.5rem;
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
