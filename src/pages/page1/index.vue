<route lang="json5">
{
  style: {
    navigationBarTitleText: "page1",
  },
}
</route>

<template>
  <view class="content">
    <view> page1 </view>
    <view> 当前token: {{ userInfoStore.token }} </view>
    <wd-button size="small" @click="handleLogin">获取服务器时间</wd-button>
  </view>
</template>

<script setup lang="ts">
import AuthAPI from "@/api/auth";
import { useUserInfoStore } from "@/store";

const userInfoStore = useUserInfoStore();

const handleLogin = async () => {
  try {
    const res = await AuthAPI.getCurrTime();
    console.log("========>", res.currTime);
  } catch (err) {
    console.error(err);
    uni.showToast({ title: "获取失败", icon: "none" });
  }
};
</script>

<style></style>
