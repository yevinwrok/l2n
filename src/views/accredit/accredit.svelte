<script lang="ts">
  import { call } from "../../bridge";

  function next() {
    call("authorize", {});
  }
</script>

<div class="accredit">
  <img
    src="./assets/hybrid/img_accredit.png"
    alt="accredit_img"
    class="accredit_img"
  />
  <div class="accredit_title">授权声明</div>
  <p class="accredit_text">
    本APP运营方为确保用户身份真实性，向您提供更好的安全保障，您可以通过提交身份证等身份信息或面部特征等生物识别信息(均属于个人敏感信息)来完成具体产品服务所需的实人认证。
  </p>
  <p class="accredit_text">
    上述信息将仅用于验证用户身份的真实性。我们会采用行业领先的技术来保护您提供的个人信息，并使用加密、限权等方式避免其被用于其
    他未知用途。
  </p>
  <p class="accredit_text">
    点击“同意”则表示本人同意我们根据以上方式和目的收集、使用及存储您提供的本人身份材料、面部特征等信息用于实人认证。
  </p>
  <button class="accredit_btn" on:click={next}>同意</button>
</div>

<style>
  .accredit {
    padding: 10.6vw;
  }
  .accredit_img {
    width: 37.2vw;
    height: 37.2vw;
    margin: 6vw auto 2.7vw;
  }
  .accredit_title {
    font-family: PingFang SC;
    font-weight: 800;
    font-size: 5.6vw;
    color: #000000;
    text-align: center;
    margin-bottom: 11.9vw;
  }
  .accredit_text {
    font-size: 3.7vw;
    color: #333333;
    line-height: 5.8vw;
    text-indent: 7.4vw;
    margin-bottom: 4vw;
  }
  .accredit_btn {
    margin: 0 auto;
    color: #fff;
    margin-top: 13.4vw;
    width: 74.4vw;
    height: 12.1vw;
    background: #000000;
    border-radius: 6vw;
    font-weight: bold;
    font-size: 3.7vw;
    display: block;
  }
</style>
