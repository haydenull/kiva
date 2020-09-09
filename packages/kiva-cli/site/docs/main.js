import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './css/reset.less'
import './css/common.less'
import './css/util.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
