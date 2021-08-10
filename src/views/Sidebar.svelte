<script>
  import { pins, activeBook, filter, filtered } from '../store/book';
  import { modal } from '../store/modal';
  import { flip } from 'svelte/animate';
  import { circInOut } from 'svelte/easing';
  import PinButton from '../components/SubComponents/PinButton.svelte';

  let outerWidth;
  let showSidebar = false;
  $: isActive = (book) => book.isbn === $activeBook?.isbn;
  $: isPinned = (book) => $pins.includes(book.isbn);
</script>

<svelte:window bind:outerWidth />

<!-- REVIEW - Edit this for cleaner -->
{#if outerWidth < 900}
  <div on:click={() => (showSidebar = true)} class="hamburger">
    <svg xmlns="http://www.w3.org/2000/svg" class="hamburger-icon" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </div>
  {#if showSidebar}
    <div on:click={() => (showSidebar = false)} class="shroud" />
  {/if}
{/if}
{#if outerWidth > 900 || showSidebar === true}
  <div class="sidebar">
    <input bind:value={$filter} class="filter" placeholder="Filter by title.." />
    <div class="books">
      {#each $filtered as book (book.isbn)}
        <div
          animate:flip={{ duration: 500, easing: circInOut }}
          class="book"
          class:isActive={isActive(book)}
          class:isPinned={isPinned(book)}
          on:click={() => (isActive(book) ? activeBook.clear() : activeBook.activate(book))}
        >
          <h3 class="book-title">{book.title}</h3>
          {#each book.authors.slice(0, 2) as author}
            <p class="author">{author}</p>
          {/each}
          {#if isActive(book) || isPinned(book)}
            <PinButton {book} isPinned={isPinned(book)} />
          {/if}
        </div>
      {/each}
    </div>
    <!-- <button class={'add-book'} on:click={() => modal.show({ variant: 'add-book' })}>Add New Book</button> -->
  </div>
{/if}

<style>
  .sidebar {
    width: min(70%, 20rem);
    height: 100%;
    background-image: var(--clr-sidebar-background);
    gap: 20px;
    padding-right: 5px;
    display: flex;
    flex-flow: column nowrap;
    /* justify-content: center; */
    align-items: center;
    z-index: 999;
  }
  @media screen and (max-width: 800px) {
    .sidebar {
      width: 200%;
    }
  }
  .hamburger {
    position: absolute;
    top: 2%;
    left: 2%;
    height: 2rem;
    width: 2rem;
    cursor: pointer;
  }
  .hamburger-icon {
    stroke: aqua;
  }
  .hamburger:hover {
    filter: brightness(150%);
  }
  .shroud {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: hsl(0, 0%, 7%, 0.9);
    z-index: 998;
  }
  .filter {
    width: 90%;
    height: 2.5rem;
    margin: 0rem 0.8rem 1.25rem 0.8rem;
    border: none;
    border-radius: 5px;
    text-align: center;
    color: var(--clr-main-lightText);
    box-shadow: var(--clr-main-textAreaInsetShadow);
    background-color: var(--clr-sidebar-searchBox);
    font-size: clamp(1rem, 1.2vw, 1.2rem);
  }
  .filter:focus::placeholder {
    color: transparent;
  }
  .filter:focus-within {
    box-shadow: var(--clr-main-textAreaDropShadow);
    outline: none;
  }
  /* .add-book {
    padding: 1rem 2rem;
    margin-bottom: 1rem;
    background-color: var(--clr-sidebar-newbook);
    color: var(--clr-main-background);
    box-shadow: var(--clr-main-textAreaDropShadow);
    border-radius: 10px;
    align-self: center;
    font-size: clamp(1rem, 1.2vw, 1.2rem);
    font-weight: 600;
    cursor: pointer;
  }
  .add-book:hover {
    filter: brightness(150%);
  } */
  .books {
    overflow-y: auto;
    display: flex;
    flex-flow: column nowrap;
    user-select: none;
    /* height: calc(100vh - 12rem); */
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
  .book-title {
    font-size: clamp(1rem, 1.2vw, 1.2rem);
  }
  .author {
    color: var(--clr-sidebar-authorText);
    text-align: right;
    margin-top: 0.2rem;
  }
  .book:hover:not(.isActive):not(.isPinned) p {
    color: var(--clr-main-lightText);
  }
</style>
