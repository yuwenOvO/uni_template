<template>
  <view class="w-full h-full bg-[#808080]">
    <!-- #ifdef MP-WEIXIN -->
    <camera
      id="myCamera"
      class="w-full h-full"
      :device-position="props.devicePosition"
      @initdone="cameraInitDone"
      @error="cameraInitError"
    />
    <!-- #endif -->

    <!-- #ifdef MP-ALIPAY -->
    <camera
      id="myCamera"
      class="w-full h-full"
      :device-position="props.devicePosition"
    />
    <!-- #endif -->
  </view>
</template>

<script lang="ts" setup>
type LCameraProps = {
  /**
   * 摄像头位置 front: 前置 back: 后置 默认 back
   */
  devicePosition?: "front" | "back";
};

const props = withDefaults(defineProps<LCameraProps>(), {
  devicePosition: "back",
});

const emits = defineEmits(["ready", "error"]);

const isInit = ref(false);

const cameraInitDone = () => {
  isInit.value = true;
  emits("ready");
};

const cameraInitError = (e: any) => {
  console.error(e);
  emits("error");
};

// #ifdef MP-ALIPAY
onMounted(() => {
  // 由于钉钉小程序不支持 initdone 事件，所以这里模拟延迟1s后初始化完成
  setTimeout(() => {
    isInit.value = true;
    emits("ready");
  }, 1000);
});
// #endif

/**
 * 拍照
 * @returns Promise<string> 返回图片路径
 */
const takePhoto = () => {
  return new Promise<string>((resolve, reject) => {
    if (!isInit.value) return reject("相机未初始化完成");
    const cameraContext = uni.createCameraContext("myCamera");
    cameraContext.takePhoto({
      quality: "high",
      success: (res) => {
        resolve(res.tempImagePath);
      },
      fail: (e) => {
        reject(e);
      },
    });
  });
};

defineExpose({
  takePhoto,
});
</script>

<style lang="" scoped></style>
