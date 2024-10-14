import * as regexparam from "regexparam";

import { logger } from "#lib/debug.js";

import type { Route } from "#lib/route/mod.js";

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

export function routeToJS(
  route: Route,
  getLoad: (id: string) => string,
  tab = 0,
): string {
  const tree = route.tree
    ? route.tree.map((x) => routeToJS(x, getLoad, 4))
    : undefined;
  const treeStr = tree
    ? `[
${tree.join(",\n")}
  ]`
    : undefined;

  const mods = route.modules
    .map(
      (x) => `
{
    id: "${x.id}",
    fileName: "${x.fileName}",
    load: ${getLoad(x.id)},
}`,
    )
    .join(",")
    .replace(/^/gm, " ".repeat(4));

  return `{
    path: "${route.path}",
    test: {
      keys: [${route.test.keys.map((x) => "${x}").join(",")}],
      pattern: ${route.test.pattern},
    },
    modules: [${mods}],
    loaded: false,
    elements: {},
    tree: ${treeStr},
}`.replace(/^/gm, " ".repeat(tab));
}
