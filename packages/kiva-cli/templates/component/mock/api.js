// 接口地址 /mock/<%= kebabCaseName %>/api
// 支持 mockjs 语法 http://mockjs.com/
module.exports = {
  method: 'GET',
  status: 'success',
  delay: 1000,
  success(req, res, Mock) {
    const { category } = req.query
    res.json(Mock.mock({
      'list|10': [
        {
          category,
          title: '@cparagraph(1)',
          url: '@url("http")',
        }
      ]
    }))
  },
  error: {
    msg: 'mock server error'
  }
}