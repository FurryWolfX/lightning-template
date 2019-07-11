const Lightning = require("@wolfx/lightning");
const path = require("path");
const logger = require("./utils/logger");

Lightning.setConfig({
  websocket: false,
  cors: {
    allowedOrigins: ["*"]
  },
  requestLogCallback: (method, url) => {
    logger.info(`[request] ${method} ${url}`);
  },
  responseLogCallback: (method, url, time) => {
    logger.info(`[response] ${method} ${url} ${time}ms`);
  },
  storage: path.resolve(__dirname, "./public/upload"),
  routerDir: path.resolve(__dirname, "./router")
});
Lightning.core.start(3001);

// error handler
process.on("unhandledRejection", error => {
  logger.error(error.stack);
});
