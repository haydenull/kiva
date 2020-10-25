---
title: 快速开始
path: quickstart
group: 开发指南
---

# 快速上手

### 安装

```bash
# 通过 npm 安装
$ npm i @wozjs/kiva-ui -S

# 通过 yarn 安装
$ yarn add @wozjs/kiva-ui
```

### 引入

#### 全量引入
```js
import Kiva from '@wozjs/kiva-ui'
import '@wozjs/kiva-ui/dist/kiva-ui.css'

Vue.use(Kiva)
```

#### 按需引入
```js
import KivaDialog from '@wozjs/kiva-ui/lib/dialog'
import '@wozjs/kiva-ui/lib/dialog/style'

Vue.use(KivaDialog)
```
