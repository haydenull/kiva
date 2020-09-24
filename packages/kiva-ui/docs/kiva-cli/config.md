---
title: kiva.config.js 配置
path: kiva-cli/config
group: kiva-cli
topNav: kiva-cli
---

# kiva.config.js 配置文件

## theme 文档站点主题配置

```js
{
  theme: {
    topNav: [
      { text: 'kiva-cli', link: '/kiva-cli/' },
      { text: 'Github', link: 'https://github.com/wozjs/kiva' },
    ],
  }
}
```

## demo 站点 html 文件指定
```js
{
  demoHtml: './public/index.html',
}
```

## deploy ftp 上传

```js
// 文档站点部署配置
deploy: {
  type: 'ftp',
  dir: './site',      // 默认值 ./site
  rootDir: '../../',  // git subtree 要求在项目根目录执行
  ftp: {
    host: '',
    port: 2121,
    user: '',
    password: '',      // 账号密码不要上传到公网
    remotePath: '/wap_front/chenhui12/kiva/kiva-ui',
  }
}
```
