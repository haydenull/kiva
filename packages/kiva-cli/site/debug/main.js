import Vue from 'vue'
import axios from 'axios'
// import Kiva from '@ui/src/index.js'
import Kiva from './entry/ui'
import App from './App.vue'
import router from './router'
import { proxy, unProxy } from '../../utils/ajaxHook'

import DemoBlock from './components/DemoBlock.vue'
import { mockRoutes } from './entry/mockRoutes'

// 前端请求拦截
proxy(mockRoutes)

Vue.config.productionTip = false

Vue.use(Kiva)
Vue.component(DemoBlock.name, DemoBlock)
Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
