import Toast from './src/index.vue'

Toast.install = function(Vue) {
  Vue.component(Toast.name, Toast)
}

export default Toast