import { describe, test, expect } from "vitest";

import { buildRoutes } from "./build.js";

import type { RouteModules } from "./build.js";

describe("buildRoutes", () => {
  test("from 0 modules", () => {
    expect(() => buildRoutes([])).toThrowErrorMatchingSnapshot();
  });

  test("from 1 module", () => {
    const modules: RouteModules = [
      {
        moduleId: "src/_layout.tsx",
        dir: [],
        fileName: "_layout.tsx",
        importFn: async () => undefined,
        importStr: '() => import("/home/src/_layout.tsx")',
      },
    ];

    expect(buildRoutes(modules)).toMatchSnapshot();
  });

  test("from 2 modules", () => {
    const modules: RouteModules = [
      {
        moduleId: "src/_layout.tsx",
        dir: [],
        fileName: "_layout.tsx",
        importFn: async () => undefined,
        importStr: '() => import("/home/src/_layout.tsx")',
      },
      {
        moduleId: "src/abc/_layout.tsx",
        dir: ["abc"],
        fileName: "_layout.tsx",
        importFn: async () => undefined,
        importStr: '() => import("/home/src/abc/_layout.tsx")',
      },
    ];

    expect(buildRoutes(modules)).toMatchSnapshot();
  });

  test("from 3 modules", () => {
    const modules: RouteModules = [
      {
        moduleId: "src/_layout.tsx",
        dir: [],
        fileName: "_layout.tsx",
        importFn: async () => undefined,
        importStr: '() => import("/home/src/_layout.tsx")',
      },
      {
        moduleId: "src/xyz/_layout.tsx",
        dir: ["xyz"],
        fileName: "_layout.tsx",
        importFn: async () => undefined,
        importStr: '() => import("/home/src/xyz/_layout.tsx")',
      },
      {
        moduleId: "src/xyz/_index.tsx",
        dir: ["xyz"],
        fileName: "_index.tsx",
        importFn: async () => undefined,
        importStr: '() => import("/home/src/xyz/_layout.tsx")',
      },
    ];

    expect(buildRoutes(modules)).toMatchSnapshot();
  });
});
