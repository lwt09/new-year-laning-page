<script setup>
// import HelloWorld from "./components/HelloWorld.vue";
import webUI from "./pages/web.vue";
import mobileUI from "./pages/web-mobile.vue";

import { ref } from "vue";

import { detectDeviceType } from "./utils";
const device = detectDeviceType();
const isMobile = ref(device !== "Desktop");
console.log(device, isMobile.value, 11);
</script>

<template>
  <div style="width: 350px; margin: 0 auto;" v-if="!isMobile">
    <mobileUI />
  </div>
  <mobileUI v-if="isMobile" />
</template>

<style lang="scss" scoped></style>
