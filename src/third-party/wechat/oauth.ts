/**
 * 微信授权模块
 * @source https://github.com/node-webot/wechat-oauth
 * @update 2019-07-30
 */
import * as OAuth from "wechat-oauth";
import * as fs from "fs";
import * as path from "path";

const isMiniProgram = false; // 是否是小程序
const redirectUrl = "redirectUrl"; // 授权重定向
const state = "state";
const scope = "snsapi_userinfo";
const appid = "appid";
const secret = "secret";

function getToken(openid, callback) {
  // 传入一个根据openid获取对应的全局token的方法
  // 在getUser时会通过该方法来获取token
  const fileName = openid + "-AT.txt";
  fs.readFile(path.resolve(__dirname, "access-token/" + fileName), "utf8", function(err, txt) {
    if (err) {
      return callback(err);
    }
    callback(null, JSON.parse(txt));
  });
}

function saveToken(openid, token, callback) {
  // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
  // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
  // 持久化时请注意，每个openid都对应一个唯一的token!
  const fileName = openid + "-AT.txt";
  fs.writeFile(path.resolve(__dirname, "access-token/" + fileName), JSON.stringify(token), callback);
}

const oauthApi = new OAuth(appid, secret, getToken, saveToken, isMiniProgram);

// 生成引导用户点击的URL。
export const url = oauthApi.getAuthorizeURL(redirectUrl, state, scope);

/**
 * 获取Openid和AccessToken
 * 用户点击上步生成的URL后会被重定向到上步设置的 redirectUrl，并且会带有code参数，我们可以使用这个code换取
 * @param code
 */
export function getAccessToken(code) {
  oauthApi.getAccessToken(code, function(err, result) {
    return new Promise((resolve, reject) => {
      if (err) {
        reject(err);
      } else {
        const accessToken = result.data.access_token;
        const openid = result.data.openid;
        resolve({ accessToken, openid });
      }
    });
  });
}

/**
 * 获取用户信息
 * 如果我们生成引导用户点击的URL中scope参数值为snsapi_userinfo，
 * 接下来我们就可以使用openid换取用户详细信息
 * （必须在getAccessToken方法执行完成之后）
 * @param openid
 */
export function getUser(openid) {
  oauthApi.getUser(openid, function(err, userInfo) {
    return new Promise((resolve, reject) => {
      if (err) {
        reject(err);
      } else {
        resolve(userInfo);
      }
    });
  });
}
