import { describe, test, expect } from "vitest";

import { buildRoutes } from "./build.js";

import type { BuildRoutesParams } from "./build.js";

describe("buildRoutes", () => {
  test("from 0 modules", () => {
    const params: BuildRoutesParams = {
      modules: {},
    };

    expect(buildRoutes(params)).toMatchSnapshot();
  });

  test("from 1 module", () => {
    const params: BuildRoutesParams = {
      modules: {
        "src/_layout.tsx": {
          dirPath: [],
          fileName: "_layout.tsx",
          load: async () => undefined,
        },
      },
    };

    expect(buildRoutes(params)).toMatchSnapshot();
  });

  test("from 2 parent-child modules", () => {
    const params: BuildRoutesParams = {
      modules: {
        "src/_layout.tsx": {
          dirPath: [],
          fileName: "_layout.tsx",
          load: async () => undefined,
        },
        "src/abc/_layout.tsx": {
          dirPath: ["abc"],
          fileName: "_layout.tsx",
          load: async () => undefined,
        },
      },
    };

    expect(buildRoutes(params)).toMatchSnapshot();
  });
});
