module.exports = {
  packageName: '@wozjs/kiva-ui',
  // 文档站点主题配置
  theme: {
    topNav: [
      { text: 'default', link: '/', group: [ '开发指南', '基础组件', '展示组件', '导航组件', '反馈组件' ] },
      { text: 'kiva-cli', link: '/kiva-cli/', group: [] },
      { text: 'Github', link: 'https://github.com/wozjs/kiva' },
    ],
  },
  // 文档站点部署配置
  deploy: {
    type: 'gh-pages',   // 可选 ftp  gh-pages
    dir: './site',      // 默认值 ./site
    rootDir: '../../',  // git subtree 要求在项目根目录执行
    ftp: {
      host: '',
      port: 2121,
      user: '',
      password: '',      // 账号密码不要上传到公网
      remotePath: '/wap_front/chenhui12/kiva/kiva-ui',
    }
  },
  // demoHtml: './public/index.html',
  webpackBundleAnalyzer: true,
}
