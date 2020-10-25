---
title: Image 图片
path: image
group: 基础组件
---

# Image 图片

### 介绍

带加载提示的图片组件

### 引入

```js
import Vue from 'vue'
import Image from '@wozjs/kiva-ui/lib/image'
import '@wozjs/kiva-ui/lib/image/style'

Vue.use(Image)
```

## 代码演示

### 基础用法

使用 `src` 设置图片地址, kiva-image 会在图片加载成功前显示加载中提示, 加载成功后显示图片, 加载失败时显示错误提示.

```html
<kiva-image
  src="http://pocket.faiz.top/picgo/20201025194253.jpg"
  style="width: 100px; height: 100px;"
/>
```

### 自定义加载中提示

通过 `loading` 具名插槽可以自定义加载中提示

```html
<kiva-image
  src="http://pocket.faiz.top/picgo/20201025194253.jpg"
  style="width: 100px; height: 100px;"
>
  <template v-slot:loading>loading...</template>
</kiva-image>
```

### 自定义加载失败提示

通过 `error` 具名插槽可以自定义加载失败提示

```html
<kiva-image
  style="width: 100px; height: 100px;"
>
  <template v-slot:error>error</template>
</kiva-image>
```

### 填充模式

通过 `fit` 属性可以控制填充模式, 可选值与效果与 [object-fit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit) 一致.

```html
<kiva-image
  src="http://pocket.faiz.top/picgo/20201025194253.jpg"
  style="width: 100px; height: 100px;"
  fit="cover"
>
</kiva-image>
```

### 圆角

`round` 为 `true` 时显示为圆角图片.

```html
<kiva-image
  round
  src="http://pocket.faiz.top/picgo/20201025194253.jpg"
  style="width: 100px; height: 100px;"
>
</kiva-image>
```

## API

### Props

|参数|说明|类型|默认值|
|----|---|----|-----|
|src|图片链接|`string`|-|
|fit|填充模式|`string`|-|
|round|是否显示为圆角|`boolean`|false|

### fit 图片填充模式
效果同: [object-fit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)

|名称|说明|
|--|--|
|contain|被替换的内容将被缩放，以在填充元素的内容框时保持其宽高比。|
|cover|被替换的内容在保持其宽高比的同时填充元素的整个内容框。|
|fill|被替换的内容正好填充元素的内容框。整个对象将完全填充此框。如果对象的宽高比与内容框不相匹配，那么该对象将被拉伸以适应内容框。|
|none|被替换的内容将保持其原有的尺寸。|
|scale-down|内容的尺寸与 none 或 contain 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些。|

### Events

|事件名|说明|回调参数|
| ---- |---|-------|
|click|点击图片时触发|-|
|load|图片加载成功时触发|-|
|error|图片加载失败时触发|-|

### Slots

| 名称     | 说明 |
| -------- | ----|
| loading  |加载中提示|
|error|加载失败提示|
