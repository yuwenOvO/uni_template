declare global {
  /** 响应数据结构 */
  interface ResponseData<T = any> {
    status: string; // 业务状态码
    data: T; // 返回数据
    msg: string; // 消息
  }

  /** uni.uploadFile文件上传参数 */
  type IUniUploadFileOptions = {
    file?: File;
    files?: UniApp.UploadFileOptionFiles[];
    filePath?: string;
    name?: string;
    formData?: any;
  };
}
export {};
