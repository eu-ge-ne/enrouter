import type { RouteModules } from "#modules.js";
import type { ModuleAssets } from "#assets.js";

/**
Route is a base building block of routing definition.
Routes form a tree of routes.
Every branch of the tree maps a segment of url pathname to some code and its
assets. That code will generate the UI which corresponds to the segment of
url pathname.
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
   * Urls of assets associated with the route
   */
  link: [string[], string[]]; // css, modules

  /**
   * Child routes
   */
  tree?: Route[];
}

export interface BuildRoutesParams {
  entryId: string;
  modules: RouteModules;
  assets: ModuleAssets;
}

export function buildRoutes({
  entryId,
  modules,
  assets,
}: BuildRoutesParams): Route | undefined {
  function updateLinks({ link }: Route, moduleId: string): void {
    const x = assets[moduleId];
    if (x) {
      link[0] = [...new Set([...link[0], ...x.styles])];
      link[1] = [...new Set([...link[1], ...x.modules])];
    }
  }

  const entries = Object.entries(modules)
    .map(([key, val]) => [key, val.path.split("/").slice(0, -1)] as const)
    .sort((a, b) => a[1].length - b[1].length);

  const routes = new Map<string, Route>();

  for (const [moduleId, filePath] of entries) {
    const isRoot = filePath.length === 0;

    const path = isRoot ? "/" : parsePath("/" + filePath.join("/"));

    let route = routes.get(path);
    if (!route) {
      route = {
        path,
        link: [[], []],
        mod: [],
      };
      routes.set(path, route);
    }

    if (!isRoot) {
      const parentPath = parsePath("/" + filePath.slice(0, -1).join("/"));
      const parent = routes.get(parentPath)!;
      if (!parent.tree?.find((x) => x.path === path)) {
        if (!parent.tree) {
          parent.tree = [];
        }
        parent.tree.push(route);
      }
    }

    route.mod.push(moduleId);

    if (isRoot) {
      updateLinks(route, entryId);
    }
    updateLinks(route, moduleId);
  }

  return routes.get("/");
}

function parsePath(str: string) {
  return str.replace(/\[(.+)\]/, ":$1");
}
