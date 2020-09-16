import KivaLoading from './src/index.vue'

KivaLoading.install = function(Vue) {
  Vue.use(KivaLoading.name, KivaLoading)
}

export default KivaLoading
