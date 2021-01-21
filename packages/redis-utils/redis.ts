import * as redis from "redis";
import logger from "log-utils/logger";

// redis
export const REDIS_HOST = "127.0.0.1";
export const REDIS_PORT = 6890;
export const REDIS_DB = 0;

const client = redis.createClient(REDIS_PORT, REDIS_HOST, {
  db: REDIS_DB
});

// client.auth(123456);  // 如果没有设置密码 是不需要这一步的

client.on("error", function(error) {
  logger.error(`[Redis:${process.pid}] ${error.stack}`);
});

client.on("connect", function() {
  logger.info(`[Redis:${process.pid}] connected`);
});

export function getValueByKey(key: string): Promise<string> {
  return new Promise((resolve, reject) => {
    client.get(key, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data || "");
      }
    });
  });
}
