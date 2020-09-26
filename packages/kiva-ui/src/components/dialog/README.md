---
title: Dialog 对话框
path: dialog
group: 反馈组件
---

# Dialog 对话框

### 介绍

弹出对话框，常用于消息确认等操作。

### 引入

```js
import Vue from 'vue'
import Dialog from '@wozjs/kiva-ui/lib/dialog'
import '@wozjs/kiva-ui/lib/dialog/style'

Vue.use(Dialog)
```

## 代码演示

### 基础用法

`Vue.use(Dialog)` 将会在 `vue.prototype` 上注册 `$dialog` 方法。

```js
this.$dialog({
  title: '新浪新闻',
  message: '新浪新闻客户端，专享更多精彩视频',
  cancelText: 'cancel',
  confirmText: 'confirm',
  confirm() {
    console.log('=== click confirm ===')
  },
  cancel() {
    console.log('=== click cancel ===')
  },
})
```

### 隐藏取消按钮

`showCancel` 控制取消按钮是否显示。

```js
this.$dialog({
  message: '新浪新闻客户端，专享更多精彩视频',
  showCancel: false,
})
```

## API

### Props

|参数|说明|类型|默认值|
|----|---|----|-----|
|show|是否显示dialog|`boolean`|`false`|
|title|标题，为空时不显示|`string`|-|
|message|内容文案|`string`|-|
|cancelText|取消按钮文案|`string`|`取消`|
|confirmText|确认按钮文案|`string`|`确认`|
|showCancel|是否显示取消按钮|`boolean`|`true`|

### Events

|事件名|说明|回调参数|
| ---- |---|-------|
| confirm |点击确认按钮时触发|-|
|cancel|点击取消按钮时触发|-|
