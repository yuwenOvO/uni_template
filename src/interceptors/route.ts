import { useUserInfoStore } from "@/store";
import { notLoginPages as _notLoginPages, getNotLoginPages } from "@/utils";

const loginRoute = "/pages/login/index";
const isDev = import.meta.env.DEV;

// 白名单登录拦截器 - （适用于大部分页面需要登录，少部分页面不需要登录）
const navigateToInterceptor = {
  // 注意，这里的url是 '/' 开头的，如 '/pages/index/index'，跟 'pages.json' 里面的 path 不同
  invoke({ url }: { url: string }) {
    const path = url.split("?")[0];
    let notLoginPages: string[] = [];
    // 为了防止开发时出现BUG，这里每次都获取一下。生产环境可以移到函数外，性能更好
    if (isDev) {
      notLoginPages = getNotLoginPages();
    } else {
      notLoginPages = _notLoginPages;
    }
    const isNotLogin = notLoginPages.includes(path);
    if (isNotLogin) {
      return true;
    }
    const { token } = useUserInfoStore();
    const isLogined = token ? true : false;
    if (isLogined) {
      return true;
    }
    const redirectRoute = `${loginRoute}?redirect=${encodeURIComponent(url)}`;
    uni.reLaunch({ url: redirectRoute });
    return false;
  },
};

export const routeInterceptor = {
  install() {
    uni.addInterceptor("navigateTo", navigateToInterceptor);
    uni.addInterceptor("reLaunch", navigateToInterceptor);
    uni.addInterceptor("redirectTo", navigateToInterceptor);
    uni.addInterceptor("switchTab", navigateToInterceptor);
  },
};
