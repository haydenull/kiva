import KivaButton from './src/index.vue'
import '@mfelibs/base-css'
KivaButton.install = function(Vue) {
  Vue.component(KivaButton.name, KivaButton)
}

export default KivaButton
