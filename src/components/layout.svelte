<script lang="ts">
  import { isMobile } from "../store";
  import Footer from "./footer.svelte";
  import Navbar from "./navbar.svelte";
  import { location } from "svelte-spa-router";
  let hiddenFooter = false;
  $: {
    if ($isMobile && $location !== "/") {
      hiddenFooter = true;
    } else {
      hiddenFooter = false;
    }
  }
</script>

<main class="layout">
  <Navbar></Navbar>
  <slot />
  {#if !hiddenFooter}
    <Footer></Footer>
  {/if}
</main>

<style lang="scss">
  @media screen and (min-width: 768px) {
    .layout {
      max-width: 1200px;
      margin: 0 auto;
    }
  }
</style>
