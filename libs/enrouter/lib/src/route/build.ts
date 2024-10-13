import * as regexparam from "regexparam";

import { logger } from "#lib/debug.js";

import type { Route } from "./mod.js";

const log = logger("route/build");

export type RouteModules = {
  id: string;
  dir: string[];
  fileName: string;
  load: () => Promise<unknown>;
}[];

/**
 * Builds `Route`s from `RouteModules`
 */
export function buildRoutes(modules: RouteModules): Route | undefined {
  log("Building routes");

  const sorted = modules.sort((a, b) => a.dir.length - b.dir.length);

  const routes = new Map<string, Route>();

  function findParent(dp: string[]) {
    const parentPath = [...dp];

    while (parentPath.length > 0) {
      parentPath.pop();
      const path = parsePath("/" + parentPath.join("/"));
      const parent = routes.get(path);
      if (parent) {
        return parent;
      }
    }

    throw new Error("Parent not found");
  }

  for (const { id, dir, fileName, load } of sorted) {
    const isRoot = dir.length === 0;

    const path = isRoot ? "/" : parsePath("/" + dir.join("/"));

    let route = routes.get(path);
    if (!route) {
      route = {
        path,
        test: regexparam.parse(path, true),
        modules: [],
        loaded: false,
        elements: {},
      };
      routes.set(path, route);
    }

    if (!isRoot) {
      const parent = findParent(dir);
      if (!parent.tree?.find((x) => x.path === path)) {
        if (!parent.tree) {
          parent.tree = [];
        }
        parent.tree.push(route);
      }
    }

    route.modules.push({
      id,
      fileName,
      load,
    });
  }

  const result = routes.get("/");

  log("Routes built: %o", routes);

  return result;
}

function parsePath(str: string) {
  return str.replace(/\[(.+)\]/, ":$1");
}
