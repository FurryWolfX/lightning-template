const Lightning = require("@wolfx/lightning");
const { projectName } = require("../config");
const ResultJSON = require("../model/ResultJSON");
const logger = require("../utils/logger");

const { app } = Lightning.core.getState();

function handler(method, url, fn) {
  app[method](projectName + url, async (req, res, next) => {
    const json = new ResultJSON();
    try {
      await fn(req, res, next);
    } catch (e) {
      json.msg = "server internal error";
      json.success = false;
      json.errorMsg = e.stack;
      logger.error(e.stack);
      res.send(json);
    }
  });
}

module.exports.get = function(url, fn) {
  handler("get", url, fn);
};

module.exports.post = function(url, fn) {
  handler("post", url, fn);
};

module.exports.all = function(url, fn) {
  handler("all", url, fn);
};
