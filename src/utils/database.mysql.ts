/**
 * 数据库实现（MySQL）
 * https://www.npmjs.com/package/mysql
 * 可根据需要自己拓展
 */
import * as path from "path";
import Builder from "../third-party/x-sql";
import * as mysql from "mysql";
import logger from "./logger";
import { camelCase, snakeCase } from "./caseHandle";

/**
 * 初始化 XML 编译器
 */
const builder = new Builder({
  dir: path.resolve(__dirname, "../../xml"),
  debug: true,
  debugCallback: log => {
    console.log(log);
  }
});

/**
 * 初始化连接池
 */
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "haosql",
  database: "test",
  port: 3306
});

const query = (sqlString: string): Promise<any[]> => {
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

class DatabaseMysql {
  static async runXml(namespace: string, params: any): Promise<any[]> {
    const namespaceArray = namespace.split(".");
    const sqlString = builder.build(namespaceArray[0], namespaceArray[1], params);
    logger.info(`[SQL:${process.pid}] ${sqlString}`);
    return await query(sqlString);
  }
  static async select(table: string, cols: string[], whereObject: any = {}, op: string = "AND", orderBy?: string): Promise<any[]> {
    const sqlString = Builder.select(table, cols, snakeCase(whereObject), op, orderBy);
    logger.info(`[SQL:${process.pid}] ${sqlString}`);
    return await query(sqlString);
  }
  static async count(table: string, whereObject: any = {}, op: string = "AND"): Promise<number> {
    const sqlString = Builder.count(table, whereObject, op);
    logger.info(`[SQL:${process.pid}] ${sqlString}`);
    const result = await query(sqlString);
    if (result.length > 0) {
      return result[0].count;
    } else {
      return 0;
    }
  }
  static async insert(table: string, data: any): Promise<any[]> {
    const sqlString = Builder.insert(table, data);
    logger.info(`[SQL:${process.pid}] ${sqlString}`);
    return await query(sqlString);
  }
  static async update(table: string, data: any, whereObject: any = {}, op: string = "AND"): Promise<any[]> {
    const sqlString = Builder.update(table, data, snakeCase(whereObject), op);
    logger.info(`[SQL:${process.pid}] ${sqlString}`);
    return await query(sqlString);
  }
  static async delete(table: string, whereObject: any = {}, op: string = "AND"): Promise<any[]> {
    const sqlString = Builder.delete(table, snakeCase(whereObject), op);
    logger.info(`[SQL:${process.pid}] ${sqlString}`);
    return await query(sqlString);
  }
}

export default DatabaseMysql;
