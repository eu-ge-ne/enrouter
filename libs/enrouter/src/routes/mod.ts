import { createLog } from "#log.js";

import type { RouteModules } from "#modules.js";
import type { ModuleAssets } from "#assets.js";

const log = createLog("routes");

export interface Route {
  /**
   * Route's path
   * @see https://github.com/lukeed/regexparam
   */
  path: string;

  mod: string[];

  /**
   * Urls of assets associated with the route
   */
  link: {
    css: string[];
    mod: string[];
  };

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
  log("Building routes");

  function updateAssets({ link }: Route, moduleId: string): void {
    const x = assets[moduleId];
    if (x) {
      link.mod = [...new Set([...link.mod, ...x.modules])];
      link.css = [...new Set([...link.css, ...x.styles])];
    }
  }

  const entries = Object.entries(modules)
    .map(([key, val]) => [key, val.path.split("/").slice(0, -1)] as const)
    .sort((a, b) => a[1].length - b[1].length);

  const routesByFullPath = new Map<string, Route>();

  for (const [moduleId, filePath] of entries) {
    const routePath = ("/" + filePath.join("/")).replace(/\[(.+)\]/, ":$1");
    const parentPath =
      routePath === "/"
        ? undefined
        : ("/" + filePath.slice(0, -1).join("/")).replace(/\[(.+)\]/, ":$1");

    let route = routesByFullPath.get(routePath);
    if (!route) {
      route = {
        path: routePath,
        link: { css: [], mod: [] },
        mod: [],
      };
    }
    routesByFullPath.set(routePath, route);

    if (parentPath) {
      const parent = routesByFullPath.get(parentPath)!;
      if (!parent.tree?.find((x) => x.path === routePath)) {
        if (!parent.tree) {
          parent.tree = [];
        }
        parent.tree.push(route);
      }
    }

    route.mod.push(moduleId);

    if (!parentPath) {
      updateAssets(route, entryId);
    }
    updateAssets(route, moduleId);
  }

  const routeTree = routesByFullPath.get("/");

  log("Routes built: %O", routeTree);

  return routeTree;
}
