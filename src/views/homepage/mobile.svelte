<script lang="ts">
  import { getContext } from "svelte";
  import { fly, fade } from "svelte/transition";
  let theSecond: boolean = getContext("theSecond");
  function assets(theSecond: boolean): string {
    if (theSecond) {
      return "_2";
    } else {
      return "";
    }
  }
</script>

<div class="mobile_homepage">
  <img
    src="./assets/img_screen{assets(theSecond)}.png"
    alt=""
    class="mb_img_screen"
    in:fade={{ duration: 300, delay: 200 }}
  />
  <div class="mb" in:fly={{ y: 200, duration: 300, delay: 200 }}>
    <div class="mb_title">
      {theSecond ? "在家享受优质服务" : "在家享受按摩服务"}
    </div>
    <img src="./assets/img_mb_service.png" alt="" class="mb_service" />
    <div class="mb_btn"><img src="./assets/icon_iOS.png" alt="" />iPhone版</div>
    <div class="mb_btn">
      <img src="./assets/icon_android.png" alt="" />Android版
    </div>
    <div style="flex-grow: 1;">
      <img
        src="./assets/img_mb_bottom_icon{assets(theSecond)}.png"
        alt=""
        class="mb_bottom_icon"
        in:fade={{ duration: 300, delay: 200 }}
      />
    </div>
  </div>
</div>

<style lang="scss">
  .mobile_homepage {
    height: 90vh;
  }
  .mb_img_screen {
    width: 100%;
    margin-top: 6vw;
  }
  .mb {
    display: flex;
    flex-direction: column;
    align-items: center;

    .mb_title {
      font-family: Source Han Sans Old Style;
      font-weight: bold;
      font-size: 7vw;
      color: #000000;
      line-height: 9vw;
      margin-top: 6vw;
    }
    .mb_service {
      width: 74vw;
      margin-top: 2vw;
    }
    .mb_btn {
      width: 74vw;
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
      gap: 2vw;
      margin-top: 6vw;
      img {
        width: 6vw;
      }
    }
  }
  .mb_bottom_icon {
    width: 74vw;
    margin-top: 3vh;
  }
</style>
