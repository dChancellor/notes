<script>
  import { editable } from '../store/book';
  import { fly } from 'svelte/transition';
  import TextField from './SubComponents/TextField.svelte';
  import DeleteButton from './SubComponents/DeleteButton.svelte';
  import ChevronButtons from './SubComponents/ChevronButtons.svelte';
  export let note;
  export let chapterID;

  let expanded = false;
</script>

<div in:fly={{ y: -40, duration: 500 }} out:fly={{ y: -10, duration: 400 }} class="note">
  <div class="prefold {note.note_type}">
    <p>{note.note_type[0].toUpperCase() + note.note_type.slice(1)}:</p>
    <TextField
      id={`${chapterID}-${note.id}-highlight`}
      placeholder={'Insert your highlight from the book here . . .'}
      textContent={note.highlight}
      on:save={({ detail: content }) => (note.highlight = content)}
    />
    <div class="chevron-force-right">
      <ChevronButtons {expanded} direction={'left'} on:expand={() => (expanded = !expanded)} />
    </div>
    {#if $editable}
      <DeleteButton id={{ note: note.id, chapter: chapterID }} type={'note'} />
    {/if}
  </div>
  {#if expanded}
    <div class="my-notes {note.note_type}">
      <TextField
        id={`${chapterID}-${note.id}-notes`}
        placeholder={'Insert your notes from the book here . . .'}
        textContent={note.content}
        on:save={({ detail: content }) => (note.highlight = content)}
      />
    </div>
  {/if}
</div>

<style>
  .note {
    width: clamp(83px, 90%, 1080px);
    position: relative;
    display:flex;
    flex-flow:column nowrap;
  }
  .prefold {
    width: 100%;
    padding: 0.3rem 0.4rem 0.3rem 1.2rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
    box-shadow: 1px 2px 2px 1px #1a1a1ad9;
    position: relative;
  }
  .note p {
    margin-right: auto;
    min-width: 7rem;
    color: rgba(252, 248, 201, 0.856);
  }
  .chevron-force-right {
    position: relative;
    min-width: 2rem;
  }
  .my-notes {
    width: 80%;
    align-self: center;
    padding: 0.5rem 0rem;
    border-radius: 0px 0px 10px 10px;
    box-shadow: 1px 2px 2px 1px #1a1a1ad9;
    padding: .5rem 1rem;
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
