/**
 * 数据库实现（MSSQL）
 * https://www.npmjs.com/package/mssql
 * 可根据需要自己拓展
 */
import * as mssql from "mssql";
import { camelCase } from "../caseHandle";
import { dbConfigMssql } from "../../config";

const pool: Promise<mssql.ConnectionPool> = new mssql.ConnectionPool(dbConfigMssql).connect();

export const query = async (sqlString: string): Promise<any[]> => {
  const _pool: mssql.ConnectionPool = await pool;
  const request: mssql.Request = _pool.request();
  const result: mssql.IResult<any> = await request.query(sqlString);
  return camelCase(result.recordset) || result.rowsAffected;
};
