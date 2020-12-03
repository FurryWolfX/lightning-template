import { Application } from "@dubbo.ts/application";
import { ZooKeeper } from "@dubbo.ts/zookeeper";

export const app = new Application();
app.application = "esb_service";
app.version = "2.6.0";
app.timeout = 10000;
app.retries = 3;
app.heartbeat = 600000;

export const registry = new ZooKeeper(app, {
  host: "192.168.1.5:2181"
});

app.useRegistry(registry);

registry.on("start", async () => console.log(" + [registry]", "started"));
registry.on("stop", async () => console.log(" - [registry]", "stoped"));
registry.on("node:create", async node => console.log(" + [registry]", "create node:", node));
registry.on("node:remove", async node => console.log(" - [registry]", "remove node:", node));
