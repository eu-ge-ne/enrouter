import { defineWorkspace } from "vitest/config";

const alias = {
  "virtual:enrouter": "\0virtual:enrouter",
};

export default defineWorkspace([
  {
    test: {
      include: ["src/**/*.unit.test.{ts,tsx}"],
      name: "unit",
      environment: "node",
      alias,
    },
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
      alias,
    },
  },
]);
