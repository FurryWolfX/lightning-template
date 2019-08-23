import * as cluster from "cluster";
import "source-map-support/register";
import logger from "./utils/logger";

const processNumber = 1;

if (cluster.isMaster) {
  for (let i = 0; i < processNumber; i++) {
    cluster.fork();
  }
  cluster.on("death", worker => {
    logger.error(`[Worker:${worker.pid}] died`);
    cluster.fork();
  });
  logger.info(`[Master Process:${process.pid}] started`);
} else {
  require("./server").default(3001);
  logger.info(`[Worker Process:${process.pid}] started`);
  // 每分钟输出一次内存
  // setInterval(() => {
  //   const mString = Math.floor(process.memoryUsage().rss / 1024 / 1024) + "MB";
  //   logger.info(`[Worker:${process.pid} -> memory use] ${mString}`);
  // }, 1000 * 60);
}

// error handler
process.on("unhandledRejection", (error: Error) => {
  logger.error(error.stack);
});
