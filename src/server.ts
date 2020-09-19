import * as path from "path";
import { Server } from "@wolfx/lightning";
import logger from "./utils/logger";

const server = new Server({ port: 3001, staticDir: path.resolve(__dirname, "../public") });
server.setLogger({
  log: (ev: string) => logger.info(ev),
  warn: (ev: string) => logger.warn(ev),
  error: (ev: string) => logger.error(ev)
});
export default server;
