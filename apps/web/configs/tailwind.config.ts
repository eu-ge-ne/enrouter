import type { Config } from "tailwindcss";

export default {
  content: ["src/**/*.{ts,tsx}"],
  theme: {
    colors: {
      customBackground: "#eee2e2",
    },
  },
  plugins: [],
} satisfies Config;
