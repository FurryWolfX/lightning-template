import { createConnection } from "typeorm";

export async function initDatabase() {
  return await createConnection({
    type: "mariadb",
    host: "192.168.1.22",
    port: 3306,
    username: "root",
    password: "root",
    database: "typeorm",
    entityPrefix: "obd_",
    entities: [__dirname + "/entity/**/*.ts"],
    synchronize: true
  });
}
