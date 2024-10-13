import { describe, test, expect } from "vitest";

import { buildRoutesWithViteManifest } from "./mod.js";

import type { BuildRoutesWithViteManifestParams } from "./mod.js";

describe("buildRoutesWithViteManifest", () => {
  test("from 0 modules", () => {
    const params: BuildRoutesWithViteManifestParams = {
      modules: {},
      manifest: {},
      mapAssetUrl: (x) => x,
      entryId: "",
    };

    expect(buildRoutesWithViteManifest(params)).toMatchSnapshot();
  });

  test("from 1 module", () => {
    const params: BuildRoutesWithViteManifestParams = {
      modules: {
        "src/_layout.tsx": {
          path: "_layout.tsx",
          load: async () => undefined,
        },
      },
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
    };

    expect(buildRoutesWithViteManifest(params)).toMatchSnapshot();
  });

  test("from 2 parent-child modules", () => {
    const params: BuildRoutesWithViteManifestParams = {
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
    };

    expect(buildRoutesWithViteManifest(params)).toMatchSnapshot();
  });
});
