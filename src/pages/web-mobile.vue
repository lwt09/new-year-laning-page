<template>
  <div class="mobile-cont">
    <img src="@assets/image/2024.png" class="img-2024" />

    <div class="home-box">
      <img class="home-box-title-text" src="@assets/image/home-box-text.png" />
      <img class="home-box-light" src="@assets/image/light.png" />
      <div class="countdown-sec">
        <Countdown endTime="2024-02-09T20:00:00" />
      </div>
      <div style="position: relative; padding-bottom: 10px">
        <img
          class="home-box-title-sec"
          src="@assets/image/home-box-title.png"
        />
        <img class="QR-code" src="@assets/image/Qr-code-temp.png" />
      </div>
    </div>
  </div>

  <Dialog />
</template>

<script setup>
import Countdown from "../components/Countdown.vue";
// import SaveImg from "../components/Saveimg.vue";
import Dialog from "../components/Dialog.vue";
</script>

<style lang="scss" scoped>
.mobile-cont {
  background-image: url("@assets/image/home-bg.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: top left;
  width: 100%;
  height: 3000px;

  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;

  .img-2024 {
    width: 45%;
    padding-top: 40px;
  }

  .home-box {
    width: 100%;
    padding: 0 10px;
    height: 450px;
    background-image: url("@assets/image/box.png");
    background-size: 95% auto;
    background-repeat: no-repeat;
    background-position: top center;

    margin-top: 280px;

    position: relative;

    .home-box-light {
      width: 40px;
      position: absolute;
      top: 20px;
      left: 0px;
    }

    .countdown-sec {
      width: 73%;
      margin: 0 auto;
      margin-top: 10px;
    }

    .home-box-title-sec {
      margin-top: 5px;
      width: 80%;
    }
    .home-box-title-text {
      margin-top: 45px;
      width: 60%;
    }
    .QR-code {
      width: 33%;
      position: absolute;
      bottom: 0px;
      left: 50%;

      transform: translateX(-50%);
      padding: 5px;
      background-color: #5c0902;
    }
  }
}
</style>
