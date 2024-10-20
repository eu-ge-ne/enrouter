import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    test: {
      include: [
        "lib/src/**/*.unit.test.{ts,tsx}",
        "vite/src/**/*.unit.test.{ts,tsx}",
      ],
      name: "unit",
      environment: "node",
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
    },
  },
]);
