/**
 * router/index.js 是默认会被加载的第一个路由，这里面可以处理权限拦截等操作
 */
const { all, get } = require("../utils/router");

all("*", (req, res, next) => {
  // 公共拦截，可以做权限校验等操作
  next();
});

get("/", (req, res) => res.send("Hello World!"));
