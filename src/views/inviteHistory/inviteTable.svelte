<script lang="ts">
  import Col from "../../components/col.svelte";
  import Row from "../../components/row.svelte";
  let active: "left" | "right" = "left";

  let headerConfig = [
    {
      name: "用户",
      span: 2,
    },
    {
      name: "身份",
      span: 2,
    },
    {
      name: "状态",
      span: 2,
    },
    {
      name: "时间",
      span: 3,
    },
    {
      name: "奖励金额",
      span: 3,
    },
  ];
</script>

<div class="table_tab">
  <div class="table_tab_active {active}"></div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="table_tab_left {active === 'left' && 'active'}"
    on:click={() => (active = "left")}
  >
    已获得奖励￥430
  </div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="table_tab_right {active === 'right' && 'active'}"
    on:click={() => (active = "right")}
  >
    奖励在路上
  </div>
</div>
<div class="table">
  <div class="table_header">
    <Row>
      {#each headerConfig as header}
        <Col span={header.span}>{header.name}</Col>
      {/each}
    </Row>
  </div>
</div>

<style lang="scss">
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
      &.right {
        transform: translateX(calc(100% - 1.8vw));
      }
    }
    .table_tab_left,
    .table_tab_right {
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
    .table_tab_right {
      right: 0;
    }
  }
</style>
