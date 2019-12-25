import * as path from "path";
import Lightning from "@wolfx/lightning";
import logger from "./utils/logger";

function start(port: number) {
  Lightning.setConfig({
    cors: true,
    requestLogCallback: (method: string, url: string) => {
      logger.info(`[request:${process.pid}] ${method} ${url}`);
    },
    responseLogCallback: (method: string, url: string, time: number) => {
      logger.info(`[response:${process.pid}] ${method} ${url} ${time}ms`);
    },
    storage: path.resolve(__dirname, "../public/upload"),
    routerDir: path.resolve(__dirname, "./router")
  });

  Lightning.core.start(port, ipArray => {
    ipArray.forEach(ip => console.log(`[Worker:${process.pid}] Server started http://${ip}:${port}`));
  });
}

export default start;
