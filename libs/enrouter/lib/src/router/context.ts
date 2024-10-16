import { createContext, useContext } from "react";

import type { Route } from "#lib/route/mod.js";

export interface TRouterContext {
  routes: Route;
  location: string;
  navigate: (to: string) => void;
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
  navigate: () => undefined,
});

export const RouterProvider = RouterContext.Provider;

export function useRouter() {
  return useContext(RouterContext);
}
