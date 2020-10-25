# kiva

> 提供 vue 移动端 ui 组件库 kiva-ui, 以及 vue ui 组件开发脚手架工具 kiva-cli

## 文档
[https://kiva.wozjs.com](https://kiva.wozjs.com/#/)

## 开发指南

### 安装依赖

```shell
$ lerna boostrap
```

### kiva-ui 开发

```shell
$ yarn workspace @wozjs/kiva-ui run dev

$ yarn workspace @wozjs/kiva-cli remove webpack-chain
$ lerna add webpack-chain --scope @wozjs/kiva-cli

$ lerna publish
```
