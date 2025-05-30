import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

const store = createPinia();

store.use(
  createPersistedState({
    storage: {
      getItem(key) {
        return uni.getStorageSync(key);
      },
      setItem(key, value) {
        uni.setStorageSync(key, value);
      },
    },
    serializer: {
      deserialize: JSON.parse,
      serialize: JSON.stringify,
    },
  }),
);

export default store;

// 模块统一导出
export * from "./userInfo";
