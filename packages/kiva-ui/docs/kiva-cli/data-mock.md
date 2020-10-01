---
title: 数据 Mock
path: kiva-cli/data-mock
group: kiva-cli
topNav: kiva-cli
sortIndex: 3
---

# 数据 Mock

> 0 配置，基于前端拦截，支持发布到静态站点的数据 mock 服务。

Kiva 会自动扫描组件 mock 文件夹下的 js 文件，以 button 组件为例，如下目录结构：

```text
your-path/hello-kiva/src/components
├── button
│   ├── src
│   ├── demo
│   ├── mock
│   │   ├── list.js          // mock 接口
│   │   └── detail.js        // mock 接口
```

Kiva 将会产生两条拦截规则， `/mock/button/list` 与 `/mock/button/detail`。

Kiva 集成了 [mockjs](http://mockjs.com/) 方便开发者生成更真实的数据。

一个完整的 mock js 文件由如下选项：

```js
export default {
  method: 'GET',          // 可选 GET POST, 默认 GET
  status: 'success',      // 设置响应状态
  delay: 3000,            // 设置多少毫秒后响应
  success: {              // 设置成功的返回值
    list: [
      title: 'xxx',
      img: 'xxx',
      url: 'xxx',
    ]
  },
  error: {                // 设置失败的返回值
    msg: 'something error',
  },
}
```