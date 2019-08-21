import * as SqlString from "sqlstring";

class SimpleBuilder {
  /**
   * @param table 表名
   * @param cols 列名
   * @param whereObject 查询条件
   * @param op 条件操作符，默认 and
   * @param orderBy 排序 asc desc
   */
  public static select(table: string, cols: string[], whereObject: any, op: string = "AND", orderBy?: string): string {
    const whereKeys = Object.keys(whereObject || {});
    const sql = ["SELECT", cols.join(", "), "FROM", table];
    const params = [];
    const where = [];
    if (whereKeys.length > 0) {
      sql.push("WHERE");
      whereKeys.forEach(key => {
        where.push(`${key} = ?`);
        params.push(whereObject[key]);
      });
    }
    sql.push(where.join(` ${op} `));
    if (orderBy) {
      sql.push(`ORDER BY ${orderBy}`);
    }
    return SqlString.format(sql.join(" ") + ";", params);
  }

  /**
   * @param table 表名
   * @param whereObject 查询条件
   * @param op 条件操作符，默认 and
   */
  public static count(table: string, whereObject: any, op: string = "AND"): string {
    const whereKeys = Object.keys(whereObject || {});
    const sql = ["SELECT COUNT(*) AS count", "FROM", table];
    const params = [];
    const where = [];
    if (whereKeys.length > 0) {
      sql.push("where");
      whereKeys.forEach(key => {
        where.push(`${key} = ?`);
        params.push(whereObject[key]);
      });
    }
    sql.push(where.join(` ${op} `));
    return SqlString.format(sql.join(" ") + ";", params);
  }

  /**
   * @param table 表名
   * @param data 需要插入的数据，根据键名自动填充到相应的字段
   */
  public static insert(table: string, data: any): string {
    const keys = Object.keys(data || {});
    const params = [];
    const cols = [];
    const values = [];
    keys.forEach(key => {
      cols.push(key);
      params.push(data[key]);
      values.push("?");
    });
    const sql = ["INSERT INTO", table, "("];
    sql.push(cols.join(", "));
    sql.push(") VALUES (");
    sql.push(values.join(", "));
    sql.push(")");
    return SqlString.format(sql.join(" ") + ";", params);
  }

  /**
   *
   * @param table 表名
   * @param data 需要更新的数据，根据键名自动填充到相应的字段
   * @param whereObject 查询条件
   * @param op 条件操作符，默认 and
   */
  public static update(table: string, data: any, whereObject: any, op: string = "AND"): string {
    const dataKeys = Object.keys(data || {});
    const whereKeys = Object.keys(whereObject || {});
    const values = [];
    const where = [];
    const params = [];
    dataKeys.forEach(key => {
      values.push(`${key} = ?`);
      params.push(data[key]);
    });
    whereKeys.forEach(key => {
      where.push(`${key} = ?`);
      params.push(whereObject[key]);
    });
    const sql = ["UPDATE", table, "SET"];
    sql.push(values.join(", "));
    if (whereKeys.length > 0) {
      sql.push("WHERE");
      sql.push(where.join(` ${op} `));
    }
    return SqlString.format(sql.join(" ") + ";", params);
  }

  /**
   * @param table 表名
   * @param whereObject 查询条件
   * @param op 条件操作符，默认 and
   */
  public static delete(table: string, whereObject: any, op: string = "AND"): string {
    const whereKeys = Object.keys(whereObject || {});
    const where = [];
    const params = [];
    whereKeys.forEach(key => {
      where.push(`${key} = ?`);
      params.push(whereObject[key]);
    });
    const sql = ["DELETE FROM", table];
    if (whereKeys.length > 0) {
      sql.push("WHERE");
      sql.push(where.join(` ${op} `));
    }
    return SqlString.format(sql.join(" ") + ";", params);
  }
}

export default SimpleBuilder;
