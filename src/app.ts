import * as cluster from "cluster";
import { spawn } from "child_process";
import logger from "./utils/logger";
import Server from "./server";

// apidoc
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
spawn(npm, ["run", "doc"], {
  stdio: "inherit"
});

// 多进程配置
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
  Server.start(3001);
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
