<script lang="ts">
  import Content from "../../../agreement/contract";
  import { isMobile } from "../../../store";
  import Signature from "../../../components/signature.svelte";
  import toast from "../../../tools/toast";
  import Loading from "../../../components/loading.svelte";
  import { call } from "../../../bridge";
  let article = Content;
  let showSign = false;
  let isLogin = false;
  let signFn: any;
  let signImg: string;

  let href = window.location.href;
  let contract = href.split("?contract=") ? href.split("?contract=")[1] : "";

  if (contract) {
    signImg = decodeURIComponent(contract);
  }
  function reset() {
    signFn.clear();
  }
  function getSign() {
    if (signFn.isEmpty()) {
      return toast("请先签名");
    }
    window.scrollTo({
      top: 20000,
      behavior: "smooth",
    });
    showSign = false;
    signImg = signFn.getPNG();
  }

  function close() {
    reset();
    showSign = false;
  }

  async function submit() {
    if (isLogin) {
      return;
    }
    if (!signImg) {
      return;
    }
    isLogin = true;
    var binaryString = window.atob(signImg.split(",")[1]);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    var blob = new Blob([bytes], { type: "image/png" });
    var formData = new FormData();
    formData.append("file", blob, "signature.png");
    formData.append("type", "TECHNICIAN_CONTRACT");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://aixiang.imoneywalk.com/system/upload_img", true);

    const callData = {
      url: "/system/upload_img",
      method: "post",
    };
    const res = await call("getinfo", callData);

    Object.keys(res).forEach((key) => {
      xhr.setRequestHeader(key, res[key]);
    });
    xhr.onload = function () {
      isLogin = false;
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.response) || ({} as any);
        console.log("res: ", res);
        if (res.code !== 200 || !res.data) {
          toast(res.msg || "上传失败,请重试");
        } else {
          // toast(res.data);
          // gonext
          call("contractSignature", {
            url: res.data,
          });
        }
      } else {
        toast("上传失败,请重试");
      }
    };
    xhr.send(formData);
  }
</script>

<article class={`black agreement ${$isMobile ? "mobile" : ""}`}>
  <h1 class="agreement_title">{article.title}</h1>
  {#if article.time}
    <h3 class="agreement_time">{article.time}</h3>
  {/if}
  {#each article.content as item}
    <div class="agreement_item">{item}</div>
  {/each}
  {#if signImg}
    <img src={signImg} alt="" style="width: 27vw;margin-left: 49vw;" />
  {/if}
</article>
{#if !contract}
  <div class="signature_ctr">
    {#if !signImg}
      <button class="signature_btn" on:click={() => (showSign = true)}
        >手写签名</button
      >
    {:else}
      <button class="signature_btn line" on:click={() => (showSign = true)}>
        重签
      </button>
      <button class="signature_btn" style="flex-shrink: 0;" on:click={submit}>
        {#if isLogin}
          <Loading />
        {:else}
          确认签署
        {/if}
      </button>
    {/if}
  </div>
{/if}

{#if showSign}
  <div class="signature">
    <div class="signature_head">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      请手写签名(请保持字迹工整):
      <img
        src="./assets/hybrid/icon_close.png"
        alt="close"
        class="close"
        on:click={close}
      />
    </div>
    <Signature bind:signatureFn={signFn}></Signature>
    <div class="signature_footer">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="signature_btn line" on:click={reset}>重签</div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="signature_btn" style="flex-shrink: 0;" on:click={getSign}>
        确认
      </div>
    </div>
  </div>
{/if}

<style lang="scss" scoped>
  .signature {
    position: fixed;
    z-index: 200;
    width: 100vw;
    height: 100vh;
    background-color: #f8f8f8;
    top: 0;
    left: 0;
    .signature_head {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 10vw;
      line-height: 10vw;
      background: #fff;
      padding-left: 4vw;
      font-size: 4vw;
      .close {
        width: 3vw;
        height: 3vw;
        float: right;
        margin-top: 4vw;
        margin-right: 4vw;
      }
    }
    .signature_footer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100vw;
      background: #fff;
      justify-content: space-around;
      align-items: center;
      padding: 4vw 5vw;
      display: flex;
      gap: 5vw;
      justify-content: space-around;
    }
  }
  .signature_btn {
    margin: 0 auto;
    width: 59.5vw;
    height: 10.2vw;
    line-height: 10.2vw;
    background: #000000;
    border-radius: 5.1vw;
    text-align: center;
    font-size: 3.7vw;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    &.line {
      background: #fff;
      border: 1px solid #000;
      color: #000;
    }
  }
  .signature_ctr {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding: 4vw 5vw;
    box-shadow: #e5e8ea 0px -4px 20px 0px;
    display: flex;
    gap: 5vw;
    justify-content: space-around;
  }
  .agreement {
    scroll-behavior: smooth;
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 40px;
    font-family: PingFang SC;
    color: #000000;
    background-color: #e0e0e080;
    border-radius: 20px;
    overflow: hidden;
    overflow-y: scroll;
    .agreement_title {
      margin-bottom: 10px;
    }
    .agreement_time {
      margin-bottom: 20px;
    }
    .agreement_item {
      font-size: 20px;
      line-height: 32px;
    }
  }
  .mobile.agreement {
    padding: 10vw;
    background-color: transparent;
    margin-top: 0;
    padding-bottom: 30vh;
    &.black {
      background-color: #fff;
      color: #000;
      border-radius: 0;
      margin-bottom: 0;
    }
    .agreement_title {
      margin-bottom: 1vw;
      font-size: 10vw;
      text-align: center;
    }
    .agreement_time {
      margin-bottom: 7vw;
      font-size: 4vw;
      text-align: center;
    }
    .agreement_item {
      font-size: 4vw;
      line-height: 7vw;
    }
  }

  .back-button {
    display: inline-block;
    padding: 10px 20px;
    text-decoration: none;
    color: #333;
    font-weight: bold;
    transition: background-color 0.3s;
    height: 3vh;
  }
</style>
