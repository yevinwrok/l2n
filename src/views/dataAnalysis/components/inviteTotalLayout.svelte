<script lang="ts">
  export let num: string | number = "-";
  export let text: string = "";
  export let center = false;
  export let percent = false;
</script>

<div class="invite_box" style={center ? "align-items:center" : ""}>
  <div class="invite_num">
    {num === undefined ? "-" : num}
    {percent ? "%" : ""}
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
