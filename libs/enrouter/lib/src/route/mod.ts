import { logger } from "#lib/debug.js";

import type { RouteModules } from "#lib/modules.js";

const log = logger("route");

/**
 * Base building block of routing.
 * Routes are orginized into a tree.
 * Every branch of the tree maps a segment of url to a code and its assets.
 * The code will generate the UI which corresponds to the segment of the url.
 */
export interface Route {
  /**
   * Full path to url segment
   * @see https://github.com/lukeed/regexparam
   */
  path: string;

  /**
   * Ids of route's modules
   */
  mod: string[];

  /**
   * Child routes
   */
  tree?: Route[];
}

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

  for (const [moduleId, { dirPath }] of entries) {
    const isRoot = dirPath.length === 0;

    const path = isRoot ? "/" : parsePath("/" + dirPath.join("/"));

    let route = routes.get(path);
    if (!route) {
      route = {
        path,
        mod: [],
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

    route.mod.push(moduleId);
  }

  const result = routes.get("/");

  log("Routes built: %o", routes);

  return result;
}

function parsePath(str: string) {
  return str.replace(/\[(.+)\]/, ":$1");
}
