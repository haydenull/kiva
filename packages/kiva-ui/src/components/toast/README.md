---
title: Toast 提示
path: toast
group: 反馈组件
---

# Toast 提示

### 介绍

这里是组件介绍

### 引入

```js
import Vue from 'vue'
import Toast from '@wozjs/kiva-ui/lib/toast'
import '@wozjs/kiva-ui/lib/toast/style'

Vue.use(Toast)
```

## 代码演示

### 基础用法

```js
Toast('默认 toast')

// Vue.use(Toast) 将会在 Vue 原型上注册 $toast 方便使用
this.$toast('默认 toast')
```

### 自定义位置

`position` 属性控制 toast 的位置，可选值：`top`、`center`、`bottom`

默认值：`bottom`

```js
this.$toast({
  message: 'top',
  position: 'top',
})
```

### 自定义持续时间

`duration` 属性控制 toast 的展示持续时间，单位 `ms`

```js
this.$toast({
  message: '持续 5s',
  duration: 5000,
})
```

## API

### 方法

|方法名 |说明|参数|返回值|
| ---- | -- | -- | ---|
| Toast | 展示 toast | `options | message` | toast 实例 |

### Options

|参数|说明|类型|默认值|
|----|---|----|-----|
| message | toast 文案 | `string` |-|
| position | toast 位置，可选值：`top` `center` `bottom` | `string` | `bottom` |
| duration | toast 展示持续时长，单位 `ms` | `number` | `3000` |
