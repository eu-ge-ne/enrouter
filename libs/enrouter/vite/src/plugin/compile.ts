import { parseRoutePath } from "./modules.js";

import type { Route } from "#lib/route/mod.js";
import type { RouteModules } from "./modules.js";

export function compileRoutes(routeModules: RouteModules[]): string {
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

  const sorted = routeModules.sort((a, b) => a.dir.length - b.dir.length);

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

  return `export const routes = ${compile(routeModules, root)};`;
}

function compile(routeModules: RouteModules[], route: Route, tab = 0): string {
  const tree = route.tree
    ? route.tree.map((x) => compile(routeModules, x, 4))
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
    importFn: ${routeModules.find(({ path }) => path === route.path)!.modules.find(({ id }) => id === x.id)?.importStr},
}`,
    )
    .join(",")
    .replace(/^/gm, " ".repeat(4));

  let res = `{
    path: "${route.path}",
    test: {
      keys: [${route.test.keys.map((x) => "${x}").join(",")}],
      pattern: ${route.test.pattern},
    },
    modules: [${mods}],
    loaded: false,
    elements: {},
`;
  if (tree) {
    res += `    tree: ${treeStr},
`;
  }

  res += "}";

  return res.replace(/^/gm, " ".repeat(tab));
}
