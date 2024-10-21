import { describe, test, expect } from "vitest";
import * as regexparam from "regexparam";

import { buildRoutes } from "./build.js";

import type { RouteModules } from "./modules.js";

describe("buildRoutes", () => {
  test("from 0 modules", () => {
    expect(() => buildRoutes([])).toThrowErrorMatchingSnapshot();
  });

  test("from 1 module", () => {
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

    expect(buildRoutes(modules)).toMatchSnapshot();
  });

  test("from 2 modules", () => {
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

    expect(buildRoutes(modules)).toMatchSnapshot();
  });

  test("from 3 modules", () => {
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

    expect(buildRoutes(modules)).toMatchSnapshot();
  });
});
