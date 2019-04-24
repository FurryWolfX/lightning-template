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
      console.log(`[SQL] ${key}`);
      console.log(`[SQL] ${sql}`);
      console.log(`[SQL] ${JSON.stringify(params)}`);
    }
  },
  cors: {
    allowedOrigins: ["*"]
  },
  requestLogCallback: (method, url) => {
    console.log(`[R] ${method} ${url}`);
  },
  responseLogCallback: (method, url, time) => {
    console.log(`[S] ${method} ${url} ${time}ms`);
  },
  storage: path.resolve(__dirname, "./public/upload"),
  yaml: path.resolve(__dirname, "./yaml"),
  routerDir: path.resolve(__dirname, "./router")
});
Lightning.core.start(3001);
