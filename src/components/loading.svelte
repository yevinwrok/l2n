<div class="loading-box">
  <i class="fade-item fade-item1"></i>
  <i class="fade-item fade-item2"></i>
  <i class="fade-item fade-item3"></i>
  <i class="fade-item fade-item4"></i>
  <i class="fade-item fade-item5"></i>
  <i class="fade-item fade-item6"></i>
  <i class="fade-item fade-item7"></i>
  <i class="fade-item fade-item8"></i>
  <i class="fade-item fade-item9"></i>
  <i class="fade-item fade-item10"></i>
  <i class="fade-item fade-item11"></i>
  <i class="fade-item fade-item12"></i>
</div>

<style>
  :root {
    --item-height: 6vw;
    --item-line-width: 0.4vw;
    --item-line-height: 1.8vw;
  }

  .loading-box {
    position: relative;
    border-radius: 4px;
    width: var(--item-height);
    height: var(--item-height);
  }

  .loading-box .fade-item {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--item-height);
    height: var(--item-height);
  }

  .loading-box .fade-item:before {
    content: "";
    display: block;
    margin: 0 auto;
    width: var(--item-line-width);
    height: var(--item-line-height);
    background-color: rgb(154, 154, 154);
    border-radius: 4px;
    -webkit-border-radius: 4px;
  }

  .loading-box .fade-item2 {
    transform: rotate(30deg);
  }

  .loading-box .fade-item3 {
    transform: rotate(60deg);
  }

  .loading-box .fade-item4 {
    transform: rotate(90deg);
  }

  .loading-box .fade-item5 {
    transform: rotate(120deg);
  }

  .loading-box .fade-item6 {
    transform: rotate(150deg);
  }

  .loading-box .fade-item7 {
    transform: rotate(180deg);
  }

  .loading-box .fade-item8 {
    transform: rotate(210deg);
  }

  .loading-box .fade-item9 {
    transform: rotate(240deg);
  }

  .loading-box .fade-item10 {
    transform: rotate(270deg);
  }

  .loading-box .fade-item11 {
    transform: rotate(300deg);
  }

  .loading-box .fade-item12 {
    transform: rotate(330deg);
  }

  .loading-box .fade-item:before {
    animation: fadeDelay 1.2s infinite ease-in-out both;
  }

  .loading-box .fade-item2:before {
    animation-delay: -1.1s;
  }

  .loading-box .fade-item3:before {
    animation-delay: -1s;
  }

  .loading-box .fade-item4:before {
    animation-delay: -0.9s;
  }

  .loading-box .fade-item5:before {
    animation-delay: -0.8s;
  }

  .loading-box .fade-item6:before {
    animation-delay: -0.7s;
  }

  .loading-box .fade-item7:before {
    animation-delay: -0.6s;
  }

  .loading-box .fade-item8:before {
    animation-delay: -0.5s;
  }

  .loading-box .fade-item9:before {
    animation-delay: -0.4s;
  }

  .loading-box .fade-item10:before {
    animation-delay: -0.3s;
  }

  .loading-box .fade-item11:before {
    animation-delay: -0.2s;
  }

  .loading-box .fade-item12:before {
    animation-delay: -0.1s;
  }

  @keyframes fadeDelay {
    0%,
    39%,
    100% {
      opacity: 0.2;
    }

    40% {
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeDelay {
    0%,
    39%,
    100% {
      opacity: 0.2;
    }

    40% {
      opacity: 1;
    }
  }
</style>
