/**
 * router/index.js 是默认会被加载的第一个路由，这里面可以处理权限拦截等操作
 */
import server from "../server";
import { Server, RouteCallbackParams, RouteCallbackCtx, routerClass, routerMapper } from "@wolfx/lightning";

@routerClass()
class DemoRouter {
  @routerMapper(server, Server.GET, "/")
  async getData(data: RouteCallbackParams, ctx: RouteCallbackCtx) {
    ctx.res.writeHead(301, { Location: "./apidoc/" });
    ctx.res.end();
  }
}
