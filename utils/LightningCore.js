/**
 * 用于实现一些公共继承
 */
const Lightning = require("@wolfx/lightning");

class LightningCore {
  constructor() {
    // https://www.npmjs.com/package/@wolfx/nodebatis-lite
    this.database = Lightning.core.getState().database;
  }
}

module.exports = LightningCore;
