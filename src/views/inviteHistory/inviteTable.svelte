<script lang="ts">
  import { type IRewarded, getRewarded, getShareIntro } from "../../api";
  import Col from "../../components/col.svelte";
  import Loading from "../../components/loading.svelte";
  import Row from "../../components/row.svelte";
  import { tableConfig, tableType } from "./helper";
  let active: tableType = tableType.rewarded;
  let rewardedCnt = 0;
  let init = true;
  let page = 0,
    hasMore = false,
    rewarded: IRewarded["data"] = [],
    loading = false;

  getShareIntro().then((res) => {
    rewardedCnt = res.today_price;
  });

  $: {
    if (active && !init) {
      getRemoteData(true);
    }
    init = false;
  }

  function getRemoteData(reset: boolean = false) {
    loading = true;
    if (reset) {
      rewarded = [];
      page = 0;
    }
    getRewarded({
      page: ++page,
      limit: 100,
      type: active,
    }).then((res) => {
      loading = false;
      hasMore = res.page.total_page > res.page.page;
      rewarded = rewarded.concat(...res.data);

      // hasMore = true;
      // rewarded = rewarded.concat(
      //   ...[
      //     {
      //       nickname: "聪明的小猫6053",
      //       price: 144,
      //       create_time: 1708279200000,
      //       source: 4,
      //       status: "接单",
      //       user_type: "用户",
      //       contribute_id: 6752519272634429440,
      //       real_name: null,
      //     },
      //     {
      //       nickname: "聪明的小猫6053",
      //       price: 6,
      //       create_time: 1708279200000,
      //       source: 5,
      //       status: "下单",
      //       user_type: "用户",
      //       contribute_id: 6752519272634429440,
      //       real_name: null,
      //     },
      //   ],
      // );
    });
  }

  getRemoteData();
</script>

<div class="table_tab">
  <div class="table_tab_active {active}"></div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="table_tab_rewarded {active === tableType.rewarded && 'active'}"
    on:click={() => (active = tableType.rewarded)}
  >
    已获得奖励￥{rewardedCnt}
  </div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="table_tab_unrewarded {active === tableType.unrewarded && 'active'}"
    on:click={() => (active = tableType.unrewarded)}
  >
    奖励在路上
  </div>
</div>
<div class="table">
  <div class="table_header">
    <Row>
      {#each tableConfig[active] as header}
        <Col
          span={header.span}
          right={header.right}
          center={header.center}
          height="11.6vw">{header.name}</Col
        >
      {/each}
    </Row>
  </div>
  {#each rewarded as r}
    <div class="table_body">
      <Row>
        {#each tableConfig[active] as header}
          <Col
            span={header.span}
            right={header.right}
            center={header.center}
            height="11.6vw">{@html header.fieldHandler(r[header.field])}</Col
          >
        {/each}
      </Row>
    </div>
  {/each}

  {#if loading}
    <div class="table_loading">
      <Loading />
    </div>
  {:else if hasMore}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="table_more"
      on:click={() => {
        getRemoteData();
      }}
    >
      加载更多
    </div>
  {:else if rewarded.length === 0}
    <div class="no_data">暂无数据</div>
  {/if}
</div>

<style lang="scss">
  .no_data{
    text-align: center;
    color: #ccc;
    margin-top: 20vw;
    font-size: 4vw;
    font-weight: normal;
  }
  .table {
    padding: 0 3.3vw;
    width: 100%;
    .table_line {
      height: 1px;
      background: #f3f3f3;
      width: 100%;
    }

    .table_loading {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 11.6vw;
    }
    .table_header {
      font-weight: bold;
      font-size: 3.3vw;
      color: #000000;
      height: 11.6vw;
      line-height: 11.6vw;
      border-bottom: 1px solid #f3f3f3;
    }
    .table_body {
      background: #ffffff;
      font-size: 3.3vw;
      color: #666666;
      border-bottom: 1px solid #f3f3f3;
    }
  }

  .table_more {
    margin: 0 auto;
    text-align: center;
    width: 30vw;
    height: 8vw;
    line-height: 8vw;
    border: 1px solid #aaa;
    border-radius: 20vw;
    color: #aaa;
    margin-top: 6vw;
    font-size: 3.5vw;
  }

  .table_tab {
    width: 77vw;
    height: 9vw;
    background: #f2f2f2;
    border-radius: 5vw;
    margin: 5vw auto 7vw;
    position: relative;
    .table_tab_active {
      width: 50%;
      height: 7.4vw;
      position: absolute;
      top: 0.9vw;
      border-radius: 5vw;
      left: 0.9vw;
      background: #fff;
      transition: transform 0.2s linear;
      &.unrewarded {
        transform: translateX(calc(100% - 1.8vw));
      }
    }
    .table_tab_rewarded,
    .table_tab_unrewarded {
      width: 49%;
      height: 9vw;
      line-height: 9vw;
      position: absolute;
      text-align: center;
      font-size: 3.5vw;
      color: #666666;
      &.active {
        font-weight: bold;
        color: #000000;
      }
    }
    .table_tab_unrewarded {
      right: 0;
    }
  }
</style>
