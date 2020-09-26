<template>
  <div>
    <kiva-demo-block title="基础用法">
      <button @click="showDefault">显示 toast</button>
    </kiva-demo-block>

    <kiva-demo-block title="自定义位置">
      <button @click="showTop">top</button>
      <button @click="showCenter">center</button>
    </kiva-demo-block>

    <kiva-demo-block title="自定义持续时间">
      <button @click="showDuration">持续 5s</button>
    </kiva-demo-block>

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
    },
    showTop() {
      this.$toast({
        message: 'top',
        position: 'top',
      })
    },
    showCenter() {
      this.$toast({
        message: 'center',
        position: 'center',
      })
    },
    showDuration() {
      this.$toast({
        message: '持续 5s',
        duration: 5000,
      })
    },
  }
}
</script>

<style scoped>
.demo-item {
  padding: 10px 0;
}
</style>
