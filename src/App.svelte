<script lang="ts">
  import Router from "svelte-spa-router";
  import routes from "./router/index";
  import Layout from "./components/layout.svelte";
  import { location } from "svelte-spa-router";
  import { onlyMobile } from "./router/index";
  import { isMobile } from "./store";
  import { setContext } from "svelte";
  export let theSecond = false;
  
  setContext("theSecond", theSecond);
  console.log("theSecond: ", theSecond);
  let showLayout =
    Object.keys(onlyMobile).findIndex((k) => k === $location) === -1;
  $: {
    showLayout =
      Object.keys(onlyMobile).findIndex((k) => k === $location) === -1;
  }
</script>

{#if showLayout}
  <main class="content">
    <div class="router_main">
      <Layout>
        <Router {routes} />
      </Layout>
    </div>
  </main>
{:else}
  <main class="hybrid_content">
    <Router {routes} />
  </main>
{/if}

<style lang="scss">
  .content {
    background: linear-gradient(#cafc83, #f3faea);
    height: 100vh;
    overflow: auto;
    width: 100vw;
  }

  .hybrid_content {
    min-height: 100vh;
    width: 100vw;
  }
</style>
