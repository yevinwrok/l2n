<script lang="ts">
  import Router from "svelte-spa-router";
  import routes from "./router/index";
  import Layout from "./components/layout.svelte";
</script>

<main class="content">
  <div class="router_main">
    <Layout>
      <Router {routes} />
    </Layout>
  </div>
</main>

<style lang="scss">
  .content {
    background: linear-gradient(#cafc83, #f3faea);
    height: 100vh;
    overflow: auto;
    width: 100vw;
  }
</style>
