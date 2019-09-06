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

### 启动框架

首先切换到项目根目录。

开发模式：

1. 执行 `npm run build` 开始编译。
2. 执行 `npm run dev` 开始运行（支持热部署）。

生产模式：

1. 执行 `npm run start` 使用 PM2 托管。
2. 执行 `npm run stop` 停止并移除 PM2 托管。

### 完善的日志记录系统和异常处理

所有日志将记录在 `log` 文件夹中。

lightning-template 会记录请求和响应的日志，并且会记录每次响应所消耗的时间，以便于排查性能问题。

lightning-template 会记录所有的 SQL 执行记录，便于排查业务逻辑错误。

lightning-template 会记录请求逻辑中的所有错误信息，便于排查问题。

lightning-template 还会定时记录内存消耗情况，帮助排查可能的内存泄露问题。

### 对多进程聚合做了处理

由于 nodejs 是天生异步的语言，web 应用以 I/O 操作为主，大多数情况下单进程就可以满足需求。

但是有时候运算量会超过单 CPU 核心的运算能力，这时候就需要多进程来满足性能需求。

lightning-template 对聚合模式做了适配（不依赖 PM2），并且在 log 中可以看到处理请求的进程号，非常贴心。

### 代码生成

**由于 template 更新，暂未适配新版**

`lightning-generator` 的雏形已经写了，可以生成 CURD 以及 router 的代码，配合 `lightning-template` 使用。

[传送门](https://github.com/FurryWolfX/lightning-generator)

### 项目结构

Lightning 使用约定大于配置的理念。约定的结构如下：

```
- root
----| public 默认静态资源根目录
----| xml SQL在这里写
----| views 视图模板（可选，建议前后端分离，必要时需自己引入模板引擎，如 EJS）
----| log 自动生成的log文件，lightning-template已经做了强大的日志处理，方便排查
----| src
-------| config 一些配制
-------| model 存放模型文件（可选）
-------| router 路径定义放这里面，server启动时Lightning会扫描目录下的文件并读取路由
-------| service 业务逻辑在这里写
-------| utils 工具函数
-------| third-party 第三方模块和一些实验性特性
```

### x-sql 规范

#### 简单查询

简单查询使用 `select` `insert` `update` `delete`，无需写 SQL。

接口参考：

```typescript
interface DatabaseMysql {
  static runXml(namespace: string, params: any): Promise<any[]>;
  static select(table: string, cols: string[], whereObject: any, op: string = "and"): Promise<any[]>;
  static insert(table: string, data: any): Promise<any[]>;
  static update(table: string, data: any, whereObject: any, op: string = "and"): Promise<any[]>;
  static delete(table: string, whereObject: any, op: string = "and"): Promise<any[]>;
}
```

代码使用：

```typescript
DatabaseMysql.select("user", ["name", "age"], { id: 1, name: "wolfx" });
DatabaseMysql.insert("user", { id: 1, name: "wolfx" });
DatabaseMysql.update("user", { id: 1, name: "wolfx" }, { id: 2, name: "wolfx2" });
DatabaseMysql.delete("user", { id: 2, name: "wolfx2" });
```

#### 复杂查询

复杂查询使用 `runXml`。

```xml
<root namespace="test">
  <query name="getUser">
    select * from user where 1=1
    <if condition="typeof @name === 'string'">
      and user_name = @name
    </if>
  </query>
</root>
```

`<root namespace="test">` 创建名称为 `test` 的命名空间。

`<query name="getUser">` 创建名称为 `getUser` 的查询。

`<if condition="typeof @name === 'string'">` 条件为 `true` 则获取子元素，`condition` 是一个 `JavaScript` 表达式。

在代码中使用：

```typescript
import DatabaseMysql from "../utils/database.mysql";
export async function findByName(name): Promise<any[]> {
  return await DatabaseMysql.runXml("test.getUser", {
    name: name
  });
}
```

### lightning-core

[传送门](https://www.npmjs.com/package/@wolfx/lightning)

### API 文档生成

集成 [apidoc](http://apidocjs.com)
