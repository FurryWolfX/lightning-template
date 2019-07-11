/**
 * 用于实现一些公共继承
 */
const path = require("path");
const NL = require("@wolfx/nodebatis-lite");
const logger = require("../utils/logger");

const databaseConfig = {
  debug: true,
  dialect: "mysql",
  host: "192.168.1.22",
  port: 3306,
  database: "test",
  user: "root",
  password: "junlian",
  camelCase: true,
  pool: {
    minSize: 5,
    maxSize: 20,
    connectionLimit: 5
  },
  debugCallback: (key, sql, params) => {
    logger.info(`[SQL] ${key}`);
    logger.info(`[SQL] ${sql}`);
    logger.info(`[SQL] ${JSON.stringify(params)}`);
  }
};
const db = new NL(path.resolve(__dirname, "../yaml"), databaseConfig);

class LightningCore {
  constructor() {
    // https://www.npmjs.com/package/@wolfx/nodebatis-lite
    this.database = db;
  }
}

module.exports = LightningCore;
