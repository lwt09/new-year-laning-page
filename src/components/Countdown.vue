<template>
  <div class="countdown-container">
    <div v-for="item in items" :key="item.id">
      <div class="item-cont">
        <div class="time">{{ countdown.split("-")?.[item.id] || "--" }}</div>
        <div class="text">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

const props = defineProps({
  endTime: {
    type: String,
    default: "",
  },
});

let targetTime = dayjs(props.endTime).add(0);

const items = [
  {
    id: 0,
    text: "日",
  },
  {
    id: 1,
    text: "时",
  },
  {
    id: 2,
    text: "分",
  },
  {
    id: 3,
    text: "秒",
  },
];

// 倒计时的响应式引用
const countdown = ref("");

// 计算剩余时间
const calculateTimeLeft = () => {
  const now = dayjs();
  const difference = targetTime.diff(now);

  if (difference <= 0) {
    countdown.value = "00-00-00-00";
    clearInterval(intervalId);
    return;
  }

  dayjs.extend(duration);
  const days = dayjs.duration(difference).days();
  const hours = dayjs.duration(difference).hours();
  const minutes = dayjs.duration(difference).minutes();
  const seconds = dayjs.duration(difference).seconds();

  countdown.value = `${padZero(days)}-${padZero(hours)}-${padZero(
    minutes
  )}-${padZero(seconds)}`;
};

// 填充单个时间数值以确保它们有两位数字
const padZero = (value) => {
  return String(value).padStart(2, "0");
};

// 定时器ID
let intervalId;

onMounted(() => {
  calculateTimeLeft(); // 立即执行一次以初始化
  intervalId = setInterval(calculateTimeLeft, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style lang="scss">
.countdown-container {
  width: 100%;
  padding: 5px;
  display: flex;
  justify-content: space-between;

  .item-cont {
    width: 50px;
    height: 70px;
    .time {
      border: 1px dashed white;
      border-radius: 5px;
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      font-weight: bold;
      color: white;
      background-color: #872a17;
      letter-spacing: 1px;
    }
    .text {
      width: 100%;
      text-align: center;
      padding-top: 5px;
      color: #b96d44;
      font-size: 12px;
    }
  }
}
</style>
