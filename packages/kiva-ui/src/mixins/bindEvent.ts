import { Component, Vue } from 'vue-property-decorator'

let uid = 0;

function on(
  target: HTMLElement,
  event: string,
  handler: (event: Event) => void
) {
  target.addEventListener(event, handler)
}

function off(
  target: HTMLElement,
  event: string,
  handler: (event: Event) => void
) {
  target.removeEventListener(event, handler)
}

type IOn = typeof on

export default function bindEventMixin(cb: (on: IOn) => void): any {
  const key = `faiz_binded_${uid++}`


  function bind() {
    // 此处 this 指使用该 mixin 的 Vue 实例
    // @ts-ignore
    if (!this[key]) {
      // @ts-ignore
      cb.call(this, on)
      // @ts-ignore
      this[key] = true
    }
  }

  function unbind() {
    // @ts-ignore
    if (this[key]) {
      // @ts-ignore
      handler.call(this, off)
      // @ts-ignore
      this[key] = false
    }
  }

  @Component
  class BindEventMixin extends Vue {
    mounted() { bind.call(this) }
    activated = bind
    deactivated = unbind
    beforeDestroy = unbind
  }

  return BindEventMixin
}

// export default class BindEventMixin extends Vue {
//   mounted() {
//     console.log('=== mixin mounted ===')
//   }
//   activated = bind
//   deactivated = unbind
//   beforeDestroy = unbind
// }
