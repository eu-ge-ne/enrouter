export interface ViteManifestItem {
  file: string;
  css?: string[];
  imports?: string[];
}

export type ViteManifest = Record<string, ViteManifestItem>;

export interface ModuleAssets {
  styles: string[];
  modules: string[];
}

export interface GetModuleAssetsParams {
  manifest: ViteManifest;
  moduleId: string;
}

export function getModuleAssets({
  manifest,
  moduleId,
}: GetModuleAssetsParams): ModuleAssets | undefined {
  const item = manifest[moduleId];
  if (!item) {
    return;
  }

  const styles = new Set<string>();
  const modules = new Set<string>();

  walkModulesRecur(manifest, styles, modules, item);

  return {
    styles: [...styles],
    modules: [...modules],
  };
}

function walkModulesRecur(
  manifest: ViteManifest,
  styles: Set<string>,
  modules: Set<string>,
  item: ViteManifestItem,
) {
  item.css?.forEach((x) => styles.add(x));
  modules.add(item.file);

  (item.imports ?? [])
    .map((x) => manifest[x])
    .filter((x): x is ViteManifestItem => Boolean(x))
    .forEach((x) => walkModulesRecur(manifest, styles, modules, x));
}
