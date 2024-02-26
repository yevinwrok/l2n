<script lang="ts">
  import { isMobile } from "../../store";
  import Pc from "./pc.svelte";
  import Mobile from "./mobile.svelte";
</script>

<main>
  {#if $isMobile}
    <Mobile></Mobile>
  {:else}
    <Pc></Pc>
  {/if}
</main>

<style lang="scss">
</style>
