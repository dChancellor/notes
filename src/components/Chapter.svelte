<script>
  import { fly, fade } from 'svelte/transition';
  import { settings } from '../lib/config';
  import { activeBook } from '../lib/store';
  import Note from './Note.svelte';
  import TextArea from './TextArea.svelte';
  import ChevronDown from '../assets/chevron-down-svg.svelte';
  import ChevronRight from '../assets/chevron-right-svg.svelte';
  import EditButton from '../assets/edit-svg.svelte';
  import SaveButton from '../assets/save-svg.svelte';
  import DeleteButton from '../assets/delete-svg.svelte';
  export let chapter;

  let { noteTypes } = settings;

  let expanded = true;
  let editable = true;

  function handleEvent({ type }) {
    if (type === 'expand') expanded = !expanded;
    if (type === 'edit') {
      expanded = true;
      editable = !editable;
    }
  }
</script>

<div class="chapter" out:fly={{ y: -40, duration: 500 }} in:fade={{ delay: 500, duration: 500 }}>
  <div class="prefold">
    <div class="header-container">
      {#if expanded}
        <ChevronDown on:expand={handleEvent} />
      {:else}
        <ChevronRight on:expand={handleEvent} />
      {/if}
      <h2 class="chapter-title">Chapter {chapter.chapter_number}: {chapter.title}</h2>
      <TextArea
        placeholder={'Enter your chapter summary here. . .'}
        initialValue={chapter.summary}
        {editable}
        id={`${chapter.id}-summary`}
      />
      {#if !editable}
        <EditButton on:edit={handleEvent} />
      {:else}
        <SaveButton on:edit={handleEvent} />
      {/if}
      {#if editable}
        <div class="trash" transition:fly={{ x: -40, duration: 500 }}>
          <DeleteButton objectType={'chapter'} callback={() => activeBook.deleteChapter(chapter.id)} />
        </div>
      {/if}
    </div>
  </div>
  {#if expanded}
    <div class="addNew-container">
      <p>Add a new:</p>
      {#each noteTypes as type}
        <button
          on:click={() => {
            editable = true;
            activeBook.addNote(chapter.id, type.name.toLowerCase());
          }}
          class="addNew-button button-{type.name}"
        >
          {type.name}
        </button>
      {/each}
    </div>
    <div class="note-container">
      {#each chapter.notes as note}
        <Note chapterID={chapter.id} {note} {editable} />
      {/each}
    </div>
  {/if}
</div>

<style>
  .trash {
    position: absolute;
    right: -70px;
    height: 1.5rem;
    width: 1.5rem;
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
    margin: 2rem 0;
    z-index: 2;
    position: relative;
  }
  .prefold {
    background-image: var(--clr-sidebar-background);
    border-radius: 10px;
    padding: 0rem 1.2rem;
    box-shadow: var(--clr-main-textAreaDropShadow);
  }
  .header-container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin: 0.5rem 0 0.5rem -0.5rem;
    position: relative;
  }
  .chapter-title {
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
