<template>
  <div v-show="isModalVisible" class="modal-overlay" >
    <div class="modal-content" @click.stop>
      <header class="modal-header">
        <slot name="header">默认标题</slot>
        <button class="modal-close" @click="closeModal">&times;</button>
      </header>
      <main class="modal-body">
        <slot>默认内容</slot>
      </main>
      <footer class="modal-footer">
        <slot name="footer">
          <button @click="closeModal">关闭</button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const isModalVisible = ref(false);

const emits = defineEmits(["close"]);

function openModal() {
  isModalVisible.value = true;
}

function closeModal() {
  isModalVisible.value = false;
  emits("close");
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  min-width: 300px;
  position: relative;
  z-index: 1001;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  margin-top: 20px;
}

.modal-footer {
  margin-top: 20px;
  text-align: right;
}

.modal-close {
  cursor: pointer;
  border: none;
  background: none;
  font-size: 1.5rem;
}
</style>
