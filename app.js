const Lightning = require("@wolfx/lightning");
const path = require("path");

Lightning.core.setConfig({
  database: {
    debug: true,
    dialect: "mysql",
    host: "192.168.1.22",
    port: 3306,
    database: "test",
    user: "root",
    password: "junlian",
    camelCase: true,
    pool: {
      minSize: 5,
      maxSize: 20,
      connectionLimit: 5
    },
    debugCallback: (key, sql, params) => {
      // 这里可以接入log4js等
      // 使用debugCallback后debug不会输出log，需要在回调中自己处理
    }
  },
  cors: {
    allowedOrigins: ["*"]
  },
  responseLogCallback: (method, url, time) => {
    // 用于监控请求响应时间
    console.log(`${method} ${url} ${time}ms`);
  },
  storage: path.resolve(__dirname, "./public/upload"),
  yaml: path.resolve(__dirname, "./yaml"),
  routerDir: path.resolve(__dirname, "./router")
});
Lightning.core.start(3001);
