<script lang="ts">
  import dayjs from "dayjs";
  import DataPicker from "../../../components/datePicker.svelte";
  import { createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";
  import { dataScheme } from "../helper";
  let start = dayjs().startOf("month"),
    end = dayjs().endOf("month");

  export let active = new Set(["all"]);
  let isExp = false;
  function d() {
    return {
      start: start.valueOf(),
      end: end.valueOf(),
    };
  }
  function picked(e, type) {
    if (type === "start") {
      start = dayjs(e.detail.datepicked);
    } else if (type === "end") {
      end = dayjs(e.detail.datepicked);
    }
    dispatch("change", d());
  }
  const dispatch = createEventDispatcher();
  dispatch("change", d());

  function expItemClick(item) {
    if (item != "all") {
      active.delete("all");
    } else {
      active.clear();
    }
    if (active.has(item)) {
      active.delete(item);
    } else {
      active.add(item);
    }
    active = new Set(Array.from(active));
    console.log("active: ", active);
  }
  function reset() {
    expItemClick("all");
  }
  function ok() {
    dispatch("filter", active);
    isExp = false;
  }
</script>

<div class="filtrate_back" hidden={!isExp}></div>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="filter">
  <div class="time" on:click={() => (isExp = false)}>
    <img src="./assets/hybrid/icon_calendar.png" alt="" class="time_icon" />
    <div class="start">
      <DataPicker
        initTime={start.valueOf()}
        format="YYYY/MM/DD"
        on:datepicked={(e) => picked(e, "start")}
      ></DataPicker>
    </div>
    <div class="mid">到</div>
    <div class="end">
      <DataPicker
        initTime={end.valueOf()}
        format="YYYY/MM/DD"
        on:datepicked={(e) => picked(e, "end")}
      ></DataPicker>
    </div>
  </div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="filtrate" on:click={() => (isExp = !isExp)}>
    展示数据 <img
      src="./assets/hybrid/icon_arrow_down.png"
      alt=""
      class="arrow"
      style={isExp ? "transform: rotate(180deg);" : ""}
    />
  </div>
  {#if isExp}
    <div
      class="filtrate_exp"
      in:fly={{
        duration: 200,
        y: -20,
      }}
    >
      {#each Object.keys(dataScheme) as key}
        <div
          class="filtrate_exp_item {active.has(key) ? 'active' : ''}"
          on:click={() => expItemClick(key)}
        >
          {dataScheme[key]}
        </div>
      {/each}
      <div class="filtrate_exp_btn">
        <div class="filtrate_exp_btn_reset" on:click={reset}>重置</div>
        <div class="filtrate_exp_btn_ok" on:click={ok}>查看结果</div>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .filtrate_back {
    position: fixed;
    pointer-events: none;
    background: #0000008e;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  }
  .filter {
    display: flex;
    justify-content: space-between;
    padding: 1.2vw 3.5vw;
    position: relative;
    background: #fff;
    z-index: 9;

    .filtrate_exp_btn {
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 5.6vw;
      .filtrate_exp_btn_reset {
        width: 27.4vw;
        height: 10.2vw;
        line-height: 10.2vw;
        text-align: center;
        background: #f4f5f8;
        border-radius: 5.1vw;
        font-weight: bold;
        font-size: 3.7vw;
        color: #000000;
      }
      .filtrate_exp_btn_ok {
        width: 59.5vw;
        height: 10.2vw;
        line-height: 10.2vw;
        background: #000000;
        border-radius: 5.1vw;
        text-align: center;
        font-size: 3.7vw;
        color: #ffffff;
      }
    }
    .filtrate_exp {
      position: absolute;
      width: 100%;
      left: 0;
      z-index: 9;
      display: flex;
      flex-wrap: wrap;
      background: #fff;
      gap: 3.3vw 2.3vw;
      padding: 3.7vw 3.3vw 7vw;
      bottom: 1px;
      transform: translateY(100%);
      border-radius: 0px 0px 1.9vw 1.9vw;
    }
    .filtrate_exp_item {
      width: 20.9vw;
      height: 7vw;
      line-height: 7vw;
      background: #f7f8fa;
      border-radius: 3.5vw;
      font-weight: 500;
      font-size: 3.3vw;
      color: #5c5c5c;
      text-align: center;
      &.active {
        background: linear-gradient(90deg, #f1ff79, #b4fc15);
        font-weight: bold;
        color: #000000;
      }
    }

    .time {
      position: relative;
      padding: 0 8vw;
      width: 69.8vw;
      height: 8.8vw;
      background: linear-gradient(90deg, #f3ffe7, #f6f3f4, #f2f6ff);
      border-radius: 4.4vw;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: bold;
      font-size: 3.5vw;
      color: #000000;
      .time_icon {
        width: 4.2vw;
        height: 4.2vw;
        position: absolute;
        left: 3vw;
        top: 50%;
        transform: translateY(-55%);
      }
    }
    .filtrate {
      display: flex;
      align-items: center;
      font-size: 3.3vw;
      color: #323232;
      position: relative;
      z-index: 9;
      .arrow {
        width: 4.2vw;
        height: 4.2vw;
      }
    }
  }
</style>
