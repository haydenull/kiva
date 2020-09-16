<template>
  <div class="kiva-loading" :style="style">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'kiva-loading',
  props: {
    textSize: {
      type: String | Number,
      default: '14px',
    },
    color: {
      type: String,
      default: '#888',
    },
    mode: {
      type: String,
      default: 'block',
    }
  },
  computed: {
    comTextSize() {
      if (typeof this.textSize === 'string' && isNaN(this.textSize)) return this.textSize
      return `${this.textSize}px`
    },
    style() {
      return {
        fontSize: this.comTextSize,
        color: this.color,
        display: this.mode === 'inline' ? 'inline-flex' : 'flex'
      }
    },
  },
}
</script>
