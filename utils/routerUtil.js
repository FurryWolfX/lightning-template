const Lightning = require("@wolfx/lightning");
const { projectName } = require("../const/config");

const { app } = Lightning.core.getState();

module.exports.get = function(url, fn) {
  app.get(projectName + url, fn);
};

module.exports.post = function(url, fn) {
  app.post(projectName + url, fn);
};

module.exports.all = function(url, fn) {
  app.all(projectName + url, fn);
};
