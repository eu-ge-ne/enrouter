import { createContext, useContext } from "react";

import type { Match } from "#lib/match/mod.js";

export interface TRouterStaticContext {
  navigate: (to: string) => void;
}

export interface TRouterDynamicContext {
  location: string;
  matches: Match[];
}

const RouterStaticContext = createContext<TRouterStaticContext>({
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
