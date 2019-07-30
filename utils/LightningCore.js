/**
 * 用于实现一些公共继承
 */
const path = require("path");
const NL = require("@wolfx/nodebatis-lite");
const { databaseConfig } = require("../config");

const db = new NL(path.resolve(__dirname, "../yaml"), databaseConfig);

class LightningCore {
  constructor() {
    // https://www.npmjs.com/package/@wolfx/nodebatis-lite
    this.database = db;
  }
}

module.exports = LightningCore;
