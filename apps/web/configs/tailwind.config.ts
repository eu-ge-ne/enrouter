import type { Config } from "tailwindcss";

export default {
  content: ["src/**/*.{ts,tsx}"],
  theme: {
    colors: {
      paper: "#fff8f0",
      paperBorder: "#d6d3d1", // stone-300
    },
  },
  plugins: [],
} satisfies Config;
