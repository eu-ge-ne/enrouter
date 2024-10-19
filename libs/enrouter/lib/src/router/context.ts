import { createContext, useContext } from "react";

export interface TRouterStaticContext {
  navigate: (to: string) => void;
}

export interface TRouterDynamicContext {
  location: string;
}

const RouterStaticContext = createContext<TRouterStaticContext>({
  navigate: () => {},
});

const RouterDynamicContext = createContext<TRouterDynamicContext>({
  location: "",
});

export const RouterStaticProvider = RouterStaticContext.Provider;
export const RouterDynamicProvider = RouterDynamicContext.Provider;

export function useRouterStatic(): TRouterStaticContext {
  return useContext(RouterStaticContext);
}

export function useRouterDynamic(): TRouterDynamicContext {
  return useContext(RouterDynamicContext);
}
