import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  appType: "custom",
  server: {
    middlewareMode: true,
  },
  build: {
    outDir: "dist/server",
    emptyOutDir: false,
    lib: {
      entry: "src/ssr.tsx",
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
