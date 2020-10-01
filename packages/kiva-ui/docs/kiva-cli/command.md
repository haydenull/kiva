---
title: cli 命令
path: kiva-cli/command
group: kiva-cli
topNav: kiva-cli
---


# cli 命令

### 1. 创建新项目

```bash
$ kiva create project-name
```

### 2. 创建新组件

```bash
$ kiva new component-name
```

### 3. 启动开发服务器

```bash
$ kiva serve
```

### 4. 打包

```bash
$ kiva build:component  # 按需加载打包
$ kiva build:all        # 全量打包
$ kiva build:site       # 生成静态文档站点
```

### 5. ftp 上传

```bash
$ kiva deploy
```