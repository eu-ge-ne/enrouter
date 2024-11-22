import { defineWorkspace } from "vitest/config";

import { virtualModulePlugin } from "./vitest.plugin.js";

export default defineWorkspace([
  {
    test: {
      include: ["src/**/*.unit.test.{ts,tsx}"],
      name: "unit",
      environment: "node",
    },
    plugins: [virtualModulePlugin],
  },
  {
    test: {
      include: ["src/**/*.browser.test.{ts,tsx}"],
      name: "browser",
      browser: {
        provider: "playwright",
        enabled: true,
        name: "chromium",
        headless: true,
      },
    },
    plugins: [virtualModulePlugin],
    optimizeDeps: {
      include: ["react/jsx-dev-runtime"],
    },
  },
]);
