import { resolve } from "node:path";
import { format } from "node:util";

import type { Plugin } from "vite";
import { glob } from "glob";

import { buildModuleTree } from "./modules.js";
import { compileRouteTree } from "./compile.js";

const moduleId = "virtual:enrouter";
const resolvedModuleId = "\0" + moduleId;
const globPattern = "**/{_layout.tsx,_content.tsx,_void.tsx}";

export interface EnrouterPluginOptions {
  path: string;
}

export default function plugin(params: EnrouterPluginOptions): Plugin {
  let rootPath: string;
  let routesPath: string;
  let routeFiles: string[];

  return {
    name: "vite-plugin-enrouter",
    async config(config) {
      rootPath = config.root || process.cwd();
      routesPath = resolve(params.path);
      routeFiles = await glob(resolve(routesPath, globPattern));

      if (config.build?.lib) {
        return {
          build: {
            lib: {
              entry: routeFiles,
            },
          },
        };
      }

      return {
        build: {
          rollupOptions: {
            input: routeFiles,
          },
        },
        optimizeDeps: {
          exclude: ["virtual:enrouter"],
        },
      };
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

      const resolves = await Promise.all(
        routeFiles.map(async (x) => {
          const y = await this.resolve(x);
          if (y) {
            this.debug(() => format("Found module: %s", y.id));
          }
          return y;
        }),
      );

      const resolvedFiles = resolves
        .map((x, i) =>
          x ? { file: routeFiles[i]!, resolvedId: x.id } : undefined,
        )
        .filter((x) => x !== undefined);

      this.info(() => format("Found %d route files", resolvedFiles.length));

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
