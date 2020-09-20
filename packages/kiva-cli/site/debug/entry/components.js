// https://webpack.js.org/guides/dependency-management/#require-context
// 匹配 components 下一级目录的 index.js    ./components/list/index.js
const requireComponent = require.context('@ui/src', true, /components\/[^\/]*\/index\.(js|ts)$/)

// 获取所有 component
export const components = {}
requireComponent.keys().forEach(componentPath => {
  const component = requireComponent(componentPath).default
  const key = componentPath.match(/components\/([^\/]*)\/index\.(js|ts)$/)[1]
  if (key) components[key] = component
})
