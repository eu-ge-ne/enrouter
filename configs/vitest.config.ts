import type { UserConfig } from "vitest/config";

export default {
  test: {
    coverage: {
      enabled: true,
      include: ["src/**"],
      reporter: ["text", "html"],
    },
  },
} satisfies UserConfig;
