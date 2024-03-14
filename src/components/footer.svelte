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
    <div class="footer_agreement">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="footer_agreement_item" on:click={() => navBtnClick("terms")}>
        服务条款
      </div>
      <div class="filler"></div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="footer_agreement_item"
        on:click={() => navBtnClick("privacy")}
      >
        隐私协议
      </div>
      <div class="filler"></div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="footer_agreement_item" on:click={() => navBtnClick("duty")}>
        责任说明
      </div>
      <div class="filler"></div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="footer_agreement_item" on:click={() => navBtnClick("AFQ")}>
        常见问题
      </div>
    </div>
    <div class="footer_record">
      Copyright © 2024 北京爱享到家科技有限公司 All rights reserved
      <br />
      <a class="footer_link" target="_blank" href="https://beian.miit.gov.cn/"
        >京ICP备2024047419号-1</a
      > 联系电话:15139725952
    </div>
  {:else}
    <div class="footer_record">
      Copyright © 2024 北京爱享到家科技有限公司 All rights reserved
      <br />
      <a class="footer_link" target="_blank" href="https://beian.miit.gov.cn/"
        >京ICP备2024047419号-1</a
      >
      <div class="footer_other">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div on:click={() => navBtnClick("AFQ")}>常见问题</div>
        <div class="tel">
          联系方式
          <div class="hover">Tel: 15139725952</div>
        </div>
      </div>
    </div>
  {/if}
</footer>

<style lang="scss">
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-top: 100px;
    .footer_other {
      font-size: 14px;
      color: #b7b8b6;
      margin-top: 10px;
      display: flex;
      width: 100%;
      justify-content: center;
      gap: 30px;
      text-decoration: underline;
      position: relative;
      div {
        cursor: pointer;
      }
      .tel {
        position: relative;
      }
      .hover {
        display: none;
        position: absolute;
        bottom: 0;
        right: 0;
        background: #fff;
        padding: 6px 5px;
        border-radius: 4px;
        color: #000000;
        transform: translate(110%, 10%);
      }
      .tel:hover .hover {
        display: block;
        width: 130px;
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
      text-decoration: none;
    }
  }

  .img_bottom {
    width: 93vw;
    height: 13vw;
    position: absolute;
    bottom: 0;
  }

  .footer.mobile {
    margin-top: 0px;

    .footer_agreement {
      position: relative;
      display: flex;
      font-family: PingFang SC;
      color: #000000;
      align-items: center;
      font-size: 3.5vw;
      margin-bottom: 3vw;
      .footer_agreement_item {
        cursor: pointer;
      }
      .filler {
        width: 1px;
        height: 16px;
        background: #000000;
        opacity: 0.1;
        margin: 0 10px;
        opacity: 0;
      }
    }
    .footer_record {
      font-size: 2.5vw;
      max-width: 80vw;
      text-align: center;
      padding-bottom: 3vw;
    }
  }
</style>
