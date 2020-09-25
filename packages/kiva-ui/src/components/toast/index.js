import Toast from './src/toast'

Toast.install = function(Vue) {
  // Vue.component(Toast.name, Toast)
  Vue.prototype.$toast = Toast(Vue)
}

export default Toast
