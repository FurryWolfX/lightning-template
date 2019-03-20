// https://www.npmjs.com/package/@wolfx/nodebatis-lite
const Lightning = require("@wolfx/lightning");

const database = Lightning.core.getState().database;

module.exports.findByAge = async age => {
  return await database.query("test.findByAge", {
    age: age
  });
};

module.exports.queryByParams = async params => {
  if (params.pageSize) {
    params.limitStart = (params.pageIndex - 1) * params.pageSize;
    params.limitSize = +params.pageSize;
  }
  const list = await database.query("test.queryByParams", params);
  if (params.pageSize) {
    const count = await database.query("test.countByParams", params);
    return {
      list,
      count: count[0].count,
      pageIndex: params.pageIndex,
      pageSize: params.pageSize
    };
  } else {
    return list;
  }
};

module.exports.findById = async id => {
  const result = await database.find("test", ["*"], id);
  if (result.length > 0) {
    return result[0];
  } else {
    return {};
  }
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
