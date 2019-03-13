## Lightning 脚手架

### 介绍

脚手架代码，下载即可使用。

打算经过一些项目洗礼之后再逐步将高级功能整合到 lightning/core 中。

本项目还有些不完善的地方，暂为公司内部使用。

### 项目结构

Lightning 使用约定大于配置的理念。约定的结构如下：

```
- root
--- model 存放模型文件（可选）
--- public 默认静态资源根目录
--- router 路径定义放这里面，server启动时Lightning会扫描目录下的文件并读取路由
--- service 业务逻辑在这里写
--- yaml sql在这里写
--- utils 工具函数
--- views 视图模板（可选，建议前后端分离，必要时需自己引入模板引擎，如 EJS）
```

### 代码生成

`lightning-generator` 的雏形已经写了，可以生成 CURD 以及 router 的代码，配合 `lightning-template` 使用。

[传送门](https://github.com/FurryWolfX/lightning-generator)

### 使用说明

[传送门](https://www.npmjs.com/package/@wolfx/lightning)
