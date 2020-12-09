/**
 * 一个简易的SQL生成器
 * 参考标准：https://www.w3school.com.cn/sql/sql_top.asp
 */

/**
 * 生成function
 * 如：func('count', 1)  -->  count(1)
 * @param functionName
 * @param values
 */
export function func(functionName: string, values: Array<string | number>) {
  const list: string[] = values.map(v => {
    if (typeof v === "string") {
      return `'${v}'`;
    } else {
      return v.toString();
    }
  });
  return `${functionName}(${list.join(",")})`;
}

export function valFilter(v: string | number): string {
  // 使用特殊符号占位，便于后面组装
  if (typeof v === "string") {
    return `<#'${v}'>`;
  } else {
    return `<#${v}>`;
  }
}
export function tableNameFilter(name: string) {
  return name;
}
export function colNameFilter(name: string) {
  return name;
}

class SqlBuilderBasic {
  sqlArray: string[] = [];

  /**
   * 输出sql
   */
  toSql() {
    const result = this.sqlArray.filter(c => !!c).join(" ") + ";";
    return result.replace(/<#([\w\d']+)>/g, "$1");
  }
  /**
   * 输出sql（prepared）
   */
  toPreparedSql() {
    const strExp = /'([\w\d]*)'/;
    const result = this.sqlArray.filter(c => !!c).join(" ") + ";";
    const valueList: Array<string | number> = [];
    const prepared = result.replace(/<#([\w\d']+)>/g, (val, subVal) => {
      if (strExp.test(subVal)) {
        valueList.push(subVal.replace(strExp, "$1"));
      } else {
        valueList.push(Number(subVal));
      }
      return "?";
    });
    return {
      prepared,
      valueList
    };
  }

  /**
   * 谨慎使用
   * @param sql
   */
  append(sql: string) {
    this.sqlArray.push(sql);
  }

  /**
   * 工具方法，生成：[字段op值]的SQL
   * @param k
   * @param v
   * @param op
   */
  setColValue(k: string, v: string | number, op: string) {
    this.append(colNameFilter(k));
    this.append(op);
    this.append(valFilter(v));
  }

  /**
   * SELECT 语句用于从表中选取数据。
   * @param colNameList 字段名称或函数名称
   * @param distinctColNameList 需要去重的字段名称
   */
  select(colNameList: string[], distinctColNameList: string[] = []) {
    this.append(`SELECT`);
    const cols = colNameList.map(col => {
      if (distinctColNameList.indexOf(col) === -1) {
        return colNameFilter(col);
      } else {
        return `DISTINCT ${colNameFilter(col)}`;
      }
    });
    this.append(cols.join(","));
    return this;
  }

  /**
   * SELECT INTO 语句从一个表中选取数据，然后把数据插入另一个表中。
   * @param colNameList 字段名称
   * @param distinctColNameList 需要去重的字段名称
   * @param tableName 新表名称
   */
  selectInto(colNameList: string[], distinctColNameList: string[], tableName: string) {
    this.select(colNameList, distinctColNameList);
    this.append(`INTO`);
    this.append(tableNameFilter(tableName));
    return this;
  }

  deleteFrom(tableName: string) {
    this.append(`DELETE FROM`);
    this.append(tableNameFilter(tableName));
    return this;
  }

  /**
   *
   * @param tableName
   * @param values
   */
  insertInto(tableName: string, values: Record<string, string | number>) {
    this.append(`INSERT INTO`);
    this.append(tableNameFilter(tableName));

    const colList: string[] = [];
    const valList: string[] = [];
    Object.keys(values).forEach(k => {
      colList.push(k);
      valList.push(valFilter(values[k]));
    });

    this.append(`(${colList.join(",")}) VALUES (${valList.join(",")})`);
    return this;
  }

  update(tableName: string, values: Record<string, string | number>) {
    this.append(`UPDATE`);
    this.append(tableNameFilter(tableName));

    const list: string[] = [];
    Object.keys(values).forEach(k => {
      list.push(`${k} = ${valFilter(values[k])}`);
    });

    this.append("SET");
    this.append(list.join(","));

    return this;
  }

  /**
   * @param tableName
   */
  from(tableName: string | string[]) {
    this.append(`FROM`);
    if (Array.isArray(tableName)) {
      this.append(tableName.map(name => tableNameFilter(name)).join(","));
    } else {
      this.append(tableNameFilter(tableName));
    }
    return this;
  }

  /**
   * 表示将要有查询条件
   */
  where() {
    this.append(`WHERE`);
    return this;
  }

  orderBy(colName: string, sort: "ASC" | "DESC" = "ASC") {
    this.append(`ORDER BY`);
    this.append(colNameFilter(colName));
    this.append(sort);
    return this;
  }

  /**
   * 分组，会在组装的子语句外面加括号
   * 主要用于多种不同的条件组合和子查询
   * @param subBuilder
   */
  group(subBuilder: SqlBuilderBasic) {
    this.append(`(${subBuilder.toSql()})`);
    return this;
  }

  or() {
    this.append(`OR`);
    return this;
  }

  and() {
    this.append(`AND`);
    return this;
  }

  /**
   * 等于
   * @param colName
   * @param value
   */
  eq(colName: string, value: string | number) {
    this.setColValue(colName, value, "=");
    return this;
  }

  /**
   * 判断该字段是否是NULL
   * @param colName
   */
  isNull(colName: string) {
    this.append(colNameFilter(colName));
    this.append(`IS NULL`);
  }

  /**
   * 不等于
   * @param colName
   * @param value
   */
  ne(colName: string, value: string | number) {
    this.setColValue(colName, value, "<>");
    return this;
  }

  /**
   * 大于
   * @param colName
   * @param value
   */
  gt(colName: string, value: string | number) {
    this.setColValue(colName, value, ">");
    return this;
  }

  /**
   * 大于等于
   * @param colName
   * @param value
   */
  ge(colName: string, value: string | number) {
    this.setColValue(colName, value, ">=");
    return this;
  }

  /**
   * 小于
   * @param colName
   * @param value
   */
  lt(colName: string, value: string | number) {
    this.setColValue(colName, value, "<");
    return this;
  }

  /**
   * 小于等于
   * @param colName
   * @param value
   */
  le(colName: string, value: string | number) {
    this.setColValue(colName, value, "<=");
    return this;
  }
}

class SqlBuilderAdv extends SqlBuilderBasic {
  /**
   * TOP 子句用于规定要返回的记录的数目
   * @param n
   * @param colNameList
   */
  selectTop(n: number, colNameList: string[]) {
    this.append(`SELECT TOP`);
    this.append(Math.floor(n).toString());
    this.append(colNameList.map(col => colNameFilter(col)).join(","));
    return this;
  }

  selectTopPercent(n: number, colNameList: string[]) {
    this.append(`SELECT TOP`);
    this.append(Math.floor(n).toString());
    this.append(`PERCENT`);
    this.append(colNameList.map(col => colNameFilter(col)).join(","));
    return this;
  }

  limit(a: number, b?: number) {
    this.append(`LIMIT`);
    if (b === undefined) {
      this.append(Math.floor(a).toString());
    } else {
      this.append(Math.floor(a) + "," + Math.floor(b));
    }
    return this;
  }

  rowNum() {
    this.append(`ROWNUM`);
    return this;
  }

  /**
   * LIKE 操作符用于在 WHERE 子句中搜索列中的指定模式。
   * % 替代一个或多个字符
   * _ 仅替代一个字符
   * [charlist] 字符列中的任何单一字符
   * [^charlist]或[!charlist] 不在字符列中的任何单一字符
   * @param colName
   * @param value 支持通配符的字符串
   */
  like(colName: string, value: string) {
    this.append(colNameFilter(colName));
    this.append("LIKE");
    this.append(value);
    return this;
  }

  /**
   * IN 操作符允许我们在 WHERE 子句中规定多个值。
   * @param colName
   * @param valList
   */
  in(colName: string, valList: Array<string | number>) {
    const list = valList.map(v => valFilter(v));
    this.append(colNameFilter(colName));
    this.append("IN");
    this.append(`(${list.join(",")})`);
    return this;
  }

  /**
   * NOT IN 操作符允许我们在 WHERE 子句中规定多个值。
   * @param colName
   * @param valList
   */
  notIn(colName: string, valList: Array<string | number>) {
    const list = valList.map(v => valFilter(v));
    this.append(colNameFilter(colName));
    this.append("NOT IN");
    this.append(`(${list.join(",")})`);
    return this;
  }

  /**
   * 操作符 BETWEEN ... AND 会选取介于两个值之间的数据范围。
   * @param valA
   * @param valB
   */
  between(valA: string | number, valB: string | number) {
    this.append("BETWEEN");
    this.append(valFilter(valA));
    this.append("AND");
    this.append(valFilter(valB));
    return this;
  }

  innerJoin(tableName: string) {
    this.append("INNER JOIN");
    this.append(tableNameFilter(tableName));
    return this;
  }

  leftJoin(tableName: string) {
    this.append("LEFT JOIN");
    this.append(tableNameFilter(tableName));
    return this;
  }

  rightJoin(tableName: string) {
    this.append("RIGHT JOIN");
    this.append(tableNameFilter(tableName));
    return this;
  }

  fullJoin(tableName: string) {
    this.append("FULL JOIN");
    this.append(tableNameFilter(tableName));
    return this;
  }

  on(colNameA: string, colNameB: string) {
    this.append("ON");
    this.append(`${colNameFilter(colNameA)} = ${colNameFilter(colNameB)}`);
    return this;
  }

  /**
   * UNION 操作符用于合并两个或多个 SELECT 语句的结果集。
   */
  union() {
    this.append("UNION");
    return this;
  }

  /**
   * UNION 操作符用于合并两个或多个 SELECT 语句的结果集。
   */
  unionAll() {
    this.append("UNION ALL");
    return this;
  }
}

export default class SqlBuilder extends SqlBuilderAdv {}
