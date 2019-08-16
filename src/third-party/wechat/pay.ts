/**
 * 微信支付模块
 * @source https://github.com/supersheep/wechat-pay
 * @update 2019-07-30
 */
import * as fs from "fs";
import { Payment, middleware } from "wechat-pay";

// 初始化
const initConfig = {
  partnerKey: "<partnerkey>",
  appId: "<appid>",
  mchId: "<mchid>",
  notifyUrl: "<notifyurl>",
  pfx: fs.readFileSync("<location-of-your-apiclient-cert.p12>")
};
const payment = new Payment(initConfig);
const mid = middleware(initConfig);

/**
 * 付钱
 * 页面的路径需要位于支付授权目录下
 * 由于每次呼出支付界面，无论用户是否支付成功，out_trade_no 都会失效（OUT_TRADE_NO_USED）
 * 所以这里使用timestamp保证每次的id不同。业务逻辑中应该自行维护之
 * 前端通过以下代码：
 * WeixinJSBridge.invoke('getBrandWCPayRequest', payargs, function(res){
 *    if(res.err_msg == "get_brand_wcpay_request:ok"){
 *      alert("支付成功");
 *      // 这里可以跳转到订单完成页面向用户展示
 *    }else{
 *      alert("支付失败，请重试");
 *    }
 *  });
 * @param body 标题
 * @param attach 附加数据
 * @param total_fee 金额
 * @param spbill_create_ip 创建者IP
 * @param openid
 * @returns {Promise<*>}
 */
export async function doPay(body, attach, total_fee, spbill_create_ip, openid) {
  const order = {
    body, // 标题
    attach, // 附加数据
    out_trade_no: "kfc" + new Date().getTime(), // 订单号
    total_fee, // 金额
    spbill_create_ip, // 创建者IP
    openid,
    trade_type: "JSAPI"
  };
  let payargs = await payment.getBrandWCPayRequestParams(order);
  return payargs;
}