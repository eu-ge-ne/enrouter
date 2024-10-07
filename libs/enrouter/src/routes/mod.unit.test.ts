import { describe, test, expect } from "vitest";

import { buildRoutes } from "./mod.js";

import type { BuildRoutesParams } from "./mod.js";

describe("buildRoutes", () => {
  test("from 0 modules", () => {
    const params: BuildRoutesParams = {
      entryId: "src/main.tsx",
      getModuleAssets: () => ({ modules: [], styles: [] }),
      modules: {},
    };

    expect(buildRoutes(params)).toMatchSnapshot();
  });

  test("from 1 module", () => {
    const params: BuildRoutesParams = {
      entryId: "src/main.tsx",
      getModuleAssets: (moduleId) => ({ modules: [moduleId], styles: [] }),
      modules: {
        "src/_layout.tsx": {
          path: "_layout.tsx",
          load: async () => undefined,
        },
      },
    };

    expect(buildRoutes(params)).toMatchSnapshot();
  });

  test("from 2 parent-child modules", () => {
    const params: BuildRoutesParams = {
      entryId: "src/main.tsx",
      getModuleAssets: (moduleId) => ({ modules: [moduleId], styles: [] }),
      modules: {
        "src/_layout.tsx": {
          path: "_layout.tsx",
          load: async () => undefined,
        },
        "src/abc/_layout.tsx": {
          path: "abc/_layout.tsx",
          load: async () => undefined,
        },
      },
    };

    expect(buildRoutes(params)).toMatchSnapshot();
  });
});
