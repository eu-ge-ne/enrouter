import { resolve } from "node:path";

import { type Plugin } from "vite";
import { glob } from "glob";

import { compileRoutes } from "./compile.js";
import { buildModuleTree } from "./modules.js";

const virtualModuleId = "virtual:routes";
const resolvedVirtualModuleId = "\0" + virtualModuleId;

export interface RoutesParams {
  path: string;
}

export function routes(params: RoutesParams): Plugin {
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

      const routesPath = resolve(params.path);

      const _files = await glob(resolve(routesPath, "**/_*.tsx"));
      const _resolves = await Promise.all(_files.map((x) => this.resolve(x)));

      const resolvedFiles = _resolves
        .map((x, i) => (x ? { file: _files[i]!, resolvedId: x.id } : undefined))
        .filter((x) => x !== undefined);

      const routeModules = buildModuleTree({
        rootPath,
        routesPath,
        resolvedFiles,
      });

      const compiled = compileRoutes(routeModules);

      this.info("module: " + compiled);

      return compiled;
    },
  };
}
