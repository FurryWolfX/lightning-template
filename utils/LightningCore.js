/**
 * 用于实现一些公共继承
 */
const path = require("path");
const NL = require("@wolfx/nodebatis-lite");

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
    // 这里可以接入log4js等
    // 使用debugCallback后debug不会输出log，需要在回调中自己处理
    console.log(`[SQL] ${key}`);
    console.log(`[SQL] ${sql}`);
    console.log(`[SQL] ${JSON.stringify(params)}`);
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
