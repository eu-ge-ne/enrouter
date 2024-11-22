import { defineWorkspace, type Plugin } from "vitest/config";

const plugin: Plugin = {
  name: "virtual-modules",
  resolveId(id) {
    if (id === "virtual:enrouter") {
      return "\0virtual:enrouter";
    }
  },
  async load(id) {
    if (id !== "\0virtual:enrouter") {
      return null;
    }
    return "";
  },
};

export default defineWorkspace([
  {
    test: {
      include: ["src/**/*.unit.test.{ts,tsx}"],
      name: "unit",
      environment: "node",
    },
    plugins: [plugin],
    //optimizeDeps: { include: ["react/jsx-dev-runtime"], },
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
    plugins: [plugin],
    optimizeDeps: {
      include: [
        //"@vitest/coverage-v8/browser",
        "react/jsx-dev-runtime",
      ],
    },
  },
]);
