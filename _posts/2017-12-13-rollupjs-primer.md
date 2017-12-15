---
layout: post
title: rollup.js 入门
date: 2017-12-13
---

Rollup 是一个打包器，可以把多个零碎 ES6 模块打包成一个复杂模块。与老牌打包器 webpack 相比，rollup 更适合打包库文件，而 webpack 丰富的插件和 loader 生态，更适合实际项目开发。

目前使用 rollup 的库有 [vue.js][vue-rollup], [react][react-rollup]。

> [angular][angular-bazel] 貌似打算使用 bazel 构建工具。

## 快速使用

使用 `npm install --global rollup` 全局安装，`rollup --help` 可以查看帮助文档。

以下命令假设你的入口文件是 `main.js`，并且输出文件是单一文件 `bundle.js`

```sh
# 对于浏览器，编译成 IIFE 函数
rollup main.js --o bundle.js --f iife

# 对于 Node.js，编译为 CommonJS 模块
rollup main.js --o bundle.js --f cjs

# 为了兼容浏览器和 Node.js，编译为 umd 格式
rollup main.js --o bundle.js -f umd --name "myBundle"
```

## Tree-shaking

通过摇树算法，可以把无关代码“抖掉”，减小文件体积。

## 兼容性

Rollup 可以通过 [rollup-plugin-commonjs][rollup-plugin-commonjs] 插件引入 CommonJS 模块。

如果希望在 Node.js 或 webpack 中直接使用，可以把 rollup 的目标格式设定为 UMD 或 CommonJS ，然后在 `package.json` 的 `main` 属性指向编译后的版本。如果 `package.json` 中还包含 `module` 字段，rollup 和 webpack 2 等支持 ES6 的工具可以直接使用 ES6 版本的代码。

## REF

- [rollup.js][rollup]
- [rollup 视频教程][rollup-video]
- [rollup-plugin-commonjs][rollup-plugin-commonjs]

[rollup]: https://rollupjs.org/
[rollup-video]: https://code.lengstorf.com/learn-rollup-js/
[rollup-plugin-commonjs]: https://github.com/rollup/rollup-plugin-commonjs
[vue-rollup]: https://github.com/vuejs/vue/blob/dev/package.json#L16-L24
[react-rollup]: https://github.com/facebook/react/blob/master/package.json#L103
[angular-bazel]: https://github.com/angular/angular/blob/master/docs/BAZEL.md