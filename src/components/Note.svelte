<script>
  import { activeBook } from '../lib/store';
  import { fly } from 'svelte/transition';
  import ChevronDown from '../assets/chevron-down-svg.svelte';
  import ChevronLeft from '../assets/chevron-left-svg.svelte';
  import DeleteButton from '../assets/delete-svg.svelte';
  import TextArea from './SubComponents/TextArea.svelte';
  export let note;
  export let editable;
  export let chapterID;

  let expanded = false;

  function handleEvent({ type }) {
    if (type === 'expand') expanded = !expanded;
  }
</script>

<div in:fly={{ y: -40, duration: 500 }} class="note">
  <div class="prefold {note.note_type}">
    <p>{note.note_type[0].toUpperCase() + note.note_type.slice(1)}:</p>
    <TextArea
      {editable}
      id={`${chapterID}-${note.id}-highlight`}
      initialValue={note.highlight}
      placeholder={'Insert your highlight from the book here . . .'}
    />
    {#if expanded}
      <ChevronDown on:expand={handleEvent} />
    {:else}
      <ChevronLeft on:expand={handleEvent} />
    {/if}
  </div>
  {#if expanded}
    <div class="my-notes {note.note_type}">
      <TextArea
        {editable}
        id={`${chapterID}-${note.id}-notes`}
        initialValue={note.content}
        placeholder={'Insert your notes about this highlight here . . .'}
      />
    </div>
  {/if}
  {#if editable}
    <div transition:fly={{ x: -40, duration: 500 }} class="trash">
      <DeleteButton objectType={'note'} callback={() => activeBook.deleteNote(chapterID, note.id)} />
    </div>
  {/if}
</div>

<style>
  .note {
    display: flex;
    flex-flow: column nowrap;
    width: clamp(83px, 90%, 980px);
    margin-top: 0.3rem;
    align-items: flex-start;
    position: relative;
  }
  .prefold {
    width: 100%;
    padding: 0.3rem 1.2rem;
    border-radius: 10px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    box-shadow: 1px 2px 2px 1px #1a1a1ad9;
    position: relative;
  }
  .note p {
    margin-right: auto;
    min-width: 100px;
    color: rgba(252, 248, 201, 0.856);
    text-align: center;
  }
  .trash {
    position: absolute;
    right: -90px;
    height: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.5rem;
    z-index: 1;
  }
  .my-notes {
    width: 80%;
    margin-left: 5rem;
    align-self: center;
    padding: 0.5rem 0rem;
    border-radius: 0px 0px 10px 10px;
    box-shadow: 1px 2px 2px 1px #1a1a1ad9;
  }
  .quote {
    background-color: var(--clr-notes-quoteBackground);
  }
  .thought {
    background-color: var(--clr-notes-thoughtBackground);
  }
  .connection {
    background-color: var(--clr-notes-connectionBackground);
  }
  .definition {
    background-color: var(--clr-notes-definitionBackground);
  }
  .concept {
    background-color: var(--clr-notes-conceptBackground);
  }
</style>
