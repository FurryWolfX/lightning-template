// https://www.npmjs.com/package/@wolfx/nodebatis-lite
const LightningCore = require("../utils/LightningCore");

class User extends LightningCore {
  async findByAge(age) {
    return await this.database.query("test.findByAge", {
      age: age
    });
  }
  async queryByParams(params) {
    if (params.pageSize) {
      params.limitStart = (params.pageIndex - 1) * params.pageSize;
      params.limitSize = +params.pageSize;
    }
    const list = await this.database.query("test.queryByParams", params);
    if (params.pageSize) {
      const count = await this.database.query("test.countByParams", params);
      return {
        list,
        count: count[0].count,
        pageIndex: params.pageIndex,
        pageSize: params.pageSize
      };
    } else {
      return list;
    }
  }
  async findById(id) {
    const result = await this.database.find("test", ["*"], id);
    if (result.length > 0) {
      return result[0];
    } else {
      return {};
    }
  }
  async updateById(data) {
    return await this.database.update("test", data, id);
  }
  async insert(data) {
    return await this.database.update("test", data, id);
  }
  async delete(id) {
    return await this.database.del("test", id);
  }
}

module.exports = new User();
