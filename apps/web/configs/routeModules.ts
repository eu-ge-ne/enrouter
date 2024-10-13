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
    name: "rollup-plugin-route-modules",
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

      const mods = await Promise.all(
        files.map((file) =>
          this.resolve(file).then((resolved) => [file, resolved!.id] as const),
        ),
      );

      const modules = mods
        .map(
          ([file, id]) => `
"${file.slice(pathRoot.length + 1)}": {
  path: "${file.slice(pathPrefix.length + 1)}",
  load: () => import("${id}"),
},
`,
        )
        .join("");

      return `
export const modules = {
  ${modules}
};
`;
    },
  };
}

/*
      const ids = this.getModuleIds();
      //console.dir({ a, b }, { depth: null });
      for (const id of ids) {
        if (id.endsWith("_layout.tsx") || id.endsWith("main.tsx")) {
          const info = this.getModuleInfo(id);
          const imports = info?.importedIds;
          const impRes = info?.importedIdResolutions;
          console.dir({ id, imports, impRes, info });
        }
      }
      return null;
      */

/*
      Hello from virtual module
      {
        modules: {
          'src/app/_notFound.tsx': { path: '_notFound.tsx', load: [Function: src/app/_notFound.tsx] },
          'src/app/_layout.tsx': { path: '_layout.tsx', load: [Function: src/app/_layout.tsx] },
          'src/app/_index.tsx': { path: '_index.tsx', load: [Function: src/app/_index.tsx] },
          'src/app/docs/_notFound.tsx': {
            path: 'docs/_notFound.tsx',
            load: [Function: src/app/docs/_notFound.tsx]
          },
          'src/app/docs/_layout.tsx': {
            path: 'docs/_layout.tsx',
            load: [Function: src/app/docs/_layout.tsx]
          },
          'src/app/docs/_index.tsx': {
            path: 'docs/_index.tsx',
            load: [Function: src/app/docs/_index.tsx]
          },
          'src/app/docs/start/_layout.tsx': {
            path: 'docs/start/_layout.tsx',
            load: [Function: src/app/docs/start/_layout.tsx]
          },
          'src/app/docs/features/_layout.tsx': {
            path: 'docs/features/_layout.tsx',
            load: [Function: src/app/docs/features/_layout.tsx]
          },
*/
