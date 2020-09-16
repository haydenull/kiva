<template>
  <kiva-loading
    :color="color"
    :text-size="textSize"
    mode="inline"
  >加载中...</kiva-loading>
</template>

<script>
export default {
  data () {
    return {
      textSize: '16px',
      color: '#000',
    }
  }
}
</script>

<style>

</style>
