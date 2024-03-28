<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let show = false;
  const dispatch = createEventDispatcher();

  function close() {
    show = false;
    dispatch("close", false);
  }
</script>

{#if show}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="modal" on:click|self={() => close()}>
    <div class="modal_content">
      <slot />
    </div>
  </div>
{/if}

<style lang="scss" scoped>
  .modal {
    position: fixed;
    width: 100vw;
    z-index: 888;
    height: 100vh;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.5);
    .modal_content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
