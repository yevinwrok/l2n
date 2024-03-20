<script lang="ts">
  import toast from "../../tools/toast";
  import { surveyList } from "./helper";
  let sl = JSON.parse(JSON.stringify(surveyList));
  let showCoupon = false;

  function back() {
    window.history.go(-1);
  }

  sl.forEach((item) => {
    if (item.type === "s" || item.type === "m") {
      item.options.forEach((opt) => {
        opt.checked = false;
        if (opt.input === true) {
          opt.input_value = "";
        }
      });
    } else if (item.type === "i") {
      item.input_value = "";
    }
  });

  function radioClick(item, opt) {
    if (item.type === "s") {
      item.options.forEach((o) => {
        if (o.value !== opt.value) {
          o.checked = false;
          if (o.input_value) o.input_value = "";
        } else {
          opt.checked = true;
        }
      });
    } else {
      opt.checked = !opt.checked;
    }
    const index = sl.findIndex((i) => i.title === item.title);
    sl[index] = item;
  }

  function submit() {
    for (let i = 0; i < sl.length; i++) {
      let item = sl[i];
      console.log(item.title);
      if (item.type === "i") {
        console.log("value", item.input_value);
      } else {
        let res = item.options.filter((item) => item.checked);
        if (res.length) {
          for (let j = 0; j < res.length; j++) {
            let opt = res[j];
            if (opt.input) {
              if (!opt.input_value) {
                toast("请填写完整");
                break;
              }
              console.log(opt.label);
              console.log(opt.input_value);
            } else {
              console.log(opt.label);
              console.log(opt.value);
            }
          }
        } else {
          toast("请回答完整");
          break;
        }
      }
      showCoupon = true;
    }
  }
</script>

<div class="survey">
  <div class="survey_main">
    <div class="survey_main_box">
      <p class="survey_main_title">尊敬的爱到家用户：</p>
      <p class="survey_main_text">
        您好，诚邀您参与本次问卷调查，为了给您提供更优质的服务，我们将占用您几分钟宝贵的时间参与答题，答题后我们将会赠送20元优惠券。每个账号仅可参与一次。
      </p>
    </div>
    <div class="survey_main_select">
      {#each sl as item}
        <p class="title">{item.title}</p>
        {#if item.type === "m" || item.type === "s"}
          <div class="radio_box">
            {#each item.options as opt}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div
                class="radio_item"
                class:active={opt.checked}
                on:click={() => radioClick(item, opt)}
              >
                <span class="radio"></span>
                <div style="flex:1;">{opt.label}</div>
                {#if opt.input}
                  <input
                    type="text"
                    class="inline_input"
                    placeholder="请填写"
                    bind:value={opt.input_value}
                    disabled={!opt.checked}
                  />
                {/if}
              </div>
            {/each}
          </div>
        {:else if item.type === "i"}
          <textarea
            name=""
            id=""
            class="textarea_input"
            placeholder="请填写您的建议"
            bind:value={item.input_value}
          ></textarea>
        {/if}
      {/each}
      <button class="survey_main_btn" on:click={submit}>提交问卷</button>
    </div>
  </div>
</div>
{#if showCoupon}
  <div class="coupon">
    <div class="coupon_main">
      <div class="coupon_main_title">参与奖励</div>
      <div class="coupon_main_info">感谢您的参与，您的20元优惠券已发放</div>
      <img
        src="./assets/hybrid/img_coupon_card.png"
        alt=""
        class="coupon_main_center"
      />
      <div class="coupon_main_btns">
        <button class="coupon_main_btn white" on:click={back}>好的</button>
        <button class="coupon_main_btn" on:click={back}>去使用</button>
      </div>
    </div>
  </div>
{/if}

<style scoped>
  .coupon {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.7);
  }
  .coupon_main {
    background: #ffffff;
    border-radius: 1.9vw;
    padding: 7vw 7.4vw 8.2vw;
    text-align: center;
  }
  .coupon_main_title {
    font-size: 4.2vw;
    color: #000000;
  }
  .coupon_main_info {
    font-size: 3.3vw;
    color: #3d3d3d;
    margin-top: 4.5vw;
  }
  .coupon_main_center {
    width: 59.5vw;
    height: 18.6vw;
    margin-top: 7vw;
  }
  .coupon_main_btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .coupon_main_btn {
    width: 27.9vw;
    height: 10.2vw;
    line-height: 10.2vw;
    border-radius: 5.1vw;
    font-weight: bold;
    font-size: 3.7vw;
    margin-top: 7vw;
    background: #000000;
    color: #fff;
  }

  .coupon_main_btn.white {
    color: #424242;
    background: #f4f5f8;
  }

  .survey_main_btn {
    width: 74.4vw;
    height: 12.1vw;
    line-height: 12.1vw;
    background: #000000;
    border-radius: 60px;
    font-weight: bold;
    font-size: 3.7vw;
    color: #ffffff;
    text-align: center;
    margin-top: 4.7vw;
  }
  .inline_input {
    width: 40.5vw;
    height: 9.3vw;
    background: #f7f8fa;
    border-radius: 19px;
    padding: 3vw 3.6vw;
  }
  .inline_input:disabled {
    opacity: 0.4;
  }
  .textarea_input {
    width: 100%;
    min-height: 18.6vw;
    background: #f7f8fa;
    border-radius: 1.9vw;
    padding: 3.5vw;
    resize: none;
  }
  .survey {
    background: linear-gradient(#d9fc8a, #f5faea);
    height: 100vh;
    overflow: auto;
    width: 100vw;
    padding: 18vw 7vw 0;
  }
  .survey_main {
    width: 100%;
    background: #fff2d1;
    border-radius: 3.5vw;

    font-family: PingFang SC;
    font-size: 3.5vw;
    color: #c19c53;
  }
  .survey_main_title {
    font-weight: bold;
    font-size: 4vw;
    margin-bottom: 4.5vw;
  }

  .survey_main_box {
    padding: 4.6vw 4.8vw;
  }

  .survey_main_select {
    width: 100%;
    background: #ffffff;
    border-radius: 3.5vw;
    color: #555555;
    font-size: 3.5vw;
    padding: 5.6vw 4.7vw;
  }
  .survey_main_select .title {
    font-weight: 800;
    font-size: 3.5vw;
    color: #000000;
    margin: 2.3vw 0 3.2vw;
  }
  .survey_main_select .radio_box {
    display: flex;
    flex-direction: column;
    gap: 2vw;
  }
  .radio_item {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .survey_main_select .radio {
    display: inline-block;
    width: 4.7vw;
    height: 4.7vw;
    background: rgba(255, 255, 255, 0);
    border-radius: 50%;
    border: 2px solid #dcdcdc;
    margin-right: 2vw;
    overflow: hidden;
  }
  .radio_item.active .radio {
    background-image: url("/assets/hybrid/icon_check.png");
    border: 2px solid transparent;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
  }
</style>
