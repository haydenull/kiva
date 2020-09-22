---
title: 介绍
path: kiva-cli
group: kiva-cli
topNav: kiva-cli
---

# Kiva Cli 工具

### 介绍

Vue 组件脚手架工具：
- 支持将文档以及 demo 生成静态站点并上传到 ftp 服务器（或 github pages）
- 内部集成 Vue 开发环境，开箱即用
- 支持数据 mock
- 支持全量打包
- 支持符合 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 格式的按需加载打包

## 特性

### 包含 demo 的文档站点

![img](https://files.catbox.moe/ak8t25.png)

`kiva serve`

支持生成包含 demo 的文档站点。

### 内置 Vue 开发环境，开箱即用

kiva-cli 内部包含 Vue 环境，集成 axios。
开发者只需专心组件代码和 demo 示例编写，剩下的事情交给 kiva。

### 支持数据 Mock

kiva 支持基于前端拦截的数据 mock。集成 [mockjs](http://mockjs.com/) 生成随机数据。所以即使是在静态文档站点中也能正常工作。

### 支持全量及按需打包

全量打包 `dist`
按需加载 `lib`