<template>
  <div class="kiva-container">
    <button class="button">{{ txt }}</button>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'kiva-button-ts',
})
export default class KivaButtonTs extends Vue {
  @Prop({ type: String, default: 'kiva-button-ts' }) readonly txt?: string
}
</script>


<style lang="less">
.button {
  color: aqua;
}
</style>
