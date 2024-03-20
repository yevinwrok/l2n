<script lang="ts">
  import { onMount } from "svelte";
  import SmoothSignature from "smooth-signature";
  let canvas, s: SmoothSignature;
  export let option: {
    width?: number;
    height?: number;
    color?: string;
    bgColor?: string;
    scale?: number;
    openSmooth?: boolean;
    minWidth?: number;
    maxWidth?: number;
    minSpeed?: number;
    maxWidthDiffRate?: number;
    maxHistoryLength?: number;
    onStart?: (event: any) => void;
    onEnd?: (event: any) => void;
  } = {};
  export const signatureFn = {
    isLive() {
      return !!canvas && !!s;
    },
  };
  const signatureFnMap = ["clear", "undo", "isEmpty", "getPNG"];
  signatureFnMap.forEach((fnName) => {
    signatureFn[fnName] = function (...arg) {
      if (signatureFn.isLive() && typeof s[fnName] === "function") {
        return s[fnName](...arg);
      }
    };
  });
  onMount(() => {
    let [height, width] = [window.innerHeight, window.innerWidth];
    const opt = {
      height,
      width,
      scale: 1,
      ...option,
    };
    s = new SmoothSignature(canvas, opt);
  });
</script>

<div class="signature">
  <canvas bind:this={canvas}></canvas>
</div>

<style lang="scss">
</style>
