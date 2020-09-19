const glob = require('glob')
const Mock = require('mockjs')
const path = require('path')

function handleRoute(req, res, routeConfig) {
  const { status = 'success', success = {}, error = {}, delay = 0 } = routeConfig
  setTimeout(() => {
    if (status === 'success') {
      if (typeof success === 'function') return success(req, res, Mock)
      res.json(Mock.mock(success))
    } else {
      if (typeof error === 'function') return error(req, res, Mock)
      res.status(500).json(Mock.mock(error))
    }
  }, delay)

}

module.exports = function(app) {
  const basePath = path.resolve(process.cwd(), './src')
  const mockFiles = glob.sync(`${basePath}/components/**/mock/*.js`)
  mockFiles.forEach(filePath => {
    const routeConfig = require(filePath)
    const routePathMatch = filePath.match(/components\/([^\/]+)\/mock\/(.+)\.js$/)
    const routePath = `/mock/${routePathMatch[1]}/${routePathMatch[2]}`

    let method = routeConfig.method || 'GET'
    method = method.toUpperCase()

    if (method === 'POST') {
      app.post(routePath, (req, res) => handleRoute(req, res, routeConfig))
    } else if (method === 'GET') {
      app.get(routePath, (req, res) => handleRoute(req, res, routeConfig))
    }

  })
}