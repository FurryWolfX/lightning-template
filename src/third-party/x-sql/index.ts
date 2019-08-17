import * as vm from "vm";
import * as SqlString from "sqlstring";
import * as XmlReader from "xml-reader";
import * as fs from "fs";
import { readFileList } from "./utils";
import SimpleBuilder from "./SimpleBuilder";

const keyReg = /@([\w._]+)/g;
const ddlKeyReg = /@@([\w._]+)/g;

export type Config = {
  dir: string;
  debug: boolean;
  debugCallback: (log: string) => void;
};

class Builder extends SimpleBuilder {
  private readonly dir: string;
  private readonly debug: boolean;
  private readonly debugCallback: (log: string) => void;
  private readonly cache: any;

  constructor(config: Config) {
    super();
    this.dir = config.dir;
    this.debug = config.debug || false;
    this.debugCallback = config.debugCallback;
    this.cache = {};
    this.readXmlToCache();
  }

  private log(log: string) {
    if (this.debug) {
      if (typeof this.debugCallback === "function") {
        this.debugCallback(log);
      }
    }
  }

  private readXmlToCache() {
    const fileList = readFileList(this.dir);
    fileList.forEach(file => {
      const xml = fs.readFileSync(file.url, {
        encoding: "utf-8"
      });
      const root = XmlReader.parseSync(xml);
      if (root.name === "root" && root.attributes.namespace) {
        // 校验 query
        root.children.forEach(query => {
          if (query.name === "query" && query.attributes.name) {
            query.children.forEach(child => {
              if (child.type !== "text" && child.name !== "if" && child.name !== "for") {
                throw new Error("not a valid query define in " + file.filename);
              }
            });
          } else {
            throw new Error("not a query define in " + file.filename);
          }
        });
        this.cache[root.attributes.namespace] = root.children;
      } else {
        throw new Error("root or namespace not found in " + file.filename);
      }
    });
  }

  /**
   * 获取 xml 中定义的 sql
   * @param namespace
   * @param queryName
   * @param params
   * @returns {string}
   */
  private getSqlDefine(namespace: string, queryName: string, params: any) {
    const queryList = this.cache[namespace];
    const sql = [];
    queryList.forEach(query => {
      if (query.name === "query" && query.attributes.name === queryName) {
        // 节点如果是text则取sql
        // 如果是if，先判断条件，再进入下层递归
        // 如果是for，进行循环填充
        const build = _query => {
          _query.children.forEach(child => {
            if (child.type === "text") {
              // 直接文本
              sql.push(child.value);
            } else if (child.name === "if" && child.children && child.children[0].type === "text") {
              // 处理 if 相关的逻辑
              let code = child.attributes.condition;
              code = code.replace(keyReg, (match, key) => {
                if (typeof params[key] === "string") {
                  return "'" + params[key] + "'";
                } else {
                  return params[key];
                }
              });
              code = "condition = " + code + ";";
              // 1. 创建一个 vm.Script 实例, 编译要执行的代码
              const script = new vm.Script(code);
              // 2. 用于绑定到 context 的对象
              const sandbox = { condition: false };
              // 3. 创建一个 context, 并且把 sandbox 这个对象绑定到这个环境, 作为全局对象
              const context = vm.createContext(sandbox);
              // 4. 运行上面编译的代码
              script.runInContext(context);
              this.log("[" + code + "] => " + sandbox.condition);
              if (sandbox.condition && Array.isArray(child.children)) {
                build(child);
              }
            } else if (child.name === "for" && child.children && child.children[0].type === "text") {
              // 处理 for 相关的逻辑
              const separator = child.attributes.separator;
              const array = params[child.attributes.array];
              const sqlInFor = child.children[0].value;
              const sqlsInFor = [];
              if (Array.isArray(array) === false) {
                throw new Error("array is not an array in query:" + query.attributes.name);
              }
              array.forEach(item => {
                const s = sqlInFor.replace(keyReg, (match, key) => {
                  return item[key];
                });
                sqlsInFor.push(s);
              });
              sql.push(sqlsInFor.join(separator));
            } else {
              throw new Error("xml parse error in query:" + query.attributes.name);
            }
          });
        };
        build(query);
      }
    });
    if (sql.length > 0) {
      return sql
        .join(" ")
        .replace(/[\r|\n]/g, "") // 去除换行
        .replace(/\s+/g, " ") // 去除多于空格
        .trim();
    } else {
      throw new Error(`can not found ${namespace}.${queryName}`);
    }
  }

  /**
   * 填充数据
   * @param sql
   * @param data
   * @returns {{params: (*|null), sql: *}}
   */
  private fillParams(sql, data) {
    const params = [];
    // fill @key
    sql = sql.replace(keyReg, (match, key) => {
      params.push(data[key]);
      return "?";
    });
    return {
      sql: sql,
      params: params.length > 0 ? params : null
    };
  }

  build(namespace: string, queryName: string, params: any): string {
    const sqlDefine = this.getSqlDefine(namespace, queryName, params);
    this.log("[SQLDefine]: " + sqlDefine);

    const prepared = this.fillParams(sqlDefine, params);
    this.log("[PreparedSQL]: " + prepared.sql);
    this.log("[SQL Params]: " + prepared.params);

    return SqlString.format(prepared.sql, prepared.params);
  }
}

export default Builder;
