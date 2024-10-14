import * as regexparam from "regexparam";

import type { Route } from "#lib/route/mod.js";
import type { RouteModules } from "./modules.js";

/**
 * Builds `Route`s from `RouteModules`
 */
export function buildRoutes(modules: RouteModules): Route {
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

  for (const { dir, isRoot, id, fileName, importFn } of sorted) {
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
      importFn,
    });
  }

  const root = routes.get("/");
  if (!root) {
    throw new Error("Routes were not built");
  }

  return root;
}

function parsePath(str: string) {
  return str.replace(/\[(.+)\]/, ":$1");
}
