const Lightning = require("@wolfx/lightning");
const path = require("path");
const cluster = require("cluster");
const logger = require("./utils/logger");

Lightning.setConfig({
  websocket: false,
  cors: {
    allowedOrigins: ["*"]
  },
  requestLogCallback: (method, url) => {
    logger.info(`[request:${process.pid}] ${method} ${url}`);
  },
  responseLogCallback: (method, url, time) => {
    logger.info(`[response:${process.pid}] ${method} ${url} ${time}ms`);
  },
  storage: path.resolve(__dirname, "./public/upload"),
  routerDir: path.resolve(__dirname, "./router")
});
Lightning.core.start(3001);

// error handler
process.on("unhandledRejection", error => {
  logger.error(error.stack);
});

// 每分钟输出一次内存
setInterval(() => {
  const processType = cluster.isMaster ? "master" : "worker";
  const mString = Math.floor(process.memoryUsage().rss / 1024 / 1024) + "MB";
  logger.info(`[${processType}:${process.pid} -> memory use] ${mString}`);
}, 1000 * 60);
