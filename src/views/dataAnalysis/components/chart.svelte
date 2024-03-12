<script lang="ts">
  import { onMount } from "svelte";
  import { initChart } from "./chart";
  let chartEl;
  onMount(() => {
    initChart(chartEl);
  });
</script>

<div class="chartBox" bind:this={chartEl}></div>

<style lang="scss" scoped>
  .chartBox {
    margin-top: 4.7vw;
    width: 100%;
    height: 51.2vw;
    background-color: #f8f8f8;
    border-radius: 1.9vw;
  }
</style>
