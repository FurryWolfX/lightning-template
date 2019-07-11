const RegExps = {
  Email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/, // 电子邮箱
  Mobile: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, // 手机号码 2018 版
  Phone: /^([0-9]{3,4}-)?[0-9]{7,8}$/, // 固定电话
  IDCard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, // 18位身份证
  IDCard15: /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$/, // 15位身份证
  Currency: /^\d+(\.\d+)?$/, // 货币
  Number: /^\d+$/, // 数字
  NonNegativeNumber: /^\d+(\.\d+)?$/, // 正数或0
  NaturalNumber: /^[0-9]+$/, // 自然数
  FloatNumber: /^(-?\d+)(\.\d+)?$/, // 浮点数
  Zip: /^[1-9]\d{5}$/, // 邮编
  QQ: /^[1-9]\d{4,8}$/, // QQ
  English: /^[A-Za-z]+$/, // 英文
  Chinese: /^[\u2E80-\u9FFF]+$/, // Unicode编码中的汉字范围
  Password: /^.{6,16}$/i, // 6-16数字或字母
  Hex: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/, // 十六进制色值，如：#AAA，#AAAAAA
  VehicleNumber: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
  Emoji: /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/
};

class Struct {
  /**
   * @param struct {
   *   name: {
   *     require: true,
   *     msg: "xxx",
   *     validator: String | Function
   *   }
   * }
   */
  constructor(struct) {
    this.struct = struct;
  }
  validate(obj) {
    for (let key in this.struct) {
      if (this.struct.hasOwnProperty(key)) {
        if (this.struct[key].require === true && !obj[key]) {
          // 结构中这个属性有require true，且传入的对象没这个值
          return {
            valid: false,
            msg: this.struct[key].msg
          };
        } else if (typeof this.struct[key].validator === "string") {
          // 传入的是string说明要使用定义的正则
          const reg = RegExps[this.struct[key].validator];
          if (reg && reg.test(obj[key]) === false) {
            return {
              valid: false, // 是否符合正则
              msg: this.struct[key].msg
            };
          } else {
            throw new Error("no RegExp:" + this.struct[key].validator);
          }
        } else if (typeof this.struct[key].validator === "function" && this.struct[key].validator(obj[key]) === false) {
          return {
            valid: false, // 使用用户自定义的方法校验
            msg: this.struct[key].msg
          };
        }
      }
    }
    return {
      valid: true,
      msg: null
    };
  }
}

module.exports = Struct;
