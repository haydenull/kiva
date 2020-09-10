import Vue from 'vue'
import VurRouter from 'vue-router'

import Home from './components/Home.vue'
import store from './store'

// https://webpack.js.org/guides/dependency-management/#require-context
// 匹配 components 下一级目录的 README.md    .components/list/README.md
const requireComponentDocs = require.context('@ui/src', true, /components\/[^\/]*\/README\.md$/)
// 获取所有组件 doc
const componentDocs = {}
requireComponentDocs.keys().forEach(docPath => {
  const doc = requireComponentDocs(docPath).default
  const key = docPath.match(/components\/([^\/]*)\/README\.md$/)[1]
  if (key) componentDocs[key] = doc
})

// 获取自定义 doc
const requireCustomDocs = require.context('@ui/docs', false, /.md$/)
const customDocs = {}
requireCustomDocs.keys().forEach(docPath => {
  const doc = requireCustomDocs(docPath).default
  const key = docPath.match(/.\/(.*)\.md$/)[1]
  if (key) customDocs[`docs/${key}`] = doc
})

// 归纳所有 doc
const docs = Object.assign({ '/': Home }, customDocs, componentDocs)

// 生成 docs 站点左侧导航栏数据
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
  let routes = []

  Object.keys(docs).forEach(key => {
    const doc = docs[key]
    // 额外保存 md 文件路径, 即组件路由地址, 切换文档站点路由时对应查找组件路由
    doc.kivaDocConfig = Object.assign({}, doc.kivaDocConfig, { componentPath: key })
    const config = doc.kivaDocConfig
    let path = config.path || key
    if (path === '/') path = ''
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
  console.log('=== 导航守卫 ===', to, from)
  componentPath = componentPath.replace(/^\/(.*)/, (res, $1) => $1)
  store.commit('updateDebugSiteUrl', componentPath)
})

export default router
