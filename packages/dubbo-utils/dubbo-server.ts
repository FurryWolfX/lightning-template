import { ZooKeeper } from "@dubbo.ts/zookeeper";
import { Server, Service, Proxy, Version } from "@dubbo.ts/server";
import * as java from "js-to-java";

export const server = new Server();
export const app = server.application;
export const provider = server.provider;
export const consumer = server.consumer;
export const registry = new ZooKeeper(app, { host: "192.168.1.5:2181" });

app.application = "测试";
app.port = 6000;
app.heartbeat = 3000;
app.useRegistry(registry);

provider.on("connect", async () => console.log(" + [Provider]", "client connected"));
provider.on("disconnect", async () => console.log(" - [Provider]", "client disconnect"));
provider.on("error", async e => console.error(" x [provider]", e));
provider.on("start", async () => console.log(" @ [Provider]", "started"));
provider.on("stop", async () => console.log(" @ [Provider]", "stoped"));
provider.on("heartbeat", async () => console.log(" @ [heartbeat]", "[provider]", "send"));
provider.on("heartbeat:timeout", async () => console.log(" @ [heartbeat]", "[provider]", "timeout"));

consumer.on("start", async () => console.log(" + [consumer]", "started"));
consumer.on("stop", async () => console.log(" - [consumer]", "stoped"));
consumer.on("disconnect", async () => console.log(" - [consumer]", "server disconnect"));
consumer.on("connect", async () => console.log(" + [consumer]", "server connected"));
consumer.on("reconnect", async () => console.log(" # [consumer]", "server reconnected"));
consumer.on("error", async e => console.error(" ! [consumer]", e));
// consumer.on("channels", async result =>
//   console.log(
//     " $ [consumer]",
//     result.map((res: any) => res.host)
//   )
// );
consumer.on("heartbeat", async () => console.log(" @ [heartbeat]", "[consumer]", "send"));
consumer.on("heartbeat:timeout", async () => console.log(" @ [heartbeat]", "[consumer]", "timeout"));

registry.on("start", async () => console.log(" + [registry]", "started"));
registry.on("stop", async () => console.log(" - [registry]", "stoped"));
registry.on("node:create", async node => console.log(" + [registry]", "create node:", node));
registry.on("node:remove", async node => console.log(" - [registry]", "remove node:", node));

server.listen().then(async () => {
  console.log(" - Tcp server on", "port:", app.port);
  const interfaceName = "Com.Node.Dubbo.Test";
  const methodName = "sum";
  const args = [java.combine("java.lang.Integer", 10), java.combine("java.lang.Integer", 100)];
  const config = { version: "1.0.0" };
  const client = await registry.invoke(interfaceName, config);
  const result = await client.execute(interfaceName, methodName, args, config);
  console.log(result);
});

@Version("1.0.0")
@Service("Com.Node.Dubbo.Test")
class Test {
  @Proxy()
  public sum(a: number, b: number) {
    return a + b;
  }
}
server.addService(Test);
