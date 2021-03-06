/**
 * 定义返回给前端的通用包装格式
 */
export default class ResultJSON {
  success: boolean;
  msg: string;
  errorMsg: string;
  data: any;
  constructor() {
    this.success = false; // 请求是否有异常
    this.msg = ""; // 提示信息
    this.errorMsg = ""; // 错误信息
    this.data = null; // 数据
  }
}
