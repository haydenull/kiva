import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    docs: { default: [] },         // 所有文档配置信息 Front Matter
    currentTopNav: 'default',      // 当前展示的次级路由
    topNavs: [],                   // 次级路由
    demoSiteUrl: 'demo.html#/',  // iframe 地址
  },
  getters: {
    sideBarDocs(state) {
      const { docs, currentTopNav } = state
      return docs[currentTopNav] || []
    },
    showTopNavs(state) {
      const { topNavs } = state
      // 顶部导航栏不展示默认次级路由
      return topNavs.filter(item => item.text !== 'default')
    },
  },
  mutations: {
    updateDocs(state, docs) {
      state.docs = docs
    },
    updateTopNavs(state, topNavs) {
      state.topNavs = topNavs
    },
    updateTopNav(state, topNav) {
      state.currentTopNav = topNav
    },
    updateDemoSiteUrl(state, path = '') {
      console.log('=== updateDemoSiteUrl ===', path)
      state.demoSiteUrl = state.demoSiteUrl.replace(/(^demo.html#\/).*/, (res, $1) => $1 + path)
    },
  }
})

export default store
