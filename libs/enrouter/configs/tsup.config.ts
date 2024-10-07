import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/mod.ts"],
  format: "esm",
  dts: true,
  external: ["react"],
  treeshake: true,
  minify: true
});
