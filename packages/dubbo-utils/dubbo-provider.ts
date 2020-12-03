/**
 * dubbo 生产者例子
 */
import { Provider } from "@dubbo.ts/provider";
import { app, registry } from "./dubbo-app";

const provider = new Provider(app);
app.useProvider(provider);

registry.addProviderService("com.wolfx.demo", ["test"], { version: "1.0.0" });

provider.on("connect", async () => console.log(" + [Provider]", "client connected"));
provider.on("disconnect", async () => console.log(" - [Provider]", "client disconnect"));
provider.on("error", async e => console.error(" x [provider]", e));
provider.on("start", async () => console.log(" @ [Provider]", "started"));
provider.on("stop", async () => console.log(" @ [Provider]", "stoped"));
provider.on("heartbeat", async () => console.log(" @ [heartbeat]", "[provider]", "send"));
provider.on("heartbeat:timeout", async () => console.log(" @ [heartbeat]", "[provider]", "timeout"));
provider.on("data", async reply => {
  reply(async (schema, status) => {
    /**
     * schema 参数如下:
     * isTwoWay: boolean;
     * id: number;
     * dubbo_version: string;
     * interface: string;
     * version: string;
     * method: string;
     * parameters: any[];
     * attachments: Record<string, string>;
     * 注意:返回数据格式必须如下。status是状态 data为具体数据。
     */
    console.log(schema);
    return {
      status: status.OK,
      data: {
        value: "ok"
      }
    };
  });
});

app.start().then(async () => {});
