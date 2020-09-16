---
title: Loading 加载
path: loading
group: 反馈组件
---

# Loading 加载

### 引入

```js
import Vue from 'vue'
import List from 'kiva/lib/loading'
import 'kiva/lib/loading/style'

Vue.use(List)
```

## 使用

### 自定义颜色
```html
<template>
  <kiva-loading color="#e88b00">加载中...</kiva-loading>
</template>
```

### 自定义文字尺寸
```html
<template>
  <kiva-loading text-size="16px">加载中...</kiva-loading>
</template>
```

### 默认表现为块元素
```html
<template>
  <kiva-loading>加载中...</kiva-loading>
</template>
```

### 表现为行内元素
```html
<template>
  <kiva-loading mode="inline">加载中...</kiva-loading>
</template>
```


## API

### Props
|参数|说明|类型|默认值|
|--|--|--|--|
|text-size|文字尺寸|`string` `number`|`'14px'`|
|color|文字颜色|`string`|`#888`|
|mode|类型 (是否表现为块元素)|`inline` `block`|`block`|


### Slots
|名称|说明|
|--|--|
|default|文案|
