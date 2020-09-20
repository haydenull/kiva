<template>
  <kiva-waterfall
    :loading.sync="loading"
    :error.sync="error"
    :finished="finished"
    :data="listData"
    :extra-height="40"
    @load="onLoad"
  >
    <template v-slot:default="slotProps">
      <div class="demo-waterfall">
        <div
          v-for="(list, index) in slotProps.waterfallData"
          :key="index"
          class="demo-waterfall__column"
        >
          <div
            v-for="item in list"
            :key="item.id"
            class="demo-waterfall-column__item"
          >
            <div
              class="demo-waterfall-column-item__img"
              :style="{ paddingTop: item.scale }"
            ><img :src="item.faizCover" /></div>
            <div class="demo-waterfall-column-item__text">id: {{ item.id }}</div>
          </div>
        </div>
      </div>
    </template>
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

      page: 1,
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await this.$axios.get(
          '/mock/waterfall/photo',
          {
            params: { page: this.page },
          }
        )

        this.page ++
        this.loading = false
        if (data.page >= data.totalPage) this.finished = true
        this.listData = [
          ...this.listData,
          ...data.list.map(item => {
            const size = item.pic.size.split('x')
            return {
              ...item,
              faizCover: item.pic.url,
              faizWidth: size[0],
              faizHeight: size[1],
              scale: `${(size[1] / size[0]) * 100}%`
            }
          })
        ]

        console.log('=== fetch success ===', data, this.listData)
      } catch (error) {
        console.log('=== fetch error ===', error, error.response)
        this.loading = false
        this.error = true
      }

    }
  }
}
</script>

<style lang="less" scoped>
.demo-waterfall {
  display: flex;
  justify-content: space-between;
  &__column {
    width: 49%;
  }
  &-column__item {
    background-color: #fff;
    margin-bottom: 10px;
  }
  &-column-item__img {
    width: 100%;
    position: relative;
    background-color: #e1e1e1;
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
  }
  &-column-item__text {
    height: 30px;
    line-height: 30px;
  }
}
</style>
