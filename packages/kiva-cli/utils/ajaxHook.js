import { proxy as _proxy, unProxy as _unProxy } from 'ajax-hook'
import Mock from 'mockjs'

const DEFAULT_ROUTE_CONFIG = {
  method: 'GET',
  status: 'success',
  delay: 0,
  success: {
    data: 'success data by mock',
  },
  error: {
    msg: 'error msg by mock',
  },
}

function genRouteHandler(proxyConfig, handler) {
  const url = /^http/.test(proxyConfig.url) ? proxyConfig.url : `${window.location.origin}${proxyConfig.url}`
  const urlObj = new URL(url)
  const searchParams = new URL(url).searchParams
  let query = {}
  searchParams.forEach((val, key) => query[key] = val)

  const req = {
    body: proxyConfig.body,
    method: proxyConfig.method,      // GET /search?q=something => 'GET'
    originalUrl: proxyConfig.url,    // GET /search?q=something => '/search?q=something'
    path: urlObj.pathname,
    protocol: urlObj.protocol.replace(/:$/, ''),
    query,
  }

  let statusCode = 200
  let headers = { 'content-type': 'application/json' }
  const res = {
    json(data) {
      handler.resolve({
        config: proxyConfig,
        status: statusCode,
        headers,
        response: JSON.stringify(data),
      })
    },
    jsonp() {},
    status(status) {
      statusCode = status
      return res
    },
    type(type) {
      headers['content-type'] = type
      return res
    },
  }

  return { req, res }

}

function handleRoute(routeConfig, proxyConfig, handler) {
  const { req, res } = genRouteHandler(proxyConfig, handler)

  const { status, delay, success, error } = routeConfig
  setTimeout(() => {
    if (status === 'error') {
      if (typeof error === 'function') {
        return error(req, res, Mock)
      }
      res.status(500).json(Mock.mock(error))
    } else {
      if (typeof success === 'function') {
        return success(req, res, Mock)
      }
      res.json(Mock.mock(success))
    }
  }, delay)

}

export const proxy = function(mockRoutes) {
  console.log('=== mock routes ===', mockRoutes)
  _proxy({
    //请求发起前进入
    onRequest: (config, handler) => {
      console.log('=== ajax hook config ===', config)
      const { url: requestUrl, method: requestMethod } = config

      const routePaths = Object.keys(mockRoutes)

      for (let i = 0; i < routePaths.length; i++) {
        const routePath = routePaths[i]
        if (new RegExp(routePath).test(requestUrl)) {
          const routeConfig = Object.assign(DEFAULT_ROUTE_CONFIG, mockRoutes[routePath])

          const { method, status, delay, success, error } = routeConfig

          if (method.toUpperCase() === requestMethod) {
            handleRoute(routeConfig, config, handler)
            return
          }
        }
      }

      handler.next(config)

    },
  })
}

export const unProxy = _unProxy
