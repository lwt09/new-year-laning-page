<!-- TODO: 
1. dom => canvas
2. canvas => img
3. 保存逻辑
-->
<template>
  <div id="test" ref="captureElement">
    <button @click="captureAndDownload">click</button>
    <button @click="saveImg">click2</button>
    <img :src="imageSrc" alt="" style="width: 200px" />
  </div>
</template>

<script setup>
// import imageSrcSource from "../assets/swiper-item.png";

import { ref } from "vue";
import html2canvas from "html2canvas";

// 创建一个ref用于引用需要截图的DOM元素
const captureElement = ref(null);
const imageSrc = ref(imageSrcSource);

// 定义截图并下载的方法
const captureAndDownload = async () => {
  if (captureElement.value) {
    try {
      // 将DOM元素转换为canvas
      const canvas = await html2canvas(captureElement.value);

      // 从canvas获取图片的DataURL
      const imgData = canvas.toDataURL("image/png");

      imageSrc.value = imgData;
      return;

      // 创建一个链接元素用于下载
      const downloadLink = document.createElement("a");
      downloadLink.href = imgData;
      downloadLink.download = "capture.png"; // 设置下载的文件名

      document.body.appendChild(downloadLink); // 将链接元素添加到文档中
      downloadLink.click(); // 触发下载操作
      document.body.removeChild(downloadLink); // 下载后，移除链接元素
    } catch (error) {
      console.error("截图失败：", error);
    }
  }
};

function saveImg() {
  const link = document.createElement("a");
  link.href = imageSrc;
  link.download = "test.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<style lang="scss" scoped></style>
