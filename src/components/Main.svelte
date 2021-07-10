<script>
  import { activeBook } from '../lib/store';
  import Chapter from './Chapter.svelte';
</script>

<div class="app">
  {#if !$activeBook}
    <h2>Select a book on the left to get started</h2>
  {:else}
    <h1>{$activeBook?.title}</h1>
    {#each $activeBook.chapters as chapter (chapter.id)}
      <Chapter {chapter} />
    {/each}
  {/if}
</div>

<style>
  .app {
    height: calc(100vh - 40px);
    width: 100%;
    background-color: var(--clr-main-background);
    padding: 40px 0px 0px 40px;
    overflow: auto;
  }
  h1 {
    color: var(--clr-main-darkText);
    margin: 2rem;
    text-align: left;
    font-size: clamp(1.7rem, 4vw, 2.5rem);
  }
</style>
