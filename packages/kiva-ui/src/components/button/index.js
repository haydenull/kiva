import KivaButton from './src/index.vue'

KivaButton.install = function(Vue) {
  Vue.component(KivaButton.name, KivaButton)
}

export default KivaButton
