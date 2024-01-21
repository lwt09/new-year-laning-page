<template>
  <div class="cont">
    <div>web-mobile-ui</div>
    <div class="section">
      <Countdown endTime="2024-02-09T20:00:00" />
    </div>
  </div>
</template>

<script setup>
import Countdown from "../components/Countdown.vue";
</script>

<style lang="scss" scoped>
.cont {
  background-color: pink;

  .section {
    width: 80%;
    margin: 0 auto;
  }
}
</style>
