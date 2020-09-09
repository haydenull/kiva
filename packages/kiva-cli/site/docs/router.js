import Vue from 'vue'
import VurRouter from 'vue-router'

import Home from './components/Home.vue'
import store from './store'

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

function genDocConfigList() {
  let docConfigList = []
  let map = new Map()
  Object.keys(docs).forEach(key => {
    const doc = docs[key]
    const config = doc.kivaDocConfig
    if (map.has(config.group)) {
      const index = map.get(config.group)
      docConfigList[index].navs.push(config)
    } else {
      docConfigList.push({
        group: config.group,
        navs: [ config ]
      })
      map.set(config.group, docConfigList.length - 1)
    }
  })
  return docConfigList
}
store.commit('updateDocs', genDocConfigList())


function genRoutes() {
  let routes = [
    { path: '/', component: Home },
  ]

  Object.keys(docs).forEach(key => {
    const doc = docs[key]
    // 额外保存 md 文件路径, 即组件路由地址, 切换文档站点路由时对应查找组件路由
    doc.kivaDocConfig = Object.assign({}, doc.kivaDocConfig, { componentPath: key })
    const config = doc.kivaDocConfig
    const path = config.path || key
    routes.push({ path: `/${path}`, component: doc })
  })

  return routes
}

const routes = genRoutes()
console.log('=== docs site routes ===', routes, genDocConfigList())
Vue.use(VurRouter)
const router = new VurRouter({
  routes,
})

// docs 站 点切换路由时联动切换 debug 站点 url
router.afterEach((to, from) => {
  let componentPath = ''
  for (let i = 0; i < routes.length; i++) {
    const { path, component } = routes[i]
    if (to.path === path) {
      componentPath = (component.kivaDocConfig && component.kivaDocConfig.componentPath) || ''
      break
    }
  }
  store.commit('updateDebugSiteUrl', componentPath)
})

export default router
