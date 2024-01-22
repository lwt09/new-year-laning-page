import html2canvas from "html2canvas";

function detectDeviceType() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // 使用正则表达式检测设备类型
  if (/android/i.test(userAgent)) {
    return "Android Mobile";
  }
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS Mobile";
  }
  if (/Windows Phone/i.test(userAgent)) {
    return "Windows Mobile";
  }
  if (/Mobile/i.test(userAgent)) {
    return "Mobile";
  }

  // 默认为PC端
  return "Desktop";
}

async function domToImg(dom) {
  const canvas = await html2canvas(dom, {
    scale: window.devicePixelRatio,
  });

  // 从canvas获取图片的DataURL
  const imgData = canvas.toDataURL("image/png", 1.0);

  return imgData;
}

function downloadImg(imgData) {
  const downloadLink = document.createElement("a");
  downloadLink.href = imgData;
  downloadLink.download = "capture.png"; // 设置下载的文件名

  document.body.appendChild(downloadLink); // 将链接元素添加到文档中
  downloadLink.click(); // 触发下载操作
  document.body.removeChild(downloadLink); // 下载后，移除链接元素
}

export { detectDeviceType, domToImg, downloadImg };
