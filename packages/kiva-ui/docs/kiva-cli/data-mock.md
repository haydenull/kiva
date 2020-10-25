---
title: 数据 Mock
path: kiva-cli/data-mock
group: kiva-cli
topNav: kiva-cli
sortIndex: 3
---

# 数据 Mock

> 0 配置，基于前端拦截，支持发布到静态站点的数据 mock 服务。


### 简单使用

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

一个完整的 mock js 文件有如下选项：

|属性|说明|类型|默认值|
|--|--|--|--|
|method|请求方法|`GET` `POST`|`GET`|
|status|响应状态|`success` `error`|`success`|
|delay|响应延时|`number`|`0`|
|success|成功返回值|`object` `function`||
|error|失败返回值|`object` `function`||


示例：
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

### 深度定制

Kiva 集成了 [mockjs](http://mockjs.com/) 方便开发者生成更真实的数据。


`success` `error` 支持深度自定义，当为 `function` 类型时，接收 3 个参数：
- `req`
- `res`
- `Mock`

#### `req` 请求对象：
- `req.body` 请求体
- `req.method` 请求方法
- `req.originalUrl` 原始 url
- `req.path` // example.com/users?sort=desc  => '/users'
- `req.protocol` 协议
- `req.query` // example.com/users?a=1&b=2   =>  { a: 1, b: 2 }

#### `res` 响应对象：
- `res.json` 返回 json 格式数据
- `res.status` 设置响应状态码
- `res.type` 设置响应 content-type

#### `MOCK` 对象：
[Mock](http://mockjs.com/examples.html)




```js
export default {
  delay: 3000,
  success(req, res, Mock) {
    const { category } = req.query
    res.json(Mock.mock({
      // 属性 list 的值是一个数组，含有 10 个元素
      'list|10': [
        {
          category,
          title: '@cparagraph(1)', // 随机生成一段中文文本
          url: '@url("http")',     // 随机生成一个 URL
        }
      ]
    }))
  },
}
```

