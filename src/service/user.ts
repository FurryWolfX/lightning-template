import Database from "../../packages/database-utils";

export async function findByName(name: string): Promise<any[]> {
  return await Database.runXml("test.getUser", {
    name: name
  });
}
