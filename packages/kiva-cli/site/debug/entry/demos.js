// 匹配 components 下 demo 的 index.vue    .components/list/demo/index.vue
const requireDemo = require.context('@ui/src', true, /components\/[^\/]*\/demo\/index\.vue$/)    // /^\.\/.*$/
console.log('=== requireDemo ===', requireDemo.keys())

// 获取所有 demo
export const demos = {}
requireDemo.keys().forEach(demoPath => {
  const demo = requireDemo(demoPath).default
  // console.log('=== path ===', demoPath)
  const key = demoPath.match(/\/([^\/]*)\/demo/)[1]
  if (key) demos[key] = demo
})