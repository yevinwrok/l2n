<script lang="ts">
  import { onDestroy, tick } from "svelte";
  import { isMobile } from "../../store";
  import { replace, push } from "svelte-spa-router";
  import HyNav from "../../components/hyNav.svelte";
  import ShareModal from "./shareModal.svelte";
  import {
    getShareIntro,
    applyPartner,
    getInviteRecords,
    inviteShare,
  } from "../../api/index";
  import toast from "../../tools/toast";
  $: {
    if (!$isMobile) replace("/");
  }

  let shareIntro = {
    today_price: 0,
    total_price: 0,
    balance: 0,
  };
  getShareIntro().then((res) => {
    shareIntro = res;
  });

  async function apply() {
    const res = await applyPartner();
    if (res) {
      toast("申请成功!");
    }
  }

  let inviteRecords = [];
  let carouselRef: HTMLElement;
  getInviteRecords().then(async (res) => {
    // inviteRecords = [
    //   "李兰兰 昨日通过邀请获得￥3728元",
    //   "李兰兰 昨日通过邀请获得￥3728元",
    //   "李兰兰 昨日通过邀请获得￥3728元",
    //   "李兰兰 昨日通过邀请获得￥3728元",
    // ];
    inviteRecords = res || [];

    await tick();
    const children = carouselRef.querySelectorAll(".carousel_item");
    runCarousel(children);
  });

  let tm,
    carIndex = 0;
  function runCarousel(children: NodeListOf<Element>) {
    const c = Array.from(children);
    const base = 12;
    carIndex++;
    if (carIndex === c.length) {
      carIndex = 0;
    }
    tm = setTimeout(() => {
      c.forEach((el, index) => {
        const styleStr = el.getAttribute("style");
        el.setAttribute(
          "style",
          `transform:translateY(${base * index - base * carIndex}vw);`,
        );
      });
      runCarousel(children);
    }, 4000);
  }
  let shareModalImg,
    shareModalShow = false;
  function share() {
    inviteShare().then((res) => {
      if (res && res.img_url) {
        shareModalShow = true;
        shareModalImg = res.img_url;
      }
    });
  }

  onDestroy(() => {
    clearTimeout(tm);
  });
</script>

<div class="share">
  <HyNav title="分享赚钱" hideBack>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="header_wallet"
      slot="right"
      on:click={() => push("/share/withdraw")}
    >
      <img
        src="./assets/hybrid/icon_wallet.png"
        alt=""
        class="header_wallet_icon"
      />
      ¥{shareIntro.balance}
      <img
        src="./assets/hybrid/icon_arrow.png"
        alt=""
        class="header_wallet_next"
      />
    </div>
  </HyNav>
  <div class="top">
    <div class="top_data">
      <div class="top_data_item">
        <div class="top_data_item_num">¥{shareIntro.today_price}</div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="top_data_item_text"
          on:click={() => push("/share/invite_history")}
        >
          今日奖励
          <img src="./assets/hybrid/icon_arrow_1.png" alt="" />
        </div>
      </div>
      <div class="top_data_item">
        <div class="top_data_item_num">¥{shareIntro.total_price}</div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="top_data_item_text"
          on:click={() => push("/share/invite_history")}
        >
          累计奖励<img src="./assets/hybrid/icon_arrow_1.png" alt="" />
        </div>
      </div>
    </div>
  </div>
  <div class="carousel" bind:this={carouselRef}>
    <img
      src="./assets/hybrid/img_share_middle.png"
      alt=""
      class="carousel_img"
    />
    {#each inviteRecords as item, index}
      <div class="carousel_item" style="transform: translateY({index * 12}vw);">
        <img src="./assets/hybrid/icon_message.png" alt="" />
        {item}
      </div>
    {/each}
  </div>
  <div class="info">
    <img src="./assets/hybrid/img_share_assets_1.png" alt="" class="info_img" />
    <div class="info_text">
      <div class="info_text_item">
        分享二维码<br />
        邀请用户扫码下载
        <div class="info_text_item_tag">首次下载</div>
      </div>
      <div class="info_text_item">
        用户下单<br />
        您可获得下单的<span class="red">10%</span>
        <div class="info_text_item_tag">永久奖励</div>
      </div>
      <div class="info_text_item">
        用户成为技师<br />
        您可获得接单的<span class="red">10%</span>
        <div class="info_text_item_tag">永久奖励</div>
      </div>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="share_black_btn" on:click={share}>邀请赚钱</div>
    <div class="share_gray_info">
      注：被邀请用户可随意切换用户/技师身份，只要邀请成功，可以
      同时享受两种身份的金额分成奖励... 查看活动规则<img
        src="./assets/hybrid/icon_arrow_1.png"
        alt=""
        class="share_gray_info_arrow"
      />
    </div>
  </div>
  <div class="partner">
    <img
      src="./assets/hybrid/img_share_assets_2.png"
      alt=""
      class="partner_img"
    />
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="share_black_btn" on:click={apply}>申请市场合伙人</div>
    <div class="share_gray_info">
      邀请攻略：向朋友、家人、同事等身边的人推荐该产品，并邀请
      他们使用...更多邀请攻略<img
        src="./assets/hybrid/icon_arrow_1.png"
        alt=""
        class="share_gray_info_arrow"
      />
    </div>
  </div>
</div>
<ShareModal
  show={shareModalShow}
  img={shareModalImg}
  on:close={() => (shareModalShow = false)}
/>

<style lang="scss" scoped>
  .partner_img {
    width: 68vw;
    height: 29vw;
    margin: 9vw auto 7vw;
    display: block;
  }
  .share_gray_info {
    width: 86vw;
    font-family: PingFang SC;
    font-size: 3vw;
    color: #a9a9a9;
    line-height: 5vw;
    margin: 0 auto;
    margin-top: 5vw;
    .share_gray_info_arrow {
      width: 2vw;
      height: 2vw;
      display: inline;
    }
  }
  .share_black_btn {
    width: 89vw;
    height: 12vw;
    background: #000000;
    border-radius: 6vw;
    font-family: PingFang SC;
    font-weight: bold;
    font-size: 4vw;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }
  .info {
    font-family: PingFang SC;
    .info_img {
      width: 74vw;
      height: 8vw;
      margin: 7vw auto 1.5vw;
      display: block;
    }
    .info_text {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 4vw 0 5vw;
      margin-bottom: 7vw;
    }
    .info_text_item {
      text-align: center;
      font-weight: bold;
      font-size: 3vw;
      color: #1e1e1e;
      .red {
        color: #ff2d51;
      }
      .info_text_item_tag {
        font-weight: bold;
        font-size: 3vw;
        color: #1e1e1e;
        width: 14vw;
        height: 5vw;
        line-height: 5vw;
        background: #b4fc15;
        border-radius: 0 2vw 0 2vw;
        margin: 2vw auto 0;
      }
    }
  }
  .share {
    background-image: url("../assets/hybrid/img_wallet_bg.png");
    background-repeat: no-repeat;
    background-size: 100% auto;
    min-height: 100vh;
  }
  .header_wallet {
    width: 23vw;
    height: 8vw;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 4vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1vw 0 3vw;
    font-size: 4vw;

    .header_wallet_icon {
      width: 5vw;
      height: 5vw;
    }
    .header_wallet_next {
      width: 4vw;
      height: 4vw;
    }
  }
  .top_data {
    display: flex;

    .top_data_item {
      flex-basis: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 10vw;
    }

    .top_data_item_num {
      font-family: PingFang SC;
      font-weight: 800;
      font-size: 7vw;
      color: #272727;
    }
    .top_data_item_text {
      font-family: PingFang SC;
      font-size: 3vw;
      color: #a9a9a9;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 2vw;
        height: 2vw;
        margin-left: 1vw;
      }
    }
  }
  .carousel {
    width: 100vw;
    margin-top: 6vw;
    position: relative;
    height: 12vw;
    overflow: hidden;
    .carousel_img {
      width: 93vw;
      height: 12vw;
      margin: 0 auto;
      display: block;
    }

    .carousel_item {
      position: absolute;
      top: 0;
      display: flex;
      align-items: center;
      width: 93vw;
      height: 12vw;
      left: 6vw;
      transition: transform 0.5s linear;
      font-family: PingFang SC;
      font-weight: bold;
      font-size: 3vw;
      color: #131923;
      gap: 3vw;
      img {
        width: 5vw;
        height: 5vw;
      }
    }
  }
</style>
