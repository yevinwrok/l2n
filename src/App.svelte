<script lang="ts">
  import Router from "svelte-spa-router";
  import routes from "./router/index";
  import Layout from "./components/layout.svelte";
  import { location } from "svelte-spa-router";
  import { hybrid, hybridList } from "./router/index";
  import { isMobile } from "./store";
  import { setContext } from "svelte";
  export let theSecond = false;
  import Toast from "./components/toast.svelte";
  import Message from "./components/message.svelte";
  setContext("theSecond", theSecond);
  let p;
  let showLayout = hybridList.findIndex((k) => $location.startsWith(k)) === -1;
  $: {
    showLayout = hybridList.findIndex((k) => $location.startsWith(k)) === -1;
  }

  if (!showLayout) {
    p = new Promise((r) => {
      let start = Date.now();
      let timer = setInterval(() => {
        console.log(123123);
        if ((window as any).WebViewJavascriptBridge) {
          console.log(1);
          clearInterval(timer);
          r(void 0);
        } else if (Date.now() - start > 3000) {
          clearInterval(timer);
          r(void 0);
        }
      }, 200);
    });
  } else {
    p = Promise.reject();
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
  {#await p then}
    <main class="hybrid_content">
      <Toast></Toast>
      <Message></Message>
      <Router {routes} />
    </main>
  {/await}
{/if}

<style lang="scss">
  .content {
    background: linear-gradient(#d9fc8a, #f5faea);
    height: 100vh;
    overflow: auto;
    width: 100vw;
  }

  .hybrid_content {
    min-height: 100vh;
    width: 100vw;
  }
</style>
