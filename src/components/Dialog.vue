<template>
  <div v-show="isModalVisible" class="modal-overlay">
    <div class="modal-content">
      <div class="header-box">
        <img class="header-arrow" src="@assets/image/left.png" />
        <img class="header-center" src="@assets/image/pop-title.png" />
        <img class="header-arrow" src="@assets/image/right.png" />
      </div>

      <div class="content-box" ref="boxEle">
        <template v-if="step === 1">
          <img src="@assets/image/avatar.png" class="avatar" />
          <div class="content-info">
            <div class="row">
              <span class="label">昵称</span>
              <input
                v-model="name"
                maxlength="6"
                class="name_input"
                type="text"
                placeholder="请输入昵称                6"
              />
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
        <template v-if="step === 2">
          <img src="@assets/image/avatar.png" class="avatar" />
          <div class="content-info-2">
            <div class="avatar-text-box">
              <img src="@assets/image/avatar-text.png" class="avatar-text" />
            </div>
            <div class="style-box">
              <span @click="selectedStyle = '1'" :class="{ item: true, selected: selectedStyle === '1' }">潮流</span>
              <span @click="selectedStyle = '2'" :class="{ item: true, selected: selectedStyle === '2' }">科技</span>
              <span @click="selectedStyle = '3'" :class="{ item: true, selected: selectedStyle === '3' }">古装</span>
            </div>
            <div class="style-box">
              <span @click="selectedStyle = '4'" :class="{ item: true, selected: selectedStyle === '4' }">潮流</span>
              <span @click="selectedStyle = '5'" :class="{ item: true, selected: selectedStyle === '5' }">科技</span>
              <span @click="selectedStyle = '6'" :class="{ item: true, selected: selectedStyle === '6' }">古装</span>
            </div>
            <div class="style-box"></div>
          </div>
        </template>
        <template v-if="step === 3">
          <img src="@assets/image/avatar.png" class="avatar" />
          <div class="content-info-2">
            <div class="avatar-text-box">
              <img src="@assets/image/image-text.png" class="avatar-text" />
            </div>
            <div class="image-text-box">
              <textarea v-model="imageText" placeholder="请填写信息..." rows="3" maxlength="30"></textarea>
              <span v-if="!imageText" class="ab-text">30</span>
            </div>
          </div>
        </template>
        <template v-if="step === 4">
          <div class="loading-box">
            <div style="text-align: center; margin-top: 20px">
              <img src="@assets/image/draw-loading.png" class="draw-loading" />
            </div>
            <div class="loading-list">
              <img src="@assets/image/avatar.png" />
              <img src="@assets/image/avatar.png" />
              <img class="main" src="@assets/image/avatar.png" />
              <img src="@assets/image/avatar.png" />
              <img src="@assets/image/avatar.png" />
            </div>
          </div>
        </template>
        <template v-if="step === 5">
          <div class="card-box" ref="cardRef" :style="{ width: cardWidth }">
            <img src="@assets/image/card-box.png" alt="" />
            <span class="ab-number">100861</span>
            <span class="ab-name"> {{ name }} </span>
            <!-- <span class="ab-image-text"> {{ imageText }} </span> -->
          </div>
        </template>
      </div>
      <div class="footer-box">
        <slot name="footer">
          <div class="next" @click="nextStep"><img src="@assets/image/next.png" /></div>
          <div class="back" @click="backStep"><img src="@assets/image/back.png" /></div>
        </slot>
      </div>
      <div class="close-box" @click="closeModal">
        <img src="@assets/image/close.png" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, watch, onMounted } from "vue";
import { domToImg, downloadImg } from "@/utils/index.js";

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

const boxEle = ref(null);
const cardWidth = ref("auto");
const cardRef = ref(null);
onMounted(() => {
  if (boxEle.value) {
    cardWidth.value = ~~((boxEle.value.offsetHeight / 9) * 16) + "px";
  }

  setTimeout(async () => {
    const res = await domToImg(cardRef.value);
    downloadImg(res);
  }, 1000);
});

const step = ref(5);
// step1
const sex = ref("male");
const name = ref("测试名字通过");
// step2
const selectedStyle = ref("1");
// step3
const imageText = ref("我有30个字我有30个字我有30个字我有30个字我有30个字我有30个字");

function nextStep() {
  if ((step.value === 1 && !name.value) || (step.value === 3 && !imageText.value)) {
    alert("请完整填写信息~");
    return;
  }
  if (step.value === 1 && !name.value) {
  }
  step.value++;
}
function backStep() {
  step.value = step.value - 1;
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

  .content-info-2 {
    .avatar-text-box {
      width: 100%;
      text-align: center;
      padding-top: 20px;
    }
    .avatar-text {
      width: 80%;
    }
    .style-box {
      display: flex;
      justify-content: space-between;
      .item {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        background-color: #ffe3cc;
        margin-right: 10px;
        cursor: pointer;
        color: #bc8152;
        text-align: center;
        line-height: 25px;
        margin: 5px;
      }
      .selected {
        color: #b62300;
        background-color: #eebd74;
      }
    }
    .image-text-box {
      padding-top: 5px;
      width: 100%;
      text-align: center;
      position: relative;
      textarea {
        width: 90%;
        border-radius: 10px;
        background-color: #fae4cf;
      }
      .ab-text {
        position: absolute;
        right: 20px;
        bottom: 10px;
        color: #bf9572;
      }
      textarea::placeholder {
        color: #bf9572;
      }
    }
  }

  .loading-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    .draw-loading {
      width: 50%;
    }
    .loading-list {
      display: flex;
      justify-content: space-between;
      padding: 10px 10px;
      img {
        width: 15%;
        object-fit: contain;
      }
      .main {
        width: 20%;
        // border: 2px solid #8acf3e;
        // border-radius: 50%;
      }
    }
  }

  .card-box {
    width: 100%;
    // height: 100%;
    margin: 0 auto;
    text-align: center;
    position: relative;
    img {
      height: 100%;
      object-fit: contain;
    }
    .ab-number {
      position: absolute;
      height: 8%;
      top: 20.8%;
      left: 78%;
      text-align: center;
      font-size: 12px;
      color: white;
      transform: scale(0.5);
    }
    .ab-name {
      position: absolute;
      text-align: center;
      height: 10%;
      top: 31.5%;
      left: 63%;
      width: 88px;
      text-align: center;
      font-size: 12px;
      color: white;
      transform: scale(0.4);
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
