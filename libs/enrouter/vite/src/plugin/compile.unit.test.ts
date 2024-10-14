import { describe, test, expect } from "vitest";
import * as regexparam from "regexparam";

import { compileRoutes } from "./compile.js";

import type { Route } from "#lib/route/mod.js";
import type { RouteModules } from "./modules.js";

describe("compileRoutes", () => {
  test("1 route", () => {
    const routes: Route = {
      elements: {},
      loaded: false,
      modules: [
        {
          fileName: "_layout.tsx",
          id: "src/_layout.tsx",
          importFn: async () => undefined,
        },
      ],
      path: "/",
      test: regexparam.parse("/", true),
    };

    const modules: RouteModules = [
      {
        dir: [],
        isRoot: true,

        id: "src/_layout.tsx",
        fileName: "_layout.tsx",
        importFn: async () => undefined,
        importStr: '() => import("/home/src/_layout.tsx")',
      },
    ];

    expect(compileRoutes(modules, routes)).toMatchSnapshot();
  });

  test("2 routes", () => {
    const routes: Route = {
      elements: {},
      loaded: false,
      modules: [
        {
          fileName: "_layout.tsx",
          id: "src/_layout.tsx",
          importFn: async () => undefined,
        },
      ],
      path: "/",
      test: regexparam.parse("/", true),
      tree: [
        {
          elements: {},
          loaded: false,
          modules: [
            {
              fileName: "_layout.tsx",
              id: "src/abc/_layout.tsx",
              importFn: async () => undefined,
            },
          ],
          path: "/abc",
          test: regexparam.parse("/abc", true),
        },
      ],
    };

    const modules: RouteModules = [
      {
        dir: [],
        isRoot: true,

        id: "src/_layout.tsx",
        fileName: "_layout.tsx",
        importFn: async () => undefined,
        importStr: '() => import("/home/src/_layout.tsx")',
      },
      {
        dir: ["abc"],
        isRoot: false,

        id: "src/abc/_layout.tsx",
        fileName: "_layout.tsx",
        importFn: async () => undefined,
        importStr: '() => import("/home/src/abc/_layout.tsx")',
      },
    ];

    expect(compileRoutes(modules, routes)).toMatchSnapshot();
  });

  test("3 routes", () => {
    const routes: Route = {
      elements: {},
      loaded: false,
      modules: [
        {
          fileName: "_layout.tsx",
          id: "src/_layout.tsx",
          importFn: async () => undefined,
        },
      ],
      path: "/",
      test: regexparam.parse("/", true),
      tree: [
        {
          elements: {},
          loaded: false,
          modules: [
            {
              fileName: "_layout.tsx",
              id: "src/xyz/_layout.tsx",
              importFn: async () => undefined,
            },
            {
              fileName: "_index.tsx",
              id: "src/xyz/_index.tsx",
              importFn: async () => undefined,
            },
          ],
          path: "/xyz",
          test: regexparam.parse("/xyz", true),
        },
      ],
    };

    const modules: RouteModules = [
      {
        dir: [],
        isRoot: true,

        id: "src/_layout.tsx",
        fileName: "_layout.tsx",
        importFn: async () => undefined,
        importStr: '() => import("/home/src/_layout.tsx")',
      },
      {
        dir: ["xyz"],
        isRoot: false,

        id: "src/xyz/_layout.tsx",
        fileName: "_layout.tsx",
        importFn: async () => undefined,
        importStr: '() => import("/home/src/xyz/_layout.tsx")',
      },
      {
        dir: ["xyz"],
        isRoot: false,

        id: "src/xyz/_index.tsx",
        fileName: "_index.tsx",
        importFn: async () => undefined,
        importStr: '() => import("/home/src/xyz/_layout.tsx")',
      },
    ];

    expect(compileRoutes(modules, routes)).toMatchSnapshot();
  });
});
