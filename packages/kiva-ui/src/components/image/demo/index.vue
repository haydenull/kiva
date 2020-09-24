<template>
  <kiva-image
    src="https://files.catbox.moe/1c387i.jpg"
    width="100"
    height="100"
  >
    <template v-slot:loading>加载中</template>
    <template v-slot:error>加载失败</template>
  </kiva-image>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    }
  },
  async created() {
    try {
      const { data } = await this.$axios.get('/mock/image/api', {
        params: { category: 'random' }
      })
      this.list = data.list
      console.log('success', data)
    } catch (error) {
      console.log('error', error.response)
    }
  }
}
</script>

<style scoped>
.demo-item {
  padding: 10px 0;
}
</style>