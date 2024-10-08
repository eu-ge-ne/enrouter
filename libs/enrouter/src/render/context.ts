import { createContext } from "react";

import type { RouteNodes } from "./mod.js";

export const RouteRenderContext = createContext<RouteNodes>({
  match: {
    params: {},
    handler: {
      route: {
        path: "",
        mod: [],
        link: [[], []],
      },
      test: { keys: [], pattern: new RegExp("") },
      modules: [],
    },
  },
});
