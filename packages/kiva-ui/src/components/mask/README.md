---
title: Mask 蒙层
path: mask
group: 反馈组件
---

# Mask 蒙层

### 介绍

半透明蒙层，用于突出焦点，阻断用户操作。

### 引入

```js
import Vue from 'vue'
import Mask from '@wozjs/kiva-ui/lib/mask'
import '@wozjs/kiva-ui/lib/mask/style'

Vue.use(Mask)
```

## 代码演示

### 基础用法

使用 prop `show` 控制组件是否展示。

```html
<template>
  <div>
    <button @click="showDefault = true">基础蒙层</button>
    <kiva-mask
      :show="showDefault"
      @click="showDefault = false"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDefault: false
    }
  }
}
</script>
```

### 嵌入内容

默认 `slot` 将会水平垂直居中放入 mask。

> **注意：** 半透明蒙层使用 absolute 定位铺满屏幕，所以嵌入内容需要设置 `z-index` 才能显示在蒙层之上。

```html
<template>
  <div>
    <button @click="showContent = true">嵌入内容</button>
    <kiva-mask
      :show="showContent"
      @click="showContent = false"
    >
      <div class="demo-content"></div>
    </kiva-mask>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showContent: false
    }
  }
}
</script>
```

### 默认禁止所有滚动

Kiva 默认对最外层包裹元素 `touchmove` 的阻止默认行为，以实现禁止蒙层滚动穿透的效果。

这是 Kiva 的默认行为，无需任何配置。但是会有副作用：**蒙层内部的元素也无法滚动**。

所以这种方案只适合蒙层内不需要滚动的情况。

```vue
<template>
  <div>
    <button @click="showForbidAllScroll = true">默认禁止Mask内所有滚动</button>
    <kiva-mask
      :show="showForbidAllScroll"
      @click="showForbidAllScroll = false"
    >
      <div class="demo-content">
        <div class="demo-content__content"></div>
      </div>
    </kiva-mask>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showForbidAllScroll: false
    }
  }
}
</script>
```

### 允许蒙层内部元素滚动

当内部元素需要滚动时，设置 prop `allow-inner-scroll` 为 `true` 时将会允许蒙层内部元素滚动。

其实现方案是设置 `body` 元素 `position` 属性为 `fixed`。它同样会带来 `fixed` 的副作用，比如 `body` 元素的宽度坍缩等。

在使用 `allow-inner-scroll` 时请确保你已清楚其带来的副作用。

```vue
<template>
  <div>
    <button @click="showForbidMaskScroll = true">允许Mask内滚动</button>
    <kiva-mask
      :show="showForbidMaskScroll"
      @click="showForbidMaskScroll = false"
      allow-inner-scroll
    >
      <div class="demo-content">
        <div class="demo-content__content"></div>
      </div>
    </kiva-mask>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showForbidMaskScroll: false
    }
  }
}
</script>
```



## API

### Props

|参数|说明|类型|默认值|
|----|---|----|-----|
|show|是否显示蒙层|`boolean`|`false`|
|allow-inner-scroll|是否允许蒙层内部滚动|`boolean`|`false`|
|z-index|组件 z-index |`number`|`1`|


### Events

|事件名|说明|回调参数|
| ---- |---|-------|
| click |点击蒙层时触发|event|


### Slots

| 名称     | 说明 |
| -------- | ----|
| default  | 嵌套内容|