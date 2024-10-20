import { resolve } from "node:path";
import { format } from "node:util";

import { type Plugin } from "vite";
import { glob } from "glob";

import { compileRoutes } from "./compile.js";
import { buildModuleTree } from "./modules.js";

const moduleId = "virtual:enrouter/vite/routes";
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

      this.info(format("Searching modules in %s", routesPath));

      const files = await glob(resolve(routesPath, "**/_*.tsx"));
      const resolves = await Promise.all(
        files.map((x) => {
          return this.resolve(x).then((y) => {
            if (y) {
              this.info(format("Found module: %s", y.id));
            }
            return y;
          });
        }),
      );

      const resolvedFiles = resolves
        .map((x, i) => (x ? { file: files[i]!, resolvedId: x.id } : undefined))
        .filter((x) => x !== undefined);

      this.info(format("Found %d modules", resolvedFiles.length));

      this.info("Building module tree");

      const routeModules = buildModuleTree({
        rootPath,
        routesPath,
        resolvedFiles,
      });

      this.info(format("Module tree: %o", routeModules));

      const compiled = compileRoutes(routeModules);

      return compiled;
    },
  };
}
