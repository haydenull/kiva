import Vue from 'vue'
import VurRouter from 'vue-router'

import Home from './components/Home.vue'
import store from './store'

const requireKivaConfig = require.context('@ui', false, /kiva\.config\.js$/)
let kivaConfig = {
  theme: {},
  deploy: {},
}
requireKivaConfig.keys().forEach(kivaConfigPath => {
  const _kivaConfig = requireKivaConfig(kivaConfigPath)
  kivaConfig = Object.assign(kivaConfig, _kivaConfig)
})

// https://webpack.js.org/guides/dependency-management/#require-context
// 匹配 components 下一级目录的 README.md    .components/list/README.md
const requireComponentDocs = require.context('@ui/src', true, /components\/[^\/]*\/README\.md$/)
// 获取所有组件 doc
const componentDocs = {}
requireComponentDocs.keys().forEach(docPath => {
  const doc = requireComponentDocs(docPath).default
  const key = '/' + docPath.match(/components\/([^\/]*)\/README\.md$/)[1]
  const config = doc.kivaDocConfig || {}
  if (config.path && !(/^\//.test(config.path))) {
    config.path = '/' + config.path
  }
  doc.kivaDocConfig = Object.assign({
    path: key,
    group: '默认分组',
    title: '默认名称',
    topNav: 'default',
  }, config)
  if (key) componentDocs[key] = doc
})

// 获取自定义 doc
const requireCustomDocs = require.context('@ui/docs', true, /.md$/)
const customDocs = {}
requireCustomDocs.keys().forEach(docPath => {
  const doc = requireCustomDocs(docPath).default
  const key = '/' + docPath.match(/.\/(.*)\.md$/)[1]
  const config = doc.kivaDocConfig || {}
  if (config.path && !(/^\//.test(config.path))) {
    config.path = '/' + config.path
  }
  doc.kivaDocConfig = Object.assign({
    path: key,
    group: '默认分组',
    title: '默认名称',
    topNav: 'default',
  }, config)
  if (key) customDocs[key] = doc
})

// 归纳所有 doc
// const docs = Object.assign({ '/': Home }, customDocs, componentDocs)
const docs = Object.assign({}, customDocs, componentDocs)

// 生成 docs 站点左侧导航栏数据
function genDocConfigList() {
  let docConfigs = {}

  console.log('==== kiva config ===', kivaConfig)
  let defaultNav = [{ text: 'default', link: '/' }]
  let topNav = kivaConfig && kivaConfig.theme && kivaConfig.theme.topNav

  // 若已经配置了 default nav
  if (topNav) {
    const defaultIndex = topNav.findIndex(item => item.text === 'default')
    if (defaultIndex >= 0) defaultNav = []
  }

  topNav = topNav ? defaultNav.concat(topNav) : defaultNav
  store.commit('updateTopNavs', topNav)


  // 按照 topNav 分组
  Object.keys(docs).forEach(key => {
    const doc = docs[key]
    const docConfig = doc.kivaDocConfig

    const index = topNav.findIndex(topNav => topNav.text === docConfig.topNav)
    if (index >= 0) {
      const { text, link } = topNav[index]
      let topNavChildren = docConfigs[text] || []
      // topNavChildren = topNavChildren ? topNavChildren : []
      topNavChildren.push(docConfig)
      docConfigs[text] = topNavChildren
    }

  })

  // 按照 group 分组
  Object.keys(docConfigs).forEach(topNav => {
    const docList = docConfigs[topNav]
    let docConfigList = []
    // 按照 group 分组
    let map = new Map()
    docList.forEach(docConfig => {
      if (map.has(docConfig.group)) {
        const index = map.get(docConfig.group)
        docConfigList[index].navs.push(docConfig)
      } else {
        docConfigList.push({
          group: docConfig.group,
          navs: [ docConfig ]
        })
        map.set(docConfig.group, docConfigList.length - 1)
      }
    })
    docConfigs[topNav] = docConfigList
  })


  Object.keys(docConfigs).forEach(topNav => {

    // 按照指定 group 对 sidebar 分组进行排序
    let topNavConfig = kivaConfig && kivaConfig.theme && kivaConfig.theme.topNav || []
    const sideBar = docConfigs[topNav]
    const { group = [] } = topNavConfig.find(item => item.text === topNav) || {}
    if (group.length > 0) {
      let groupSorted = []
      group.forEach(groupName => {
        const i = sideBar.findIndex(item => item.group === groupName)
        if (i >= 0) {
          const res = sideBar.splice(i, 1)[0]
          groupSorted.push(res)
        }
      })
      if (sideBar.length > 0) {
        groupSorted = groupSorted.concat(sideBar)
      }
      docConfigs[topNav] = groupSorted
    }

    // 按照文章 sortIndex 对单篇文章进行排序
    const sortedSideBar = docConfigs[topNav]
    docConfigs[topNav] = sortedSideBar.map(sideBar => {
      const sideBarNavs = sideBar.navs
      let sideBarNavsSorted = sideBarNavs.sort((article1, article2) => {
        const indexArticle1 = article1.sortIndex || Infinity
        const indexArticle2 = article2.sortIndex || Infinity
        return indexArticle1 - indexArticle2
      })
      return {
        ...sideBar,
        navs: sideBarNavsSorted,
      }
    })


  })



  return docConfigs
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
    routes.push({ path, component: doc })
  })

  return routes
}

const routes = genRoutes()
console.log('=== docs site routes ===', routes, genDocConfigList())
Vue.use(VurRouter)
const router = new VurRouter({
  routes,
})

// docs 站 点切换路由时联动切换 demo 站点 url
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
  store.commit('updateDemoSiteUrl', componentPath)
})

export default router
