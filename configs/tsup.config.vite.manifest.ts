import type { Options } from "tsup";

export default {
  entry: ["src/vite/manifest/manifest.ts"],
  outDir: "dist/vite/manifest",
  format: "esm",
  target: "es2023",
  dts: true,
  treeshake: true,
} satisfies Options;
