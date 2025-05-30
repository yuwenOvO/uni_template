<route lang="json5" type="home">
{
  notLogin: true,
  style: {
    navigationBarTitleText: "登录",
  },
}
</route>

<template>
  <view
    class="w-[100vw] h-[100vh] overflow-hidden bg-[#f2f3f5] py-[17.4rpx] px-[34.8rpx] box-border relative"
  >
    <wd-button type="success" @click="toHome">不设置token跳转</wd-button>
    <wd-button type="success" @click="toHome2">设置token跳转</wd-button>
    <wd-button type="success" @click="showStore">打印缓存信息</wd-button>
    <wd-button type="success" @click="clear">清除token和用户信息</wd-button>
    <wd-button type="success" @click="toCamera">跳转相机页面</wd-button>

    <wd-button type="primary" @click="changeLocale(LocaleEnum.ZH_CN)">
      简体中文
    </wd-button>
    <wd-button type="primary" @click="changeLocale(LocaleEnum.EN)">
      英文
    </wd-button>
    <wd-button type="primary" @click="changeLocale(LocaleEnum.JA_JP)">
      日语
    </wd-button>
    <view>{{ t("hello") }}</view>

    <wd-button type="primary" @click="toSubPage1"> 子包页面1 </wd-button>
    <wd-button type="primary" @click="toSubPage2"> 子包页面2 </wd-button>

    <wd-pagination v-model="value" :total="100" @change="handleChange" />

    <view class="w-300 h-300">
      <l-camera ref="lCameraRef" />
    </view>

    <wd-button type="success" @click="takePhoto">拍照</wd-button>
    <wd-img
      :width="100"
      :height="100"
      :src="testImgPath"
      :enable-preview="true"
    />
  </view>
</template>

<script lang="ts" setup>
import { useUserInfoStore } from "@/store";
import { LocaleEnum } from "@/enums/LocaleEnum";
import LCamera from "@/components/l-camera.vue";
import { useI18n } from "vue-i18n";
import i18n from "@/locale";
import { Locale } from "wot-design-uni";
// 引入语言包
import zhCN from "wot-design-uni/locale/lang/zh-CN";
import enUS from "wot-design-uni/locale/lang/en-US";
import jaJP from "wot-design-uni/locale/lang/ja-JP";

const { t } = useI18n();
const userInfoStore = useUserInfoStore();

const toHome = () => {
  uni.navigateTo({
    url: "/pages/page1/index",
  });
};

const toHome2 = () => {
  userInfoStore.token = "123";
  uni.setStorageSync("abc", "123");
  uni.navigateTo({
    url: "/pages/page1/index",
  });
};

const toCamera = () => {
  uni.navigateTo({
    url: "/pages/page2/index",
  });
};

const changeLocale = (locale: LocaleEnum) => {
  i18n.global.locale = locale;
  switch (locale) {
    case LocaleEnum.ZH_CN:
      Locale.use("zh-CN", zhCN);
      break;
    case LocaleEnum.EN:
      Locale.use("en-US", enUS);
      break;
    case LocaleEnum.JA_JP:
      Locale.use("ja-JP", jaJP);
      break;
    default:
      Locale.use("zh-CN", zhCN);
      break;
  }
};

const toSubPage1 = () => {
  uni.navigateTo({
    url: "/pages-sub/subPage1/index",
  });
};

const toSubPage2 = () => {
  uni.navigateTo({
    url: "/pages-sub/subPage2/index",
  });
};

const showStore = () => {
  console.log("userInfoStore========>", userInfoStore);
};

const clear = () => {
  userInfoStore.$reset();
};

const value = ref(1);
function handleChange(e: { value: number }) {
  console.log(e.value);
}

const testImgPath = ref("");
const lCameraRef = ref<InstanceType<typeof LCamera>>();
const takePhoto = async () => {
  if (!lCameraRef.value) return;
  try {
    testImgPath.value = await lCameraRef.value.takePhoto();
  } catch (e) {
    console.error(e);
  }
};
</script>
