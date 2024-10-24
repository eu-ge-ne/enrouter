import { parseRoutePath } from "./modules.js";

import type { RouteModules } from "./modules.js";

interface RouteProps {
  props: string;
  tree?: RouteProps[];
}

export function compileRouteTree(modules: RouteModules[]): string {
  const routes = new Map<string, RouteProps>();

  function findParent(dp: string[]): RouteProps | undefined {
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
      const mods = modules
        .map((x) =>
          `{
  id: "${x.id}",
  fileName: "${x.fileName}",
  importFn: ${x.importStr},
}`.replace(/^/gm, " ".repeat(2)),
        )
        .join(",\n");

      route = {
        props: `path: "${path}",
test: {
  keys: [${test.keys.map((x) => "${x}").join(",")}],
  pattern: ${test.pattern},
},
modules: [
${mods}
],
loaded: false,
elements: {},`.replace(/^/gm, " ".repeat(2)),
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
    throw new Error("Routes were not compiled");
  }

  return `export default ${compileProps(root)};`;
}

function compileProps(route: RouteProps, tab = 0): string {
  const tree = route.tree
    ? `
tree: [
${route.tree.map((x) => compileProps(x, 2)).join(",\n")}
]`.replace(/^/gm, " ".repeat(2))
    : "";

  const res = `{
${route.props}${tree}
}`;

  return res.replace(/^/gm, " ".repeat(tab));
}
