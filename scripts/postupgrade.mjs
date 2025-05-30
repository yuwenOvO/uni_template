import { exec } from "child_process";

const dependencies = [
  "@dcloudio/uni-app-harmony",
  "@dcloudio/uni-mp-baidu",
  "@dcloudio/uni-mp-jd",
  "@dcloudio/uni-mp-kuaishou",
  "@dcloudio/uni-mp-qq",
  "@dcloudio/uni-mp-toutiao",
  "@dcloudio/uni-mp-xhs",
  "@dcloudio/uni-quickapp-webview",
  "@dcloudio/uni-mp-lark",
];

exec(`pnpm un ${dependencies.join(" ")}`, (error, stdout, stderr) => {
  if (error) {
    // 如果有错误，打印错误信息
    console.error(`执行出错: ${error}`);
    return;
  }
  // 打印正常输出
  console.log(`stdout: ${stdout}`);
  // 如果有错误输出，也打印出来
  console.error(`stderr: ${stderr}`);
});
