import KivaTabsPane from './src/pane.vue'
import KivaTabs from './src/index.vue'

KivaTabs.install = function(Vue) {
  Vue.component(KivaTabs.name, KivaTabs)
  Vue.component(KivaTabsPane.name, KivaTabsPane)
}

export default KivaTabs
