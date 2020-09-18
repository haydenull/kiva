import Vue from 'vue'
import axios from 'axios'
// import Kiva from '@ui/src/index.js'
import Kiva from './entry/ui'
import App from './App.vue'
import router from './router'

import DemoBlock from './components/DemoBlock.vue'

Vue.config.productionTip = false

Vue.use(Kiva)
Vue.component(DemoBlock.name, DemoBlock)
Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
