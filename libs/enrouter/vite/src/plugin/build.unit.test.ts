import { describe, test, expect } from "vitest";

import { buildRoutes } from "./build.js";

import type { RouteModules } from "./modules.js";

describe("buildRoutes", () => {
  test("from 0 modules", () => {
    expect(() => buildRoutes([])).toThrowErrorMatchingSnapshot();
  });

  test("from 1 module", () => {
    const modules: RouteModules = [
      {
        id: "src/_layout.tsx",
        fileName: "_layout.tsx",
        importFn: async () => undefined,
        importStr: '() => import("/home/src/_layout.tsx")',

        routeDir: [],
        isRootRoute: true,
        routePath: "/",
      },
    ];

    expect(buildRoutes(modules)).toMatchSnapshot();
  });

  test("from 2 modules", () => {
    const modules: RouteModules = [
      {
        id: "src/_layout.tsx",
        fileName: "_layout.tsx",
        importFn: async () => undefined,
        importStr: '() => import("/home/src/_layout.tsx")',

        routeDir: [],
        isRootRoute: true,
        routePath: "/",
      },
      {
        id: "src/abc/_layout.tsx",
        fileName: "_layout.tsx",
        importFn: async () => undefined,
        importStr: '() => import("/home/src/abc/_layout.tsx")',

        routeDir: ["abc"],
        isRootRoute: false,
        routePath: "/abc",
      },
    ];

    expect(buildRoutes(modules)).toMatchSnapshot();
  });

  test("from 3 modules", () => {
    const modules: RouteModules = [
      {
        id: "src/_layout.tsx",
        fileName: "_layout.tsx",
        importFn: async () => undefined,
        importStr: '() => import("/home/src/_layout.tsx")',

        routeDir: [],
        isRootRoute: true,
        routePath: "/",
      },
      {
        id: "src/xyz/_layout.tsx",
        fileName: "_layout.tsx",
        importFn: async () => undefined,
        importStr: '() => import("/home/src/xyz/_layout.tsx")',

        routeDir: ["xyz"],
        isRootRoute: false,
        routePath: "/xyz",
      },
      {
        id: "src/xyz/_index.tsx",
        fileName: "_index.tsx",
        importFn: async () => undefined,
        importStr: '() => import("/home/src/xyz/_layout.tsx")',

        routeDir: ["xyz"],
        isRootRoute: false,
        routePath: "/xyz",
      },
    ];

    expect(buildRoutes(modules)).toMatchSnapshot();
  });
});
