<template>
  <div class="kiva-image" :class="{ 'kiva-image--round': round }">
    <slot v-if="loading" name="loading">
      <div class="kiva-image__loading">加载中</div>
    </slot>
    <slot v-else-if="error" name="error">
      <div class="kiva-image__error">加载失败</div>
    </slot>
    <img
      v-else
      class="kiva-image__img"
      :class="[ fitClass ]"
      :src="src"
      v-bind="$attrs"
      v-on="$listeners"
    >
  </div>
</template>

<script>
const FIT_CLASS = {
  fill: 'kiva-image--fill',
  contain: 'kiva-image--contain',
  cover: 'kiva-image--cover',
  none: 'kiva-image--none',
  'scale-down': 'kiva-image--scale-down',
}
export default {
  name: 'kiva-image',  // 必须
  props: {
    src: String,
    fit: String,
    round: Boolean,
    loadingDemo: Boolean,
    // alt: String,
    // width: [Number, String],
    // height: [Number, String],
  },
  data() {
    return {
      loading: true,
      error: false,
      show: true,
    }
  },
  computed: {
    fitClass() {
      return FIT_CLASS[this.fit]
    }
  },
  watch: {
    show(val) {
      if (val) this.loadImage()
    }
  },
  mounted() {
    if (this.loadingDemo) return
    this.loadImage()
  },
  methods: {
    loadImage() {
      this.loading = true
      this.error = false

      const img = new Image()
      img.onload = e => this.onLoad(e)
      img.onerror = e => this.onError(e)
      img.src = this.src

    },
    onClick(event) {
      this.$emit('click', event)
    },
    onLoad(event) {
      console.log('=== img load success 图片 ===', event)
      this.loading = false
      this.error = false
      this.$emit('load', event)
    },
    onError(event) {
      console.log('=== img load success ===')
      this.loading = false
      this.error = true
      this.$emit('error', event)
    },
  }
}
</script>
