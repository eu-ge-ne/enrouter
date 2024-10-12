import { logger } from "#debug.js";

const log = logger("assets");

/**
 * Collection of module asset descriptors.
 * Maps module id to a lists of style and module urls.
 */
export type ModuleAssets = Record<
  string,
  {
    /**
     * Urls of styles
     */
    styles: string[];
    /**
     * Urls of modules
     */
    modules: string[];
  }
>;

interface ViteManifestItem {
  file: string;
  css?: string[];
  imports?: string[];
}

type ViteManifest = Record<string, ViteManifestItem>;

function getModulesRecur(
  manifest: ViteManifest,
  result: Set<string>,
  item: ViteManifestItem,
) {
  result.add(item.file);

  (item.imports ?? [])
    .map((x) => manifest[x])
    .filter((x): x is ViteManifestItem => Boolean(x))
    .forEach((x) => getModulesRecur(manifest, result, x));
}

export interface BuildModuleAssetsFromViteManifestParams {
  manifest: unknown;
  toUrl: (x: string) => string;
}

/**
 * Builds `ModuleAssets` from Vite manifest
 */
export function buildModuleAssetsFromViteManifest({
  manifest,
  toUrl,
}: BuildModuleAssetsFromViteManifestParams): ModuleAssets {
  log("Building assets");

  const assets = Object.fromEntries(
    Object.entries(manifest as ViteManifest).map(([key, item]) => {
      const modules = new Set<string>();
      getModulesRecur(manifest as ViteManifest, modules, item);

      return [
        key,
        {
          styles: (item.css ?? []).map(toUrl),
          modules: [...modules].map(toUrl),
        },
      ];
    }),
  );

  log("Assets built: %o", assets);

  return assets;
}
