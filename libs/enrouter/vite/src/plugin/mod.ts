import { resolve } from "node:path";

import { glob } from "glob";
import { type Plugin } from "vite";

import { type RouteModules, buildRoutes } from "./build.js";

const virtualModuleId = "virtual:routes";
const resolvedVirtualModuleId = "\0" + virtualModuleId;

export interface RoutesParams {
  routesFsPath: string;
}

export function routes({ routesFsPath }: RoutesParams): Plugin {
  let pathRoot: string;

  return {
    name: "vite-plugin-routes",
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

      const prefix = resolve(routesFsPath);

      const files = await glob(resolve(prefix, "**/_*.tsx"));
      const resolves = await Promise.all(files.map((x) => this.resolve(x)));
      const ids = files.map((x) => x.slice(pathRoot.length + 1));
      const dirs = files.map((x) =>
        x
          .slice(prefix.length + 1)
          .split("/")
          .slice(0, -1),
      );
      const fileNames = files.map(
        (x) =>
          x
            .slice(prefix.length + 1)
            .split("/")
            .at(-1)!,
      );

      const routeModules: RouteModules = resolves
        .map((x, i) =>
          x
            ? {
                moduleId: ids[i]!,
                dir: dirs[i]!,
                fileName: fileNames[i]!,
                importFn: async () => undefined, //importFn: () => import(x.id),
                importStr: `() => import("${x.id}")`,
              }
            : undefined,
        )
        .filter((x) => x !== undefined);

      //this.info("routeModules: " + JSON.stringify(routeModules, null, 2));

      const routes = buildRoutes(routeModules);

      const result = `export const routes = ${routes};`;

      this.info("module: " + result);

      return result;
    },
  };
}
