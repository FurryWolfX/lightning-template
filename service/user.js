const database = require("../utils/database.mysql");

async function findByName(name) {
  return await database.query("test.find", {
    flag: 1,
    name: name,
    idList: [
      {
        id: 1
      },
      {
        id: 3
      },
      {
        id: 5
      }
    ]
  });
}

module.exports.findByName = findByName;
