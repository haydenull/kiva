import Vue from 'vue'
import VurRouter from 'vue-router'

import Home from './components/Home.vue'

// https://webpack.js.org/guides/dependency-management/#require-context
// 匹配 components 下一级目录的 README.md    .components/list/README.md
const requireDocs = require.context('@ui/src', true, /components\/[^\/]*\/README\.md$/)

// 获取所有组件 doc
const docs = {}
requireDocs.keys().forEach(docPath => {
  const doc = requireDocs(docPath).default
  const key = docPath.match(/components\/([^\/]*)\/README\.md$/)[1]
  if (key) docs[key] = doc
})


function genRoutes() {
  let routes = [
    { path: '/', component: Home },
  ]

  Object.keys(docs).forEach(key => {
    const doc = docs[key]
    routes.push({ path: `/${key}`, component: doc })
  })

  return routes
}

console.log('=== docs site routes ===', genRoutes())

Vue.use(VurRouter)
const router = new VurRouter({
  routes: genRoutes(),
})

export default router