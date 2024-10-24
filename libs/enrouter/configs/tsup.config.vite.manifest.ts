import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["vite/manifest/src/mod.ts"],
  outDir: "dist/vite/manifest",
  format: "esm",
  target: "es2023",
  dts: true,
  treeshake: true,
});
