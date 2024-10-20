import { resolve } from "node:path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import { globSync } from "glob";
import enrouter from "enrouter/vite/plugin";

const root = resolve(import.meta.dirname, "..");

export default defineConfig({
  root,
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        providerImportSource: "@mdx-js/react",
        remarkPlugins: [remarkGfm],
      }),
    },
    react({ include: /\.(jsx|js|tsx|ts|mdx|md)$/ }),
    enrouter({ path: resolve(root, "src/app") }),
  ],
  build: {
    outDir: "dist/server",
    emptyOutDir: false,
    lib: {
      entry: ["src/ssr.tsx", ...globSync("./src/app/**/_*.tsx")],
      formats: ["es"],
    },
    ssr: true,
    sourcemap: true,
    copyPublicDir: false,
  },
  ssr: {
    noExternal: true,
    target: "webworker",
  },
});
