import path from "node:path";

import { defineConfig, loadEnv } from "vite";

import AutoImport from "unplugin-auto-import/vite";

import UnoCSS from "unocss/vite";

import UniPages from "@uni-helper/vite-plugin-uni-pages";
import UniLayouts from "@uni-helper/vite-plugin-uni-layouts";
import UniManifest from "@uni-helper/vite-plugin-uni-manifest";
import Uni from "@dcloudio/vite-plugin-uni";
import { buildAliPayPlugin } from "./plugins/vite-plugins/buildAliPay-plugin";

export default ({ mode }) => {
  // mode: 区分生产环境还是开发环境
  console.log("运行模式 -> ", mode);
  const { UNI_PLATFORM } = process.env;
  console.log("运行环境 -> ", UNI_PLATFORM);

  const env = loadEnv(mode, process.cwd());

  console.log("环境参数 -> ", env);

  return defineConfig({
    plugins: [
      UniPages({
        exclude: ["**/components/**/**.*"],
        routeBlockLang: "json5", // 虽然设了默认值，但是vue文件还是要加上 lang="json5", 这样才能很好地格式化
        // homePage 通过 vue 文件的 route-block 的type="home"来设定
        // pages 目录为 src/pages，分包目录不能配置在pages目录下
        subPackages: ["src/pages-sub"], // 是个数组，可以配置多个，但是不能为pages里面的目录
        dts: "src/types/uni-pages.d.ts",
      }),
      UniLayouts(),
      UniManifest(),
      Uni(),
      UnoCSS(),
      AutoImport({
        imports: ["vue", "uni-app", "pinia"],
        include: [/\.vue$/, /\.vue\?vue/, /\.ts$/, /\.js$/],
        dts: "src/types/auto-imports.d.ts", // 自动生成的类型声明文件
        eslintrc: {
          enabled: true,
        },
      }),
      buildAliPayPlugin(),
    ],
    resolve: {
      alias: {
        "@": path.join(process.cwd(), "./src"),
      },
    },
    build: {
      sourcemap: JSON.parse(env.VITE_SHOW_SOURCEMAP),
      minify: mode === "development" ? false : "terser",
      terserOptions: {
        compress: {
          drop_debugger: true,
        },
      },
    },
  });
};
