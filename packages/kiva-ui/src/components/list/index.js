import KivaList from './src/index.vue'

KivaList.install = function(Vue) {
  Vue.component(KivaList.name, KivaList)
}

export default KivaList
