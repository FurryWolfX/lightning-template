/**
 * router/index.js 是默认会被加载的第一个路由，这里面可以处理权限拦截等操作
 */
import server from "../server";
import { Server, LRequest, LResponse, RouterClass, RouterMapper } from "@wolfx/lightning";
import * as template from "art-template";

@RouterClass()
class DemoRouter {
  @RouterMapper(server, Server.GET, "/")
  async getData(req: LRequest, res: LResponse) {
    return template(__dirname + "/template/index.html", {});
    // ctx.res.writeHead(301, { Location: "./apidoc/" });
    // ctx.res.end();
  }
}
