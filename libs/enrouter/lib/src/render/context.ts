import { createContext } from "react";

import type { RouteNodes } from "./mod.js";

export const RouteRenderContext = createContext<RouteNodes>({
  match: {
    handler: {
      route: {
        path: "",
        test: { keys: [], pattern: new RegExp("") },
        modules: [],
      },
      modules: [],
    },
    location: "",
    isFull: false,
    params: {},
  },
});
