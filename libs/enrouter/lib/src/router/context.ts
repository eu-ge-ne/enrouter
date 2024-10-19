import { createContext, useContext } from "react";

export interface TRouterDynamicContext {
  location: string;
}

const RouterDynamicContext = createContext<TRouterDynamicContext>({
  location: "",
});

export const RouterDynamicProvider = RouterDynamicContext.Provider;

export function useRouterDynamic(): TRouterDynamicContext {
  return useContext(RouterDynamicContext);
}
