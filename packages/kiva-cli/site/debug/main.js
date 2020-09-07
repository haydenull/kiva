import Vue from 'vue'
import Kiva from '@ui/src/index.js'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.use(Kiva)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
