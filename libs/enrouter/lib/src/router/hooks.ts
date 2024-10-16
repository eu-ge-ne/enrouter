import { useContext } from "react";

import { RouterContext } from "./context.js";

export function useLocation(): string {
  const { location } = useContext(RouterContext);
  return location;
}
