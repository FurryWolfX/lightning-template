import * as cluster from "cluster";
import { cpus } from "os";
import { spawn } from "child_process";
import logger from "./utils/logger";
import "./router/manifest";
import server from "./server";
import { createRouter } from "../pre-build/createRouter";
import * as path from "path";

// 多进程配置
const processNumber = 1 || cpus().length;
if (cluster.isMaster) {
  // apidoc
  const npm = process.platform === "win32" ? "npm.cmd" : "npm";
  spawn(npm, ["run", "doc"], {
    stdio: "inherit"
  });

  for (let i = 0; i < processNumber; i++) {
    cluster.fork();
  }
  cluster.on("death", worker => {
    logger.error(`[Worker:${worker.pid}] died`);
    cluster.fork();
  });
  logger.info(`[Master Process:${process.pid}] started`);
} else {
  createRouter(path.resolve(__dirname, "./router")).then(() => {
    server.start();
  });

  logger.info(`[Worker Process:${process.pid}] started`);
  // 每分钟输出一次内存
  // setInterval(() => {
  //   const mString = Math.floor(process.memoryUsage().rss / 1024 / 1024) + "MB";
  //   logger.info(`[Worker:${process.pid} -> memory use] ${mString}`);
  // }, 1000 * 60);
}

// error handler
process.on("uncaughtException", error => {
  console.error(error.stack);
});
