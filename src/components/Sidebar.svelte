<script>
  import { books, activeBook, pinnedBooks } from '../lib/store';
  import { flip } from 'svelte/animate';
  import { circInOut } from 'svelte/easing';
  import OpenLock from '../assets/unlocked-svg.svelte';
  import ClosedLock from '../assets/locked-svg.svelte';

  let search = '';

  $: pinnedISBNs = $pinnedBooks.reduce((array, book) => [...array, book.isbn], []);

  $: filtered = () => {
    return search.length === 0
      ? $books.data
      : $books.data.filter((book) => {
          return (
            book.isbn === $activeBook?.isbn ||
            pinnedISBNs.includes(book.isbn) ||
            book.title.toLowerCase().startsWith(search.toLowerCase())
          );
        });
  };
</script>

<div class="sidebar">
  <input bind:value={search} class="search" placeholder="Filter by title.." />
  <div class="books">
    {#each filtered() as book (book.isbn)}
      <div
        class="book"
        class:isActive={book.isbn === $activeBook?.isbn}
        class:isPinned={pinnedISBNs.includes(book.isbn)}
        animate:flip={{ duration: 500, easing: circInOut }}
        on:click={() => (book.isbn === $activeBook?.isbn ? activeBook.reset() : activeBook.activate(book))}
      >
        <h3>{book.title}</h3>
        {#each book.authors.slice(0, 2) as author}
          <p class="author">{author}</p>
        {/each}
        {#if book.isbn === $activeBook?.isbn && !pinnedISBNs.includes(book.isbn)}
          <div on:click|stopPropagation={() => pinnedBooks?.pin(book)} class="lock-button">
            <OpenLock />
          </div>
        {/if}
        {#if pinnedISBNs.includes(book.isbn)}
          <div on:click|stopPropagation={() => pinnedBooks?.unpin(book.isbn)} class="lock-button">
            <ClosedLock />
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .sidebar {
    width: min(70%, 20rem);
    height: 100vh;
    background-image: var(--clr-sidebar-background);
    gap: 20px;
    padding-right: 5px;
  }
  @media (max-width: 900px) {
    .sidebar {
      display: none;
    }
  }
  .search {
    width: 90%;
    height: 2.5rem;
    margin: 1.25rem 0.8rem;
    position: sticky;
    border: none;
    border-radius: 5px;
    text-align: center;
    color: var(--clr-main-lightText);
    box-shadow: var(--clr-main-textAreaInsetShadow);
    background-color: var(--clr-sidebar-searchBox);
    font-size: clamp(1rem, 1.2vw, 1.2rem);
  }
  .search:focus::placeholder {
    color: transparent;
  }
  .search:focus-within {
    box-shadow: var(--clr-main-textAreaDropShadow);
    outline: none;
  }
  .books {
    overflow-y: auto;
    display: flex;
    flex-flow: column nowrap;
    user-select: none;
    height: calc(100vh - 5.5rem);
    scrollbar-color: var(--clr-sidebar-scrollThumb) var(--clr-sidebar-scrollBackground);
    scrollbar-width: thin;
  }
  .books::-webkit-scrollbar {
    width: 8px;
  }
  .books::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--clr-sidebar-scrollThumb);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
  .books::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: var(--clr-sidebar-scrollBackground);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  .book {
    color: var(--clr-main-lightText);
    background-color: var(--clr-main-background);
    padding: 1rem;
    width: 80%;
    margin: 0px auto 10px auto;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    cursor: pointer;
    position: relative;
    border-radius: 5px;
  }
  .book:hover {
    filter: brightness(150%);
  }
  .isPinned {
    color: var(--clr-sidebar-background);
    background-image: var(--clr-sidebar-pinnedGradient);
    order: -2;
  }
  .isActive {
    color: var(--clr-sidebar-background);
    background-image: var(--clr-sidebar-activeGradient);
    order: -1;
  }
  .isActive .author,
  .isPinned .author {
    color: var(--clr-sidebar-background);
  }
  .lock-button {
    position: absolute;
    right: -6px;
    top: -5px;
    height: 1.2rem;
    width: 1.2rem;
    padding: 1rem 0.5rem 0rem 0rem;
    z-index: 99;
  }
  .lock-button:hover {
    filter: contrast(200%);
  }
  h3 {
    font-size: clamp(1rem, 1.2vw, 1.2rem);
  }
  .author {
    color: var(--clr-sidebar-authorText);
    text-align: right;
    margin-top: 0.2rem;
  }
  .book:hover:not(.isActive):not(.isPinned) p {
    color: var(--clr-neutral-700);
  }
</style>
