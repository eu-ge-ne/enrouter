import type { ViteUserConfig } from "vitest/config";

export default {
  test: {
    coverage: {
      enabled: true,
      include: ["lib/src/**", "vite/manifest/src/**", "vite/plugin/src/**"],
      reporter: ["text", "html"],
    },
  },
} satisfies ViteUserConfig;
