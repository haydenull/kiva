<template>
  <div class="kiva-demo-block">
    <div class="kiva-demo-block__title">{{ title }}</div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'kiva-demo-block',
  props: {
    title: {
      type: String,
      default: 'kiva-demo-block',
    },
  }
}
</script>

<style lang="less">
.kiva-demo-block {
  &__title {
    padding: 32px 16px 16px;
    color: #999;
  }
}
</style>