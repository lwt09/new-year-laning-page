<template>
  <div v-show="isModalVisible" class="modal-overlay">
    <div class="modal-content">
      <div class="header-box">
        <img class="header-arrow" src="@assets/image/left.png" />
        <img class="header-center" src="@assets/image/pop-title.png" />
        <img class="header-arrow" src="@assets/image/right.png" />
      </div>

      <div class="content-box">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, watch } from "vue";

const isModalVisible = ref(false);

const emits = defineEmits(["close"]);

function openModal() {
  isModalVisible.value = true;
}

// document.body.style.overflow = "hidden";

// 阻止滚动
watch(isModalVisible, (newVal, oldVal) => {
  if (newVal && document?.body) {
    // When the modal is open, prevent background scrolling
    document.body.style.overflow = "hidden";
  } else {
    // When the modal is closed, allow background scrolling
    document.body.style.overflow = "";
  }
});

function closeModal() {
  isModalVisible.value = false;
  emits("close");
}
</script>

<style scoped lang="scss">
.modal-overlay {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  padding: 20px;
  border-radius: 5px;
  position: relative;
  z-index: 1001;
  border: 1px solid pink;
  height: 400px;
  background-image: url("@assets/image/pop-content.png");
  background-size: 370px auto;
  background-repeat: no-repeat;
  background-position: top center;
  position: relative;
  bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-box {
  width: 100%;
  justify-content: center;
  display: flex;
  position: relative;
  top: 40px;

  .header-arrow {
    width: 20%;
    transform: scale(0.5);
  }

  .header-center {
    width: 200px;
  }
}

.content-box {
  border: 1px solid green;
  margin-top: 80px;
  width: 280px;
  height: 35%;
}
</style>
