// https://www.npmjs.com/package/@wolfx/nodebatis-lite
const Lightning = require("@wolfx/lightning");

const database = Lightning.core.getState().database;

module.exports.findByAge = async age => {
  return await database.query("test.findByAge", {
    age: age
  });
};

module.exports.findById = async id => {
  return await database.find("test", ["*"], id);
};

module.exports.updateById = async data => {
  return await database.update("test", data, id);
};

module.exports.insert = async data => {
  return await database.insert("test", data);
};

module.exports.delete = async id => {
  return await database.delete("test", id);
};
