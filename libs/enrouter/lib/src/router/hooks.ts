import { useRouterStatic, useRouterDynamic } from "./context.js";

export function useNavigate(): (location: string) => void {
  const { navigate } = useRouterStatic();
  return navigate;
}

export function useContext<T>(): T {
  const { ctx } = useRouterStatic();
  return ctx as T;
}

export function useLocation(): string {
  const { location } = useRouterDynamic();
  return location;
}
