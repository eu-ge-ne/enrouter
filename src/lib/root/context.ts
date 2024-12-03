import { type ReactElement, createContext, useContext } from "react";

type RootVoid = Record<string, ReactElement> | undefined;

const RootVoidContext = createContext<RootVoid>(undefined);

export const RootVoidProvider = RootVoidContext.Provider;

export function useRootVoid(): RootVoid {
  return useContext(RootVoidContext);
}
