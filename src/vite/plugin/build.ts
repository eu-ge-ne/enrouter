import { parseRoutePath } from "./modules.js";
import type { Route } from "#lib/route/mod.js";
import type { RouteModules } from "./modules.js";

export function buildRouteTree(modules: RouteModules[]): Route {
  const routes = new Map<string, Route>();

  function findParent(dp: string[]): Route | undefined {
    if (dp.length === 0) {
      return;
    }

    const parentPath = [...dp];

    while (parentPath.length > 0) {
      parentPath.pop();
      const { path } = parseRoutePath(parentPath);
      const parent = routes.get(path);
      if (parent) {
        return parent;
      }
    }

    throw new Error("Parent not found");
  }

  const sorted = modules.sort((a, b) => a.dir.length - b.dir.length);

  for (const { dir, path, test, modules } of sorted) {
    let route = routes.get(path);
    if (!route) {
      route = {
        path,
        test,
        modules: modules.map(({ importStr, ...x }) => x),
        loaded: false,
        elements: {},
      };
      routes.set(path, route);
    }

    const parent = findParent(dir);
    if (parent) {
      parent.tree = parent.tree ?? [];
      parent.tree.push(route);
    }
  }

  const root = routes.get("/");
  if (!root) {
    throw new Error("Routes were not built");
  }

  return root;
}
