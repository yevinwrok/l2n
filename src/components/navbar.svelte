<script lang="ts">
  import { push } from "svelte-spa-router";
  import { isMobile } from "../store";
  function navBtnClick(path: string) {
    push(path);
  }
</script>

<main>
  {#if !$isMobile}
    <nav class="nav">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <img
        src="./assets/logo.png"
        alt="logo"
        class="logo"
        on:click={() => push("/")}
      />
      <span class="promise"
        ><img src="./assets/icon_refund.png" alt="" />未服务全额退
      </span>
      <span class="promise"
        ><img src="./assets/icon_compensation.png" alt="" />爽约包赔
      </span>
      <span class="promise"
        ><img src="./assets/icon_fast.png" alt="" /> 极速退款
      </span>
      <div class="filler"></div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->

      <div class="navBtn" on:click={() => navBtnClick("/")}>首页</div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="navBtn" on:click={() => navBtnClick("/agreement/terms")}>
        服务条款
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="navBtn" on:click={() => navBtnClick("/agreement/privacy")}>
        隐私协议
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="navBtn" on:click={() => navBtnClick("/agreement/duty")}>
        责任说明
      </div>
    </nav>
  {/if}
</main>

<style scoped lang="scss">
  .nav {
    user-select: none;
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    .logo {
      width: 120px;
      height: 45px;
      cursor: pointer;
    }
    .promise {
      height: 20px;
      font-family: PingFang SC;
      //   font-weight: 500;
      font-size: 21px;
      color: #000000;
      display: flex;
      gap: 8px;
      align-items: center;
      img {
        width: 24px;
        height: 24px;
      }
      margin-left: 30px;
    }
    .navBtn {
      width: 120px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 22px;
      cursor: pointer;
      margin-left: 24px;
    }
    .filler {
      flex-grow: 1;
    }
  }
</style>
