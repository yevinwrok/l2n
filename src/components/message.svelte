<script lang="ts">
  import Modal from "./modal.svelte";
  import { message } from "../store/index";
  $: {
    if ($message.show) {
    }
  }
  function ok() {
    if (typeof $message.fn === "function") {
      $message.fn();
    }
    message.set({
      show: false,
      text: "",
      fn: undefined,
      title: "",
    });
  }
</script>

<Modal show={$message.show}>
  <div class="message">
    <h1 class="title">{@html $message.title}</h1>
    <p class="message_text">{@html $message.text}</p>
    <button class="message_btn" on:click={ok}>确定</button>
  </div>
</Modal>

<style scoped>
  .title {
    text-align: center;
    padding: 5vw 0 1vw;
    font-size: 5vw;
    font-weight: bold;
  }
  .message {
    display: flex;
    width: 85vw;
    max-height: 80vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 3vw;
    flex-direction: column;
  }
  .message_text {
    padding: 4vw 4vw 0;
    color: #3e3e3e;
    font-size: 4vw;
  }
  .message_btn {
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
    margin: 0 auto;
    width: 80%;
    margin: 5vw auto;
  }
</style>
