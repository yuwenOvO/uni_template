# UniApp 项目模板

## 项目结构

```bash
├── .husky # 提交代码前的钩子配置
├── .vscode # vscode 配置
├── dist # 编译后的文件
├── node_modules # 依赖包
├── plugins # 插件
│   ├── vite-plugins # vite 插件
├── scripts # 脚本
│   ├── postupgrade.mjs # 删除多余的uni-app依赖脚本
├── src # 源码
│   ├── api # 接口
│   ├── components # 组件
│   ├── enums # 枚举
│   ├── interceptors # 拦截器
│   ├── layouts # 布局
│   ├── locales # 国际化
│   ├── pages # 页面
│   ├── pages-sub # 分包
│   ├── store # pinia 仓库
│   ├── types # 类型
│   ├── utils # 工具函数
│   ├── App.vue # 入口文件
│   ├── env.d.ts # 环境变量类型
│   ├── main.ts # 入口文件
│   ├── manifest.json # 配置文件 - 运行时会自动生成，不要手动修改
│   ├── pages.json # 页面配置文件 - 运行时会自动生成，不要手动修改
│   ├── shime-uni.d.ts # shime-uni 类型
│   ├── uni.scss # 全局样式
├── .editorconfig # 编辑器配置
├── .env # 环境变量
├── .eslintrc-auto-import.js # eslint 自动导入配置 - 运行时会自动生成，不要手动修改
├── .gitignore # git 忽略文件
├── .prettierignore # prettier 忽略文件
├── .stylelintignore # stylelint 忽略文件
├── .stylelintrc.mjs # stylelint 配置
├── commitlint.config.cjs # commitlint 配置
├── eslint.config.mjs # eslint 配置
├── index.html # html 模板
├── manifest.config.ts # uniapp配置
├── package.json # 依赖包
├── pages.config.ts # uniapp页面配置
├── pnpm-lock.yaml # pnpm 锁文件
├── prettier.config.mjs # prettier 配置
├── README.md # 项目说明
├── tsconfig.json # typescript 配置
├── unocss.config.ts # unocss 配置
├── vite.config.ts # vite 配置
```

## 项目运行

```bash
# 安装依赖
pnpm install

# 运行 默认运行在微信小程序
pnpm dev

# 生产环境 - 微信小程序
pnpm build:mp-weixin
```

## 提交代码

```bash
# 提交代码

# 1. 添加文件
git add .

# 2. 提交代码
pnpm commit
```

## 更新 uni-app 包

```bash

# 更新 uni-app 包
pnpm uvm

# 删除多余的依赖
pnpm uvm-rm
```
