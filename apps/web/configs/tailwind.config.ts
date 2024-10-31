import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const content = [
  resolve(
    fileURLToPath(new URL(".", import.meta.url)),
    "../src/**/*.{ts,tsx,mdx}",
  ),
];

export default {
  content,
  theme: {
    extend: {
      colors: {
        appFg: colors.neutral[300],

        appBg: colors.zinc[900],
        appBorder: colors.zinc[800],

        appButtonBg: colors.sky[800],
        appButtonBorder: colors.sky[700],

        appMenuHighlight: colors.sky[600],

        appCodeBg: colors.stone[600],
      },
    },
  },
  plugins: [],
} satisfies Config;
