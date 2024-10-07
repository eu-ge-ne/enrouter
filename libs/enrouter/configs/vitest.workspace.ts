import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    test: {
      include: ["src/**/*.unit.test.{ts,tsx}"],
      name: "unit",
      environment: "node",
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
    },
  },
]);
