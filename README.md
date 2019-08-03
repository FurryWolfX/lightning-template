## Lightning 脚手架

### 介绍

这是 Lightning 的脚手架代码，下载即可使用。约定了开发规范，可配合代码生成器进行快速开发。

打算经过一些项目洗礼之后再逐步将高级功能整合到 lightning/core 中。

本项目还有些不完善的地方，暂为公司内部使用。

### 关于 Lightning

框架是在 Express 的基础上进行的拓展，目标是易于代码生成和 API 快速开发，减少开发成本。

需要配合 lightning-template 和 lightning-generator 一起使用效果最佳。

关于 lightning-template 和 lightning-generator 可以在 Github 获取。

目前作为公司内部使用，使用 MIT 开源协议。

### 完善的日志记录系统和异常处理

所有日志将记录在 `log` 文件夹中。

lightning-template 会记录请求和响应的日志，并且会记录每次响应所消耗的时间，以便于排查性能问题。

lightning-template 会记录所有的 SQL 执行记录，便于排查业务逻辑错误。

lightning-template 会记录请求逻辑中的所有错误信息，便于排查问题。

lightning-template 还会定时记录内存消耗情况，帮助排查可能的内存泄露问题。

### 对多进程聚合做了处理

由于 nodejs 是天生异步的语言，web 应用以 I/O 操作为主，大多数情况下单进程就可以满足需求。

但是有时候运算量会超过单 CPU 核心的运算能力，这时候就需要多进程来满足性能需求。

lightning-template 对 pm2 的聚合模式做了适配，并且在 log 中可以看到处理请求的进程号，非常贴心。

### 代码生成

`lightning-generator` 的雏形已经写了，可以生成 CURD 以及 router 的代码，配合 `lightning-template` 使用。

[传送门](https://github.com/FurryWolfX/lightning-generator)

### 项目结构

Lightning 使用约定大于配置的理念。约定的结构如下：

```
- root
--- model 存放模型文件（可选）
--- public 默认静态资源根目录
--- router 路径定义放这里面，server启动时Lightning会扫描目录下的文件并读取路由
--- service 业务逻辑在这里写
--- yaml sql在这里写
--- utils 工具函数和第三方模块
--- views 视图模板（可选，建议前后端分离，必要时需自己引入模板引擎，如 EJS）
--- log 自动生成的log文件，lightning-template已经做了强大的日志处理，方便排查
```

### 使用说明

[传送门](https://www.npmjs.com/package/@wolfx/lightning)

### API 文档生成

集成 [apidoc](http://apidocjs.com)
