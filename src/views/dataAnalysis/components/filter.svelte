<script lang="ts">
  import dayjs from "dayjs";
  import DataPicker from "../../../components/datePicker.svelte";
  let start = dayjs().startOf("month"),
    end = dayjs().endOf("month");
  function picked(e, type) {
    if (type === "start") {
      start = dayjs(e.detail.datepicked);
    } else if (type === "end") {
      end = dayjs(e.detail.datepicked);
    }
  }
</script>

<div class="filter">
  <div class="time">
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
  <div class="filtrate">
    展示数据 <img
      src="./assets/hybrid/icon_arrow_down.png"
      alt=""
      class="arrow"
    />
  </div>
</div>

<style lang="scss">
  .filter {
    display: flex;
    justify-content: space-between;
    padding: 1.2vw 3.5vw;

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
      .arrow {
        width: 4.2vw;
        height: 4.2vw;
      }
    }
  }
</style>
