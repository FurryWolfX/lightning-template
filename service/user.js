const Lightning = require("@wolfx/lightning");

const database = Lightning.core.getState().database;

module.exports.findByAge = async age => {
  return await database.query("test.findByAge", {
    age: age
  });
};
