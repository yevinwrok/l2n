<script lang="ts">
  import { replace } from "svelte-spa-router";
  import { isMobile } from "../../store";
  if (!$isMobile) {
    replace("/");
  }
  function install() {
    // 粘贴板
    // 埋点
    // 如果是安卓
    // 如果是ios
  }
</script>

<div class="landingpage">
  <img src="./assets/landingPage/icon_app.png" alt="" class="landingpage_app" />
  <img
    src="./assets/landingPage/img_text.png"
    alt=""
    class="landingpage_text"
  />
  <button class="landingpage_btn" on:click={install}>立即安装</button>
  <img
    src="./assets/landingPage/img_info.png"
    alt=""
    class="landingpage_info"
  />
</div>

<style scoped>
  .landingpage_app {
    width: 19.5vw;
    height: 19.5vw;
    margin: 0 auto;
  }
  .landingpage_text {
    width: 81.4vw;
    height: 18.6vw;
    margin: 4vw auto;
  }
  .landingpage_info {
    width: 100%;
  }

  .landingpage {
    padding-top: 9.8vw;
  }

  .landingpage_btn {
    width: 81.4vw;
    height: 12.1vw;
    background: #000000;
    border-radius: 6vw;
    font-family: PingFang SC;
    font-weight: bold;
    font-size: 3.7vw;
    color: #ffffff;
    display: block;
    margin: 2.7vw auto 2.2vw;
  }
</style>
