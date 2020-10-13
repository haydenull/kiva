const path = require('path')

module.exports = {
  // 包名
  packageName: '',
  // 文档站点部署配置
  deploy: {
    type: 'gh-pages',   // 可选 ftp  gh-pages
    dir: './site',      // 默认值 ./site
    rootDir: './',  // git subtree 要求在项目根目录执行
    ftp: {
      host: '',
      port: 2121,
      user: '',
      password: '',      // 账号密码不要上传到公网
      remotePath: '/wap_front/chenhui12/kiva',
    }
  },
  // 设置 demo 页面的 html 模板文件
  demoHtml: path.resolve(__dirname, '../site/debug/index.html'),
  // 是否启用 webpack bundle 分析
  webpackBundleAnalyzer: false,
  // 使用 webpack-chain 修改内部 wenpack 配置
  chainWebpack: (config) => {},
  // webpack 配置
  configureWebpack: {},
}
