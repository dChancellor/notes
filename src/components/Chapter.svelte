<script>
  import { fade } from 'svelte/transition';
  import { noteTypes } from '../lib/dictionary';
  import { activeBook, editable } from '../lib/storeBook';
  import ChevronButtons from './SubComponents/ChevronButtons.svelte';
  import DeleteButton from './SubComponents/DeleteButton.svelte';
  import DraggableDots from './SubComponents/DraggableDots.svelte';
  import EditButton from './SubComponents/EditButton.svelte';
  import TextArea from './SubComponents/TextArea.svelte';
  import Note from './Note.svelte';
  export let chapter;

  let expanded = false;
</script>

<div class="chapter" in:fade={{ duration: 200 }}>
  <div class="prefold">
    <ChevronButtons direction={'right'} {expanded} on:expand={() => (expanded = !expanded)} />
    <h2 class="chapter-header">Chapter {chapter.chapter_number}: &nbsp; {chapter.title}</h2>
    <TextArea
      placeholder={'Enter your chapter summary here. . .'}
      value={chapter.summary}
      id={`${chapter.id}-summary`}
      on:save={({ detail: content }) => (chapter.summary = content)}
    />
    <EditButton />
    {#if $editable}
      <DraggableDots />
      <DeleteButton id={chapter.id} type={'chapter'} />
    {/if}
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
    <div class="note-container">
      {#each chapter.notes as note (note.id)}
        <Note chapterID={chapter.id} {note} />
      {/each}
    </div>
  {/if}
</div>

<style>
  .chapter {
    display: flex;
    flex-flow: column nowrap;
    width: 90%;
    margin: 1rem 0;
    z-index: 2;
    position: relative;
    color: var(--clr-main-lightText);
  }
  .prefold {
    background-image: var(--clr-sidebar-background);
    border-radius: 10px;
    padding: 0.8rem 1.2rem;
    box-shadow: var(--clr-main-textAreaDropShadow);
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin: 0.5rem 0 0.5rem -0.5rem;
    position: relative;
    font-size: clamp(0.7rem, 1.2vw, 1rem);
  }
  .addNew-container {
    display: flex;
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
  @media screen (max-width: 990px) {
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
  .note-container {
    display: flex;
    flex-flow: column nowrap;
    gap: 0.1rem;
    margin-top: 1rem;
  }
</style>
