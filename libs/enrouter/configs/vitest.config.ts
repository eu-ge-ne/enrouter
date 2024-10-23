import type { ViteUserConfig } from "vitest/config";

export default {
  test: {
    coverage: {
      enabled: true,
      include: ["lib/src/**", "vite/src/**"],
      reporter: ["text", "html"],
    },
    server: {
      deps: {
        external: ["virtual:enrouter/vite/routes"],
      },
    },
  },
} satisfies ViteUserConfig;
