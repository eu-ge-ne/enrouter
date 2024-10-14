import { createContext } from "react";

import type { RouteNodes } from "./mod.js";

export const RouteRenderContext = createContext<RouteNodes>({
  match: {
    route: {
      path: "",
      test: { keys: [], pattern: new RegExp("") },
      modules: [],
      loaded: false,
      elements: {},
    },
    location: "",
    isFull: false,
    params: {},
  },
});
