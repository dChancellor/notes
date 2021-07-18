<script>
  import { fade } from 'svelte/transition';
  import { noteTypes } from '../lib/dictionary';
  import { activeBook, editable } from '../store/book';
  import ChevronButtons from './SubComponents/ChevronButtons.svelte';
  import DeleteButton from './SubComponents/DeleteButton.svelte';
  import EditButton from './SubComponents/EditButton.svelte';
  import TextField from './SubComponents/TextField.svelte';
  import Note from './Note.svelte';
  export let chapter;

  let expanded = false;
</script>

<div class="chapter" in:fade={{ duration: 200 }}>
  <div class="prefold">
    <ChevronButtons direction={'right'} {expanded} on:expand={() => (expanded = !expanded)} />
    <div class="chapter-content">
      <h2 class="chapter-header">
        Chapter &nbsp; {chapter.chapter_number}: &nbsp;
        <TextField
          id={`${chapter.id}-title`}
          textContent={chapter.title}
          noBG={true}
          placeholder={'Enter a chapter title. . .'}
          on:save={({ detail: content }) => (chapter.title = content)}
        />
      </h2>
      <TextField
        placeholder={'Enter your chapter summary here. . .'}
        textContent={chapter.summary}
        id={`${chapter.id}-summary`}
        on:save={({ detail: content }) => (chapter.summary = content)}
      />
    </div>
    <EditButton />
    {#if $editable}
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
    color: var(--clr-main-lightText);
    padding-left: 1rem;
  }
  .prefold {
    background-image: var(--clr-sidebar-background);
    border-radius: 10px;
    padding: 0.8rem 1.2rem;
    box-shadow: var(--clr-main-textAreaDropShadow);
    display: flex;
    align-items: center;
    margin: 0.5rem 0 0.5rem -0.5rem;
    position: relative;
    min-height: 3rem;
  }
  .chapter-content {
    display: flex;
    align-items: center;
    margin-left: 2.4rem;
    font-size: clamp(0.8rem, 0.7vw, 1rem);
    gap: 0.4rem;
    width: 90%;
  }
  .chapter-header {
    font-size: clamp(1rem, 1.3vw, 1.4rem);
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
  .edit-container {
    height: 1.5rem;
    right: 4%;
    position: absolute;
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
  @media screen and (max-width: 990px) {
    .chapter-content {
      flex-flow: row wrap;
      width: 80%;
    }
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
    font-weight: 600;
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
    gap: 0.4rem;
    margin-top: 1rem;
  }
</style>
