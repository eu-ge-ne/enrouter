import { logger } from "#debug.js";

import type { RouteModules } from "#modules.js";

import { updateRouteAssets } from "./assets.js";

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
   * Urls of assets associated with the route
   */
  link: [string[], string[]]; // [styles[], modules[]]

  /**
   * Child routes
   */
  tree?: Route[];
}

export interface BuildRoutesWithViteManifestParams {
  modules: RouteModules;
  manifest: unknown;
  mapAssetUrl: (x: string) => string;
  entryId: string;
}

/**
 * Builds `Route`s from `RouteModules` and Vite manifest
 */
export function buildRoutesWithViteManifest({
  modules,
  manifest,
  mapAssetUrl,
  entryId,
}: BuildRoutesWithViteManifestParams): Route | undefined {
  log("Building routes");

  const entries = Object.entries(modules)
    .map(([key, val]) => [key, val.path.split("/").slice(0, -1)] as const)
    .sort((a, b) => a[1].length - b[1].length);

  const routes = new Map<string, Route>();

  function findParent(filePath: string[]) {
    const parentPath = [...filePath];

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
      const parent = findParent(filePath);
      if (!parent.tree?.find((x) => x.path === path)) {
        if (!parent.tree) {
          parent.tree = [];
        }
        parent.tree.push(route);
      }
    }

    route.mod.push(moduleId);

    if (isRoot) {
      updateRouteAssets(manifest, mapAssetUrl, route, entryId);
    }
    updateRouteAssets(manifest, mapAssetUrl, route, moduleId);
  }

  const result = routes.get("/");

  log("Routes built: %o", routes);

  return result;
}

function parsePath(str: string) {
  return str.replace(/\[(.+)\]/, ":$1");
}
