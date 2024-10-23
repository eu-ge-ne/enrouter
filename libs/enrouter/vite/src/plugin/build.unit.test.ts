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
            id: "src/_page.tsx",
            fileName: "_page.tsx",
            importFn: async () => {},
            importStr: '() => import("/home/src/_page.tsx")',
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
            id: "src/_page.tsx",
            fileName: "_page.tsx",
            importFn: async () => {},
            importStr: '() => import("/home/src/_page.tsx")',
          },
        ],
      },
      {
        dir: ["abc"],
        path: "/abc",
        test: regexparam.parse("/abc", true),
        modules: [
          {
            id: "src/abc/_page.tsx",
            fileName: "_page.tsx",
            importFn: async () => {},
            importStr: '() => import("/home/src/abc/_page.tsx")',
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
            id: "src/_page.tsx",
            fileName: "_page.tsx",
            importFn: async () => {},
            importStr: '() => import("/home/src/_page.tsx")',
          },
        ],
      },
      {
        dir: ["xyz"],
        path: "/xyz",
        test: regexparam.parse("/xyz", true),
        modules: [
          {
            id: "src/xyz/_page.tsx",
            fileName: "_page.tsx",
            importFn: async () => {},
            importStr: '() => import("/home/src/xyz/_page.tsx")',
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
