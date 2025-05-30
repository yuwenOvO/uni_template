import { createI18n } from "vue-i18n";

import en from "./en.json";
import zhHans from "./zh-Hans.json";
import ja from "./ja.json";

import { getLocale } from "@/utils";

import { Locale } from "wot-design-uni";
// 引入语言包
import zhCN from "wot-design-uni/locale/lang/zh-CN";
import enUS from "wot-design-uni/locale/lang/en-US";
import jaJP from "wot-design-uni/locale/lang/ja-JP";

import { LocaleEnum } from "@/enums/LocaleEnum";

const messages = {
  en,
  "zh-Hans": zhHans,
  ja,
};

const locale = getLocale();
console.log("当前语言========>", locale);

const i18n = createI18n({
  locale: locale, // 获取已设置的语言，fallback 语言需要再 manifest.config.ts 中设置
  messages,
  allowComposition: true,
});

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

export default i18n;
