import KivaWaterfall from './src/index.vue'
// import KivaList from '../list/src/index.vue'
import KivaList from '@ui/src/components/list'

KivaWaterfall.install = function(Vue) {
  Vue.component(KivaList.name, KivaList)
  Vue.component(KivaWaterfall.name, KivaWaterfall)
}

export default KivaWaterfall
