import * as user from "../service/user";
import ResultJSON from "../model/ResultJSON";
import { get, post } from "../utils/router";

/**
 * @api {GET} /user/test 查询测试用户数据
 * @apiDescription 查询测试用户数据
 * @apiParam {Number} [id] 其实没有参数
 * @apiGroup User
 */
get("/user/test", async (req, res) => {
  const json = new ResultJSON();
  json.data = await user.findByName(req.query.userName);
  json.msg = "查询成功";
  json.success = true;
  res.send(json);
});

/**
 * @api {POST} /user/testPost 测试post提交
 * @apiDescription 测试post提交
 * @apiGroup User
 */
post("/user/testPost", async (req, res) => {
  const json = new ResultJSON();
  json.data = req.body;
  json.msg = "查询成功";
  json.success = true;
  res.send(json);
});
