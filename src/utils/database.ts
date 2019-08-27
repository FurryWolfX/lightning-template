import * as path from "path";
import Builder from "../third-party/x-sql";
import logger from "./logger";
import { SelectOption } from "./types";
import { snakeCase } from "./caseHandle";
import { query } from "./database.mysql";

/**
 * 初始化 XML 编译器
 */
const builder: Builder = new Builder({
  dir: path.resolve(__dirname, "../../xml"),
  debug: false,
  debugCallback: log => {
    console.log(log);
  }
});

class Database {
  static async runXml(namespace: string, params: any): Promise<any[]> {
    const namespaceArray = namespace.split(".");
    const sqlString = builder.build(namespaceArray[0], namespaceArray[1], params);
    logger.info(`[SQL:${process.pid}] ${sqlString}`);
    return await query(sqlString);
  }
  static async select(table: string, cols: string[], whereObject: any = {}, selectOption: SelectOption = {}): Promise<any[]> {
    const sqlString = Builder.select(table, cols, snakeCase(whereObject), selectOption.op, selectOption.orderBy, selectOption.limit);
    logger.info(`[SQL:${process.pid}] ${sqlString}`);
    return await query(sqlString);
  }
  static async count(table: string, whereObject: any = {}, op: string = "AND"): Promise<number> {
    const sqlString = Builder.count(table, snakeCase(whereObject), op);
    logger.info(`[SQL:${process.pid}] ${sqlString}`);
    const result = await query(sqlString);
    if (result.length > 0) {
      return result[0].count;
    } else {
      return 0;
    }
  }
  static async insert(table: string, data: any): Promise<any[]> {
    const sqlString = Builder.insert(table, snakeCase(data));
    logger.info(`[SQL:${process.pid}] ${sqlString}`);
    return await query(sqlString);
  }
  static async update(table: string, data: any, whereObject: any = {}, op: string = "AND"): Promise<any[]> {
    const sqlString = Builder.update(table, snakeCase(data), snakeCase(whereObject), op);
    logger.info(`[SQL:${process.pid}] ${sqlString}`);
    return await query(sqlString);
  }
  static async delete(table: string, whereObject: any = {}, op: string = "AND"): Promise<any[]> {
    const sqlString = Builder.delete(table, snakeCase(whereObject), op);
    logger.info(`[SQL:${process.pid}] ${sqlString}`);
    return await query(sqlString);
  }
}

export default Database;
