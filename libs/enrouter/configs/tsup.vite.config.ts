import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["vite/src/plugin/mod.ts", "vite/src/manifest/mod.ts"],
  outDir: "dist/vite",
  format: "esm",
  target: "es2023",
  dts: true,
  treeshake: true,
  minify: "terser",
});
