---
title: List 列表组件
path: list
group: 展示组件
---

# List 列表

### 介绍

垂直方向滚动列表,当滚动到底部时,触发加载更多事件.

### 引入

```js
import Vue from 'vue'
import List from 'kiva-ui/lib/list'
import 'kiva-ui/lib/list/style'

Vue.use(List)
```

## 代码演示

### 基础用法

List 组件有三种状态: **加载中** **加载失败** **加载完毕**, 分别使用 `loading` `error` `finished` 控制。

组件滚动到底部时会触发 `load` 事件并自动将 `loading` 设置为 `true`, 此时可以发起异步请求更新数据, 数据更新完毕后需要手动将 `loading` 设置为 `false`。

若异步操作失败可将 `error` 设置为 `true`, 此时会显示重试按钮, 点击重试按钮会触发 `load` 事件。

若全部数据加载完毕, 将 `finished` 设置为 `true` 即可。

```vue
<template>
  <kiva-list
    :data="listData"
    :loading.sync="loading"
    :error.sync="error"
    :finished="finished"
    @load="loadMore"
  >
    <div class="list-item" v-for="(item, index) in listData" :key="index">{{ item }}</div>
  </kiva-list>
</template>

<script>
export default {
  data() {
    return {
      listData: [],
      loading: false,
      finished: false,
      error: false,
    }
  },
  methods: {
    loadMore() {
      this.loading = true
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          const text = this.listData.length + 1
          this.listData.push(text < 10 ? `0${text}` : text)
        }
        this.loading = false

        if (this.listData.length >= 40) {
          this.finished = true
        }
      }, 1500)
    },
  },
}
</script>
```

### 错误提示

若列表数据加载失败，将`error`设置成`true`即可显示错误提示，用户点击错误提示后会重新触发 load 事件。

```vue
<template>
  <kiva-list
    :data="listData"
    :loading.sync="loading"
    :error.sync="error"
    :finished="finished"
    @load="loadMore"
  >
    <div class="list-item" v-for="(item, index) in listData" :key="index">{{ item }}</div>
  </kiva-list>
</template>

<script>
export default {
  data() {
    return {
      listData: [],
      loading: false,
      finished: false,
      error: false,
    }
  },
  methods: {
    loadMore() {
      this.loading = true
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          const text = this.listData.length + 1
          this.listData.push(text < 10 ? `0${text}` : text)
        }
        this.loading = false

        // show error info
        if (this.listData.length === 20 && !this.error) {
          this.error = true
        } else {
          this.error = false
        }

        if (this.listData.length >= 40) {
          this.finished = true
        }
      }, 1500)
    },
  },
}
</script>
```

## API

### Props

| 参数            | 说明                                                                                 | 类型               | 默认值      |
| --------------- | ------------------------------------------------------------------------------------ | ------------------ | ----------- |
| loading         | 是否处于加载状态，加载过程中不触发`load`事件                                         | _boolean_          | `false`     |
| finished        | 是否已加载完成，加载完成后不再触发`load`事件                                         | _boolean_          | `false`     |
| error           | 是否加载失败，加载失败后点击错误提示可以重新<br>触发`load`事件，必须使用`sync`修饰符 | _boolean_          | `false`     |
| offset          | 滚动条与底部距离小于 offset 时触发`load`事件                                         | _number \| string_ | `300`       |
| immediate-check | 是否在初始化时立即执行滚动位置检查                                                   | _boolean_          | `true`      |

### Events

| 事件名 | 说明                               | 回调参数 |
| ------ | ---------------------------------- | -------- |
| load   | 滚动条与底部距离小于 offset 时触发 | -        |

### 方法

通过 ref 可以获取到 List 实例并调用实例方法，详见[组件实例方法](#/zh-CN/quickstart#zu-jian-shi-li-fang-fa)

| 方法名 | 说明                                                   | 参数 | 返回值 |
| ------ | ------------------------------------------------------ | ---- | ------ |
| check  | 检查当前的滚动位置，若已滚动至底部，则会触发 load 事件 | -    | -      |

### Slots

| 名称     | 说明                       |
| -------- | -------------------------- |
| default  | 列表内容                   |

## QA

### List 的运行机制是什么？

List 会监听浏览器的滚动事件并计算列表的位置，当列表底部与可视区域的距离小于`offset`时，会触发一次 load 事件。

### 为什么 List 初始化后会立即触发 load 事件？

List 初始化后会触发一次 load 事件，用于加载第一屏的数据，这个特性可以通过`immediate-check`属性关闭。

### 为什么会连续触发 load 事件？

如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成。因此你需要调整每次获取的数据条数，理想情况下每次请求获取的数据条数应能够填满一屏高度。

### loading 和 finished 分别是什么含义？

`List`有以下四种状态，理解这些状态有助于你正确地使用`List`组件：

- 非加载中，`loading`为`false`，此时会根据列表滚动位置判断是否触发`load`事件（列表内容不足一屏幕时，会直接触发）
- 加载中，`loading`为`true`，表示正在发送异步请求，此时不会触发`load`事件
- 加载失败, `error`为`true`, 表示异步请求失败,此时不会触发`load`事件
- 加载完成，`finished`为`true`，此时不会触发`load`事件

在每次请求完毕后，需要手动将`loading`设置为`false`，表示加载结束
