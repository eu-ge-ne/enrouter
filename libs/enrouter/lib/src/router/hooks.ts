import { useRouterDynamic } from "./context.js";

export function useLocation(): string {
  const { location } = useRouterDynamic();
  return location;
}
