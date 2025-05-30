import request from "@/utils/request";

const AuthAPI = {
  /**
   * @description 获取当前时间
   */
  getCurrTime(): Promise<GetCurrTimeResult> {
    return request<GetCurrTimeResult>({
      url: "/app/getCurrTime.htm",
      method: "GET",
    });
  },
};

export default AuthAPI;

/** 获取当前时间响应 */
export interface GetCurrTimeResult {
  currTime: string;
  currWeek: string;
  timeStamp: number;
}
