import { createContext, useContext } from "react";

const LocationContext = createContext("");

export const LocationProvider = LocationContext.Provider;

export function useLocation(): string {
  return useContext(LocationContext);
}
