import * as Lightning from "@wolfx/lightning";
import { projectName } from "../config/index";
import ResultJSON from "../model/ResultJSON";
import logger from "./logger";

const { app } = Lightning.core.getState();

function handler(method: string, url: string, fn: Function) {
  app[method](projectName + url, async (req, res, next) => {
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

export function get(url, fn) {
  handler("get", url, fn);
}

export function post(url, fn) {
  handler("post", url, fn);
}

export function all(url, fn) {
  handler("all", url, fn);
}
