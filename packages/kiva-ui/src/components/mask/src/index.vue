<template>
  <div v-show="show" class="kiva-mask" @touchmove="onTouchMove" :style="componentStyle">
    <div class="kiva-mask__mask" @click="onClick"></div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'kiva-mask',  // 必须
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    allowInnerScroll: {
      type: Boolean,
      default: false,
    },
    zIndex: {
      type: Number,
      default: 1,
    }
  },
  data() {
    return {
      scrollY: 0,         // sync 属性，记录页面滚动高度
    }
  },
  computed: {
    componentStyle() {
      return {
        zIndex: this.zIndex
      }
    }
  },
  watch: {
    show: {
      immediate: true,
      handler: 'onShowChange',
    }
  },
  methods: {
    onClick(event) {
      this.$emit('click', event)
    },
    onTouchMove(event) {
      if (!this.allowInnerScroll) {
        event.preventDefault()
      }
    },
    onShowChange(val, oldVal) {
      if (this.allowInnerScroll) {
        if (val) {
          this.forbidBodyScroll()
        } else {
          this.allowBodyScroll()
        }
      }
    },
    forbidBodyScroll() {
      this.scrollY = window.scrollY
      const bodyEl = document.body
      bodyEl.style.position = 'fixed'
      bodyEl.style.top = `-${this.scrollY}px`
    },
    allowBodyScroll() {
      const bodyEl = document.body
      bodyEl.style.position = ''
      bodyEl.style.top = ''
      window.scrollTo(0, this.scrollY)
    },
  }
}
</script>
