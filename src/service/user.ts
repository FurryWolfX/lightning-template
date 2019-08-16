import * as database from "../utils/database.mysql";

export async function findByName(name): Promise<any[]> {
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
