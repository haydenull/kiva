<template>
  <div>

    <kiva-demo-block title="自定义颜色">
      <kiva-loading color="#e88b00">加载中...</kiva-loading>
    </kiva-demo-block>

    <kiva-demo-block title="自定义文字尺寸">
      <kiva-loading text-size="16px">加载中...</kiva-loading>
    </kiva-demo-block>

    <kiva-demo-block title="默认表现为块元素">
      <kiva-loading>加载中...</kiva-loading>
    </kiva-demo-block>

    <kiva-demo-block title="表现为行内元素">
      <kiva-loading mode="inline">加载中...</kiva-loading>
    </kiva-demo-block>

  </div>
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
