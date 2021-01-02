<template>
  <div>

    <kiva-demo-block title="基础用法">
      <kiva-image
        src="https://magic-pocket.oss-cn-beijing.aliyuncs.com/picgo/20201025194253.jpg"
        style="width: 100px; height: 100px;"
      >
      </kiva-image>
    </kiva-demo-block>

    <kiva-demo-block title="加载中提示">
      <div class="demo-item--inline">
        <kiva-image
          src="https://magic-pocket.oss-cn-beijing.aliyuncs.com/picgo/20201025194253.jpg"
          style="width: 100px; height: 100px;"
          loading-demo
        >
        </kiva-image>
        <div>默认加载中样式</div>
      </div>
      <div class="demo-item--inline">
        <kiva-image
          src="https://magic-pocket.oss-cn-beijing.aliyuncs.com/picgo/20201025194253.jpg"
          style="width: 100px; height: 100px;"
          loading-demo
        >
          <template v-slot:loading>loading...</template>
        </kiva-image>
        <div>自定义加载中</div>
      </div>
    </kiva-demo-block>

    <kiva-demo-block title="加载失败提示">
      <div class="demo-item--inline">
        <kiva-image
          style="width: 100px; height: 100px;"
        >
        </kiva-image>
        <div>默认加载失败样式</div>
      </div>
      <div class="demo-item--inline">
        <kiva-image
          style="width: 100px; height: 100px;"
        >
          <template v-slot:error>error</template>
        </kiva-image>
        <div>自定义加载失败</div>
      </div>
    </kiva-demo-block>

    <kiva-demo-block title="填充模式">
      <div class="demo-item--inline">
        <kiva-image
          src="https://magic-pocket.oss-cn-beijing.aliyuncs.com/picgo/20201025194253.jpg"
          style="width: 100px; height: 100px;"
          fit="fill"
        >
        </kiva-image>
        <div>fill</div>
      </div>

      <div class="demo-item--inline">
        <kiva-image
          src="https://magic-pocket.oss-cn-beijing.aliyuncs.com/picgo/20201025194253.jpg"
          style="width: 100px; height: 100px;"
          fit="contain"
        >
        </kiva-image>
        <div>contain</div>
      </div>

      <div class="demo-item--inline">
        <kiva-image
          src="https://magic-pocket.oss-cn-beijing.aliyuncs.com/picgo/20201025194253.jpg"
          style="width: 100px; height: 100px;"
          fit="cover"
        >
        </kiva-image>
        <div>cover</div>
      </div>

      <div class="demo-item--inline">
        <kiva-image
          src="https://magic-pocket.oss-cn-beijing.aliyuncs.com/picgo/20201025194253.jpg"
          style="width: 100px; height: 100px;"
          fit="none"
        >
        </kiva-image>
        <div>none</div>
      </div>

      <div class="demo-item--inline">
        <kiva-image
          src="https://magic-pocket.oss-cn-beijing.aliyuncs.com/picgo/20201025194253.jpg"
          style="width: 100px; height: 100px;"
          fit="scale-down"
        >
        </kiva-image>
        <div>scale-down</div>
      </div>

    </kiva-demo-block>

    <kiva-demo-block title="圆角">
      <kiva-image
        round
        src="https://magic-pocket.oss-cn-beijing.aliyuncs.com/picgo/20201025194253.jpg"
        style="width: 100px; height: 100px;"
      >
      </kiva-image>
    </kiva-demo-block>

  </div>
</template>

<style lang="less" scoped>
.demo-item--inline {
  display: inline-block;
  div {
    color: #aaa;
    text-align: center;
    margin-top: 6px;
    font-size: 12px;
  }
}
</style>
