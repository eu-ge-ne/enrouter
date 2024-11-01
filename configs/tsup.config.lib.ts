import type { Options } from "tsup";

export default {
  entry: ["src/lib/mod.ts"],
  outDir: "dist/lib",
  format: "esm",
  target: "es2023",
  dts: true,
  external: ["react", "virtual:enrouter"],
  treeshake: true,
} satisfies Options;
