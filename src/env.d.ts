/// <reference types="vite/client" />

declare module "*.vue" {
  import { type DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  /** 应用名称 */
  readonly VITE_APP_TITLE: string;

  /** uniappId */
  readonly VITE_UNI_APPID: string;

  /** 微信小程序ID */
  readonly VITE_WX_APPID: string;

  /** API 服务器的 URL */
  readonly VITE_APP_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const wx: any;
declare const dd: any;
declare const tt: any;
