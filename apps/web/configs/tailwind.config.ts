import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const content = [
  resolve(fileURLToPath(new URL(".", import.meta.url)), "../src/**/*.{ts,tsx}"),
];

export default {
  content,
  theme: {
    extend: {
      colors: {
        appBg: colors.zinc[900],
        appBorder: colors.zinc[800],
        appFg: colors.slate[300],
      },
    },
  },
  plugins: [],
} satisfies Config;
