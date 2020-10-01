---
title: kiva.config.js 配置
path: kiva-cli/config
group: kiva-cli
topNav: kiva-cli
---

# kiva.config.js 配置文件

## theme 文档站点主题配置

`topNav` 设置顶部导航栏：
- `text`: nav 文案
- `link`: 路由或者 http 链接
- `group`: sidebar 分组排序

```js
{
  theme: {
    topNav: [
      { text: 'default', link: '/', group: [ '开发指南', '基础组件' ] },
      { text: 'kiva-cli', link: '/kiva-cli/' },
      { text: 'Github', link: 'https://github.com/wozjs/kiva' },
    ],
  }
}
```

## demo 站点 html 文件指定

自定义 demo 站点 html 文件

```js
{
  demoHtml: './public/index.html',
}
```

## 静态站点 ftp 上传

文档静态站点 ftp 上传

```js
// 文档站点部署配置
deploy: {
  type: 'ftp',
  dir: './site',      // 文档站点所在文件夹
  ftp: {
    host: '',
    port: 2121,
    user: '',
    password: '',      // 账号密码不要上传到公网
    remotePath: '/wap_front/chenhui12/kiva/kiva-ui',
  }
}
```
