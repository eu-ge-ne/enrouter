import * as vm from "node:vm";

import { describe, test, expect } from "vitest";
import * as regexparam from "regexparam";

import { buildRoutes } from "./build.js";
import { compileRoutes } from "./compile.js";

import type { Route } from "#lib/route/mod.js";
import type { RouteModules } from "./modules.js";

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
            id: "src/_layout.tsx",
            fileName: "_layout.tsx",
            importFn: async () => undefined,
            importStr: '() => import("/home/src/_layout.tsx")',
          },
        ],
      },
    ];

    const builtRoutes = buildRoutes(modules);

    const compiled = compileRoutes(modules);
    const compiledRoutes = await getCompiledRoutes(compiled);

    builtRoutes.modules.forEach(
      (x) =>
        //@ts-ignore
        delete x.importFn,
    );
    compiledRoutes.modules.forEach(
      (x) =>
        //@ts-ignore
        delete x.importFn,
    );

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
            id: "src/_layout.tsx",
            fileName: "_layout.tsx",
            importFn: async () => undefined,
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
            importFn: async () => undefined,
            importStr: '() => import("/home/src/abc/_layout.tsx")',
          },
        ],
      },
    ];

    const builtRoutes = buildRoutes(modules);

    const compiled = compileRoutes(modules);
    const compiledRoutes = await getCompiledRoutes(compiled);

    builtRoutes.modules.forEach(
      (x) =>
        //@ts-ignore
        delete x.importFn,
    );
    builtRoutes.tree![0]!.modules.forEach(
      (x) =>
        //@ts-ignore
        delete x.importFn,
    );
    compiledRoutes.modules.forEach(
      (x) =>
        //@ts-ignore
        delete x.importFn,
    );
    compiledRoutes.tree![0]!.modules.forEach(
      (x) =>
        //@ts-ignore
        delete x.importFn,
    );

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
            id: "src/_layout.tsx",
            fileName: "_layout.tsx",
            importFn: async () => undefined,
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
            importFn: async () => undefined,
            importStr: '() => import("/home/src/xyz/_layout.tsx")',
          },
          {
            id: "src/xyz/_index.tsx",
            fileName: "_index.tsx",
            importFn: async () => undefined,
            importStr: '() => import("/home/src/xyz/_layout.tsx")',
          },
        ],
      },
    ];

    const builtRoutes = buildRoutes(modules);

    const compiled = compileRoutes(modules);
    const compiledRoutes = await getCompiledRoutes(compiled);

    builtRoutes.modules.forEach(
      (x) =>
        //@ts-ignore
        delete x.importFn,
    );
    builtRoutes.tree![0]!.modules.forEach(
      (x) =>
        //@ts-ignore
        delete x.importFn,
    );
    compiledRoutes.modules.forEach(
      (x) =>
        //@ts-ignore
        delete x.importFn,
    );
    compiledRoutes.tree![0]!.modules.forEach(
      (x) =>
        //@ts-ignore
        delete x.importFn,
    );

    expect(builtRoutes).toEqual(compiledRoutes);
  });
});
