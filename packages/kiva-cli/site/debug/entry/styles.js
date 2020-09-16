module.exports = function() {
  // 获取组件样式
  const requireComponentStyle = require.context('@ui/src', true, /components\/[^\/]*\/src\/index\.(css|less)$/)
  requireComponentStyle.keys().forEach(componentStylePath => {

    requireComponentStyle(componentStylePath)

  })

  // 通用样式
  const requireCommonStyle = require.context('@ui/src', true, /styles\/index\.(css|less)$/)
  requireCommonStyle.keys().forEach(commonStylePath => {

    requireCommonStyle(commonStylePath)

  })
}
