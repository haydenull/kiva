<template>
  <kiva-list
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot :waterfall-data="waterfallData"></slot>
  </kiva-list>
</template>

<script>
export default {
  name: 'kiva-waterfall',

  props: {
    // 原始列表数据
    data: {
      type: Array,
      default: [],
      required: true,
    },
    // 瀑布流列数
    columnsCount: {
      type: Number,
      default: 2,
    },
    // item 除图片外部分的高度，单位 px
    extraHeight: {
      type: Number,
      default: 0,
    },
  },

  data () {
    return {
      waterfallData: [],  // 瀑布流数据
      waterfallDataCache: [],  // sync 缓存已经经过高度计算的瀑布流数据
    }
  },

  watch: {
    data: {
      immediate: true,
      handler: 'onDataChange'
    },
  },

  methods: {
    onDataChange(val, oldVal) {
      if (!oldVal) oldVal = []
      const newData = val.slice(oldVal.length)
      this.waterfallData = this.genWaterfallData(newData, this.columnsCount)
    },
    genWaterfallData(data = [], columnsCount = 2) {
      const { waterfallDataCache = [], extraHeight = 0, initWaterfallDataCache } = this
      let _waterfallDataCache = waterfallDataCache.length > 0
        ? waterfallDataCache
        : initWaterfallDataCache(columnsCount)

      for (let i = 0; i < data.length; i++) {
        let { index: minIndex } = this.getMin(_waterfallDataCache)
        const min = _waterfallDataCache[minIndex]
        const itemData = data[i]
        min.data.push(itemData)
        // 统一图片宽度基数,以此进行高度对比
        // (不要忘记extraHeight，他们同样会对高度对比的结果产生影响)
        min.height += ((itemData.faizHeight / itemData.faizWidth) * 150 + extraHeight)
        // console.log(`=== 处理中 ${i} ===`, `选中的列${minIndex}==`, (itemData.faizHeight / itemData.faizWidth) * 150 + extraHeight, min.height )
      }
      this.waterfallDataCache = _waterfallDataCache
      // console.log('=== 处理后的数据 ===', _waterfallDataCache)

      return _waterfallDataCache.map(item => item.data)
    },
    getMin(array) {
      let min = {
        val: array[0],
        index: 0,
      }
      for (let i = 1; i < array.length; i++) {
        if (array[i].height < min.val.height) {
          min = {
            val: array[i],
            index: i,
          }
        }
      }
      return min
    },
    initWaterfallDataCache(columnsCount = 2) {
      let _waterfallDataCache= []
      for (let i = 0; i < columnsCount; i++) {
        _waterfallDataCache.push({
          data: [],
          height: 0,
        })
      }
      return _waterfallDataCache
    },
  },

}
</script>
