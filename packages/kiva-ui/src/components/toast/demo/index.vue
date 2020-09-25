<template>
  <div>
    <button @click="showDefault">显示 toast</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    }
  },
  methods: {
    showDefault() {
      this.$toast('默认 toast')
    }
  }
}
</script>

<style scoped>
.demo-item {
  padding: 10px 0;
}
</style>
