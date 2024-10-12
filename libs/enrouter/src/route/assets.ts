import type { Route } from "./mod.js";
import type { ViteManifest, ViteManifestItem } from "./manifest.js";

export function updateRouteAssets(
  manifest: unknown,
  mapAssetUrl: (x: string) => string,
  route: Route,
  moduleId: string,
): void {
  const viteManifest = manifest as ViteManifest;

  const item = viteManifest[moduleId];
  if (!item) {
    return;
  }

  const styles = new Set<string>();
  const modules = new Set<string>();
  walkModulesRecur(viteManifest, styles, modules, item);

  route.link[0] = [
    ...new Set([...route.link[0], ...[...styles].map(mapAssetUrl)]),
  ];
  route.link[1] = [
    ...new Set([...route.link[1], ...[...modules].map(mapAssetUrl)]),
  ];
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
