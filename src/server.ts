import * as path from "path";
import Lightning from "@wolfx/lightning";
import logger from "./utils/logger";
import { createRouter } from "../pre-build/createRouter";

class Server {
  public static start(port: number): void {
    Lightning.setConfig({
      cors: true,
      requestLogCallback: (method: string, url: string) => {
        logger.info(`[request:${process.pid}] ${method} ${url}`);
      },
      responseLogCallback: (method: string, url: string, time: number) => {
        logger.info(`[response:${process.pid}] ${method} ${url} ${time}ms`);
      },
      compression: true, // gzip 支持
      storage: path.resolve(__dirname, "../public/upload")
    });
    Lightning.core.start(port, async ipArray => {
      await createRouter(path.resolve(__dirname, "./router"));
      import("./router/manifest");
      ipArray.forEach(ip => console.log(`[Worker:${process.pid}] Server started http://${ip}:${port}`));
    });
  }
}

export default Server;
