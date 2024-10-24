import { resolve } from "node:path";
import { format } from "node:util";

import type { Plugin } from "vite";
import { glob } from "glob";

import { buildModuleTree } from "./modules.js";
import { compileRouteTree } from "./compile.js";

const moduleId = "virtual:enrouter";
const resolvedModuleId = "\0" + moduleId;

export interface EnrouterPluginOptions {
  path: string;
}

export default function plugin(params: EnrouterPluginOptions): Plugin {
  let rootPath: string;

  return {
    name: "vite-plugin-enrouter",
    configResolved(config) {
      rootPath = config.root;
    },
    resolveId(id) {
      if (id === moduleId) {
        return resolvedModuleId;
      }
    },
    async load(id) {
      if (id !== resolvedModuleId) {
        return null;
      }

      const routesPath = resolve(params.path);

      this.info(() => format("Searching modules in %s", routesPath));

      const files = await glob(resolve(routesPath, "**/_*.tsx"));
      const resolves = await Promise.all(
        files.map(async (x) => {
          const y = await this.resolve(x);
          if (y) {
            this.debug(() => format("Found module: %s", y.id));
          }
          return y;
        }),
      );

      const resolvedFiles = resolves
        .map((x, i) => (x ? { file: files[i]!, resolvedId: x.id } : undefined))
        .filter((x) => x !== undefined);

      this.info(() => format("Found %d modules", resolvedFiles.length));

      this.debug(() => "Building module tree");

      const routeModules = buildModuleTree({
        rootPath,
        routesPath,
        resolvedFiles,
      });

      this.debug(() => format("Module tree: %o", routeModules));

      const compiled = compileRouteTree(routeModules);

      return compiled;
    },
  };
}
