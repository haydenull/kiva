module.exports = {
  // 文档站点部署配置
  deploy: {
    type: 'ftp',
    dir: './site',      // 默认值 ./site
    ftp: {
      host: '',
      port: 2121,
      user: '',
      password: '',      // 账号密码不要上传到公网
      remotePath: '/wap_front/chenhui12/kiva/xxxxx',
    }
  }
}