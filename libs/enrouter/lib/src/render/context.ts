import { createContext } from "react";

import type { RouteNodes } from "./mod.js";

export const RouteRenderContext = createContext<RouteNodes>({
  match: {
    handler: {
      route: {
        path: "",
        modules: [],
      },
      test: { keys: [], pattern: new RegExp("") },
      modules: [],
    },
    location: "",
    isFull: false,
    params: {},
  },
});
