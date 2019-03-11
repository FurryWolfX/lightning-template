## Lightning 脚手架

### 介绍

lightning 的示例代码，下载安装即可使用。

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

### 使用说明

[传送门](https://www.npmjs.com/package/@wolfx/lightning)
