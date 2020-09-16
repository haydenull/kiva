import Vue from 'vue'
// import Kiva from '@ui/src/index.js'
import Kiva from './entry/ui'
import App from './App.vue'
import router from './router'

import DemoBlock from './components/DemoBlock.vue'

Vue.config.productionTip = false

Vue.use(Kiva)
Vue.component(DemoBlock.name, DemoBlock)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
