import { describe, test, expect } from "vitest";
import * as regexparam from "regexparam";

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
        routePath: "/",
        routeTest: regexparam.parse("/", true),
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
        routePath: "/",
        routeTest: regexparam.parse("/", true),
      },
      {
        id: "src/abc/_layout.tsx",
        fileName: "_layout.tsx",
        importFn: async () => undefined,
        importStr: '() => import("/home/src/abc/_layout.tsx")',

        routeDir: ["abc"],
        routePath: "/abc",
        routeTest: regexparam.parse("/abc", true),
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
        routePath: "/",
        routeTest: regexparam.parse("/", true),
      },
      {
        id: "src/xyz/_layout.tsx",
        fileName: "_layout.tsx",
        importFn: async () => undefined,
        importStr: '() => import("/home/src/xyz/_layout.tsx")',

        routeDir: ["xyz"],
        routePath: "/xyz",
        routeTest: regexparam.parse("/xyz", true),
      },
      {
        id: "src/xyz/_index.tsx",
        fileName: "_index.tsx",
        importFn: async () => undefined,
        importStr: '() => import("/home/src/xyz/_layout.tsx")',

        routeDir: ["xyz"],
        routePath: "/xyz",
        routeTest: regexparam.parse("/xyz", true),
      },
    ];

    expect(buildRoutes(modules)).toMatchSnapshot();
  });
});
