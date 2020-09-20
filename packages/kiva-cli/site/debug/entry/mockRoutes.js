// const glob = require('glob')
// const Mock = require('mockjs')
// const path = require('path')

// function handleRoute(req, res, routeConfig) {
//   const { status = 'success', success = {}, error = {}, delay = 0 } = routeConfig
//   setTimeout(() => {
//     if (status === 'success') {
//       if (typeof success === 'function') return success(req, res, Mock)
//       res.json(Mock.mock(success))
//     } else {
//       if (typeof error === 'function') return error(req, res, Mock)
//       res.status(500).json(Mock.mock(error))
//     }
//   }, delay)

// }

// module.exports = function() {
//   const basePath = path.resolve(process.cwd(), './src')
//   const mockFiles = glob.sync(`${basePath}/components/**/mock/*.js`)

//   let routes = {}
//   mockFiles.forEach(filePath => {
//     const routeConfig = require(filePath)
//     const routePathMatch = filePath.match(/components\/([^\/]+)\/mock\/(.+)\.js$/)
//     const routePath = `/mock/${routePathMatch[1]}/${routePathMatch[2]}`

//     let method = routeConfig.method || 'GET'
//     method = method.toUpperCase()

//     routes[routePath] = routeConfig

//     if (method === 'POST') {
//       app.post(routePath, (req, res) => handleRoute(req, res, routeConfig))
//     } else if (method === 'GET') {
//       app.get(routePath, (req, res) => handleRoute(req, res, routeConfig))
//     }

//   })
//   return routes
// }


const requireMockRoute = require.context('@ui/src', true, /components\/[^\/]+\/mock\/.+\.js$/)

// 获取所有 mock
export const mockRoutes = {}
requireMockRoute.keys().forEach(mockRouteFilePath => {
  const route = requireMockRoute(mockRouteFilePath).default
  const pathMatch = mockRouteFilePath.match(/components\/([^\/]+)\/mock\/(.+)\.js$/)
  const key = `/${pathMatch[1]}/${pathMatch[2]}`
  if (key) mockRoutes[key] = route
})