import { createContext, useContext } from "react";

import type { Route } from "#lib/route/mod.js";
import type { Match } from "#lib/match/mod.js";

export interface StaticContext {
  routes: Route;
  navigate: (to: string) => void;
  ctx: unknown;
}

export interface DynamicContext {
  location: string;
  matches: Match[];
}

const RouterStaticContext = createContext<StaticContext>({
  routes: {
    path: "",
    test: { keys: [], pattern: new RegExp("") },
    modules: [],
    loaded: false,
    elements: {},
  },
  navigate: () => undefined,
  ctx: undefined,
});

const RouterDynamicContext = createContext<DynamicContext>({
  location: "",
  matches: [],
});

export const StaticProvider = RouterStaticContext.Provider;
export const DynamicProvider = RouterDynamicContext.Provider;

export function useStaticContext(): StaticContext {
  return useContext(RouterStaticContext);
}

export function useDynamicContext(): DynamicContext {
  return useContext(RouterDynamicContext);
}
