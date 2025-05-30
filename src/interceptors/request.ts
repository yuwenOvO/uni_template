export type CustomRequestOptions = UniApp.RequestOptions & {
  query?: Record<string, any>;
  /** 出错时是否隐藏错误提示 */
  hideErrorToast?: boolean;
} & IUniUploadFileOptions; // 添加uni.uploadFile参数类型

// 拦截器配置
const httpInterceptor = {
  // 拦截前触发
  invoke(options: CustomRequestOptions) {
    console.log("options========>", options);
  },

  // 完成回调拦截
  complete(response: UniApp.GeneralCallbackResult) {
    console.log("response========>", response);
  },
};

export const requestInterceptor = {
  install() {
    // 拦截 request 请求
    uni.addInterceptor("request", httpInterceptor);
    // 拦截 uploadFile 文件上传
    uni.addInterceptor("uploadFile", httpInterceptor);
  },
};
