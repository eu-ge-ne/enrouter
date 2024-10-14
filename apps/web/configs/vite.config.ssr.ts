import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import { globSync } from "glob";

import { routes } from "enrouter/vite/plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        providerImportSource: "@mdx-js/react",
        remarkPlugins: [remarkGfm],
      }),
    },
    react({ include: /\.(jsx|js|tsx|ts|mdx|md)$/ }),
    routes({ routesFsPath: "src/app" }),
  ],
  appType: "custom",
  server: {
    middlewareMode: true,
  },
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
