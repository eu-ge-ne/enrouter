import type { Route } from "#lib/route/mod.js";
import type { RouteModules } from "./modules.js";

export function compileRoutes(
  modules: RouteModules[],
  route: Route,
  tab = 0,
): string {
  const tree = route.tree
    ? route.tree.map((x) => compileRoutes(modules, x, 4))
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
    importFn: ${modules.find(({ routePath }) => routePath === route.path)!.routeModules.find(({ id }) => id === x.id)?.importStr},
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
