import { resolve } from "node:path";

import { type Plugin } from "vite";
import { glob } from "glob";

import { buildRoutes } from "./build.js";
import { compileRoutes } from "./compile.js";
import { parseRoutePath } from "./modules.js";
import { type RouteModules } from "./modules.js";

const virtualModuleId = "virtual:routes";
const resolvedVirtualModuleId = "\0" + virtualModuleId;

export interface RoutesParams {
  routesFsPath: string;
}

export function routes({ routesFsPath }: RoutesParams): Plugin {
  let rootPath: string;

  return {
    name: "vite-plugin-routes",
    configResolved(config) {
      rootPath = config.root;
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

      const _files = await glob(resolve(prefix, "**/_*.tsx"));
      const _resolves = await Promise.all(_files.map((x) => this.resolve(x)));

      const resolvedFiles = _resolves
        .map((x, i) => (x ? { file: _files[i]!, resolvedId: x.id } : undefined))
        .filter((x) => x !== undefined);

      const routeModules: RouteModules = resolvedFiles
        .map((x) => {
          const routeDir = x.file
            .slice(prefix.length + 1)
            .split("/")
            .slice(0, -1);

          const module = {
            id: x.file.slice(rootPath.length + 1),
            fileName: x.file
              .slice(prefix.length + 1)
              .split("/")
              .at(-1)!,
            importFn: () => import(x.resolvedId),
            importStr: `() => import("${x.resolvedId}")`,

            routeDir,
            ...parseRoutePath(routeDir),
          };

          return module;
        })
        .sort((a, b) => a.routeDir.length - b.routeDir.length);

      const routes = buildRoutes(routeModules);
      const source = compileRoutes(routeModules, routes);

      const str = `export const routes = ${source};`;

      this.info("module: " + str);

      return str;
    },
  };
}
