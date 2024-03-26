<script lang="ts">
  import { isMobile } from "../../store";
  import { replace, pop, push } from "svelte-spa-router";
  import HyNav from "../../components/hyNav.svelte";
  import Modal from "../../components/modal.svelte";
  import ShareBlackBtn from "../../components/shareBlackBtn.svelte";
  import toast from "../../tools/toast";
  import { bindWechat, bindAli, wallet, withdraw } from "../../api/index";
  import {
    type WithdrawTypeListItem,
    ECheckboxSelect,
    withdrawTypeList,
  } from "./helper";
  import { call } from "../../bridge";

  $: {
    if (!$isMobile) replace("/");
  }

  let userInfo = {
    balance: 0,
    ali_account: "",
    wechat_nickname: "",
  };
  let withdrawBtnList = [];
  let withdrawBtnActive = 0;
  let checkboxSelect: ECheckboxSelect;
  let showModal: boolean = false;
  let modalDate: WithdrawTypeListItem;
  let name, account_1, account_2;

  wallet().then((res) => {
    withdrawBtnList = res.withdraw_price || [];
    userInfo = {
      balance: res.balance,
      ali_account: res.ali_account,
      wechat_nickname: res.wechat_nickname,
    };

    if (res.ali_account) {
      checkboxSelect = ECheckboxSelect.alipay;
    } else if (res.wechat_nickname) {
      checkboxSelect = ECheckboxSelect.wechat;
    }
  });

  async function withdrawTypeClick(wtl: WithdrawTypeListItem) {
    if (wtl.type === ECheckboxSelect.wechat) {
      const res: any = await call("weChatLogin", {});
      if (res.code) {
        const r = await bindWechat(res.code);
        if (r) {
          toast("绑定成功");
          window.location.reload();
        }
      }
    } else {
      if (userInfo[wtl.field]) {
        checkboxSelect = wtl.type;
      } else {
        modalDate = wtl;
        showModal = true;
      }
    }
  }

  async function withdrawBind() {
    if (!name) {
      toast("请填写您的真实姓名");
      return;
    }

    if (!account_1 || !account_2) {
      toast(`请填写您的${modalDate.name}账号`);
      return;
    }

    if (account_1 !== account_2) {
      toast(`请填写您的${modalDate.name}账号不一致`);
      return;
    }

    const res = await bindAli(account_1, name);
    if (res) {
      toast("绑定成功");
      showModal = false;
      setTimeout(() => {
        location.reload();
      }, 2000);
    }
  }
  async function withdrawHandle() {
    if (checkboxSelect === undefined) {
      toast("请选择提现方式");
      return;
    }
    const res = await withdraw(
      withdrawBtnList[withdrawBtnActive],
      checkboxSelect,
    );
    if (res.data) {
      toast("提现成功");
      setTimeout(() => {
        location.reload();
      }, 3000);
    }
  }
</script>

{#if showModal}
  <Modal show={showModal} on:close={() => (showModal = false)}>
    <div class="withdraw_modal">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <img
        on:click={() => (showModal = false)}
        src="./assets/hybrid/icon_close.png"
        alt=""
        class="withdraw_modal_close"
      />
      <div class="withdraw_modal_title">请绑定{modalDate.name}</div>
      <div class="withdraw_modal_text">绑定后可提现到{modalDate.name}</div>
      <input
        type="text"
        class="withdraw_modal_input"
        placeholder="请输入您的真实姓名"
        bind:value={name}
      />
      <input
        type="text"
        class="withdraw_modal_input"
        placeholder="请输入您的{modalDate.name}账号"
        bind:value={account_1}
      />
      <input
        type="text"
        class="withdraw_modal_input"
        placeholder="请再次输入您的{modalDate.name}账号"
        bind:value={account_2}
      />
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="withdraw_modal_btn" on:click={withdrawBind}>提交</div>
    </div>
  </Modal>
{/if}

<HyNav title="提现" backFn={() => pop()}>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    slot="right"
    class="header_right"
    on:click={() => push("/share/rewards_history")}
  >
    收支明细
  </div>
</HyNav>

<div class="withdraw">
  <div class="current">
    <div class="current_amount">￥{userInfo.balance}</div>
    <div class="current_text">当前余额(元)</div>
  </div>
  <div class="withdraw_subtitle">请选择提现金额</div>
  <div class="withdraw_btns">
    {#each withdrawBtnList as money, idx}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class={`withdraw_btn ${withdrawBtnActive === idx ? "active" : ""}`}
        on:click={() => (withdrawBtnActive = idx)}
      >
        {money}元
      </div>
    {/each}
  </div>
  <div class="withdraw_subtitle">请选择提现方式</div>
  <div class="withdraw_type">
    {#each withdrawTypeList as wtl}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="withdraw_type_item" on:click={() => withdrawTypeClick(wtl)}>
        <img src={wtl.icon} alt="" class="withdraw_type_item_icon" />
        <div class="withdraw_type_item_text">提现到{wtl.name}</div>
        <div class="withdraw_type_item_main">
          {#if !userInfo[wtl.field]}
            暂未绑定{wtl.name}
            <img src="./assets/hybrid/icon_arrow_1.png" alt="" />
          {:else}
            {userInfo[wtl.field]}
          {/if}
        </div>
        <div
          class={`withdraw_type_item_checkbox ${
            checkboxSelect === wtl.type ? "active" : ""
          }`}
        ></div>
      </div>
    {/each}
  </div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="withdraw_black_btn" on:click={withdrawHandle}>
    <ShareBlackBtn>提现</ShareBlackBtn>
  </div>
</div>

<style lang="scss">
  .withdraw_modal {
    width: 80vw;
    border-radius: 2vw;
    background-color: #fff;
    font-family: PingFang SC;
    padding: 7vw 7vw 9vw;
    display: flex;
    flex-direction: column;
    align-items: center;

    .withdraw_modal_close {
      width: 3vw;
      height: 3vw;
      position: absolute;
      right: 4vw;
      top: 4vw;
    }
    .withdraw_modal_title {
      font-weight: bold;
      font-size: 4vw;
      color: #000000;
    }
    .withdraw_modal_text {
      font-size: 3vw;
      color: #3d3d3d;
      margin-top: 4vw;
      margin-bottom: 4vw;
    }
    .withdraw_modal_input {
      border: 0;
      border-bottom: 1px solid #f3f3f3;
      width: 56vw;
      height: 12vw;
      line-height: 12vw;
      appearance: none; /* 取消所有默认样式 */

      font-size: 3vw;
      &::placeholder {
        color: #878787;
      }
      &:active {
        border: none !important;
        outline: none !important;
      }
    }
    .withdraw_modal_btn {
      width: 60vw;
      height: 10vw;
      line-height: 10vw;
      background: #000000;
      border-radius: 5vw;
      font-weight: bold;
      font-size: 4vw;
      color: #ffffff;
      text-align: center;
      margin-top: 8vw;
    }
  }
  .withdraw_black_btn {
    margin-top: 12vw;
  }
  .withdraw_type {
    width: 100%;
    height: 26vw;
    background: #f7f8fa;
    border-radius: 2vw;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .withdraw_type_item_main {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 2.6vw;
      color: #a9a9a9;
      padding-right: 3vw;
      img {
        width: 2.6vw;
        height: 2.6vw;
        margin-left: 0.5vw;
      }
    }
    .withdraw_type_item_checkbox {
      width: 4vw;
      height: 4vw;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid #dcdcdc;
      &.active {
        background: url("../assets/hybrid/icon_check_select.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        border-color: transparent;
      }
    }
    .withdraw_type_item_icon {
      width: 5vw;
      height: 5vw;
    }
    .withdraw_type_item_text {
      font-weight: bold;
      font-size: 3.5vw;
      color: #000000;
      margin-left: 2vw;
    }
    .withdraw_type_item {
      display: flex;
      padding: 0 4vw;
      align-items: center;
    }
  }
  .withdraw_subtitle {
    font-size: 3vw;
    color: #000000;
    margin: 5vw 0;
  }
  .withdraw_btns {
    display: flex;
    flex-wrap: wrap;
    gap: 3vw;
    .withdraw_btn {
      font-weight: 800;
      width: 29vw;
      flex-shrink: 0;
      height: 16vw;
      line-height: 16vw;
      border-radius: 2vw;
      text-align: center;
      background: #f7f8fa;
      &.active {
        background: linear-gradient(-90deg, #f1ff79, #b4fc15);
      }
    }
  }
  .header_right {
    font-size: 4vw;
    color: #000000;
  }
  .withdraw {
    padding: 0 3vw;
  }
  .current {
    margin-top: 4vw;
    width: 100%;
    height: 23vw;
    background: #f7f8fa;
    border-radius: 2vw;
    padding-top: 5vw;
    padding-left: 5vw;

    .current_amount {
      font-weight: 800;
      font-size: 6vw;
      line-height: 6vw;
      color: #000000;
    }
    .current_text {
      margin-top: 3vw;
      font-size: 3vw;
      color: #a9a9a9;
      //   transform: translateX(1vw);
    }
  }
</style>
