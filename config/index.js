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

module.exports = {
  projectName: "",
  databaseConfig
};
