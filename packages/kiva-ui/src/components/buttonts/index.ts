import KivaButtonTs from './src/index.vue'

(KivaButtonTs as any).install = function(Vue) {
  Vue.component(KivaButtonTs.name, KivaButtonTs)
}

export default KivaButtonTs
