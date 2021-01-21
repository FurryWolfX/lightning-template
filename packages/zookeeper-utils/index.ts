import { createClient } from "node-zookeeper-client";
import { Option, Client, Stat, Exception } from "node-zookeeper-client";

export { Client };

export function createAndConnectClient(url: string, options?: Partial<Option>): Promise<Client> {
  return new Promise((resolve, reject) => {
    const client: Client = createClient(url, options);
    client.once("connected", function() {
      resolve(client);
    });
    client.connect();
  });
}

/**
 * 判断是否存在节点
 * @param client
 * @param path
 */
export function exists(client: Client, path: string) {
  return new Promise((resolve, reject) => {
    client.exists(path, (error, stat) => {
      if (error) {
        reject(error);
      } else {
        resolve(stat);
      }
    });
  });
}

/**
 * 创建节点
 * @param client
 * @param path
 */
export function createPath(client: Client, path: string) {
  return new Promise((resolve, reject) => {
    client.create(path, (error, path) => {
      if (error) {
        reject(error);
      } else {
        resolve(path);
      }
    });
  });
}

/**
 * 设置节点数据
 * @param client
 * @param path
 * @param data
 * @param version
 */
export function setData(client: Client, path: string, data: Buffer | null, version: number): Promise<Stat> {
  return new Promise((resolve, reject) => {
    client.setData(path, data, version, function(error, stat) {
      if (error) {
        reject(error);
      } else {
        resolve(stat);
      }
    });
  });
}

/**
 * 创建节点，忽略存在的节点
 * @param client
 * @param path
 */
export async function createPathIgnoreExists(client: Client, path: string) {
  const res = await exists(client, path);
  if (res === null) {
    return await createPath(client, path);
  } else {
    return res;
  }
}

/**
 * 创建节点，忽略存在的节点，并设置数据
 * @param client
 * @param path
 * @param data
 * @param version
 */
export async function createPathAndSetData(client: Client, path: string, data: Buffer | null, version: number) {
  await createPathIgnoreExists(client, path);
  return await setData(client, path, data, version);
}

/**
 * 获取节点数据
 * @param client
 * @param path
 */
export function getData(client: Client, path: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    client.getData(path, function(error, data, stat) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

/**
 * 获取节点数据并使用utf-8解码
 * @param client
 * @param path
 */
export async function getDataString(client: Client, path: string): Promise<string> {
  const result = await getData(client, path);
  return result.toString("utf8");
}

/**
 * 获取子节点
 * @param client
 * @param path
 */
export function getChildren(client: Client, path: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    client.getChildren(path, (error, children, stat) => {
      if (error) {
        reject(error);
      } else {
        resolve(children);
      }
    });
  });
}
