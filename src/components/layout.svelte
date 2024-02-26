<script lang="ts">
  import Footer from "./footer.svelte";
  import Navbar from "./navbar.svelte";
</script>

<main class="layout">
  <Navbar></Navbar>
  <slot />
  <Footer></Footer>
</main>

<style lang="scss">
  @media screen and (min-width: 768px) {
    .layout {
      max-width: 1200px;
      margin: 0 auto;
    }
  }
</style>
