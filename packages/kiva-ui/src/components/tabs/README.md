---
title: Tabs 选项卡
path:  tabs
group: 导航组件
---

# Tabs 选项卡


### 引入

```js
import Vue from 'vue'
import Tabs from '@wozjs/kiva-ui/lib/tabs'
import '@wozjs/kiva-ui/lib/tabs/style'

// 将会注册两个组件 kiva-tabs kiva-tabs-pane
Vue.use(Tabs)
```

## 代码演示

### 基础用法

```vue
<template>
  <kiva-tabs :active-index.sync="activeIndex">
    <kiva-tabs-pane title="title 1">
      <div class="demo-content">content 1</div>
    </kiva-tabs-pane>
    <kiva-tabs-pane title="title 2">
      <div class="demo-content">content 2</div>
    </kiva-tabs-pane>
    <kiva-tabs-pane title="title 3">
      <div class="demo-content">content 3</div>
    </kiva-tabs-pane>
    <kiva-tabs-pane title="title 4">
      <div class="demo-content">content 4</div>
    </kiva-tabs-pane>
  </kiva-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: 1
    }
  }
}
</script>

```

## API

### kiva-tabs Props

|参数|说明|类型|默认值|
|----|---|----|-----|
|active-index|激活的选项卡下标|`number`|`0`|

### kiva-tabs-pane Props

|参数|说明|类型|默认值|
|----|---|----|-----|
|title|选项卡标题|`string`|-|
