<script>
  import { flip } from 'svelte/animate';
  import { activeBook } from './storeBook';
  import Chapter from '../components/Chapter.svelte';
  export let editable;

  let isOver = false;
  const getDraggedParent = (node) =>
    node.dataset && node.dataset.index ? node.dataset : getDraggedParent(node.parentNode);
  const start = (ev) => {
    ev.dataTransfer.setData('source', ev.target.dataset.index);
  };
  const over = (ev) => {
    ev.preventDefault();
    let dragged = getDraggedParent(ev.target);
    if (isOver !== dragged.id) isOver = JSON.parse(dragged.id);
  };
  const leave = (ev) => {
    let dragged = getDraggedParent(ev.target);
    if (isOver === dragged.id) isOver = false;
  };
  const drop = (ev) => {
    isOver = false;
    ev.preventDefault();
    let dragged = getDraggedParent(ev.target);
    let from = ev.dataTransfer.getData('source');
    let to = dragged.index;
    reorder({ from, to });
  };
  const reorder = ({ from, to }) => {
    let newList = $activeBook.chapters;
    newList[from] = [newList[to], (newList[to] = newList[from])][0];
    activeBook.reorder(newList);
  };
</script>

{#if $activeBook}
  {#each $activeBook.chapters as chapter, index (chapter.id)}
    <div
      class="chapter-draggable-container"
      data-index={index}
      data-id={JSON.stringify(chapter.id)}
      draggable={editable}
      on:dragstart={start}
      on:dragover={over}
      on:dragleave={leave}
      on:drop={drop}
      animate:flip={{ duration: 100 }}
      class:over={chapter.id === isOver}
    >
      <Chapter {chapter} />
    </div>
  {/each}
{/if}

<style>
  .chapter-draggable-container {
    width: 90%;
    padding-left: 1rem;
  }
  .over {
    margin-left: 2rem;
    filter: brightness(70%);
  }
</style>
