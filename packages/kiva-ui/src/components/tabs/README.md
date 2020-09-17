---
title: Tabs 选项卡
path:  tabs
group: 导航组件
---

# Tabs 选项卡

### 引入

```js
import Vue from 'vue'
import Tabs from 'kiva/lib/tabs'
import 'kiva/lib/tabs/style'

// 将会注册两个组件 kiva-tabs kiva-tabs-pane
Vue.use(Tabs)
```

## 使用

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
