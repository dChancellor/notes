<script>
  export let editable;
  export let initialValue;
  export let placeholder;
  export let id;

  let value = initialValue;
  let component;
  let height;
  $: height = component && document.getElementById(component.id).scrollHeight;

  function rerunHeight() {
    height = component && document.getElementById(component.id).scrollHeight;
  }
</script>

<span style="height:{height}px;">
  <textarea on:input={rerunHeight} bind:this={component} bind:value {id} rows="1" {placeholder} disabled={!editable} />
</span>

<style>
  span {
    background-color: var(--clr-main-background);
    display: flex;
    padding: 0.5rem;
    flex-grow: 3;
    margin: 0rem 2rem;
    border-radius: 6px;
  }

  textarea {
    color: var(--clr-main-lightText);
    background-color: rgba(0, 0, 0, 0);
    width: 97%;
    resize: none;
    border: none;
    border-radius: 5px;
    box-sizing: content-box;
    line-height: 1.4rem;
    display: block;
    overflow: hidden;
  }
</style>
