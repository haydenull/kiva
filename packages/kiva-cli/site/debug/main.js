import Vue from 'vue'
import Kiva from '@ui/src/index.js'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(Kiva)

new Vue({
  render: h => h(App),
}).$mount('#app')
