import type { GetModuleAssets } from "enrouter";

type ViteManifest = Record<
  string,
  {
    src?: string;
    file: string;
    css?: string[];
    assets?: string[];
    isEntry?: boolean;
    isDynamicEntry?: boolean;
    imports?: string[];
    dynamicImports?: string[];
  }
>;

export function createManifest(
  mapUrl: (x: string) => string,
  viteManifest?: ViteManifest,
): GetModuleAssets {
  let manifest:
    | Record<string, { module: string; styles: string[]; imports: string[] }>
    | undefined;

  if (viteManifest) {
    manifest = Object.fromEntries(
      Object.entries(viteManifest).map(([key, val]) => {
        const imports = new Set<string>();
        flattenImports(viteManifest, val.imports ?? [], imports);
        return [
          key,
          {
            module: val.file,
            styles: val.css ?? [],
            imports: [...imports],
          },
        ];
      }),
    );

    console.log("Manifest: %O", manifest);
  }

  return function getModuleAssets(moduleId: string) {
    if (!manifest) {
      return {
        styles: [],
        modules: [mapUrl(moduleId)],
      };
    }

    const { styles, module, imports } = manifest[moduleId]!;

    return {
      styles: styles.map(mapUrl),
      modules: [module, ...imports].map(mapUrl),
    };
  };
}

function flattenImports(
  viteManifest: ViteManifest,
  ids: string[],
  result: Set<string>,
) {
  for (const id of ids) {
    result.add(viteManifest[id]?.file!);
    const importIds = viteManifest[id]?.imports ?? [];
    flattenImports(viteManifest, importIds, result);
  }
}
