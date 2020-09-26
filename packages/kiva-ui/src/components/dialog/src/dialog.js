import toast from '../../toast/src/toast'
import VueDialog from './index.vue'

const DEFAULT_OPTIONS = {
  show: true,
  message: 'default message',
  title: '',
  showCancel: true,
  cancelText: '取消',
  cancelColor: '#444',
  confirmText: '确定',
  confirmColor: '#fff',
  confirm: () => {},
  cancel: () => {},
}

let dialog = null
function createInstance(Vue) {
  // 单例模式
  if (dialog) return dialog

  const VueConstructor = Vue.extend(VueDialog)
  dialog = new VueConstructor({
    propsData: DEFAULT_OPTIONS,
  })
  dialog.$mount()
  dialog.$on('update:show', (val) => (dialog.show = val))
  document.body.appendChild(dialog.$el)
  return dialog
}

export default function(Vue) {
  return function(options = {}) {
    const dialog = createInstance(Vue)
    options = Object.assign({}, DEFAULT_OPTIONS, options)
    Object.assign(dialog, options)

    dialog.show = true
    dialog.$off('confirm')
    dialog.$off('cancel')
    if (options.confirm) dialog.$on('confirm', options.confirm)
    if (options.cancel) dialog.$on('cancel', options.cancel)

    return dialog
  }
}