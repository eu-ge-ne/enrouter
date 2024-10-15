import { resolve } from "node:path";

const config = resolve(import.meta.dirname, "tailwind.config.ts");

export default {
  plugins: {
    tailwindcss: { config },
    autoprefixer: {},
  },
};
