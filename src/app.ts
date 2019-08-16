import * as path from "path";
import * as cluster from "cluster";
import * as Lightning from "@wolfx/lightning";
import "source-map-support/register";
import logger from "./utils/logger";

Lightning.setConfig({
  cors: {
    allowedOrigins: ["*"]
  },
  requestLogCallback: (method: string, url: string) => {
    logger.info(`[request:${process.pid}] ${method} ${url}`);
  },
  responseLogCallback: (method: string, url: string, time: string) => {
    logger.info(`[response:${process.pid}] ${method} ${url} ${time}ms`);
  },
  storage: path.resolve(__dirname, "../public/upload"),
  routerDir: path.resolve(__dirname, "./router")
});
Lightning.core.start(3001);

// error handler
process.on("unhandledRejection", (error: Error) => {
  logger.error(error.stack);
});

// 每分钟输出一次内存
setInterval(() => {
  const processType = cluster.isMaster ? "master" : "worker";
  const mString = Math.floor(process.memoryUsage().rss / 1024 / 1024) + "MB";
  logger.info(`[${processType}:${process.pid} -> memory use] ${mString}`);
}, 1000 * 60);
