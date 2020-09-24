---
title: Waterfall 瀑布流
path: waterfall
group: 展示组件
---

# Waterfall 瀑布流

### 介绍
瀑布流组件，自动将 list 数据依据图片高度分割成指定个子数组。

该组件基于 [List](#/list) 组件实现上推加载更多功能。在List组件的基础上提供了依据图片高度生成每列数据的功能。

文档中未提到的属性或方法，在 [List](#/list) 中可以找到。


### 引入
```js
import Vue from 'vue'
import Waterfall from '@wozjs/kiva-ui/lib/waterfall'
import '@wozjs/kiva-ui/lib/waterfall/style'

Vue.use(Waterfall)
```

## 代码演示

### 基础用法

请在每一项的数据中加入如下属性:
```js
{
  faizCover: 'https://source.unsplash.com/random/180x370', // 图片地址
  faizWidth: 180,   // 图片宽度
  faizHeight: 370,  // 图片高度
}
```
当除了图片还有其他元素影响到卡片高度时，请使用 `extra-height` 设置这个高度，单位为px。
否则，瀑布流各个列高度比较时会出现偏差。


```vue
<template>
  <kiva-waterfall
    :loading.sync="loading"
    :error.sync="error"
    :finished="finished"
    :data="listData"
    :extra-height="40"
    @load="onLoad"
  >
    <template v-slot:default="slotProps">

      <div class="demo-waterfall">
        <!-- 瀑布流每一列 -->
        <div
          v-for="(list, index) in slotProps.waterfallData"
          :key="index"
          class="demo-waterfall__column"
        >

          <!-- 单列中的每一项 -->
          <div
            v-for="item in list"
            :key="item.id"
            class="demo-waterfall-column__item"
          >
            <div
              class="demo-waterfall-column-item__img"
              :style="{ paddingTop: item.scale }"
            >
              <img :src="item.faizCover" />
            </div>
            <div class="demo-waterfall-column-item__text">id: {{ item.id }}</div>
          </div>

        </div>
      </div>

    </template>
  </kiva-waterfall>
</template>

<script>
export default {
  data () {
    return {
      listData: [],
      loading: false,
      error: false,
      finished: false,

      page: 1,
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await this.$axios.get(
          '/mock/waterfall/photo',
          {
            params: { page: this.page },
          }
        )

        this.page ++
        this.loading = false
        if (data.page >= data.totalPage) this.finished = true
        this.listData = [
          ...this.listData,
          ...data.list.map(item => {
            const size = item.pic.size.split('x')
            return {
              ...item,
              faizCover: item.pic.url,
              faizWidth: size[0],
              faizHeight: size[1],
              scale: `${(size[1] / size[0]) * 100}%`
            }
          })
        ]

      } catch (error) {
        this.loading = false
        this.error = true
      }

    }
  }
}
</script>
```

## API

### Props
|参数|说明|类型|默认值|
|--|--|--|--|
|`extra-height`|除图片外其他元素总高度|`number`|`0`|
