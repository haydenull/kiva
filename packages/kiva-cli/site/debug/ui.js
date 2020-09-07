// https://webpack.js.org/guides/dependency-management/#require-context
// 匹配 components 下一级目录的 index.js    .components/list/index.js
const requireComponent = require.context('@ui/src', true, /components\/[^\/]*\/index\.js$/)
// 匹配 components 下 demo 的 index.vue    .components/list/demo/index.vue
const requireDemo = require.context('@ui/src', true, /components\/[^\/]*\/demo\/index\.vue$/)    // /^\.\/.*$/
console.log('=== requireComponents ===', requireComponent.keys())
console.log('=== requireDemo ===', requireDemo.keys())

// 获取所有 component
export const components = {}
requireComponent.keys().forEach(componentPath => {
  const component = requireComponent(componentPath).default
  if (component && component.name) components[component.name] = component
})


// 获取所有 demo
export const demos = {}
requireDemo.keys().forEach(demoPath => {
  const demo = requireDemo(demoPath).default
  // console.log('=== path ===', demoPath)
  const key = demoPath.match(/\/([^\/]*)\/demo/)[1]
  if (key) demos[key] = demo
})



function install(Vue, opts = {}) {
  Object.keys(components).forEach(key => {
    const component = components[key]
    Vue.component(component.name, component)
  })
}

export default {
  install,
}
