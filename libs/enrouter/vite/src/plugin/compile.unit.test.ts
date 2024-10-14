import { describe, test, expect } from "vitest";
import * as regexparam from "regexparam";

import { compileRoutes } from "./compile.js";

import type { RouteModules } from "./modules.js";

describe("compileRoutes", () => {
  test("1 route", () => {
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

    expect(compileRoutes(modules)).toMatchSnapshot();
  });

  test("2 routes", () => {
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

    expect(compileRoutes(modules)).toMatchSnapshot();
  });

  test("3 routes", () => {
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

    expect(compileRoutes(modules)).toMatchSnapshot();
  });
});
