<template>
  <div v-show="isModalVisible" class="modal-overlay">
    <div class="modal-content">
      <div class="header-box">
        <img class="header-arrow" src="@assets/image/left.png" />
        <img class="header-center" src="@assets/image/pop-title.png" />
        <img class="header-arrow" src="@assets/image/right.png" />
      </div>

      <div class="content-box">
        <template v-if="step === 1">
          <img src="@assets/image/avatar.png" class="avatar" />
          <div class="content-info">
            <div class="row">
              <span class="label">昵称</span>
              <input v-model="name" maxlength="6" class="name_input" type="text" placeholder="请输入昵称                6" />
            </div>
            <div class="row">
              <span class="label">性别</span>
              <div class="custom-ridio" @click="sex = 'male'">
                <img class="radio-icon" v-if="sex === 'male'" src="@assets/image/checked.png" />
                <img class="radio-icon" v-if="sex === 'female'" src="@assets/image/uncheck.png" />
                <span class="ridio-icon-text">男</span>
              </div>
              <div class="custom-ridio" @click="sex = 'female'">
                <img class="radio-icon" v-if="sex === 'male'" src="@assets/image/uncheck.png" />
                <img class="radio-icon" v-if="sex === 'female'" src="@assets/image/checked.png" />
                <span class="ridio-icon-text">女</span>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="footer-box">
        <slot name="footer">
          <div class="next" @click="nextStep"><img src="@assets/image/next.png" /></div>
          <div class="back" ><img src="@assets/image/back.png" /></div>
        </slot>
      </div>
      <div class="close-box" @click="closeModal">
        <img src="@assets/image/close.png" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, watch } from "vue";

const isModalVisible = ref(true);

const emits = defineEmits(["close"]);

function openModal() {
  isModalVisible.value = true;
}

document.body.style.overflow = "hidden";

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

const step = ref(1);
// step1
const sex = ref("male");
const name = ref("");

function nextStep() {
  if (step.value === 1) {
    if (!name.value) {
      alert("请先输入昵称哦！");
      return
    }
    step.value = 2;
  }
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
  flex-shrink: 0;
  display: flex;

  .avatar {
    flex-shrink: 0;
    width: 27%;
    height: auto;
    object-fit: contain;
    padding: 2px;
  }
  .content-info {
    padding: 10px;
    padding-top: 30px;
    .row {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .label {
        margin-right: 10px;
        flex-shrink: 0;
        color: #f3ddbd;
      }
      .name_input {
        width: 80%;
        border-radius: 7px;
        background-color: #ffe3cc;
        border: none;
        padding: 5px;
      }
      .name_input::placeholder {
        font-size: 12px; /* 设置placeholder的字体大小 */
        color: #b6885f; /* 这里还可以设置placeholder的文本颜色 */
      }

      .custom-ridio {
        display: flex;
        align-items: center;
        .radio-icon {
          margin: 0 10px;
          width: 15px;
        }
      }
    }
  }
}

.footer-box {
  display: flex;
  border: 1px solid purple;
  width: 280px;
  flex-shrink: 0;
  margin-top: 40px;
  justify-content: space-between;
  flex-direction: row-reverse;
  .back {
    width: 45%;
    height: auto;
  }
  .next {
    width: 45%;
  }
  img {
    width: 100%;
  }
}

.close-box {
  position: absolute;
  bottom: -100px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  img {
    width: 100%;
  }
}
</style>
