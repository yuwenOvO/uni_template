import { LocaleEnum } from "@/enums/LocaleEnum";
import { pages, subPackages } from "@/pages.json";

/**
 * @description 得到所有的不需要登录的pages，包括主包和分包的
 */
export const getAllNotLoginPages = (key = "notLogin") => {
  // 这里处理主包
  const mainPages = pages
    .filter((page: { [key: string]: any }) => page[key])
    .map((page) => ({
      ...page,
      path: `/${page.path}`,
    }));
  // 这里处理分包
  const subPages: any[] = [];
  subPackages.forEach((subPageObj) => {
    const { root } = subPageObj;

    subPageObj.pages
      .filter((page: { [key: string]: any }) => page[key])
      .forEach((page: { path: string } & Record<string, any>) => {
        subPages.push({
          ...page,
          path: `/${root}/${page.path}`,
        });
      });
  });
  const result = [...mainPages, ...subPages];
  return result;
};

/**
 * @description 得到所有的不需要登录的pages，包括主包和分包的
 * @description 只得到 path 数组
 */
export const getNotLoginPages = (): string[] =>
  getAllNotLoginPages("notLogin").map((page) => page.path);

/**
 * @description 得到所有的不需要登录的pages，包括主包和分包的
 * @description 只得到 path 数组
 */
export const notLoginPages: string[] = getAllNotLoginPages("notLogin").map(
  (page) => page.path,
);

/**
 * @description 获取当前应用语言
 */
export const getLocale = () => {
  const systemInfo = uni.getSystemInfoSync();
  switch (systemInfo.language) {
    case "zh_CN":
      return LocaleEnum.ZH_CN;
    case "en":
    case "en_US":
      return LocaleEnum.EN;
    case "ja":
    case "ja_JP":
      return LocaleEnum.JA_JP;
    default:
      return LocaleEnum.ZH_CN;
  }
};

/**
 * @description 获取当前小程序平台
 */
export const getPlatform = () => {
  const systemInfo = uni.getSystemInfoSync();
  return systemInfo.uniPlatform;
};
