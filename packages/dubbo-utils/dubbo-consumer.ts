/**
 * dubbo 消费者例子
 */
import { Consumer } from "@dubbo.ts/consumer";
import { app, registry } from "./dubbo-app";
import * as java from "js-to-java";

const consumer = new Consumer(app);
app.useConsumer(consumer);

consumer.on("start", async () => console.log(" + [consumer]", "started"));
consumer.on("stop", async () => console.log(" - [consumer]", "stoped"));
consumer.on("disconnect", async () => console.log(" - [consumer]", "server disconnect"));
consumer.on("connect", async () => console.log(" + [consumer]", "server connected"));
consumer.on("reconnect", async () => console.log(" # [consumer]", "server reconnected"));
consumer.on("error", async e => console.error(" ! [consumer]", e));
consumer.on("channels", async result =>
  console.log(
    " $ [consumer]",
    result.map((res: any) => res.host)
  )
);
consumer.on("heartbeat", async () => console.log(" @ [heartbeat]", "[consumer]", "send"));
consumer.on("heartbeat:timeout", async () => console.log(" @ [heartbeat]", "[consumer]", "timeout"));

async function execute(
  interfaceName: string,
  methodName: string,
  args: any[],
  options?: {
    version?: string;
    group?: string;
  }
) {
  /*
  registry.invoke主要是用来从注册中心查询资源后得到host与port来实例化一个直连的client对象。它不会重复创建实例，而是缓存已有的实例。不必担心每次调用都是实例化的问题。
  registry.invoke的interface与 client.execute 的 interface 是同一个，这样做仅仅是 consumer.invoke 来获取注册中心的资源，而client.execute才是真正执行的参数。
  */
  const client = await registry.invoke(interfaceName, options);
  return await client.execute(interfaceName, methodName, args, options);
}

async function test() {
  // const interfaceName = "com.junl.saas.service.ISaasService";
  // const methodName = "queryMerchantEndTime";
  const interfaceName = "com.wolfx.demo";
  const methodName = "test";
  const args = [java.combine("java.lang.String", "635769953479565312")];
  const config = { version: "1.0.0" };
  const result = await execute(interfaceName, methodName, args, config);
  console.log(result);
}

app.start().then(async () => {
  await test();
});

// 直连模式
// const client = consumer.connect('127.0.0.1', 8081);
// const result = await client.execute(interface, method, args, configs);
