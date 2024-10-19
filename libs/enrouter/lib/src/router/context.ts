import { createContext, useContext } from "react";

import type { Route } from "#lib/route/mod.js";
import type { Match } from "#lib/match/mod.js";

export interface TRouterStaticContext {
  routes: Route;
  navigate: (to: string) => void;
}

export interface TRouterDynamicContext {
  location: string;
  matches: Match[];
}

const RouterStaticContext = createContext<TRouterStaticContext>({
  routes: {
    path: "",
    test: { keys: [], pattern: new RegExp("") },
    modules: [],
    loaded: false,
    elements: {},
  },
  navigate: () => {},
});

const RouterDynamicContext = createContext<TRouterDynamicContext>({
  location: "",
  matches: [],
});

export const RouterStaticProvider = RouterStaticContext.Provider;
export const RouterDynamicProvider = RouterDynamicContext.Provider;

export function useRouterStatic(): TRouterStaticContext {
  return useContext(RouterStaticContext);
}

export function useRouterDynamic(): TRouterDynamicContext {
  return useContext(RouterDynamicContext);
}
