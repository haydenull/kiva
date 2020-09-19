<template>
  <kiva-<%= kebabCaseName %>>
    <div
      class="demo-item"
      v-for="item in list"
      :key="item.url"
    >
      <div>title: {{ item.title }}</div>
      <div>url: {{ item.url }}</div>
      <div>category: {{ item.category }}</div>
    </div>
  </kiva-<%= kebabCaseName %>>
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
      const { data } = await this.$axios.get('/mock/<%= kebabCaseName %>/api', {
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