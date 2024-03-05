<script lang="ts">
  import HyNav from "../../components/hyNav.svelte";
  import InviteTable from "./inviteTable.svelte";
  import ITL from "./inviteTotalLayout.svelte";
  import { getShareDetail, type IShareDetail } from "../../api/index";
  let shareDetail: IShareDetail = {
    is_partner: true,
    total_first_cnt: 0,
    user_first_cnt: 0,
    technician_first_cnt: 0,
    total_second_cnt: 2,
    user_second_cnt: 2,
    technician_second_cnt: 0,
    total_price: 0,
    user_price: 0,
    technician_price: 0,
    order_user_cnt: 0,
    order_user_rate: 0.0,
    order_technician_cnt: 0,
    order_technician_rate: 0.0,
  };
  getShareDetail().then((res) => {
    shareDetail = res;
  });
</script>

<HyNav title="邀请明细"></HyNav>

<div class="invite_total">
  <div class="invite_total_item block_full">
    <ITL num={shareDetail.total_first_cnt} text="下级总人数(人)" />
    <ITL num={shareDetail.user_first_cnt} text="下级用户数(人)" />
    <ITL num={shareDetail.technician_first_cnt} text="下级技师数(人)" />
  </div>
  <div class="invite_total_item block_full">
    <ITL num={shareDetail.total_price} text="邀请总收益(元)" />
    <ITL num={shareDetail.user_price} text="邀请用户收益(元)" />
    <ITL num={shareDetail.technician_price} text="邀请技师收益(元)" />
  </div>

  <div class="invite_total_item block">
    <ITL num={shareDetail.order_user_cnt} text="下单用户数(人)" />
  </div>
  <div class="invite_total_item block">
    <ITL num="{shareDetail.order_user_rate}%" text="下单用户占比" />
  </div>
  <div class="invite_total_item block">
    <ITL num={shareDetail.order_technician_cnt} text="接单技师数(人)" />
  </div>
  <div class="invite_total_item block">
    <ITL num="{shareDetail.order_technician_rate}%" text="接单技师占比" />
  </div>
</div>
<InviteTable></InviteTable>

<style lang="scss">
  .block_full {
    width: 100%;
  }
  .block {
    width: 42vw;
    justify-content: flex-start !important;
  }
  .invite_total {
    margin: 0 auto;
    width: 93vw;
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
  }
</style>
