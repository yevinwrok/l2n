<script lang="ts">
  import Signature from "../../components/signature.svelte";
  import { onMount } from "svelte";

  let signFn: any;

  function reset() {
    signFn.clear();
  }
  function getSign() {
    console.log(signFn.getPNG());
  }
</script>

<Signature bind:signatureFn={signFn}></Signature>
<div class="signature_footer">
  <button on:click={reset}>重签</button>
  <button on:click={getSign}>确定</button>
</div>

<style lang="scss">
    .signature_footer{
        position: fixed;
        top: 0;
        left: 0;
    }
</style>
