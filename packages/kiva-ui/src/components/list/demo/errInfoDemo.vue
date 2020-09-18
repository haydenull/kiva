<template>
  <kiva-list
    :data="listData"
    :loading.sync="loading"
    :error.sync="error"
    :finished="finished"
    @load="loadMore"
  >
    <div class="list-item" v-for="(item, index) in listData" :key="index">{{ item }}</div>
  </kiva-list>
</template>

<script>
export default {
  data () {
    return {
      listData: [],
      loading: false,
      finished: false,
      error: false,
    }
  },
  methods: {
    loadMore() {
      this.loading = true
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          const text = this.listData.length + 1
          this.listData.push(text < 10 ? `0${text}` : text)
        }
        this.loading = false

        // show error info
        if (this.listData.length === 20 && !this.error) {
          this.error = true
        } else {
          this.error = false
        }

        if (this.listData.length >= 40) {
          this.finished = true
        }
      }, 1500)
    }
  }
}
</script>

<style scoped>
.list-item {
  height: 50px;
  margin: 6px 0;
  background-color: #e1e3e6;
  border-radius: 6px;
  line-height: 50px;
  text-indent: 10px;
}
</style>
