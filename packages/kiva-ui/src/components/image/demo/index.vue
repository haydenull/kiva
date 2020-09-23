<template>
  <kiva-image
    src="https://files.catbox.moe/1c387i.jpg"
    width="100px"
    height="100px"
  >
    <template v-slot:loading>xxxx</template>
    <template v-slot:error>yyyy</template>
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