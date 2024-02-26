<script lang="ts">
  import { push } from "svelte-spa-router";
  import { isMobile } from "../store";
  function navBtnClick(type: string) {
    push("/agreement/" + type);
  }
</script>

<footer class={`footer ${$isMobile ? "mobile" : ""}`}>
  {#if $isMobile}
    <img src="./assets/img_bottom.png" alt="" class="img_bottom" />
  {/if}
  <div class="footer_agreement">
    <div class="footer_agreement_item" on:click={() => navBtnClick("terms")}>
      服务条款
    </div>
    <div class="filler"></div>
    <div class="footer_agreement_item" on:click={() => navBtnClick("privacy")}>
      隐私协议
    </div>
  </div>
  <div class={`footer_record`}>
    Copyright © 2024 北京爱享到家科技有限公司 All rights reserved
    <br />
    <a class="footer_link" target="_blank" href="https://beian.miit.gov.cn/"
      >京ICP备2024047419号-1</a
    > 联系电话:15139725952
  </div>
</footer>

<style lang="scss">
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .footer_agreement {
      position: relative;
      display: flex;
      font-family: PingFang SC;
      font-weight: 500;
      font-size: 18px;
      color: #000000;
      line-height: 22px;
      margin-bottom: 23px;
      align-items: center;
      .footer_agreement_item {
        cursor: pointer;
      }
      .filler {
        width: 1px;
        height: 16px;
        background: #000000;
        opacity: 0.1;
        margin: 0 20px;
      }
    }

    .footer_record {
      font-family: PingFang SC;
      font-size: 16px;
      color: #9a9a9a;
      line-height: 22px;
      flex-grow: 1;
      padding-bottom: 40px;
      text-align: center;
      position: relative;
    }
    .footer_link {
      color: inherit;
      text-decoration: underline;
    }
  }

  .img_bottom {
    width: 93vw;
    height: 13vw;
    position: absolute;
    bottom: 0;
  }

  .footer.mobile {
    .footer_agreement {
      font-size: 4vw;
      margin-bottom: 3vw;
    }
    .filler {
      opacity: 0;
    }
    .footer_record {
      font-size: 2.5vw;
      max-width: 80vw;
      text-align: center;
      padding-bottom: 3vw;
    }
  }
</style>
