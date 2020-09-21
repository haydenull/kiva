const fetch = require('node-fetch')
const API = 'https://registry.npm.taobao.org/-/package'

module.exports = async function(pkgNames) {
  let res = {}
  pkgNames = [].concat(pkgNames)

  for (const pkgName of pkgNames) {
    // http://registry.npm.taobao.org/-/package/vue/dist-tags
    const data = await fetch(`${API}/${pkgName}/dist-tags`).then(res => res.json())
    res[pkgName] = data.latest
  }

  return res
}