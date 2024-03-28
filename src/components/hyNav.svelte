<script lang="ts">
  import { pop, location } from "svelte-spa-router";
    import { hybridList } from "../router";
  export let title = "";
  export let hideBack = false;
  export let backFn = pop;
  export let bgc_fff = false;
  
  let fillerHeader = false;
  $: {
    fillerHeader = hybridList.findIndex((k) => $location.startsWith(k)) !== -1;
  }
</script> 

<nav class="header {bgc_fff ? 'bgc_fff' : ''}">
  {#if fillerHeader}
    <div class="header_filter"></div>
  {/if}
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
  .header_filter {
    height: 10vw;
    width: 100%;
    flex-grow: 1;
  }
  .bgc_fff{
    background: #fff;
  }
  .header {
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4vw;
    padding-bottom: 3vw;
    min-height: 12vw;
    flex-wrap: wrap;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .header_title {
    font-size: 4vw;
    color: #000000;
    flex-grow: 1;
    text-align: center;
    font-weight: bold;
  }
  .header_left,
  .header_right {
    min-width: 30%;
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
