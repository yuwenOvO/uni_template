import { defineStore } from "pinia";

export const useUserInfoStore = defineStore(
  "userInfo",
  () => {
    /**
     * @description 用户登录Token
     */
    const token = ref("");

    /**
     * @description 重置userInfo仓库
     */
    const $reset = () => {
      token.value = "";
    };

    return {
      /**
       * @description 用户登录Token
       */
      token,

      /**
       * @description 重置userInfo仓库
       */
      $reset,
    };
  },
  {
    persist: true,
  },
);
