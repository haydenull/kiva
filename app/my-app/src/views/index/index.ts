import Vue from 'vue'
import App from './App.vue'

// import Vant from 'vant'
// import 'vant/lib/index.css'

// Vue.use(Vant)

Vue.config.productionTip = false

// Vue.use(Kiva)

import List from '@wozjs/kiva-ui/lib/loading'
import '@wozjs/kiva-ui/lib/loading/style'

import Dialog from '@wozjs/kiva-ui/lib/dialog'
import '@wozjs/kiva-ui/lib/dialog/style'

Vue.use(Dialog)
Vue.use(List)

// import

new Vue({
  render: h => h(App)
}).$mount('#app')
