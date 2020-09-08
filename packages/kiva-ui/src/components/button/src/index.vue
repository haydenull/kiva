<template>
  <div class="kiva-container">
    <button class="button">{{ txt }}</button>
  </div>
</template>

<script>
import bindEventMixin from '../../../mixins/bindEvent'
import { getScrollEventTarget } from '../../../utils/dom'

export default {
  name: 'kiva-button',

  props: {
    txt: {
      type: String,
      default: 'kiva button',
    },
  },

}
</script>

<style lang="less">
.button {
  color: aqua;
}
</style>
