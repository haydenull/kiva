import Vue from 'vue'
import VurRouter from 'vue-router'
import { demos } from './entry/demos'

import Home from './components/Home.vue'

console.log('=== demos ===', demos)


function genRoutes() {
  let routes = [
    { path: '/', component: Home },
  ]

  Object.keys(demos).forEach(key => {
    const demo = demos[key]
    routes.push({ path: `/${key}`, component: demo })
  })

  return routes
}

console.log('=== routes ===', genRoutes())

Vue.use(VurRouter)
const router = new VurRouter({
  routes: genRoutes(),
})

export default router
