<template>
  <kiva-waterfall
    :loading.sync="loading"
    :error.sync="error"
    :finished="finished"
    :data="listData"
    @load="onLoad"
  >
    <template v-slot:default="slotProps">
      <div style="width: 45%; display: inline-block;" v-for="(list, index) in slotProps.waterfallData" :key="index">
        <div v-for="(item, i) in list" :key="item.dataid" style="font-size: 20px;">{{i}}-{{ item.modinfo && item.modinfo.title }}</div>
      </div>
    </template>
    <!-- <div v-for="item in listData" :key="item">list-{{item}}</div> -->
  </kiva-waterfall>
</template>

<script>
export default {
  data () {
    return {
      listData: [],
      loading: false,
      error: false,
      finished: false,
    }
  },
  methods: {
    async onLoad() {
      try {
        const data = await this.$axios.get('/mock/waterfall/video')
        console.log('=== fetch success ===', data)
      } catch (error) {
        console.log('=== fetch error ===', error)
      }

      // const _this = this
      // $.ajax({
      //   url: '//feeds.sina.cn/api/v2/tianyi',
      //   data: {
      //     cateid: 't_s',
      //     cre: 'tianyi',
      //     mod: 'whpic',
      //     merge: 3,
      //     statics: 1,
      //     length: 20,
      //     action: 0,
      //     up: 0,
      //     down: 0,
      //   },
      //   dataType: 'jsonp',
      //   // jsonp: 'callback',
      //   success(res) {
      //     _this.loading = false
      //     const data = res.result.data
      //     console.log('=== onLoad2 res ===', data)
      //     // _this.finished = true
      //     if (data.length <= 0) return _this.finished = true
      //     _this.listData = data.map(item => {

      //       return {
      //         ...item,
      //         faizCover: item.modinfo.thumbs[0].u,
      //         faizWidth: item.modinfo.thumbs[0].s[0],
      //         faizHeight: item.modinfo.thumbs[0].s[1],
      //       }
      //     })
      //   },
      //   error(err) {
      //     _this.loading = false
      //     _this.error = true
      //   }
      // })

    }
  }
}
</script>

<style>

</style>
