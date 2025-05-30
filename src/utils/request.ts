import { useUserInfoStore } from "@/store";
import { ResultStatusEnum } from "@/enums/ResultStatusEnum";

// 请求基准地址
const baseApi = import.meta.env.VITE_APP_API_URL;

export default function request<T>(options: UniApp.RequestOptions): Promise<T> {
  const { token, $reset } = useUserInfoStore();
  const params = { ...options };
  params.url = `${baseApi}${options.url}`;
  params.timeout = 300000;
  params.header = {
    ...params.header,
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: token ? `Bearer ${token}` : "",
  };
  return new Promise((resolve, reject) => {
    uni.request({
      ...params,
      success: (response) => {
        const resData = response.data as ResponseData<T>;

        if (resData.status + "" === ResultStatusEnum.SUCCESS) {
          resolve(resData.data);
        } else if (resData.status === ResultStatusEnum.TOKEN_INVALID) {
          $reset();
          // 跳转到登录页
          uni.reLaunch({
            url: "/pages/login/index",
          });
        } else {
          // 其他业务处理失败
          reject({
            message: resData.msg || "业务处理失败",
            status: resData.status,
          });
        }
      },
      fail: (error) => {
        reject({
          message: "网络请求失败",
          error,
        });
      },
    });
  });
}
