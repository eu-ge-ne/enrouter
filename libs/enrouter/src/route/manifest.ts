export interface ViteManifestItem {
  file: string;
  css?: string[];
  imports?: string[];
}

export type ViteManifest = Record<string, ViteManifestItem>;
