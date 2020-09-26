<template>
  <div>
    <kiva-demo-block title="基础用法">
      <button @click="showDialog">基础使用</button>
    </kiva-demo-block>

    <kiva-demo-block title="隐藏取消按钮">
      <button @click="showDialogWithoutCancel">隐藏取消按钮</button>
    </kiva-demo-block>

    <!-- <kiva-dialog :show.sync="show" message="xxxx"></kiva-dialog> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    }
  },
  methods: {
    showDialog() {
      this.$dialog({
        title: '新浪新闻',
        message: '新浪新闻客户端，专享更多精彩视频',
        cancelText: 'cancel',
        confirmText: 'confirm',
        confirm() {
          console.log('=== click confirm ===')
        },
        cancel() {
          console.log('=== click cancel ===')
        },
      })
    },
    showDialogWithoutCancel() {
      this.$dialog({
        message: '新浪新闻客户端，专享更多精彩视频',
        showCancel: false,
      })
    }
  }
}
</script>

<style scoped>
.demo-item {
  padding: 10px 0;
}
</style>