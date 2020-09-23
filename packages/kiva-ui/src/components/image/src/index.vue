<template>
  <div @click="onClick">
    <slot v-if="loading" name="loading">
      <span>loading</span>
    </slot>
    <slot v-if="error" name="error">
      <span>error</span>
    </slot>
    <img v-if="!error" :src="src" :alt="alt" @load="onLoad" @error="onError">
  </div>
</template>

<script>
export default {
  name: 'kiva-image',  // 必须
  props: {
    src: String,
    alt: String,
    width: [Number, String],
    height: [Number, String],
  },
  data() {
    return {
      loading: true,
      error: false,
    }
  },
  methods: {
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
