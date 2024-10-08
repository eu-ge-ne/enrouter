import type { ModuleAssets } from "enrouter";

import { createLog } from "./log.js";

//@ts-ignore
import manifest from "@enrouter/web/manifest";

const log = createLog("assets");

type ManifestItem = {
  src?: string;
  file: string;
  css?: string[];
  assets?: string[];
  isEntry?: boolean;
  isDynamicEntry?: boolean;
  imports?: string[];
  dynamicImports?: string[];
};

log("Building assets");

const toUrl = (x: string) => new URL(x, "http://localhost").pathname;

export const assets: ModuleAssets = Object.fromEntries(
  Object.entries<ManifestItem>(manifest).map(([key, val]) => {
    const imports = new Set<string>();
    flattenImports(val.imports ?? [], imports);
    return [
      key,
      {
        styles: (val.css ?? []).map(toUrl),
        modules: [val.file, ...imports].map(toUrl),
      },
    ];
  }),
);

log("Assets built: %O", assets);

function flattenImports(ids: string[], result: Set<string>) {
  for (const id of ids) {
    const item = (manifest as Record<string, ManifestItem>)[id]!;
    result.add(item.file);
    const importIds = item.imports ?? [];
    flattenImports(importIds, result);
  }
}
