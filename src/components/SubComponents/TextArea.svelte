<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  import { afterUpdate } from 'svelte';
  import { editable } from '../../lib/storeBook';
  export let placeholder;
  export let id;
  export let value;

  // This handles the resizing of the textarea & keeps everything vertically centered
  let height;
  let outerWidth;
  let component;
  function rerunHeight() {
    height = component?.scrollHeight || 85;
  }
  afterUpdate(() => {
    rerunHeight();
  });
</script>

<svelte:window bind:outerWidth />

<span style="height:{height}px;">
  <textarea
    on:blur={dispatch('save', value)}
    on:input={() => rerunHeight()}
    bind:this={component}
    bind:value
    {id}
    rows="1"
    {placeholder}
    disabled={!$editable}
  />
</span>

<style>
  span {
    background-color: var(--clr-main-background);
    display: flex;
    padding: 0.5rem;
    flex-grow: 3;
    margin: 0rem 2rem;
    border-radius: 6px;
    background-color: rgba(33, 33, 33, 0.849);
    max-height: 12rem;
  }

  textarea {
    color: var(--clr-main-lightText);
    background-color: rgba(0, 0, 0, 0);
    width: 97%;
    resize: none;
    border: none;
    border-radius: 5px;
    box-sizing: content-box;
    display: block;
    overflow: hidden;
  }
</style>
