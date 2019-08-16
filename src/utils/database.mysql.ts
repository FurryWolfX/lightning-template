/**
 * 数据库实现（MySQL）
 * https://www.npmjs.com/package/mysql
 * 可根据需要自己拓展
 */
import * as path from "path";
import Builder from "@wolfx/x-sql";
import * as mysql from "mysql";
import { databaseConfig } from "../config";
import logger from "./logger";

const builder = new Builder({
  dir: path.resolve(__dirname, "../../xml"),
  debug: true,
  debugCallback: log => {
    // console.log(log);
  }
});

const build = (namespace, params) => {
  const namespaceArray = namespace.split(".");
  const sqlString = builder.build(namespaceArray[0], namespaceArray[1], params);
  logger.info(`[SQL:${process.pid}] ${sqlString}`);
  return sqlString;
};

const pool = mysql.createPool({
  connectionLimit: 10,
  host: databaseConfig.host,
  user: databaseConfig.user,
  password: databaseConfig.password,
  database: databaseConfig.database,
  port: databaseConfig.port
});

export const query = (namespace, params): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const sqlString = build(namespace, params);
    pool.query(sqlString, function(error, results, fields) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};
