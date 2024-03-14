<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import privacy from "../../agreement/privacy";
  import terms from "../../agreement/terms";
  import duty from "../../agreement/duty";
  import AFQ from "../../agreement/AFQ";

  import logout from "../../agreement/logout";
  import cooperation from "../../agreement/cooperation";

  import { isMobile } from "../../store";
  export let params = {} as {
    slug: "privacy" | "terms" | "duty" | "AFQ" | "logout" | "cooperation";
  };
  console.log("params: ", params);
  let black = ["logout", "cooperation"];
  const ag = {
    privacy,
    terms,
    duty,
    AFQ,
    logout,
    cooperation,
  };

  $: article = ag[params.slug];
</script>

<!-- {#if $isMobile}
  <div class="back-button" on:click={() => replace("/")}>&lt; Back</div>
{/if} -->
{#key params.slug}
  <article
    class={`agreement ${$isMobile ? "mobile" : ""}  ${black.includes(params.slug) ? "black" : ""}`}
  >
    <h1 class="agreement_title">{article.title}</h1>
    {#if article.time}
      <h3 class="agreement_time">{article.time}</h3>
    {/if}
    {#each article.content as item}
      <div class="agreement_item">{item}</div>
    {/each}
  </article>
{/key}

<style lang="scss">
  .agreement {
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 40px;
    font-family: PingFang SC;
    color: #000000;
    background-color: #e0e0e080;
    border-radius: 20px;
    overflow: hidden;
    overflow-y: scroll;
    .agreement_title {
      margin-bottom: 10px;
    }
    .agreement_time {
      margin-bottom: 20px;
    }
    .agreement_item {
      font-size: 20px;
      line-height: 32px;
    }
  }
  .mobile.agreement {
    padding: 10vw;
    background-color: transparent;
    margin-top: 0;
    &.black {
      background-color: #fff;
      color: #000;
      border-radius: 0;
      margin-bottom: 0;
    }
    .agreement_title {
      margin-bottom: 1vw;
      font-size: 10vw;
      text-align: center;
    }
    .agreement_time {
      margin-bottom: 7vw;
      font-size: 4vw;
      text-align: center;
    }
    .agreement_item {
      font-size: 4vw;
      line-height: 7vw;
    }
  }

  .back-button {
    display: inline-block;
    padding: 10px 20px;
    text-decoration: none;
    color: #333;
    font-weight: bold;
    transition: background-color 0.3s;
    height: 3vh;
  }
</style>
