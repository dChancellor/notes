<script>
  import { modal } from '../../store/modal';
  import { books } from '../../store/book';

  export let data;
  let test;

  $: input = {
    is_fiction: true,
    title: '',
    isbn: '',
    authors: [''],
    pinned: true,
    active: false,
  };

  $: authorLabel = input.authors.length > 1 ? 'authors' : 'author';

  function checkRequired() {
    let authorValidity = input.authors.some((author) => author != '');
    if (input.is_fiction && input.title && input.isbn && authorValidity) {
      books.addNew(input);
      // TODO - Uncomment this when Mongo is hooked up
      // if (active) activeBook.activate(isbn);
      modal.hide();
    }
    // TODO Throw a warning if invalid
  }

  function removeAuthor(index) {
    input.authors = input.authors.filter((a, i) => i !== index);
  }
</script>

<div on:click={modal.hide} class="backdrop" />
<div class="modal">
  <h1>Add a book!</h1>
  <form>
    <div class="column">
      <label for="title">title: </label>
      <input
        required
        form="new-book"
        bind:value={input.title}
        type="text"
        id="title"
        placeholder="Enter the book title"
      />
      <label class="authors" for="authors"
        >{authorLabel}:
        {#each input.authors as author, index}
          <div class="author">
            <input
              form="new-book"
              required
              bind:value={author}
              type="author"
              id="author-{index}"
              placeholder="Enter the author's name"
            />
            <button on:click={() => removeAuthor(index)} type="button" class="delete-author">-</button>
          </div>
        {/each}
      </label>
      <button type={'button'} on:click={() => (input.authors = [...input.authors, ''])} class="add-author">+</button>
      <label for="isbn">isbn: </label>
      <input required form="new-book" bind:value={input.isbn} type="text" id="isbn" placeholder="Enter the isbn" />
    </div>
    <div class="column">
      <label for="fiction">Fiction </label>
      <input required id="fiction" type="radio" bind:group={input.is_fiction} name="is_fiction" value={true} />
      <label for="non-fiction">Non-fiction </label>
      <input required id="non-fiction" type="radio" bind:group={input.is_fiction} name="is_fiction" value={false} />
      <label for="pinned">pinned:</label>
      <input required id="pinned" type="checkbox" bind:checked={input.pinned} />
      <label for="active">active:</label>
      <input required id="active" type="checkbox" bind:checked={input.active} />
    </div>
    <!-- <div class="button-bar">
      <button formaction="" on:click|preventDefault={() => checkRequired()} class="submit">Submit</button>
      <button class="cancel">Cancel</button>
    </div> -->
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
    align-items: center;
  }
  form {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-self: center;
    gap: 1rem;
  }
  .column {
    display: flex;
    flex-flow: column nowrap;
  }
  .authors {
    display: flex;
    flex-flow: column nowrap;
  }
  .button-bar {
    display: flex;
    flex-flow: row wrap;
    gap: 1.4rem;
  }
</style>
