// https://webpack.js.org/guides/dependency-management/#require-context
// 匹配 components 下一级目录的 index.js    .components/list/index.js
const requireComponent = require.context('./', true, /components\/[^\/]*\/index\.js$/)
// 匹配 components 下 demo 的 index.vue    .components/list/demo/index.vue
const requireDemo = require.context('./', true, /components\/[^\/]*\/demo\/index\.vue$/)    // /^\.\/.*$/
console.log('=== requireComponents ===', requireComponent.keys())
console.log('=== requireDemo ===', requireDemo.keys())

// 获取所有 components
const _components = {}
requireComponent.keys().forEach(componentPath => {
  const component = requireComponent(componentPath).default
  if (component && component.name) _components[component.name] = component
})
export const components = _components


// 获取所有 demo
const _demos = {}
requireDemo.keys().forEach(demoPath => {
  const demo = requireDemo(demoPath).default
  // console.log('=== path ===', demoPath)
  const key = demoPath.match(/\/([^\/]*)\/demo/)[1]
  if (key) _demos[key] = demo
})
export const demos = _demos



function install(Vue, opts = {}) {
  Object.keys(_components).forEach(key => {
    const component = _components[key]
    Vue.component(component.name, component)
  })
}

export default {
  install,
}
