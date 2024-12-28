import { createContext, useContext } from "react";

export type Navigate = (to: string) => void;

export const noNavigate: Navigate = () => {};

const NavigateContext = createContext<Navigate>(noNavigate);

export const NavigateProvider = NavigateContext.Provider;

export function useNavigate(): Navigate {
  return useContext(NavigateContext);
}
