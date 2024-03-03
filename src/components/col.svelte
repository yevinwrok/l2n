<script lang="ts">
  export let span: number = 12;
  export let offset: number = 0;
  export let right: boolean = false;
  export let center: boolean = false;
  function calc(num: number): number {
    if (num) {
      return (num / 12) * 100;
    } else {
      return 0;
    }
  }
</script>

<div
  class="col"
  style="width:{calc(span)}%;margin-left:{calc(offset)}%;text-align:{center
    ? 'center'
    : right
      ? 'right'
      : 'left'}"
>
  <slot />
</div>

<style lang="scss">
  .col {
    width: 100%;
  }
</style>
