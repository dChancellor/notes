<script>
  import { modal } from '../../lib/storeModal';
  import { activeBook, books } from '../../lib/storeBook';
  export let data;

  function del() {
    switch (data.type) {
      case 'book':
        activeBook.deleteBook(data.id);
        books.remove(data.id);
        break;
      case 'chapter':
        activeBook.deleteChapter(data.id);
        activeBook.reorder($activeBook.chapters);
        break;
      case 'note':
        activeBook.deleteNote(data.id.chapter, data.id.note);
        break;
    }
    modal.hide();
  }
</script>

<div on:click={() => modal.hide()} class="backdrop" />
<div class="modal">
  <h1>Are you sure you want to delete this {data.type}?</h1>
  <div class="button-bar">
    <button on:click={() => del()} class="confirm">Confirm</button>
    <button on:click={() => modal.hide()} class="cancel">Cancel</button>
  </div>
</div>

<style>
  h1 {
    text-align: center;
  }
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
  button {
    margin-top: 1.5rem;
    border-radius: 5px;
    padding: 1rem 2rem;
    color: var(--clr-main-background);
    font-size: 1.2rem;
  }
  .confirm {
    background-color: rgb(54, 124, 54);
  }
  .cancel {
    background-color: rgb(104, 67, 67);
  }
  button:hover {
    filter: brightness(150%);
  }
</style>
