---
title: 文档生成
path: kiva-cli/markdown
group: kiva-cli
topNav: kiva-cli
sortIndex: 4
---

# 文档生成

支持标准 markdown 语法。

kiva 扫描每个组件下的 `README.md` 文件，作为该组件的文档。

扫描时将会解析其 `front matter` （由 `---` 包裹部分）, 支持参数如下：


|属性名|说明|默认值|是否必填|
|--|--|--|--|
|title|文档在 sidebar 的标题|-|Y|
|path|router 路径|组件名|N|
|group|文档所属分组|-|Y|
|topNav|文档所属次级路由 nav|`default`|N|
|sortIndex|文档排序依据(从小到大排序)|`Inifity`|N|


```yaml
---
title: Image 图片
path: image
group: 基础组件
topNav: default
sortIndex: 1
---
```

