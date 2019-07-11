const Lightning = require("@wolfx/lightning");
const { projectName } = require("../const/config");
const ResultJSON = require("../model/ResultJSON");
const logger = require("../utils/logger");

const { app } = Lightning.core.getState();

module.exports.get = function(url, fn) {
  app.get(projectName + url, async (req, res, next) => {
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
};

module.exports.post = function(url, fn) {
  app.post(projectName + url, async (req, res, next) => {
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
};

module.exports.all = function(url, fn) {
  app.all(projectName + url, async (req, res, next) => {
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
};
