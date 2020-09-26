<template>
  <kiva-mask :show="show">
    <div class="kiva-dialog">
      <div v-if="title" class="kiva-dialog__header">{{ title }}</div>
      <div class="kiva-dialog__content">{{ message }}</div>
      <div class="kiva-dialog__footer">
        <div v-if="showCancel" class="kiva-dialog__btn kiva-dialog__cancel" @click="onClick('cancel')">{{ cancelText }}</div>
        <div class="kiva-dialog__btn kiva-dialog__confirm" :class="{ 'kiva-dialog__btn--single': !showCancel }" @click="onClick('confirm')">{{ confirmText }}</div>
      </div>
    </div>
  </kiva-mask>
</template>

<script>
export default {
  name: 'kiva-dialog',  // 必须
  props: {
    show: { type: Boolean, required: true },
    title: { type: String, default: '' },
    message: { type: String, required: true },
    cancelText: { type: String, default: '取消' },
    cancelColor: { type: String, default: '#444' },
    confirmText: { type: String, default: '确定' },
    confirmColor: { type: String, default: '#fff' },
    showCancel: { type: Boolean, default: true },
  },
  methods: {
    onClick(type) {
      this.$emit(type)
      this.$emit('update:show', false)
    }
  }
}
</script>
