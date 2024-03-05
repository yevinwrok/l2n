<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import { getContext } from "svelte";
  let theSecond: boolean = getContext("theSecond");
  function assets(theSecond: boolean): string {
    if (theSecond) {
      return "_2";
    } else {
      return "";
    }
  }
</script>

<div class="pc">
  <div class="pc_left" in:fade={{ duration: 500, delay: 200 }}>
    <div class="pc_left_title">
      {theSecond ? "在家享受优质服务" : "在家享受按摩服务"}
    </div>
    <div class="pc_left_btns">
      <div class="pc_left_btn">
        <img src="./assets/icon_iOS.png" alt="" />iPhone版
      </div>
      <div class="pc_left_btn">
        <img src="./assets/icon_android.png" alt="" />Android版
      </div>
    </div>
    <img
      src="./assets/img_screen{assets(theSecond)}.png"
      alt="screen_img"
      class="pc_left_img"
    />
  </div>
  <div in:fade={{ duration: 500, delay: 200 }} class="pc_right">
    <img
      src="./assets/img_phone{assets(theSecond)}.png"
      alt=""
      class="pc_right_img"
      in:fly={{ x: 500, duration: 500, delay: 200 }}
    />
  </div>
</div>

<style lang="scss" scoped>
  .pc {
    display: flex;
  }
  .pc_right_img {
    width: 480px;
  }
  .pc_left {
    width: 679px;
    padding-top: 100px;
    .pc_left_title {
      font-family: Source Han Sans Old Style;
      font-weight: bold;
      font-size: 75px;
      color: #000000;
      line-height: 60px;
    }
    .pc_left_btns {
      margin-top: 81px;
      justify-content: space-between;
      display: flex;
      cursor: pointer;
      .pc_left_btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 320px;
        height: 100px;
        background: #000000;
        box-shadow: 0px 5px 25px 0px rgba(0, 0, 0, 0.2);
        border-radius: 13px;
        color: #fff;
        font-weight: 500;
        font-size: 30px;
        color: #ffffff;
        img {
          width: 36px;
          margin-right: 11px;
        }
      }
    }
    .pc_left_img {
      width: 645px;
      height: 390px;
      margin-top: 29px;
    }
  }
</style>
