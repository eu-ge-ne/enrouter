import * as path from "node:path";

import { glob } from "glob";

import { type Plugin } from "vite";

const virtualModuleId = "virtual:routeModules";
const resolvedVirtualModuleId = "\0" + virtualModuleId;

interface RouteModulesParams {
  routeModulesPath: string;
}

export function routeModules({ routeModulesPath }: RouteModulesParams): Plugin {
  let pathRoot: string;

  return {
    name: "vite-plugin-route-modules",
    configResolved(config) {
      pathRoot = config.root;
    },
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id) {
      if (id !== resolvedVirtualModuleId) {
        return null;
      }

      const pathPrefix = path.resolve(routeModulesPath);

      const files = await glob(path.resolve(pathPrefix, "**/_*.tsx"));
      const resolves = await Promise.all(files.map((x) => this.resolve(x)));

      const modules = resolves
        .map((x, i) =>
          x
            ? {
                key: files[i]!.slice(pathRoot.length + 1),
                path: files[i]!.slice(pathPrefix.length + 1),
                id: x.id,
              }
            : undefined,
        )
        .filter((x) => x !== undefined);

      const str = modules
        .map(
          ({ key, path, id }) => `
"${key}": {
  dirPath: ${JSON.stringify(path.split("/").slice(0, -1))},
  fileName: "${path.split("/").at(-1)}",
  load: () => import("${id}"),
},
`,
        )
        .join("");

      return `
import { buildRoutes, buildRouteHandlers } from "enrouter";

export const modules = {
  ${str}
};

export const routes = buildRoutes({ modules });

export const handlers = buildRouteHandlers(routes);
`;
    },
  };
}
