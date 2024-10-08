import { createContext } from "react";

import type { RouteHandler } from "#handler/mod.js";

export interface TRouterContext {
  handlers: RouteHandler;
  location: string;
  navigate: (to: string) => void;
}

export const RouterContext = createContext<TRouterContext>({
  handlers: {
    route: {
      path: "",
      mod: [],
      link: [[], []],
    },
    test: { keys: [], pattern: new RegExp("") },
    modules: [],
  },
  location: "",
  navigate: () => undefined,
});
