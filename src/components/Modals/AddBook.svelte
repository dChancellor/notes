<script>
  import { modal } from '../../lib/storeModal';
  import { books, activeBook } from '../../lib/storeBook';
  import { v4 as uuidv4 } from 'uuid';

  export let data;

  let is_fiction = true;
  let title = 'Test';
  let isbn = uuidv4();
  let authors = ['Bob', 'Susan'];
  let pinned = true;
  let active = true;
  $: authorLabel = authors.length > 1 ? 'authors' : 'author';
  function checkRequired() {
    let authorValidity = authors.some((author) => author != '');
    if (is_fiction && title && isbn && authorValidity) {
      books.addNew({ title, isbn, authors, pinned, active: false, is_fiction });
      // TODO - Uncomment this when Mongo is hooked up
      // if (active) activeBook.activate(isbn);
      modal.hide();
    }
    // TODO Throw a warning if invalid
  }
</script>

<div on:click={modal.hide} class="backdrop" />
<div class="modal">
  <h1>Add a book!</h1>
  <form>
    <label for="title">title: </label>
    <input required form="new-book" bind:value={title} type="text" id="title" placeholder="Enter the book title" />
    <label for="authors"
      >{authorLabel}:
      {#each authors as author, index}
        <input
          form="new-book"
          required
          bind:value={author}
          type="author"
          id="author-{index}"
          placeholder="Enter the author's name"
        />
        <button class="delete-author">-</button>
      {/each}
    </label>
    <button type={'button'} on:click={() => (authors = [...authors, ''])} class="add-author">+</button>
    <label for="isbn">isbn: </label>
    <input required form="new-book" bind:value={isbn} type="text" id="isbn" placeholder="Enter the isbn" />

    <label for="fiction">Fiction </label>
    <input required id="fiction" type="radio" bind:group={is_fiction} name="is_fiction" value={true} />
    <label for="non-fiction">Non-fiction </label>
    <input required id="non-fiction" type="radio" bind:group={is_fiction} name="is_fiction" value={false} />

    <label for="pinned">pinned:</label>
    <input required id="pinned" type="checkbox" bind:checked={pinned} />
    <label for="active">active:</label>
    <input required id="active" type="checkbox" bind:checked={active} />
    <div class="button-bar">
      <button formaction="" on:click|preventDefault={() => checkRequired()} class="submit">Submit</button>
      <button class="cancel">Cancel</button>
    </div>
  </form>
</div>

<style>
  .modal {
    height: auto;
    width: auto;
    z-index: 999;
    background-color: var(--clr-main-background);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: aqua;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    padding: 2rem 2rem;
    border-radius: 10px;
  }
  .button-bar {
    display: flex;
    flex-flow: row wrap;
    gap: 1.4rem;
  }
</style>
