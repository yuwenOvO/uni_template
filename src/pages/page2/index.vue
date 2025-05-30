<route lang="json5">
{
  notLogin: true,
  style: {
    navigationBarTitleText: "page2",
  },
}
</route>

<template>
  <view class="content">
    <view class="w-300 h-300">
      <l-camera device-position="back" />
    </view>
  </view>
</template>

<script setup lang="ts">
import LCamera from "@/components/l-camera.vue";
</script>
