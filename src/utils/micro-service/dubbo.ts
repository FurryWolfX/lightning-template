import { Registry, Provider, Consumer, RegistryInitOptions } from "dubbo.ts";

export const registry = new Registry({
  host: "127.0.0.1:2181"
});

async function connect() {
  await registry.connect();
  registry.close();
}
