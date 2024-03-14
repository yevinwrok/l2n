<script lang="ts">
  import Filter from "./components/filter.svelte";
  import Chart from "./components/chart.svelte";
  import ITL from "./components/inviteTotalLayout.svelte";
  import { getDateAnalysis } from "../../api";
  let analysisDetail = {} as any;
  let filter = {};

  function getData() {
    console.log("@@@@@@@@", filter);
    getDateAnalysis(filter).then((res) => (analysisDetail = res.summary));
  }
</script>

<Filter
  on:change={(data) => {
    filter = data.detail;
    getData();
  }}
></Filter>
<main style="padding: 0 3.5vw;">
  <Chart></Chart>
  <div class="dynamic">
    动态退单率：0% <img src="./assets/hybrid/icon_help.png" alt="" />
  </div>
  <div class="invite_total">
    <div class="invite_total_item block_full">
      <ITL num={analysisDetail.total_commission} text="总提成" />
      <ITL num={analysisDetail.order_commission} text="接单提成" />
      <ITL num={analysisDetail.reward_commission} text="打赏提成" />
      <ITL num={analysisDetail.add_clock_commission} text="加钟提成" />
    </div>

    <div class="invite_total_item block">
      <ITL num={analysisDetail.online_duration} text="7日内在线时长(小时)" />
    </div>
    <div class="invite_total_item block">
      <ITL num={analysisDetail.service_duration} text="7日内服务时长(小时)" />
    </div>

    <div class="invite_total_item block_full">
      <ITL num={analysisDetail.order_accept_rate} text="总接单率" />
      <ITL num={analysisDetail.order_accept_cnt} text="总接单量(单)" />
      <ITL num={analysisDetail.order_accept_price} text="总接单金额(元)" />
    </div>

    <div class="invite_total_item block_full">
      <ITL num={analysisDetail.order_complete_rate} text="成交率" />
      <ITL num={analysisDetail.order_complete_cnt} text="成交量(单)" />
      <ITL num={analysisDetail.order_complete_price} text="成交金额(元)" />
    </div>

    <div class="invite_total_item block_full">
      <ITL num={analysisDetail.refund_rate} text="退单率" />
      <ITL num={analysisDetail.order_refund_cnt} text="退单量(单)" />
      <ITL num={analysisDetail.order_refund_price} text="退单金额(元)" />
    </div>
    <div class="invite_total_item block_full">
      <ITL num={analysisDetail.order_reward_rate} text="打赏率" />
      <ITL num={analysisDetail.order_reward_cnt} text="打赏量(单)" />
      <ITL num={analysisDetail.order_reward_price} text="打赏金额(元)" />
    </div>
    <div class="invite_total_item block_full">
      <ITL num={analysisDetail.add_clock_rate} text="加钟率" />
      <ITL num={analysisDetail.add_clock_cnt} text="加钟量(单)" />
      <ITL num={analysisDetail.add_clock_price} text="加钟金额(元)" />
    </div>

    <div class="invite_total_item block_full">
      <ITL num={analysisDetail.order_reject_rate} text="拒单率" />
      <ITL num={analysisDetail.order_reject_cnt} text="拒单量(单)" />
      <ITL num={analysisDetail.order_reject_price} text="拒单金额(元)" />
    </div>
    <div class="invite_total_item block_full">
      <ITL num={analysisDetail.travel_price} text="打车金额(元)" center />
    </div>
  </div>
  <div class="textInfo">统计为入驻平台后的数据</div>
</main>

<style lang="scss">
  .textInfo {
    font-weight: 500;
    font-size: 2.8vw;
    color: #a9a9a9;
    margin-top: 5.5vw;
    text-align: center;
  }
  .dynamic {
    margin-top: 3.6vw;
    display: flex;
    padding-left: 3.4vw;
    justify-self: center;
    align-items: center;
    background: linear-gradient(90deg, #fff7e7, #f2f6ff);
    border-radius: 3.4vw;
    height: 9.3vw;
    font-size: 3.5vw;
    color: #131923;
    img {
      width: 2.8vw;
      height: 2.8vw;
      margin-left: 2.4vw;
    }
  }
  .invite_total {
    margin: 3.5vw auto 0;
    width: 100%;
    background: #f7f8fa;
    border-radius: 2vw;
    padding: 3vw;
    display: flex;
    flex-wrap: wrap;
    gap: 3vw;
    .invite_total_item {
      height: 15vw;
      background: #ffffff;
      border-radius: 2vw;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 3vw;
    }
    .block_full {
      width: 100%;
    }
    .block {
      width: 42vw;
      justify-content: flex-start !important;
    }
  }
</style>
