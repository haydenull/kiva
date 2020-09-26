<template>
  <div>
    <kiva-tabs :active-index.sync="activeIndex">
      <kiva-tabs-pane title="基础用法">
        <kiva-demo-block title="基础用法">
          <button @click="showDefault = true">基础蒙层</button>
        </kiva-demo-block>

        <kiva-demo-block title="嵌入内容">
          <button @click="showContent = true">嵌入内容</button>
        </kiva-demo-block>
      </kiva-tabs-pane>

      <kiva-tabs-pane title="禁止滚动">
        <kiva-demo-block title="默认禁止滚动">
          <button @click="showForbidAllScroll = true">默认禁止Mask内所有滚动</button>
        </kiva-demo-block>
        <kiva-demo-block title="允许内部滚动">
          <button @click="showForbidMaskScroll = true">允许Mask内滚动</button>
        </kiva-demo-block>
        <div class="demo-long-block"></div>
      </kiva-tabs-pane>

    </kiva-tabs>


    <kiva-mask
      :show="showDefault"
      @click="showDefault = false"
    />

    <kiva-mask
      :show="showContent"
      @click="showContent = false"
      :z-index="10"
    >
      <div class="demo-content"></div>
    </kiva-mask>

    <kiva-mask
      :show="showForbidAllScroll"
      @click="showForbidAllScroll = false"
    >
      <div class="demo-content">
        <div class="demo-content__content"></div>
      </div>
    </kiva-mask>

    <kiva-mask
      :show="showForbidMaskScroll"
      @click="showForbidMaskScroll = false"
      allow-inner-scroll
    >
      <div class="demo-content">
        <div class="demo-content__content"></div>
      </div>
    </kiva-mask>


  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 0,
      showDefault: false,
      showContent: false,
      showForbidAllScroll: false,
      showForbidMaskScroll: false,
    }
  },
}
</script>

<style scoped>
.demo-content {
  width: 120px;
  height: 120px;
  background-color: #fff;
  z-index: 1;
  overflow: auto;
}

.demo-long-block {
  background: linear-gradient(to bottom, #9796f0, #fbc7d4);
  height: 1000px;
  margin-top: 32px;
}

.demo-content__content {
  height: 300px;
  background: linear-gradient(to bottom, #00467F, #A5CC82);
}
</style>