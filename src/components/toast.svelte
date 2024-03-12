<script>
  import { toastMessage } from "../store/index";

  let show = false;
  let timer;
  $: {
    if ($toastMessage) {
      show = true;
      clearTimeout(timer);
      timer = setTimeout(() => {
        show = false;
        $toastMessage = "";
      }, 2000);
    }
  }
</script>

{#if show}
  <div class="toast">
    <p>{$toastMessage}</p>
  </div>
{/if}

<style>
  .toast {
    position: fixed;
    bottom: 15vh;
    left: 50%;
    z-index: 999;
    transform: translateX(-50%);
    background-color: #3333337e;
    color: #fff;
    padding: 2vw 4vw;
    font-size: 4vw;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
</style>
