import { describe, test, expect } from "vitest";

import { buildRoutes } from "./build.js";

import type { RouteModules } from "./build.js";

describe("buildRoutes", () => {
  test("from 0 modules", () => {
    expect(buildRoutes([])).toMatchSnapshot();
  });

  test("from 1 module", () => {
    const modules: RouteModules = [
      {
        id: "src/_layout.tsx",
        dir: [],
        fileName: "_layout.tsx",
        load: async () => undefined,
      },
    ];

    expect(buildRoutes(modules)).toMatchSnapshot();
  });

  test("from 2 parent-child modules", () => {
    const modules: RouteModules = [
      {
        id: "src/_layout.tsx",
        dir: [],
        fileName: "_layout.tsx",
        load: async () => undefined,
      },
      {
        id: "src/abc/_layout.tsx",
        dir: ["abc"],
        fileName: "_layout.tsx",
        load: async () => undefined,
      },
    ];

    expect(buildRoutes(modules)).toMatchSnapshot();
  });
});
