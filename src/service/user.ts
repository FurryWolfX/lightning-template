import DatabaseMysql from "../utils/database.mysql";

export async function findByName(name): Promise<any[]> {
  return await DatabaseMysql.runXml("test.getUser", {
    name: name
  });
}
