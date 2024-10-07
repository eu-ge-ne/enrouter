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
});
