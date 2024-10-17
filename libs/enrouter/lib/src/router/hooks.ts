import { useStaticContext, useDynamicContext } from "./context.js";

export function useNavigate(): (location: string) => void {
  const { navigate } = useStaticContext();
  return navigate;
}

export function useContext<T>(): T {
  const { ctx } = useStaticContext();
  return ctx as T;
}

export function useLocation(): string {
  const { location } = useDynamicContext();
  return location;
}
