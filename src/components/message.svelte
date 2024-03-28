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
    });
  }
</script>

<Modal show={$message.show}>
  <div class="message">
    <p class="message_text">{@html $message.text}</p>
    <button class="message_btn" on:click={ok}>确定</button>
  </div>
</Modal>

<style scoped>
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
    width: 100%;
    height: 12vw;
    line-height: 12vw;
    font-size: 3.5vw;
    text-align: center;
    color: #8b8b8b;
    margin-top: 3.3vw;
    border-top: 1px solid #f0f0f0;
  }
</style>
