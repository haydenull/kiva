---
title: kiva-cli 工具
path: kiva-cli
group: 开发指南
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

## 使用

### 手动创建新项目

在 `src/components` 目录中新建目录，文件夹名为组件名

```text
src/components
├── button                // 组件名
│   ├── src
│   │   ├── index.vue     // 组件源码
│   │   └── index.less    // 组件样式
│   ├── demo
│   │   └── index.vue     // demo 代码
│   ├── mock
│   │   └── api.js        // mock 接口
│   ├── index.js          // 入口文件
|   └── README.md         // 文档
```

创建上述文件后，我们在入口文件 `src/components/button/index.js` 中导出我们的组件：

```js
// src/components/button/index.js
import KivaButton from './src/index.vue'

KivaButton.install = function(Vue) {
  Vue.component(KivaButton.name, KivaButton)
}

export default KivaButton
```

接下来当我们运行 `kiva serve` 时，kiva 会扫描 `src/components` 下符合规则的组件并做如下几件事：
1. 扫描组件的 `index.js` 入口文件，并将组件注册到全局
1. 扫描组件 `src/index.less`, 并引入样式文件
1. 扫描 demo 下的 index.vue，启动 demo app 服务，将该组件作注册为 demo app 的新路由
1. 扫描 README.md, 启动docs app 服务，将 markdown 文件转换为 vue 并注册为 docs app 的新路由
1. 扫描 mock 文件下的 js 文件，拦截基于 XMLHttpRequest 的请求，拦截的接口地址为 `mock/组件名/mock下的js文件名`


### 命令

#### 1. 创建新组件

```shell
$ kiva new component-name
```

#### 2. 启动开发服务器

```shell
$ kiva serve
```

#### 3. 打包

```shell
$ kiva build:component  # 按需加载打包
$ kiva build:all        # 全量打包
$ kiva build:site       # 生成静态文档站点
```

#### 4. ftp 上传

```shell
$ kiva deploy
```
