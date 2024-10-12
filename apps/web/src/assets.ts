import { buildModuleAssetsFromViteManifest } from "enrouter";

import manifest from "@enrouter/web/manifest";

export const assets = buildModuleAssetsFromViteManifest({
  manifest,
  toUrl: (x) => new URL(x, "http://localhost").pathname,
});
