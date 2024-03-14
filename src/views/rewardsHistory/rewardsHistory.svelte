<script lang="ts">
  import HyNav from "../../components/hyNav.svelte";
  import { income_expense } from "../../api/index";
  import dayjs from "dayjs";
  import Loading from "../../components/loading.svelte";
  let lastTime = Date.now();
  let loading = false,
    hasMore = false,
    data = [],
    page = 0,
    limit = 20;

  // 获取当前月份的开始时间
  let time = Date.now();
  let inputMonth;

  async function getData(reset = false) {
    if (reset) {
      page = 0;
      data = [];
      hasMore = false;
    }
    loading = true;
    try {
      const res = await income_expense(
        dayjs(time).format("YYYY-MM"),
        ++page,
        limit,
      );
      data = data.concat(res.data);
      // hasMore =
    } finally {
      loading = false;
    }
    // setTimeout(() => {
    //   loading = false;
    //   data = data.concat([
    //     {
    //       id: 4, //id
    //       create_time: 1707915594430, //时间
    //       recorded_time: null,
    //       estimate_recorded_time: null,
    //       price: -10, //价格
    //       balance: 134, //余额
    //       title: "提现", //标题
    //       type: 2,
    //       source: 6,
    //       status: null,
    //       related_id: null,
    //     },
    //     {
    //       id: 4, //id
    //       create_time: 1707915594430, //时间
    //       recorded_time: null,
    //       estimate_recorded_time: null,
    //       price: -10, //价格
    //       balance: 134, //余额
    //       title: "提现", //标题
    //       type: 2,
    //       source: 6,
    //       status: null,
    //       related_id: null,
    //     },
    //     {
    //       id: 4, //id
    //       create_time: 1707915594430, //时间
    //       recorded_time: null,
    //       estimate_recorded_time: null,
    //       price: -10, //价格
    //       balance: 134, //余额
    //       title: "提现", //标题
    //       type: 2,
    //       source: 6,
    //       status: null,
    //       related_id: null,
    //     },
    //     {
    //       id: 4, //id
    //       create_time: 1707915594430, //时间
    //       recorded_time: null,
    //       estimate_recorded_time: null,
    //       price: -10, //价格
    //       balance: 134, //余额
    //       title: "提现", //标题
    //       type: 2,
    //       source: 6,
    //       status: null,
    //       related_id: null,
    //     },
    //     {
    //       id: 4, //id
    //       create_time: 1707915594430, //时间
    //       recorded_time: null,
    //       estimate_recorded_time: null,
    //       price: -10, //价格
    //       balance: 134, //余额
    //       title: "提现", //标题
    //       type: 2,
    //       source: 6,
    //       status: null,
    //       related_id: null,
    //     },
    //   ]);
    // }, 2000);
  }
  $: {
    if (inputMonth) {
      time = dayjs(inputMonth).valueOf();
    } else {
      time = Date.now();
    }
    getData(true);
  }
</script>

<HyNav title="收支明细"></HyNav>
<div class="rewardsHistory">
  <div class="rewardsHistory_month">
    <div class="rewardsHistory_month_header">
      {dayjs(time).format("YYYY年MM月")}
      <img src="./assets/hybrid/icon_arrow_down.png" alt="" /><input
        type="month"
        class="month"
        bind:value={inputMonth}
      />
    </div>
    {#each data as item}
      <div class="rewardsHistory_month_item">
        <div class="rewardsHistory_month_item_info">
          <div class="rewardsHistory_month_item_info_1">
            {item.title}
          </div>
          <div
            style={item.price.toString().startsWith("-") ? "color:red;" : ""}
          >
            {item.price}
          </div>
        </div>
        <div class="rewardsHistory_month_item_sub_info">
          <div>{dayjs(item.create_time).format("MM月DD HH:mm")}</div>
          <div>余额 {item.balance}</div>
        </div>
      </div>
    {/each}
  </div>
  {#if loading}
    <div class="table_loading">
      <Loading />
    </div>
  {:else if hasMore}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="table_more"
      on:click={() => {
        getData();
      }}
    >
      加载更多
    </div>
  {:else if data.length === 0}
    <div class="no_data">暂无数据</div>
  {/if}
</div>

<style lang="scss">
  .no_data {
    text-align: center;
    color: #ccc;
    margin-top: 20vw;
    font-size: 4vw;
    font-weight: normal;
  }
  .table_more {
    margin: 6vw auto;
    text-align: center;
    width: 30vw;
    height: 8vw;
    line-height: 8vw;
    border: 1px solid #aaa;
    border-radius: 20vw;
    color: #aaa;
    font-size: 3.5vw;
  }
  .table_loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 11.6vw;
  }
  .rewardsHistory {
    width: 100vw;
    overflow: hidden;
    overflow-y: auto;
  }
  .rewardsHistory_month {
    .rewardsHistory_month_header {
      width: 100%;
      height: 11vw;
      background: #f7f8fa;
      display: flex;
      justify-content: flex-end;
      font-size: 4vw;
      align-items: center;
      color: #000000;
      position: relative;
      .month {
        position: absolute;
        width: 6vw;
        right: 1vw;
        opacity: 0;
      }
      img {
        width: 3.5vw;
        height: 3.5vw;
        margin-left: 1vw;
        margin-right: 3vw;
      }
    }
  }
  .rewardsHistory_month_item {
    padding: 6vw 4vw;
    border-bottom: 1px solid #f3f3f3bf;
    width: 100%;
    .rewardsHistory_month_item_info,
    .rewardsHistory_month_item_sub_info {
      display: flex;
      justify-content: space-between;
      font-weight: 500;
      font-size: 4vw;
      color: #000000;
    }
    .rewardsHistory_month_item_info_1 {
      max-width: 70vw;
      word-wrap: break-word;
    }
    .rewardsHistory_month_item_sub_info {
      font-size: 3vw;
      color: #a9a9a9;
      margin-top: 3vw;
    }
    // .red {
    //   color: #ff2d51;
    // }
  }
  // .rewardsHistory_month_footer {
  //   font-size: 3vw;
  //   color: #a9a9a9;
  //   padding: 6vw 0 9vw;
  //   text-align: center;
  // }
</style>
