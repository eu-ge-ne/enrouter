import * as path from "node:path";

import { globSync } from "glob";

import { type Plugin } from "vite";

const virtualModuleId = "virtual:routeModules";
const resolvedVirtualModuleId = "\0" + virtualModuleId;

export function routeModules(): Plugin {
  return {
    name: "rollup-plugin-route-modules",
    /*
    configResolved(config) {
      // console.log(config);
    },
    */
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id) {
      if (id !== resolvedVirtualModuleId) {
        return null;
      }

      const files = globSync("src/app/**/_*.tsx");
      let src = "const globs = {\n";
      for (const file of files) {
        const { id } = (await this.resolve(file))!;
        src += `"${file}": () => import("${id}"),\n`;
      }
      src += "};\n";

      return `
import { buildRouteModulesFromViteGlobs } from "enrouter";

${src}

console.log({ globs });

export const modules = buildRouteModulesFromViteGlobs({
  //globs: import.meta.glob(["/src/app/**/_*.tsx"]),
  globs,
  moduleId: (key) => key,//.slice("/".length),
  path: (key) => key.slice("src/app/".length),
});

console.log("Hello from virtual module");
console.log({ modules });
//console.log({ globs: import.meta.glob(["/src/app/**/_*.tsx"]) });
`;
    },
  };
}

/*
  globs: Object.assign({
    "/src/app/_index.tsx": () => t(() => import("./_index-BKW5TgZb.js"), []),
    "/src/app/_layout.tsx": () => t(() => import("./_layout-unFGLFUy.js"), []),
    "/src/app/_notFound.tsx": () =>
*/

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
