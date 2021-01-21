import { resolve } from "path";
import { createConnection, getConnection } from "typeorm";
import { EntityTarget } from "typeorm/common/EntityTarget";

let isConnected = false;

export async function initDatabase() {
  console.log("init typeorm...");
  await createConnection({
    type: "mariadb",
    host: "192.168.1.110",
    port: 3306,
    username: "root",
    password: "xxx",
    database: "car_obd",
    entityPrefix: "obd_",
    entities: [resolve(process.cwd(), "src/entity/**/*.ts")],
    // logging: true,
    synchronize: true
  });
  handleConnected();
  console.log(resolve(process.cwd(), "src/entity/**/*.ts"));
  console.log("init typeorm end");
}

export async function getRepository<T>(Entity: EntityTarget<T>) {
  if (isConnected) {
    return getConnection().getRepository(Entity);
  } else {
    await initDatabase();
    return getConnection().getRepository(Entity);
  }
}

function handleConnected() {
  isConnected = true;
}
