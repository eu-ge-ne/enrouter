import { createContext } from "react";

import type { RouteHandler } from "#lib/handler/mod.js";

export interface TRouterContext {
  handlers: RouteHandler;
  location: string;
  navigate: (to: string) => void;
}

export const RouterContext = createContext<TRouterContext>({
  handlers: {
    route: {
      path: "",
      modules: [],
    },
    test: { keys: [], pattern: new RegExp("") },
    modules: [],
  },
  location: "",
  navigate: () => undefined,
});
