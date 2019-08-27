type StructOption = {
  [key: string]: {
    require?: boolean;
    msg?: string;
    minLength?: number;
    maxLength?: number;
    type?: string;
    validator?: (v: any) => boolean;
  };
};

class Struct {
  struct: StructOption;
  constructor(struct: StructOption) {
    this.struct = struct;
  }
  isString(v) {
    return typeof v === "string";
  }
  isArray(v) {
    return Array.isArray(v);
  }
  isNumber(v) {
    return typeof v === "number";
  }
  isObject(v) {
    return typeof v === "object";
  }
  isBoolean(v) {
    return typeof v === "boolean";
  }
  validate(obj): { valid: boolean; typeError: string; msg: string } {
    for (let key in this.struct) {
      if (this.struct.hasOwnProperty(key)) {
        if (this.struct[key].require === true && !obj[key]) {
          // 结构中这个属性有require true，且传入的对象没这个值
          return {
            valid: false,
            typeError: key + "必须是必填",
            msg: this.struct[key].msg
          };
        }

        // 类型校验
        if (this.isString(this.struct[key].type)) {
          const type = this.struct[key].type;
          if (type === "array" && this.isArray(obj[key]) === false) {
            // 类型是数组，且值不是数组
            return {
              valid: false,
              typeError: "数据类型校验失败，" + key + "必须是数组",
              msg: this.struct[key].msg
            };
          } else if (type === "number" && this.isNumber(obj[key]) === false) {
            // 类型是数组，且值不是数组
            return {
              valid: false,
              typeError: "数据类型校验失败，" + key + "必须是数字",
              msg: this.struct[key].msg
            };
          } else if (type === "string" && this.isString(obj[key]) === false) {
            // 类型是字符串，且值不是字符串
            return {
              valid: false,
              typeError: "数据类型校验失败，" + key + "必须是字符串",
              msg: this.struct[key].msg
            };
          } else if (type === "object" && (this.isObject(obj[key]) === false || this.isArray(obj[key]) === true)) {
            // 类型是对象，且值不是对象
            return {
              valid: false,
              typeError: "数据类型校验失败，" + key + "必须是对象",
              msg: this.struct[key].msg
            };
          } else if (type === "boolean" && this.isBoolean(obj[key]) === false) {
            // 类型是布尔，且值不是布尔
            return {
              valid: false,
              typeError: "数据类型校验失败，" + key + "必须是布尔值",
              msg: this.struct[key].msg
            };
          }
        }

        if (this.isArray(obj[key]) || this.isString(obj[key])) {
          // 只校验数组和字符串类型的长度
          // 最大长度校验
          if (this.isNumber(this.struct[key].maxLength)) {
            if (obj[key].length !== undefined && obj[key].length > this.struct[key].maxLength) {
              // 超过最大长度
              return {
                valid: false,
                typeError: key + "超过最大长度" + this.struct[key].maxLength,
                msg: this.struct[key].msg
              };
            }
          }
          // 最小长度校验
          if (this.isNumber(this.struct[key].minLength)) {
            if (obj[key].length !== undefined && obj[key].length < this.struct[key].minLength) {
              // 小于最小长度
              return {
                valid: false,
                typeError: key + "小于最小长度" + this.struct[key].minLength,
                msg: this.struct[key].msg
              };
            }
          }
        }

        // 自定义校验
        if (typeof this.struct[key].validator === "function" && this.struct[key].validator(obj[key]) === false) {
          return {
            valid: false,
            typeError: key + "自定义校验失败",
            msg: this.struct[key].msg
          };
        }
      }
    }
    return {
      valid: true,
      typeError: null,
      msg: null
    };
  }
}

export default Struct;
