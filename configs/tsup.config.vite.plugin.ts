import type { Options } from "tsup";

export default {
  entry: ["src/vite/plugin/mod.ts"],
  outDir: "dist/vite/plugin",
  format: "esm",
  target: "es2023",
  dts: true,
  treeshake: true,
} satisfies Options;
