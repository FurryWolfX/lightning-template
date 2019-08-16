/**
 * router/index.js 是默认会被加载的第一个路由，这里面可以处理权限拦截等操作
 */
import { all, get } from "../utils/router";
import * as database from "../utils/database.mysql";

all("*", (req, res, next) => {
  // 公共拦截，可以做权限校验等操作
  next();
});

get("/", (req, res) => res.send("Hello World!"));

/**
 * 通用接口，用于映射 XML 中的查询
 */
get("/query/:namespace/:queryName", async (req, res) => {
  const { namespace, queryName } = req.params;
  const key = `${namespace}.${queryName}`;
  const result = await database.query(key, req.query);
  res.send(result);
});
