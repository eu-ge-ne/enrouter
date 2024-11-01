import * as vm from "node:vm";

import { describe, test, expect } from "vitest";
import * as regexparam from "regexparam";

import type { Route } from "#lib/route/mod.js";
import type { RouteModules } from "./modules.js";
import { buildRouteTree } from "./build.js";
import { compileRouteTree } from "./compile.js";

describe("compileRouteTree", () => {
  test("from 0 modules", () => {
    expect(() => compileRouteTree([])).toThrowErrorMatchingSnapshot();
  });

  test("from 1 module", async () => {
    const modules: RouteModules[] = [
      {
        dir: [],
        path: "/",
        test: regexparam.parse("/", true),
        modules: [
          {
            id: "src/_layout.tsx",
            fileName: "_layout.tsx",
            importFn: async () => {},
            importStr: '() => import("/home/src/_layout.tsx")',
          },
        ],
      },
    ];

    const builtTree = buildRouteTree(modules);

    const compiled = compileRouteTree(modules);
    const compiledTree = await getCompiledTree(compiled);

    deleteImports(builtTree);
    deleteImports(compiledTree);

    expect(builtTree).toEqual(compiledTree);
  });

  test("from 2 modules", async () => {
    const modules: RouteModules[] = [
      {
        dir: [],
        path: "/",
        test: regexparam.parse("/", true),
        modules: [
          {
            id: "src/_layout.tsx",
            fileName: "_layout.tsx",
            importFn: async () => {},
            importStr: '() => import("/home/src/_layout.tsx")',
          },
        ],
      },
      {
        dir: ["abc"],
        path: "/abc",
        test: regexparam.parse("/abc", true),
        modules: [
          {
            id: "src/abc/_layout.tsx",
            fileName: "_layout.tsx",
            importFn: async () => {},
            importStr: '() => import("/home/src/abc/_layout.tsx")',
          },
        ],
      },
    ];

    const builtTree = buildRouteTree(modules);

    const compiled = compileRouteTree(modules);
    const compiledTree = await getCompiledTree(compiled);

    deleteImports(builtTree);
    deleteImports(compiledTree);

    expect(builtTree).toEqual(compiledTree);
  });

  test("from 3 modules", async () => {
    const modules: RouteModules[] = [
      {
        dir: [],
        path: "/",
        test: regexparam.parse("/", true),
        modules: [
          {
            id: "src/_layout.tsx",
            fileName: "_layout.tsx",
            importFn: async () => {},
            importStr: '() => import("/home/src/_layout.tsx")',
          },
        ],
      },
      {
        dir: ["xyz"],
        path: "/xyz",
        test: regexparam.parse("/xyz", true),
        modules: [
          {
            id: "src/xyz/_layout.tsx",
            fileName: "_layout.tsx",
            importFn: async () => {},
            importStr: '() => import("/home/src/xyz/_layout.tsx")',
          },
          {
            id: "src/xyz/_content.tsx",
            fileName: "_content.tsx",
            importFn: async () => {},
            importStr: '() => import("/home/src/xyz/_content.tsx")',
          },
        ],
      },
    ];

    const builtTree = buildRouteTree(modules);

    const compiled = compileRouteTree(modules);
    const compiledTree = await getCompiledTree(compiled);

    deleteImports(builtTree);
    deleteImports(compiledTree);

    expect(builtTree).toEqual(compiledTree);
  });
});

async function getCompiledTree(compiled: string): Promise<Route> {
  const script = new vm.SourceTextModule(compiled, {
    context: vm.createContext({}),
  });
  //@ts-ignore
  await script.link(() => {});
  await script.evaluate();
  //@ts-ignore
  return script.namespace.default;
}

function deleteImports(route: Route) {
  for (const mod of route.modules) {
    //@ts-ignore
    delete mod.importFn;
  }
  if (route.tree) {
    for (const child of route.tree) {
      deleteImports(child);
    }
  }
}
