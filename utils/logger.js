// 日志模块
// https://log4js-node.github.io/log4js-node/index.html
const log4js = require("log4js");
log4js.configure({
  appenders: {
    file: {
      type: "dateFile",
      filename: "./log/lightning",
      alwaysIncludePattern: true,
      pattern: "yyyy-MM-dd.log"
    },
    console: { type: "console" }
  },
  categories: { default: { appenders: ["file", "console"], level: "info" } }
});

const logger = log4js.getLogger("Lightning");
// logger.trace("Entering cheese testing");
// logger.debug("Got cheese.");
// logger.info("Cheese is Comté.");
// logger.warn("Cheese is quite smelly.");
// logger.error("Cheese is too ripe!");
// logger.fatal("Cheese was breeding ground for listeria.");

module.exports = logger;
