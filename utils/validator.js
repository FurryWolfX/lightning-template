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

const validator = {
  isEmail: v => RegExps.Email.test(v),
  isMobile: v => RegExps.Mobile.test(v),
  isPhone: v => RegExps.Phone.test(v),
  isIDCard: v => RegExps.IDCard.test(v),
  isIDCard15: v => RegExps.IDCard15.test(v),
  isCurrency: v => RegExps.Currency.test(v),
  isNumber: v => RegExps.Number.test(v),
  isNonNegativeNumber: v => RegExps.NonNegativeNumber.test(v),
  isNaturalNumber: v => RegExps.NaturalNumber.test(v),
  isFloatNumber: v => RegExps.FloatNumber.test(v),
  isZip: v => RegExps.Zip.test(v),
  isQQ: v => RegExps.QQ.test(v),
  isEnglish: v => RegExps.English.test(v),
  isChinese: v => RegExps.Chinese.test(v),
  isPassword: v => RegExps.Password.test(v),
  isHex: v => RegExps.Hex.test(v),
  isVehicleNumber: v => RegExps.VehicleNumber.test(v),
  isEmoji: v => RegExps.Emoji.test(v)
};

module.exports = validator;
