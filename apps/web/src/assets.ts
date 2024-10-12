import type { ModuleAssets } from "enrouter";

import manifest from "@enrouter/web/manifest";
import { createLog } from "./log.js";

interface ViteManifestItem {
  file: string;
  css?: string[];
  imports?: string[];
}

const log = createLog("assets");

log("Building assets");

const viteManifest = manifest as Record<string, ViteManifestItem>;

const toUrl = (x: string) => new URL(x, "http://localhost").pathname;

function getModulesRecur(item: ViteManifestItem, result: Set<string>) {
  result.add(item.file);

  (item.imports ?? [])
    .map((x) => viteManifest[x])
    .filter((x): x is ViteManifestItem => Boolean(x))
    .forEach((x) => getModulesRecur(x, result));
}

const entries = Object.entries(viteManifest).map(([key, item]) => {
  const modules = new Set<string>();
  getModulesRecur(item, modules);

  return [
    key,
    {
      styles: (item.css ?? []).map(toUrl),
      modules: [...modules].map(toUrl),
    },
  ];
});

export const assets: ModuleAssets = Object.fromEntries(entries);

log("Assets built: %o", assets);
//log("Assets built");
