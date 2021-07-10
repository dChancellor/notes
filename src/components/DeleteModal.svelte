<script>
  import { deleteThis } from '../lib/store.js';
</script>

<div on:click={deleteThis.hideModal} class="backdrop" />
<div class="modal">
  <h1>Confirm the deletion of this {$deleteThis.type}?</h1>
  <div class="button-bar">
    <button on:click={deleteThis.confirm} class="confirm">Confirm</button>
    <button on:click={deleteThis.hideModal} class="cancel">Cancel</button>
  </div>
</div>

<style>
  .backdrop {
    height: 100vh;
    width: 100vw;
    background-color: rgba(54, 54, 54, 0.712);
    z-index: 998;
    position: absolute;
    top: 0;
    left: 0;
  }
  .modal {
    height: 200px;
    width: 200px;
    z-index: 999;
    background-color: aqua;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
