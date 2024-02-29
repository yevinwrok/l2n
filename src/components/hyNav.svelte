<script lang="ts">
  import { pop } from "svelte-spa-router";
  export let title = "";
  export let hideBack = false;
  export let backFn = pop;
</script>

<nav class="header">
  <div class="header_left">
    {#if !hideBack}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <img
        src="./assets/hybrid/icon_back.png"
        alt=""
        class="header_back"
        on:click={() => typeof backFn === "function" && backFn()}
      />
    {/if}
  </div>

  <div class="header_title">{title}</div>
  <div class="header_right">
    <slot name="right" />
  </div>
</nav>

<style lang="scss">
  .header {
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4vw;
    height: 12vw;
  }
  .header_title {
    display: flex;
    font-size: 4vw;
    color: #000000;
  }
  .header_left,
  .header_right {
    width: 30%;
  }
  .header_right {
    display: flex;
    justify-content: flex-end;
  }
  .header_back {
    width: 4vw;
    margin-right: 19vw;
  }
</style>
