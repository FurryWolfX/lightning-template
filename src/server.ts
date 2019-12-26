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
    routerDir: path.resolve(__dirname, "./router"),
    serviceCenter: {
      // 微服务注册中心配置，不需要的话可以去掉
      centerUrl: "http://127.0.0.1:3000/register", // 注册中心注册服务的地址
      serviceName: "test-service", // 要注册的服务名称
      serviceUrl: "http://127.0.0.1:3001/" // 服务（本项目）的地址，末尾要加"/"
    }
  });

  Lightning.core.start(port, ipArray => {
    ipArray.forEach(ip => console.log(`[Worker:${process.pid}] Server started http://${ip}:${port}`));
  });
}

export default start;
