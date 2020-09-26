import Dialog from './src/dialog'

Dialog.install = function(Vue) {
  // Vue.component(Dialog.name, Dialog)
  Vue.prototype.$dialog = Dialog(Vue)
}

export default Dialog