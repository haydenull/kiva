---
title: 使用
path: kiva-cli/use
group: kiva-cli
topNav: kiva-cli
sortIndex: 2
---

# Kiva Cli 工具

## 如何使用

### 1. 创建新项目

可以手动，也可以使用命令创建新项目

```bash
$ npx @wozjs/kiva-cli create hello-kiva

# 如果你是全局安装 @wozjs/kiva-cli 的话
$ kiva create hello-kiva
```

生成如下文件：

```text
your-path/hello-kiva
├── docs
│   ├── home.md
│   └── quickstart.md
├── kiva.config.js
└── package.json
```

这里的文件都 kiva 来说都不是必须的，create 命令只是帮助生成简单的项目，并安装 kiva-cli 依赖而已。

所以你也可以完全手动创建项目，并安装 kiva-cli 依赖。

```bash
# 使用 npm
$ npm install @wozjs/kiva-cli --dev

# 使用 yarn
$ yarn add @wozjs/kiva-cli --dev
```

### 2.创建你自己的组件

Kiva 对目录及文件名有严格要求，组件必须位于 `src/components` 中，下面是组件 `button` 的示例：

```text
your-path/hello-kiva/src/components
├── button                // 组件名即目录名，中划线命名
│   ├── src
│   │   ├── index.vue     // 组件源码
│   │   └── index.less    // 组件样式
│   ├── demo
│   │   └── index.vue     // demo 代码
│   ├── mock
│   │   └── api.js        // mock 接口
│   ├── index.js          // 入口文件
|   └── README.md         // 组件说明文档
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

手动进行上述操作有些麻烦，且容易出错，**推荐使用 kiva-cli 生成新组件**：

```bash
$ kiva new component-name
```

### 3. 开始开发

使用 `kiva serve` 启动开发服务，一切正常的话你将会看到一个包含 demo 与文档的站点。

Kiva 实际上启动了两个服务：
- 一个是文档站点 docs
- 一个是 demo 示例站点

他们是互相独立的，这意味着如果你只想专注于组件开发，只需新开一个窗口打开 demo 站点的地址即可。

demo 站点与常规 Vue 项目没有什么不同，但是为了便于组件开发，Kiva会加一点私货：

#### 3.1 全局注册你的所有组件

Kiva 默认已经将你的所有组件注册到全局，你可以直接方便地使用他们。

上述例子中我们创建了一个名为 kiva-button 的组件，那么在任何一处的 demo 示例中，你都可以直接使用 kiva-button 来引用它。

```vue
<template>
  <kiva-button>your button component</kiva-button>
</template>
```

#### 3.2 基于前端拦截的数据 mock

仍以上述 kiva-button 为例，由于组件存在 `mock/api.js` 文件，所以 Kiva 会拦截 `/mock/button/api` 的 ajax 请求。而接口如何返回，由 `mock/api.js` 决定。

#### 3.3 集成 axios

Kiva 已将 axios 挂载到 Vue 上，你可以在Vue 组件中使用 `this.$axios` 访问它。

> 所以 **Kiva 的工作依赖文件结构**，请务必注意：
> 当我们运行 `kiva serve` 时，Kiva 会扫描 `src/components` 下符合规则的组件并做如下几件事：
> 1. 扫描组件的 `index.js` 入口文件，并将组件注册到全局
> 1. 扫描组件 `src/index.less`, 并引入样式文件
> 1. 扫描 demo 下的 index.vue，启动 demo app 服务，将该组件作注册为 demo app 的新路由
> 1. 扫描 README.md, 启动docs app 服务，将 markdown 文件转换为 vue 并注册为 docs app 的新路由
> 1. 扫描 mock 文件下的 js 文件，拦截基于 XMLHttpRequest 的请求，拦截的接口地址为 `mock/组件名/mock下的js文件名`

### 4. 组件打包及文档上传

```bash
$ kiva build all       # 全量打包
$ kiva build component # 按需加载打包
$ kiva build site      # 文档静态站点打包
```

全量打包将会在 dist 中生成 kiva-ui.common.js 与 kuva-ui.css文件

按需加载打包会在 lib 中生成各个组件的代码

静态站点打包会在 site 文件夹中生成文档及 demo 的静态页

```bash
$ kiva deploy
```

将 site 中的文件上传到 ftp 服务器