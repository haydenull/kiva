<template>
  <div>
    <slot v-if="loading" name="loading">
      <span>loading</span>
    </slot>
    <slot v-else-if="error" name="error">
      <span>error</span>
    </slot>
    <img
      v-else
      :src="src"
      v-bind="$attrs"
      v-on="$listeners"
    >
  </div>
</template>

<script>
export default {
  name: 'kiva-image',  // 必须
  props: {
    src: String,
    fit: String,
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
  watch: {
    show(val) {
      if (val) this.loadImage()
    }
  },
  mounted() {
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
