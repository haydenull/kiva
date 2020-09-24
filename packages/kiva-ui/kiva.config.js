module.exports = {
  theme: {
    topNav: [
      { text: 'kiva-cli', link: '/kiva-cli/' },
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
}
