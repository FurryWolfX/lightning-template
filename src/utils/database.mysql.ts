/**
 * 数据库实现（MySQL）
 * https://www.npmjs.com/package/mysql
 * 可根据需要自己拓展
 */
import * as mysql from "mysql";
import { camelCase, snakeCase } from "./caseHandle";
import { dbConfigMysql } from "../config";

const pool: mysql.Pool = mysql.createPool(dbConfigMysql);

export const query = (sqlString: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    pool.query(sqlString, function(error, results, fields) {
      if (error) {
        reject(error);
      } else {
        resolve(camelCase(results));
      }
    });
  });
};
