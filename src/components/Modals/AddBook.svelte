<script>
  import { modal } from '../../lib/storeModal.js';
</script>

<div on:click={modal.hide} class="backdrop" />
<div class="modal">
  <h1>Add Book!</h1>
  <div class="button-bar" />
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
