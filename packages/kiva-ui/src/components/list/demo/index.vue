<template>
  <div>
    <h3>kiva list</h3>
    <kiva-list
      :data="listData"
      :loading.sync="loading"
      :error.sync="error"
      :finished="finished"
      @load="loadMore"
    >
      <div class="list-item" v-for="(item, index) in listData" :key="index">{{ item }}</div>
    </kiva-list>
  </div>
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
      console.log('=== exec loadMore ===')
      this.loading = true
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          const text = this.listData.length + 1
          this.listData.push(text < 10 ? `0${text}` : text)
        }
        this.loading = false

        // show error info
        // if (this.listData.length === 20 && !this.error) {
        //   this.error = true
        // } else {
        //   this.error = false
        // }

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
  margin-bottom: 6px;
  background-color: #d3cbaf;
  border-radius: 6px;
  line-height: 50px;
  text-indent: 10px;
}
</style>
