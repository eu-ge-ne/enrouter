import { createContext } from "react";

import type { Route } from "#lib/route/mod.js";

export interface TRouterContext {
  routes: Route;
  location: string;
  navigate: (to: string) => void;
}

export const RouterContext = createContext<TRouterContext>({
  routes: {
    path: "",
    test: { keys: [], pattern: new RegExp("") },
    modules: [],
    loaded: false,
  },
  location: "",
  navigate: () => undefined,
});
