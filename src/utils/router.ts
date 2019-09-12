import Lightning from "@wolfx/lightning";
import { projectName } from "../config";
import ResultJSON from "../model/ResultJSON";
import logger from "./logger";
import { LRequest, LResponse } from "./types";

const { app } = Lightning.core.getState();

type NextFunction = () => void;

type Fn = (req: LRequest, res: LResponse, next: NextFunction) => void;

function handler(method: string, url: string, fn: Fn) {
  app[method](projectName + url, async (req: LRequest, res: LResponse, next: NextFunction) => {
    const json = new ResultJSON();
    try {
      await fn(req, res, next);
    } catch (e) {
      json.msg = "server internal error";
      json.success = false;
      json.errorMsg = e.stack;
      logger.error(e.stack);
      res.send(json);
    }
  });
}

export function get(url: string, fn: Fn) {
  handler("get", url, fn);
}

export function post(url: string, fn: Fn) {
  handler("post", url, fn);
}

export function all(url: string, fn: Fn) {
  handler("all", url, fn);
}
