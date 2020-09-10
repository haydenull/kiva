import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    docs: [],  // 所有文档配置信息 Front Matter
    debugSiteUrl: 'debug.html#/',  // iframe 地址
  },
  mutations: {
    updateDocs(state, docs) {
      state.docs = docs
    },
    updateDebugSiteUrl(state, path = '') {
      console.log('=== updateDebugSiteUrl ===', path)
      state.debugSiteUrl = state.debugSiteUrl.replace(/(^debug.html#\/).*/, (res, $1) => $1 + path)
    },
  }
})

export default store
