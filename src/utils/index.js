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

export { detectDeviceType };
