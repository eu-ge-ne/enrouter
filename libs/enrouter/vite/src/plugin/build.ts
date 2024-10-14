import * as regexparam from "regexparam";

import { parseRoutePath } from "./modules.js";
import type { Route } from "#lib/route/mod.js";
import type { RouteModules } from "./modules.js";

/**
 * Builds `Route`s from `RouteModules`
 */
export function buildRoutes(modules: RouteModules): Route {
  const routes = new Map<string, Route>();

  function findParent(dp: string[]) {
    const parentPath = [...dp];

    while (parentPath.length > 0) {
      parentPath.pop();
      const path = parseRoutePath(parentPath);
      const parent = routes.get(path);
      if (parent) {
        return parent;
      }
    }

    throw new Error("Parent not found");
  }

  for (const {
    id,
    fileName,
    importFn,
    routePath,
    isRootRoute,
    routeDir,
  } of modules) {
    let route = routes.get(routePath);
    if (!route) {
      route = {
        path: routePath,
        test: regexparam.parse(routePath, true),
        modules: [],
        loaded: false,
        elements: {},
      };
      routes.set(routePath, route);
    }

    if (!isRootRoute) {
      const parent = findParent(routeDir);
      if (!parent.tree?.find((x) => x.path === routePath)) {
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
