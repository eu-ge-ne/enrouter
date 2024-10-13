import * as regexparam from "regexparam";

import { logger } from "#lib/debug.js";

import type { Route } from "./mod.js";

const log = logger("route/build");

export interface BuildRoutesParams {
  modules: RouteModules;
}

/**
 * Builds `Route`s from `RouteModules`
 */
export function buildRoutes({ modules }: BuildRoutesParams): Route | undefined {
  log("Building routes");

  const entries = Object.entries(modules).sort(
    (a, b) => a[1].dirPath.length - b[1].dirPath.length,
  );

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

  for (const [moduleId, { dirPath, fileName, load }] of entries) {
    const isRoot = dirPath.length === 0;

    const path = isRoot ? "/" : parsePath("/" + dirPath.join("/"));

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
      const parent = findParent(dirPath);
      if (!parent.tree?.find((x) => x.path === path)) {
        if (!parent.tree) {
          parent.tree = [];
        }
        parent.tree.push(route);
      }
    }

    route.modules.push({
      id: moduleId,
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

/**
 * Collection of route module descriptors.
 * Maps module id to fs path and async import function.
 */
type RouteModules = Record<
  string,
  {
    dirPath: string[];

    fileName: string;
    /**
     * Async module import function
     */
    load: () => Promise<unknown>;
  }
>;
