import { type ComponentType, createContext, useContext } from "react";

export interface RootParams {
  root?: ComponentType;
  fallback?: Record<string, ComponentType>;
}

const RootParamsContext = createContext<RootParams>({});

export const RootParamsProvider = RootParamsContext.Provider;

export function useRootParams(): RootParams {
  return useContext(RootParamsContext);
}
