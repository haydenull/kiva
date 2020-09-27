import Vue from 'vue'
import App from './App.vue'
import Kiva from '@wozjs/kiva-ui'
import '@wozjs/kiva-ui/dist/kiva-ui.css'
// import Image from '@wozjs/kiva-ui/lib/image'
// import '@wozjs/kiva-ui/lib/image/style'

// import { Image } from '@wozjs/kiva-ui'

// Vue.use(Image)

Vue.config.productionTip = false

Vue.use(Kiva)

new Vue({
  render: h => h(App)
}).$mount('#app')
