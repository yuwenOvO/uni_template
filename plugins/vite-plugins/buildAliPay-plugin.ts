import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

import type { Plugin } from "vite";

/**
 * @description 在构建完成后 更新产物mp-alipay的mini.project.json
 * - 仅在mp-alipay平台生效
 * - 用于更新钉钉/支付宝小程序的编译配置
 * - 参考 https://opendocs.alipay.com/mini/03dbc3?pathHash=e876dc50
 */
export function buildAliPayPlugin(): Plugin {
  return {
    name: "build-alipay-plugin",

    writeBundle() {
      const { UNI_PLATFORM } = process.env;
      if (UNI_PLATFORM === "mp-alipay") {
        const dev = process.env.NODE_ENV === "development" ? "dev" : "build";
        const destination = path.resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          `../../dist/${dev}/mp-alipay/mini.project.json`,
        );
        console.log("钉钉mini.project.json文件路径========>", destination);
        if (fs.existsSync(destination)) {
          console.log("========>", "文件存在");
          const content = `{
  "format": 2,
  "compileOptions": {
    "component2": true,
    "transpile": {}
  },
  "developOptions": {
    "skipTranspile": true
  }
}`;

          fs.writeFile(destination, content, (err) => {
            if (err) {
              console.log("========>", "文件写入失败");
              console.error(err);
            } else {
              console.log("========>", "文件写入成功");
            }
          });
        } else {
          console.log("========>", "文件不存在");
        }
      }
    },
  };
}
