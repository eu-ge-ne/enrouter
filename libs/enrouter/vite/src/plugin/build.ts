import { parseRoutePath } from "./modules.js";
import type { Route } from "#lib/route/mod.js";
import type { RouteModules } from "./modules.js";

/**
 * Builds `Route`s from `RouteModules`
 */
export function buildRoutes(modules: RouteModules): Route {
  const routes = new Map<string, Route>();

  function findParent(dp: string[]): Route | undefined {
    if (dp.length === 0) {
      return;
    }

    const parentPath = [...dp];

    while (parentPath.length > 0) {
      parentPath.pop();
      const { routePath } = parseRoutePath(parentPath);
      const parent = routes.get(routePath);
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
    routeDir,
    routePath,
    routeTest,
  } of modules) {
    let route = routes.get(routePath);
    if (!route) {
      route = {
        path: routePath,
        test: routeTest,
        modules: [],
        loaded: false,
        elements: {},
      };
      routes.set(routePath, route);
    }

    const parent = findParent(routeDir);
    if (parent) {
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
