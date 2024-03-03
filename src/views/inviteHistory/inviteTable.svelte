<script lang="ts">
  import Col from "../../components/col.svelte";
  import Row from "../../components/row.svelte";
  import { tableConfig, tableType } from "./helper";
  let active: tableType = tableType.left;
</script>

<div class="table_tab">
  <div class="table_tab_active {active}"></div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="table_tab_left {active === tableType.left && 'active'}"
    on:click={() => (active = tableType.left)}
  >
    已获得奖励￥430
  </div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="table_tab_right {active === tableType.right && 'active'}"
    on:click={() => (active = tableType.right)}
  >
    奖励在路上
  </div>
</div>
<div class="table">
  <div class="table_header">
    <Row>
      {#each tableConfig[active] as header}
        <Col span={header.span} right={header.right} center={header.center}
          >{header.name}</Col
        >
      {/each}
    </Row>
  </div>
  <div class="table_body">
    <Row>
      {#each tableConfig[active] as header}
        <Col span={header.span} right={header.right} center={header.center}
          >{header.name}</Col
        >
      {/each}
    </Row>
  </div>
</div>

<style lang="scss">
  .table {
    padding: 0 3.3vw;
    .table_header {
      font-weight: bold;
      font-size: 3.3vw;
      color: #000000;
      height: 11.6vw;
      line-height: 11.6vw;
    }
    .table_body {
      background: #ffffff;
      font-size: 3.3vw;
      color: #666666;
    }
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
