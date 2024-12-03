import { type ComponentType, createContext, useContext } from "react";

type Void = Record<string, ComponentType> | undefined;

const VoidContext = createContext<Void>(undefined);

export const VoidProvider = VoidContext.Provider;

export function useVoid(): Void {
  return useContext(VoidContext);
}
