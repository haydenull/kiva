---
title: 介绍
path: kiva-cli
group: kiva-cli
topNav: kiva-cli
sortIndex: 1
---

# Kiva Cli 工具

### 背景
- 为开发 Vue 组件特别定制的脚手架工具。
- 开箱即用，减轻开发组件的心理负担。
- 提供文档模板，将调试 demo 单独打包成应用并嵌入到文档站点中，提高文档可读性。

### 介绍

Vue 组件脚手架工具：
- 支持编译生成文档及 demo 的**静态站点**
- 支持静态站点快捷上传（已支持 ftp，github page 需手动配置 workflow，可参考本项目的配置）
- 内部集成 Vue 开发环境，开箱即用
- 支持数据 mock
- 支持全量打包
- 支持符合 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 的按需加载打包

## 特性

### 包含 demo 的文档站点

![img](http://pocket.faiz.top/picgo/20201025173437.png)

`kiva serve`

kiva 将组件的 md 文档以及 demo 编译为静态站点，方便开发者直观看到组件的效果和使用方法。

### 内置 Vue 开发环境，开箱即用

kiva-cli 内部包含 Vue 环境，集成 axios。
开发者只需专心于组件代码和 demo 示例编写，剩下的事情交给 kiva。

### 支持数据 Mock

kiva 支持基于**前端拦截**的数据 mock。所以即使是在静态文档站点中也能正常工作。

支持模拟请求失败，设置请求延时，内部集成 [mockjs](http://mockjs.com/) 方便开发者生成更真实的mock 数据。

### 支持全量及按需打包

全量打包一次引入即可随处使用，缺点是包体积更大，并不推荐。
按需加载打包，使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 后可以方便地按需引入。