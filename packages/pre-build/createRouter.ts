import * as fs from "fs";
import * as path from "path";
import { sortBy } from "lodash";
import * as template from "art-template";
import * as Glob from "glob";
import * as pify from "pify";
import { mkdirpSync } from "fs-extra";

const glob = pify(Glob);

async function readFileList(path: string): Promise<string[]> {
  return await glob(`**/*.ts`, {
    cwd: path,
    ignore: ["**/*.test.*", "**/*.spec.*", "**/-*.*"]
  });
}

async function getRouterList(routerDir: string) {
  const routerList: string[] = [];
  // 获取路由文件，并将index排序到第一个
  const routers: string[] = sortBy(await readFileList(routerDir), po => {
    if (/index.ts$/.test(po)) {
      // index.ts 放第一路由
      return -1;
    }
  });

  routers.forEach(po => {
    const nameArray = po.split(".");
    if (nameArray.indexOf("manifest") === -1) {
      routerList.push("../src/router/" + po.replace(/.ts$/, ""));
    }
  });

  return routerList;
}

export async function createRouter(routerDir: string) {
  const routerList = await getRouterList(routerDir);
  const code = template(__dirname + "/template/lightning-router.art", {
    routerList
  });
  mkdirpSync(path.resolve(__dirname, "../../.lightning"));
  fs.writeFileSync(path.resolve(__dirname, "../../.lightning/router-manifest.ts"), code);
}
