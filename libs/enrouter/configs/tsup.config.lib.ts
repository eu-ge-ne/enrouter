import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["lib/src/mod.ts"],
  outDir: "dist/lib",
  format: "esm",
  target: "es2023",
  dts: true,
  external: ["react", "virtual:enrouter"],
  treeshake: true,
});
