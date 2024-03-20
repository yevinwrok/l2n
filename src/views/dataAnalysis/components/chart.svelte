<script lang="ts">
  import { onMount, tick } from "svelte";
  import { initChart } from "./chart";
  import { dataScheme } from "../helper";
  import type { EChartsOption, ECharts } from "echarts";
  let chartEl;
  let charts: ECharts;
  let flag = 0;
  export let trend = [];
  onMount(() => {
    const p = getOpt();
    charts = initChart(chartEl, p) as any;
  });

  // $: {
  //   if (trend.length) {
  //     tick().then(async () => {
  //       await tick();
  //       initChart(chartEl, getOpt()) as any;
  //     });
  //   }
  // }
  function getOpt() {
    if (!trend.length) {
      return {};
    }
    const keys = Object.keys(trend[0]);
    const d = {};
    const t = [];
    const series = [];
    trend.forEach((item, index) => {
      t[index] = item.pt;
      keys.forEach((key) => {
        if (key != "pt") {
          if (!d[key]) d[key] = [];
          d[key].push(item[key]);
        }
      });
    });

    Object.keys(d).forEach((k) => {
      if (dataScheme[k] === undefined) {
        return;
      }
      series.push({
        name: dataScheme[k],
        showSymbol: false,
        type: "line",
        stack: "Total",
        smooth: true,
        // areaStyle: {
        //   color: "#3672EF",
        //   opacity: 0.5,
        // },
        emphasis: {
          focus: "series",
        },
        data: d[k],
      });
    });

    let opt: EChartsOption = {
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: t,
        },
      ],
      series,
    };

    console.log("opt: ", opt);
    return opt;
  }
</script>

{#key flag}
  <div class="chartBox" bind:this={chartEl}></div>
{/key}

<style lang="scss" scoped>
  .chartBox {
    margin-top: 4.7vw;
    width: 100%;
    height: 51.2vw;
    background-color: #f8f8f8;
    border-radius: 1.9vw;
  }
</style>
