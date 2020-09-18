<template>
  <kiva-tabs :active-index.sync="activeIndex">

    <kiva-tabs-pane title="基础用法">
      <base-demo />
    </kiva-tabs-pane>

    <kiva-tabs-pane title="错误提示">
      <err-info-demo />
    </kiva-tabs-pane>

  </kiva-tabs>
</template>

<script>
import baseDemo from './baseDemo.vue'
import errInfoDemo from './errInfoDemo.vue'

export default {
  components: {
    baseDemo,
    errInfoDemo,
  },
  data () {
    return {
      activeIndex: 0,
    }
  },
}
</script>
