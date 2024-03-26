<script lang="ts">
  import { percent as p } from "../../tools/price";

  export let num: string | number = "-";
  export let text: string = "";
  export let center = false;
  export let percent = false;

  function handler(num) {
    if (num === undefined) {
      return "-";
    } else {
      if (percent) {
        return p(num);
      } else {
        return num;
      }
    }
  }
</script>

<div class="invite_box" style={center ? "align-items:center" : ""}>
  <div class="invite_num">
    {handler(num)}
  </div>
  <div class="invite_text">{text}</div>
</div>

<style lang="scss">
  .invite_box {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .invite_num {
      font-weight: bold;
      font-size: 4vw;
      color: #000000;
    }
    .invite_text {
      font-size: 3vw;
      color: #a9a9a9;
    }
  }
</style>
