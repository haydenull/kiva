<template>
  <div class="kiva-tabs-pane" v-show="isActive">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'kiva-tabs-pane',
  data() {
    return {
      isActive: false,
    }
  }
}
</script>
