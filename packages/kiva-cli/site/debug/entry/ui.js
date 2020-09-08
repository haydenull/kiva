// https://webpack.js.org/guides/dependency-management/#require-context
// 匹配 components 下一级目录的 index.js    .components/list/index.js
const requireComponent = require.context('@ui/src', true, /components\/[^\/]*\/index\.js$/)
console.log('=== requireComponents ===', requireComponent.keys())


// 获取所有 component
export const components = {}
requireComponent.keys().forEach(componentPath => {
  const component = requireComponent(componentPath).default
  if (component && component.name) components[component.name] = component
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
