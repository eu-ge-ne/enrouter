import { describe, test, expect } from "vitest";

import { buildRoutes } from "./mod.js";

import type { BuildRoutesParams } from "./mod.js";

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
      /*
      manifest: {
        "src/main.tsx": {
          file: "assets/main.js",
          css: ["assets/main.css"],
        },
        "src/_layout.tsx": {
          file: "assets/_layout.js",
          imports: ["log.js"],
        },
        "log.js": {
          file: "assets/log.js",
        },
      },
      mapAssetUrl: (x) => x,
      entryId: "src/main.tsx",
      */
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
      /*
      manifest: {
        "src/main.tsx": {
          file: "assets/main.js",
          css: ["assets/main.css"],
        },
        "src/_layout.tsx": {
          file: "assets/_layout.js",
          imports: ["log.js"],
        },
        "src/abc/_layout.tsx": {
          file: "assets/abc-_layout.js",
          imports: ["log.js"],
        },
        "log.js": {
          file: "assets/log.js",
        },
      },
      mapAssetUrl: (x) => x,
      entryId: "src/main.tsx",
      */
    };

    expect(buildRoutes(params)).toMatchSnapshot();
  });
});
