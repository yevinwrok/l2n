<script lang="ts">
  import HyNav from "../../components/hyNav.svelte";
</script>

<HyNav title="收支明细"></HyNav>
<div class="rewardsHistory">
  <div class="rewardsHistory_month">
    <div class="rewardsHistory_month_header">
      2024年1月 <img src="./assets/hybrid/icon_arrow_down.png" alt="" />
    </div>
    {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as idx}
      <div class="rewardsHistory_month_item">
        <div class="rewardsHistory_month_item_info">
          <div class="rewardsHistory_month_item_info_1">
            张晓芳(156****7576)【接单分红】
          </div>
          <div class="">+18.00</div>
        </div>
        <div class="rewardsHistory_month_item_sub_info">
          <div>1月23日 22:47</div>
          <div>余额 108.00</div>
        </div>
      </div>
    {/each}
    <div class="rewardsHistory_month_footer">没有更多了</div>
  </div>
  <div></div>
</div>

<style lang="scss">
  .rewardsHistory {
    width: 100vw;
    height: calc(100vh - 12vw);
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
    .red {
      color: #ff2d51;
    }
  }
  .rewardsHistory_month_footer {
    font-size: 3vw;
    color: #a9a9a9;
    padding: 6vw 0 9vw;
    text-align: center;
  }
</style>
