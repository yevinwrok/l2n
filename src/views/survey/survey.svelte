<script lang="ts">
  import { submitSurvey } from "../../api";
  import { call } from "../../bridge";
  import toast from "../../tools/toast";
  import { surveyList } from "./helper";

  let sl = JSON.parse(JSON.stringify(surveyList));
  let showCoupon = false;
  let showCity = false;
  let couponData = {
    coupon_name: "", //优惠券名称
    tag: "", //标签
    coupon_price: 0, //优惠券价格
    detail_describe: "", //描述
  };
  function useCoupon() {
    call("useCoupon", {});
  }

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
        if (o.label !== opt.label) {
          o.checked = false;
          if (o.input_value) o.input_value = "";
        } else {
          opt.checked = true;
        }
      });
    } else {
      opt.checked = !opt.checked;
      if (item.sort) {
        opt.sort = Date.now();
      }
    }
    const index = sl.findIndex((i) => i.title === item.title);
    sl[index] = item;
  }

  function submit() {
    const data = {};
    let flag = true;
    for (let i = 0; i < sl.length; i++) {
      let item = sl[i];
      if (item.type === "i") {
        isInput(item, data);
      } else if (item.type === "d") {
        if (!item.input_value) {
          toast("请回答完整");
          flag = false;
          break;
        }
        isInput(item, data);
      } else if (item.type === "m") {
        const res = isMultiple(item, data);
        if (!res) {
          toast("请回答完整");
          flag = false;
          break;
        }
      } else if (item.type === "s") {
        const res = isSingle(item, data);
        if (!res) {
          toast("请回答完整");
          flag = false;
          break;
        }
      }
    }

    if (flag) {
      const p = {};
      Object.keys(data).forEach((key) => {
        if (typeof data[key] === "string") {
          p[key] = data[key];
        } else {
          p[key] = data[key].join(",");
        }
      });
      submitSurvey(p).then((res) => {
        couponData = res;
        showCoupon = true;
      });
    }
  }

  function isInput(item, data) {
    if (item.input_value) data[item.field] = item.input_value;
  }

  function isMultiple(item, data): boolean {
    let res = item.options
      .filter((item) => item.checked)
      .sort((a, b) => a.sort - b.sort);
    data[item.field] = [];
    if (res.length) {
      for (let j = 0; j < res.length; j++) {
        let opt = res[j];
        if (opt.input) {
          if (!opt.input_value) {
            toast("请填写完整");
            return false;
          }
          data[item.field].push(opt.input_value);
        } else {
          data[item.field].push(opt.label);
        }
      }
    } else {
      return false;
    }
    return true;
  }

  function isSingle(item, data): boolean {
    let res = item.options.filter((item) => item.checked);
    if (res && res[0]) {
      if (res[0].input) {
        if (!res[0].input_value) {
          return false;
        } else {
          data[item.field] = res[0].input_value;
        }
      } else {
        data[item.field] = res[0].label;
      }
    } else {
      return false;
    }

    return true;
  }
  async function selectCity() {
    const res: any = await call("selectCity", {});
    const index = sl.findIndex((i) => i.type === "d");
    const item = sl[index];
    item.input_value = res.city;
    sl[index] = item;
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
        {:else if item.type === "d"}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div on:click={selectCity}>
            <input
              class="inline_input"
              style="pointer-events: none;"
              placeholder="点击可选择城市"
              bind:value={item.input_value}
            />
          </div>
        {/if}

        {#if item.sort}
          <div style="margin-top: 2vw;font-size:2.5vw;color:rgb(150 150 150);">
            可以根据您在乎程度进行排序 <br />{item.options
              .filter((i) => i.checked)
              .sort((a, b) => a.sort - b.sort)
              .map((i, idx) => ` ${idx + 1}.` + i.label)
              .join("")}
          </div>
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
      <div class="coupon_main_info">
        感谢您的参与，您的{couponData.coupon_price}元优惠券已发放
      </div>
      <div class="coupon_main_center">
        <img
          src="./assets/hybrid/img_coupon_card.png"
          alt=""
          class="coupon_main_center_img"
        />
        <div class="title">{couponData.coupon_name}</div>
        <div class="info">{couponData.detail_describe}</div>
        <div class="price">
          <span class="symbol">￥</span>{couponData.coupon_price}
        </div>
        <div class="tag">{couponData.tag}</div>
      </div>
      <div class="coupon_main_btns">
        <button class="coupon_main_btn white" on:click={back}>好的</button>
        <button class="coupon_main_btn" on:click={useCoupon}>去使用</button>
      </div>
    </div>
  </div>
{/if}
{#if showCity}
  <div class=""></div>
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
    position: relative;
  }
  .coupon_main_center .title {
    position: absolute;
    top: 4.2vw;
    left: 3.3vw;
    font-weight: 800;
    font-size: 3.3vw;
    color: #3d3d3d;
  }
  .coupon_main_center .info {
    position: absolute;
    font-size: 3vw;
    color: #7f7f8e;
    bottom: 3.6vw;
    left: 3.3vw;
  }

  .coupon_main_center .price {
    position: absolute;
    font-weight: bold;
    font-size: 5.6vw;
    color: #ff2d51;
    top: 2.6vw;
    right: 4.9vw;
  }
  .coupon_main_center .symbol {
    font-size: 2.8vw;
  }

  .coupon_main_center .tag {
    position: absolute;
    bottom: 3.5vw;
    right: 3.5vw;
    background: #fff2d1;
    border-radius: 9px;
    border: 2px solid #c19c53;
    font-weight: bold;
    font-size: 2.8vw;
    color: #c19c53;
    min-width: 11.6vw;
    height: 4.7vw;
  }
  .coupon_main_center_img {
    width: 100%;
    height: 100%;
    display: block;
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
  }
  .radio_item {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 3vw;
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
