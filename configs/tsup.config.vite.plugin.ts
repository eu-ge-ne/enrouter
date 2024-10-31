import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["vite/plugin/src/mod.ts"],
  outDir: "dist/vite/plugin",
  format: "esm",
  target: "es2023",
  dts: true,
  treeshake: true,
});
