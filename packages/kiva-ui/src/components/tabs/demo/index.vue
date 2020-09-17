<template>
  <div>

    <kiva-demo-block title="基础用法">
      <kiva-tabs :active-index.sync="activeIndex">
        <kiva-tabs-pane title="title 1">
          <div class="demo-content">content 1</div>
        </kiva-tabs-pane>
        <kiva-tabs-pane title="title 2">
          <div class="demo-content">content 2</div>
        </kiva-tabs-pane>
        <kiva-tabs-pane title="title 3">
          <div class="demo-content">content 3</div>
        </kiva-tabs-pane>
        <kiva-tabs-pane title="title 4">
          <div class="demo-content">content 4</div>
        </kiva-tabs-pane>
      </kiva-tabs>
    </kiva-demo-block>

  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: 1
    }
  }
}
</script>

<style scoped>
.demo-content {
  background: #fff;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
