import type { Plugin } from "vitest/config";

export const virtualModulePlugin: Plugin = {
  name: "virtual-modules",
  resolveId(id) {
    if (id === "virtual:enrouter") {
      return "\0virtual:enrouter";
    }
  },
  async load(id) {
    if (id !== "\0virtual:enrouter") {
      return null;
    }
    return "";
  },
};
