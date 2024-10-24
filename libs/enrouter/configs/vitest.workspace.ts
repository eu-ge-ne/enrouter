import { defineWorkspace } from "vitest/config";

const alias = {
  "virtual:enrouter": "\0virtual:enrouter",
};

export default defineWorkspace([
  {
    test: {
      include: [
        "lib/src/**/*.unit.test.{ts,tsx}",
        "vite/manifest/src/**/*.unit.test.{ts,tsx}",
        "vite/plugin/src/**/*.unit.test.{ts,tsx}",
      ],
      name: "unit",
      environment: "node",
      alias,
    },
  },
  {
    test: {
      include: ["lib/src/**/*.browser.test.{ts,tsx}"],
      name: "browser",
      browser: {
        provider: "playwright",
        enabled: true,
        name: "chromium",
        headless: true,
      },
      alias,
    },
  },
]);
