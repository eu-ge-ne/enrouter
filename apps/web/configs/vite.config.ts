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
    routes({ path: "src/app" }),
  ],
  appType: "custom",
  server: {
    middlewareMode: true,
  },
  build: {
    manifest: true,
    outDir: "dist/client",
    modulePreload: false,
    emptyOutDir: false,
    rollupOptions: {
      input: ["src/main.tsx", ...globSync("./src/app/**/_*.tsx")],
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }

          if (
            [
              "/react/",
              "/react-dom/",
              "/react/jsx-runtime/",
              "/react-dom/client/",
            ].some((x) => id.includes(x))
          ) {
            return "react";
          }
        },
      },
    },
  },
  css: {
    postcss: "configs/postcss.config.js",
  },
});
