import { createContext, useContext } from "react";

import type { Route } from "#lib/route/mod.js";
import type { Match } from "#lib/match/mod.js";

export interface TRouterContext {
  routes: Route;
  location: string;
  matches: Match[];
  navigate: (to: string) => void;
  ctx: unknown;
}

const RouterContext = createContext<TRouterContext>({
  routes: {
    path: "",
    test: { keys: [], pattern: new RegExp("") },
    modules: [],
    loaded: false,
    elements: {},
  },
  location: "",
  matches: [],
  navigate: () => undefined,
  ctx: undefined,
});

export const RouterProvider = RouterContext.Provider;

export function useRouter(): TRouterContext {
  return useContext(RouterContext);
}
