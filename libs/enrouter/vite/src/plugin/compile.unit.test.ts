import * as vm from "node:vm";

import { describe, test, expect } from "vitest";
import * as regexparam from "regexparam";

import { buildRoutes } from "./build.js";
import { compileRoutes } from "./compile.js";

import type { Route } from "#lib/route/mod.js";
import type { RouteModules } from "./modules.js";

describe("compileRoutes", () => {
  test("from 0 modules", () => {
    expect(() => compileRoutes([])).toThrowErrorMatchingSnapshot();
  });

  test("from 1 module", async () => {
    const modules: RouteModules[] = [
      {
        dir: [],
        path: "/",
        test: regexparam.parse("/", true),
        modules: [
          {
            id: "src/_this.tsx",
            fileName: "_this.tsx",
            importFn: async () => {},
            importStr: '() => import("/home/src/_this.tsx")',
          },
        ],
      },
    ];

    const builtRoutes = buildRoutes(modules);

    const compiled = compileRoutes(modules);
    const compiledRoutes = await getCompiledRoutes(compiled);

    deleteImports(builtRoutes);
    deleteImports(compiledRoutes);

    expect(builtRoutes).toEqual(compiledRoutes);
  });

  test("from 2 modules", async () => {
    const modules: RouteModules[] = [
      {
        dir: [],
        path: "/",
        test: regexparam.parse("/", true),
        modules: [
          {
            id: "src/_this.tsx",
            fileName: "_this.tsx",
            importFn: async () => {},
            importStr: '() => import("/home/src/_this.tsx")',
          },
        ],
      },
      {
        dir: ["abc"],
        path: "/abc",
        test: regexparam.parse("/abc", true),
        modules: [
          {
            id: "src/abc/_this.tsx",
            fileName: "_this.tsx",
            importFn: async () => {},
            importStr: '() => import("/home/src/abc/_this.tsx")',
          },
        ],
      },
    ];

    const builtRoutes = buildRoutes(modules);

    const compiled = compileRoutes(modules);
    const compiledRoutes = await getCompiledRoutes(compiled);

    deleteImports(builtRoutes);
    deleteImports(compiledRoutes);

    expect(builtRoutes).toEqual(compiledRoutes);
  });

  test("from 3 modules", async () => {
    const modules: RouteModules[] = [
      {
        dir: [],
        path: "/",
        test: regexparam.parse("/", true),
        modules: [
          {
            id: "src/_this.tsx",
            fileName: "_this.tsx",
            importFn: async () => {},
            importStr: '() => import("/home/src/_this.tsx")',
          },
        ],
      },
      {
        dir: ["xyz"],
        path: "/xyz",
        test: regexparam.parse("/xyz", true),
        modules: [
          {
            id: "src/xyz/_this.tsx",
            fileName: "_this.tsx",
            importFn: async () => {},
            importStr: '() => import("/home/src/xyz/_this.tsx")',
          },
          {
            id: "src/xyz/_index.tsx",
            fileName: "_index.tsx",
            importFn: async () => {},
            importStr: '() => import("/home/src/xyz/_this.tsx")',
          },
        ],
      },
    ];

    const builtRoutes = buildRoutes(modules);

    const compiled = compileRoutes(modules);
    const compiledRoutes = await getCompiledRoutes(compiled);

    deleteImports(builtRoutes);
    deleteImports(compiledRoutes);

    expect(builtRoutes).toEqual(compiledRoutes);
  });
});

async function getCompiledRoutes(compiled: string): Promise<Route> {
  const script = new vm.SourceTextModule(compiled, {
    context: vm.createContext({}),
  });
  //@ts-ignore
  await script.link(() => {});
  await script.evaluate();
  //@ts-ignore
  return script.namespace.routes;
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
