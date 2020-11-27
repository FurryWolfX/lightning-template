import { Consumer } from "dubbo.ts";
import { registry } from "./dubbo";

const consumer = new Consumer({
  application: "dist",
  dubbo_version: "2.0.2",
  pid: process.pid,
  registry: registry
});

async function demo() {
  const invoker = await consumer.get("com.mifa.stib.service.ProviderService");
  // 调用服务的方法[Invoker].invoke(methodname, methodArgs);
  await invoker.invoke("hello", [{ user: "me" }]);
  await consumer.listen();
  await consumer.close();
}
