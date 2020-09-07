let uid = 0

function on( target, event, handler) {
  target.addEventListener(event, handler)
}

function off( target, event, handler ) {
  target.removeEventListener(event, handler)
}

export default function bindEventMixin(cb) {
  const key = `faiz_binded_${uid++}`

  function bind() {
    // 此处 this 指使用该 mixin 的 Vue 实例
    if (!this[key]) {
      cb.call(this, on)
      this[key] = true
    }
  }

  function unbind() {
    if (this[key]) {
      handler.call(this, off)
      this[key] = false
    }
  }

  return {
    mounted() { bind.call(this) },
    activated() { bind.call(this) },
    deactivated() { unbind.call(this) },
    beforeDestroy() { unbind.call(this) },
  }
}
