import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import type { Config } from "tailwindcss";

const content = [
  resolve(fileURLToPath(new URL(".", import.meta.url)), "../src/**/*.{ts,tsx}"),
];

export default {
  content,
  theme: {
    extend: {
      colors: {
        paper: "#fff8f0",
        paperBorder: "#d6d3d1", // stone-300
      },
    },
  },
  plugins: [],
} satisfies Config;
