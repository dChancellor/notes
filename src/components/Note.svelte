<script>
  import { activeBook, editable } from '../lib/storeBook';
  import { fly } from 'svelte/transition';
  import TextArea from './SubComponents/TextArea.svelte';
  import DeleteButton from './SubComponents/DeleteButton.svelte';
  import ChevronButtons from './SubComponents/ChevronButtons.svelte';
  export let note;
  export let chapterID;

  let expanded = false;
</script>

<div in:fly={{ y: -40, duration: 500 }} out:fly={{ y: -10, duration: 400 }} class="note">
  <div class="prefold {note.note_type}">
    <p>{note.note_type[0].toUpperCase() + note.note_type.slice(1)}:</p>
    <TextArea
      id={`${chapterID}-${note.id}-highlight`}
      value={note.highlight}
      placeholder={'Insert your highlight from the book here . . .'}
      on:save={({ detail: content }) => (note.highlight = content)}
    />
    <ChevronButtons {expanded} direction={'left'} on:expand={() => (expanded = !expanded)} />
    {#if $editable}
      <DeleteButton id={{ note: note.id, chapter: chapterID }} type={'note'} />
    {/if}
  </div>
  {#if expanded}
    <div class="my-notes {note.note_type}">
      <TextArea
        id={`${chapterID}-${note.id}-notes`}
        value={note.content}
        placeholder={'Insert your notes about this highlight here . . .'}
        on:save={({ detail: content }) => (note.content = content)}
      />
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
