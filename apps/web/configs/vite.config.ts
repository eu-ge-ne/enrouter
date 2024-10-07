import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { globSync } from "glob";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
    },
  },
  css: {
    postcss: "configs/postcss.config.js",
  },
});
