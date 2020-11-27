import { Provider } from "dubbo.ts";
import { registry } from "./dubbo";

class CUATOM_SERVICE {
  hello(params: any) {
    console.log(params);
    return 123;
  }
}

// 创建对象
const provider = new Provider({
  application: "test",
  dubbo_version: "2.0.2",
  port: 8080,
  pid: process.pid,
  registry: registry,
  heartbeat: 60000
});

// 添加服务
provider.addService(CUATOM_SERVICE, {
  interface: "com.mifa.stib.service.ProviderService",
  version: "1.0.0",
  group: "Group1",
  methods: ["hello"],
  timeout: 3000
});

// 监听服务
// await provider.listen();

// 关闭服务
// await provider.close();
