import * as SqlString from "sqlstring";

class SimpleBuilder {
  /**
   * @param table 表名
   * @param cols 列名
   * @param whereObject 查询条件
   * @param op 条件操作符，默认 and
   */
  public static select(table: string, cols: string[], whereObject: any, op: string = "and"): string {
    const whereKeys = Object.keys(whereObject || {});
    const sql = ["select", cols.join(", "), "from", table];
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
    const sql = ["insert into", table, "("];
    sql.push(cols.join(", "));
    sql.push(") values (");
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
  public static update(table: string, data: any, whereObject: any, op: string = "and"): string {
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
    const sql = ["update", table, "set"];
    sql.push(values.join(", "));
    if (whereKeys.length > 0) {
      sql.push("where");
      sql.push(where.join(` ${op} `));
    }
    return SqlString.format(sql.join(" ") + ";", params);
  }

  /**
   * @param table 表名
   * @param whereObject 查询条件
   * @param op 条件操作符，默认 and
   */
  public static delete(table: string, whereObject: any, op: string = "and"): string {
    const whereKeys = Object.keys(whereObject || {});
    const where = [];
    const params = [];
    whereKeys.forEach(key => {
      where.push(`${key} = ?`);
      params.push(whereObject[key]);
    });
    const sql = ["delete from", table];
    if (whereKeys.length > 0) {
      sql.push("where");
      sql.push(where.join(` ${op} `));
    }
    return SqlString.format(sql.join(" ") + ";", params);
  }
}

export default SimpleBuilder;

// console.log(SimpleBuilder.select("user", ["name", "age"], { id: 1, name: "wolfx" }));
// console.log(SimpleBuilder.insert("user", { id: 1, name: "wolfx" }));
// console.log(SimpleBuilder.update("user", { id: 1, name: "wolfx" }, { id: 2, name: "wolfx2" }));
// console.log(SimpleBuilder.delete("user", { id: 2, name: "wolfx2" }));
