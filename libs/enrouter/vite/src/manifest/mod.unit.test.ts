import { describe, test, expect } from "vitest";

import { type ViteManifest, getModuleAssets } from "./mod.js";

describe("manifest", () => {
  describe("getModuleAssets", () => {
    test("from empty manifest", () => {
      const manifest: ViteManifest = {};

      expect(
        getModuleAssets({ manifest, moduleId: "src/main.tsx" }),
      ).toMatchSnapshot();
    });

    test("from manifest with modules", () => {
      const manifest: ViteManifest = {
        "src/main.tsx": {
          file: "/home/src/main.tsx",
          imports: ["src/module1.tsx"],
        },
        "src/module1.tsx": {
          file: "/home/src/module1.tsx",
          imports: ["src/module2.tsx"],
        },
        "src/module2.tsx": {
          file: "/home/src/module2.tsx",
        },
      };

      expect(
        getModuleAssets({ manifest, moduleId: "src/main.tsx" }),
      ).toMatchSnapshot();
    });

    test("from manifest with styles", () => {
      const manifest: ViteManifest = {
        "src/main.tsx": {
          file: "/home/src/main.tsx",
          css: ["index.css"],
          imports: ["src/module1.tsx"],
        },
        "src/module1.tsx": {
          file: "/home/src/module1.tsx",
          css: ["index1.css"],
        },
      };

      expect(
        getModuleAssets({ manifest, moduleId: "src/main.tsx" }),
      ).toMatchSnapshot();
    });
  });
});
