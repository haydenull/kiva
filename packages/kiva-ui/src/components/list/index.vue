<template>
  <div>

    <slot></slot>

    <div v-if="loading && !finished" class="hdImg_tips">加载中…</div>
    <div v-if="error" @click="onClickError" class="btn_refresh"></div>
    <div v-if="finished" class="hdImg_tips">已无数据</div>

    <div ref="faiz_pointer" class="faiz_pointer"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Mixins, Watch } from 'vue-property-decorator'

import bindEventMixin from '../mixins/bindEvent'
import { getScrollEventTarget } from '../utils/dom'
import { IScrollElement } from '../utils/types'

@Component({})
export default class List extends Mixins(bindEventMixin(function(bind) {
  //  @ts-ignore
  if (!this.scrollEventTarget) {
    // @ts-ignore
    this.scrollEventTarget = getScrollEventTarget(this.$el)
  }
  // @ts-ignore 此处 this 被 call 绑定为 Vue 实例
  bind(this.scrollEventTarget, 'scroll', this.check)
})) {
  // 是否正在加载中
  @Prop({ type: Boolean, default: false, required: true }) readonly loading!: boolean
  // 是否全部数据加载完毕
  @Prop({ type: Boolean, default: false, required: true }) readonly finished!: boolean
  // 是否加载失败
  @Prop({ type: Boolean, default: false, required: true }) readonly error!: boolean
  // 滚动条与底部距离 <= offset 时触发 load 事件
  @Prop({ type: Number, default: 150, required: false }) readonly offset?: number
  // 是否在初始化时立即检查高度
  @Prop({ type: Boolean, default: true, required: false }) readonly immediateCheck?: boolean

  scrollEventTarget: IScrollElement | null = null

  @Watch('loading')
  onLoadingChange() {
    this.check()
  }
  @Watch('finished')
  onFinishedChange() {
    this.check()
  }

  mounted() {
    console.log('=== List mounted ===')
    if (this.immediateCheck) this.check()
  }

  check() {
    this.$nextTick(() => {
      if (this.loading || this.error || this.finished) return

      if (!this.scrollEventTarget) {
        this.scrollEventTarget = getScrollEventTarget((this.$el as HTMLElement))
      }

      const { $el: el, scrollEventTarget: scroller, offset = 150 } = this

      let scrollerRect
      if ('getBoundingClientRect' in scroller) {
        scrollerRect = scroller.getBoundingClientRect()
      } else {
        scrollerRect = {
          top: 0,
          bottom: scroller.innerHeight,
        }
      }

      let isReachBottom = false
      let pointerRect = (this.$refs.faiz_pointer as Element).getBoundingClientRect()

      isReachBottom = pointerRect.bottom - scrollerRect.bottom <= offset

      if (isReachBottom) {
        this.$emit('update:loading', true)
        this.$emit('load')
      }

    })
  }

  onClickError() {
    this.$emit('update:error', false)
    this.check()
  }
}
</script>

<style scoped>
.btn_refresh {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  display: flex;
  font-size: .28rem;
  color: #3192f1;
  margin: .15rem auto;
  border: 1px solid #3192f1;
  border-radius: .3rem;
  width: 3.8rem;
  height: .6rem;
  box-sizing:border-box;
}
.btn_refresh:after {
  content: "点击重新加载";
}
.btn_refresh:before {
  content: "";
  height: .3rem;
  width: .3rem;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAbFBMVEUAAAAxk/I9oP8xkvJVqv8xkvIzlfQ5mPQxk/IylPI1l/Uyk/Ixk/IxkvIzlPMxk/IylPMzlfU1l/M2lvYyk/Ixk/Ixk/Ixk/Myk/Iyk/IylPM0l/cxk/Ixk/Iyk/IxlPEzk/MylPIzlfQxkvKzo2zxAAAAI3RSTlMA9QrqA8QtFrmKJN3ZgD7JeTUpErKinpmSdGYf49KrXFVORasJZ1QAAADuSURBVCjPjZJZksMgDAUtMHiP93Wy9/3vOFUuTzK2iSv6EajRAyF5O5susXdgEcY/wPWZ0RX/Ga+p1mnTI9UO2pC3XTbyfgTS3qqgtrerQLaiqkGi+m8XhzKtckP06agWfVCrRQ5yvYbogMZI7QhPaTn7kdaV1S+aIXcXvhPOPiV2/jHJ7AXlwgr5BiefxM+zNzxc+LE8raB34WFpm0Urx9Ua6y3q2R4XmGVVInZLK+HVpo4kWNMgoXuPgyGxq9yUXP07nCPFa68KIV/JqQ708Ax8P3gOGtptLScDIAJgXMNTZkaL6DwrvU/mb+b/F9EXEIe2mk7zAAAAAElFTkSuQmCC) no-repeat;
  background-size: 100% auto;
  margin-right: .06rem
}

.hdImg_tips{
  display: flex;
  flex-direction: row;
  padding:0 .3rem;
  height:.6rem;
  align-items: center;
  justify-content: center;
  line-height: normal;
  flex-shrink: 0;
  margin: .15rem 0;
  color:#888;
  font-size:.28rem;
}

</style>
