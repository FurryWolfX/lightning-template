import * as user from "../service/user";
import ResultJSON from "../model/ResultJSON";
import server from "../server";
import { Server, RouteCallbackParams, RouteCallbackCtx, routerClass, routerMapper } from "@wolfx/lightning";

/**
 * @api {GET} /user/test 查询测试用户数据
 * @apiDescription 查询测试用户数据
 * @apiParam {Number} [id] 其实没有参数
 * @apiGroup User
 */
@routerClass()
class TestUserInfoGet {
  @routerMapper(server, Server.GET, "/user/test")
  async getData(data: RouteCallbackParams, ctx: RouteCallbackCtx) {
    const json = new ResultJSON();
    json.data = await user.findByName(data.query.name);
    json.msg = "查询成功";
    json.success = true;
    return json;
  }
}

/**
 * @api {POST} /user/testPost 测试post提交
 * @apiDescription 测试post提交
 * @apiGroup User
 */
@routerClass()
class TestUserInfoPost {
  @routerMapper(server, Server.GET, "/user/testPost")
  async getData(data: RouteCallbackParams, ctx: RouteCallbackCtx) {
    const json = new ResultJSON();
    json.data = data.fields;
    json.msg = "查询成功";
    json.success = true;
    return json;
  }
}
