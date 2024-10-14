import * as regexparam from "regexparam";

import type { Route } from "#lib/route/mod.js";

export type RouteModules = {
  moduleId: string;
  dir: string[];
  fileName: string;
  importFn: () => Promise<unknown>;
  importStr: string;
}[];

/**
 * Builds `Route`s from `RouteModules`
 */
export function buildRoutes(modules: RouteModules): string {
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

  for (const { moduleId, dir, fileName, importFn } of sorted) {
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
      id: moduleId,
      fileName,
      importFn,
    });
  }

  const root = routes.get("/");
  if (!root) {
    throw new Error("Routes were not built");
  }

  return toJS(root, modules);
}

function parsePath(str: string) {
  return str.replace(/\[(.+)\]/, ":$1");
}

function toJS(route: Route, modules: RouteModules, tab = 0): string {
  const tree = route.tree
    ? route.tree.map((x) => toJS(x, modules, 4))
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
    importFn: ${modules.find(({ moduleId }) => moduleId === x.id)?.importStr},
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
