import { describe, test, expect } from "vitest";
import * as regexparam from "regexparam";

import type { RouteModules } from "./modules.js";
import { buildRouteTree } from "./build.js";

describe("buildRouteTree", () => {
  test("from 0 modules", () => {
    expect(() => buildRouteTree([])).toThrowErrorMatchingSnapshot();
  });

  test("from 1 module", () => {
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

    expect(buildRouteTree(modules)).toMatchSnapshot();
  });

  test("from 2 modules", () => {
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

    expect(buildRouteTree(modules)).toMatchSnapshot();
  });

  test("from 3 modules", () => {
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
            id: "src/xyz/_index.tsx",
            fileName: "_index.tsx",
            importFn: async () => {},
            importStr: '() => import("/home/src/xyz/_index.tsx")',
          },
        ],
      },
    ];

    expect(buildRouteTree(modules)).toMatchSnapshot();
  });
});
