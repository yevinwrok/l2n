<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { call } from "../../bridge";

  export let img;
  export let show = false;

  const dispatch = createEventDispatcher();
  function close() {
    dispatch("close", true);
    show = false;
  }
  let btnConfig = [
    {
      url: "./assets/hybrid/share_button_wechat.png",
      text: "微信好友",
      handler() {
        call("shareImg", {
          type: 1,
          url: img,
        });
      },
    },
    {
      url: "./assets/hybrid/share_button_moment.png",
      text: "朋友圈",
      handler() {
        call("shareImg", {
          type: 2,
          url: img,
        });
      },
    },
    {
      url: "./assets/hybrid/share_button_link.png",
      text: "复制链接",
      handler() {
        call("copyLink", {
          url: "http://www.aixianghome.com",
        });
      },
    },
    {
      url: "./assets/hybrid/share_button_download.png",
      text: "保存图片",
      handler() {
        call("saveImg", {
          url: img,
        });
      },
    },
  ];
</script>

{#if show}
  <div class="share_modal">
    <img src={img} alt="" class="share_img" />
    <div class="share_modal_bottom">
      <div class="share_btns">
        {#each btnConfig as config}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div class="share_btn" on:click={config.handler}>
            <img src={config.url} alt="" />
            <div>{config.text}</div>
          </div>
        {/each}
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="share_cancel" on:click={close}>取消</div>
    </div>
  </div>
{/if}

<style lang="scss">
  .share_cancel {
    padding-top: 4.4vw;
    text-align: center;
    flex-grow: 1;
    background: #fff;
    margin-top: 4.3vw;
  }
  .share_btns {
    margin-top: 6.5vw;
    display: flex;
    justify-content: space-evenly;
    .share_btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 3vw;
      gap: 2.2vw;
      color: #666666;
      img {
        width: 12.8vw;
        height: 12.8vw;
      }
    }
  }
  .share_modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    z-index: 10;
  }
  .share_img {
    width: 83.7vw;
    height: 139.5vw;
    margin: 0 auto;
    display: block;
    transform: scale(0.8);
  }
  .share_modal_bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 46.2vw;
    background: #f7f7f7;
    border-radius: 28px 28px 0px 0px;
    display: flex;
    flex-direction: column;
  }
</style>
