import * as Lightning from "@wolfx/lightning";
import { Request, Response, NextFunction } from "@wolfx/lightning/src/type";
import { projectName } from "../config";
import ResultJSON from "../model/ResultJSON";
import logger from "./logger";

const { app } = Lightning.core.getState();

type Fn = (req: Request, res: Response, next: NextFunction) => void;

function handler(method: string, url: string, fn: Fn) {
  app[method](projectName + url, async (req: Request, res: Response, next: NextFunction) => {
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
