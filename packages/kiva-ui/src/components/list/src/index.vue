<template>
  <div>

    <slot></slot>

    <kiva-loading v-if="loading && !finished && !error">加载中…</kiva-loading>
    <div v-if="error" @click="onClickError" class="kiva-list__error--line"></div>
    <div v-if="finished" class="kiva-list__nodata--line">已无数据</div>

    <div ref="faiz_pointer" class="faiz_pointer"></div>
  </div>
</template>

<script>
import bindEventMixin from '../../../mixins/bindEvent'
import { getScrollEventTarget } from '../../../utils/dom'

export default {
  name: 'kiva-list',

  mixins: [
    bindEventMixin(function(bind) {
      if (!this.scrollEventTarget) {
        this.scrollEventTarget = getScrollEventTarget(this.$el)
      }
      // 此处 this 被 call 绑定为 Vue 实例
      bind(this.scrollEventTarget, 'scroll', this.check)
    }),
  ],

  props: {
    loading: {        // 是否正在加载中
      type: Boolean,
      default: false,
    },
    finished: {        // 是否全部数据加载完毕
      type: Boolean,
      default: false,
    },
    error: {           // 是否加载失败
      type: Boolean,
      default: false,
    },
    offset: {           // 滚动条与底部距离 <= offset 时触发 load 事件
      type: Number,
      default: 150,
    },
    immediateCheck: {   // 是否在初始化时立即检查高度
      type: Boolean,
      default: true,
    },
  },

  data () {
    return {
      scrollEventTarget: null
    }
  },

  // watch: {
  //   loading() {
  //     this.check()
  //   },
  //   finished() {
  //     this.check()
  //   }
  // },

  mounted () {
    if (this.immediateCheck) this.check()
  },

  methods: {
    check() {
      this.$nextTick(() => {
        if (this.loading || this.error || this.finished) return

        if (!this.scrollEventTarget) {
          this.scrollEventTarget = getScrollEventTarget((this.$el))
        }

        const { $el: el, scrollEventTarget: scroller, offset = 150 } = this

        let scrollerRect
        if ('getBoundingClientRect' in scroller) {
          scrollerRect = scroller.getBoundingClientRect()
        } else {
          scrollerRect = {
            top: 0,
            bottom: scroller.innerHeight,
          }
        }

        let isReachBottom = false
        let pointerRect = (this.$refs.faiz_pointer).getBoundingClientRect()

        isReachBottom = pointerRect.bottom - scrollerRect.bottom <= offset

        if (isReachBottom) {
          this.$emit('update:loading', true)
          this.$emit('load')
        }

      })
    },
    onClickError() {
      this.$emit('update:error', false)
      this.check()
    }
  },

}
</script>
