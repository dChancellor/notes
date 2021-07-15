<script>
  import { fly, fade } from 'svelte/transition';
  import { noteTypes } from '../lib/dictionary';
  import { activeBook, editable } from '../lib/storeBook';
  import ChevronButtons from './SubComponents/ChevronButtons.svelte';
  import DeleteButton from './SubComponents/DeleteButton.svelte';
  import EditButton from './SubComponents/EditButton.svelte';
  import TextArea from './SubComponents/TextArea.svelte';
  // import Note from './Note.svelte';
  export let chapter;

  let expanded = true;
</script>

<div class="chapter" out:fly={{ y: -40, duration: 500 }} in:fade={{ delay: 500, duration: 500 }}>
  <div class="prefold">
    <!-- <div class="header-container"> -->
    <ChevronButtons direction={'right'} {expanded} on:expand={() => (expanded = !expanded)} />
    <h2 class="chapter-header">Chapter {chapter.chapter_number}: &nbsp; {chapter.title}</h2>
    <TextArea
      placeholder={'Enter your chapter summary here. . .'}
      value={chapter.summary}
      id={`${chapter.id}-summary`}
    />
    <EditButton />
    {#if $editable}
      <DeleteButton object={chapter.id} />
    {/if}
    <!-- </div> -->
  </div>
  {#if expanded}
    <div class="addNew-container">
      <p>Add a new:</p>
      {#each noteTypes as type}
        <button
          on:click={() => {
            $editable = true;
            activeBook.addNote(chapter.id, type.name.toLowerCase());
          }}
          class="addNew-button button-{type.name}"
        >
          {type.name}
        </button>
      {/each}
    </div>
  {/if}
</div>

<!-- <div class="note-container">
      {#each chapter.notes as note (note.id)}
        <Note chapterID={chapter.id} {note} {editable} />
      {/each}
    </div> -->
<style>
  .edit-container {
    margin-left: auto;
  }
  .sort-order {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: -1;
    left: -45px;
    font-size: 0.8rem;
    color: var(--clr-main-lightText);
    user-select: none;
  }
  .reorder-buttons {
    display: flex;
    flex-flow: column nowrap;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -40px;
    z-index: -1;
  }
  .note-container {
    display: flex;
    flex-flow: column nowrap;
    gap: 0.1rem;
    margin-top: 1rem;
  }
  .chapter {
    display: flex;
    flex-flow: column nowrap;
    width: 90%;
    margin: 1rem 0;
    z-index: 2;
    position: relative;
  }
  .prefold {
    background-image: var(--clr-sidebar-background);
    border-radius: 10px;
    padding: .8rem 1.2rem;
    box-shadow: var(--clr-main-textAreaDropShadow);
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin: 0.5rem 0 0.5rem -0.5rem;
    position: relative;
  }
  .chapter-header {
    color: var(--clr-main-lightText);
  }
  .addNew-container {
    display: flex;
    background-color: var(--clr-neutral-300);
    flex-flow: row wrap;
    align-items: center;
    width: 100%;
    color: var(--clr-main-lightText);
    margin-top: 0.3rem;
    gap: 0.5rem;
  }
  .addNew-container p {
    margin: 0.8rem;
  }
  @media (max-width: 990px) {
    .addNew-container {
      justify-content: space-evenly;
    }
    .addNew-container p {
      width: 100%;
      text-align: center;
    }
  }
  .addNew-button {
    padding: 0.5rem 1.2rem;
    color: var(--clr-main-background);
    border-radius: 5px;
    font-size: 1.1rem;
    filter: contrast(70%);
    box-shadow: var(--clr-main-textAreaDropShadow);
    cursor: pointer;
    font-weight: 500;
  }
  .addNew-button:hover {
    filter: brightness(150%);
  }
  .addNew-button:active {
    filter: brightness(75%);
  }
  .button-Quote {
    background-image: var(--clr-notes-quote);
  }
  .button-Thought {
    background-image: var(--clr-notes-thought);
  }
  .button-Connection {
    background-image: var(--clr-notes-connection);
  }
  .button-Definition {
    background-image: var(--clr-notes-definition);
  }
  .button-Concept {
    background-image: var(--clr-notes-concept);
  }
</style>
