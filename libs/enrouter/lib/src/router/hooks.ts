import { useRouter } from "./context.js";

export function useLocation(): string {
  const { location } = useRouter();

  return location;
}

export function useContext<T>(): T {
  const { ctx } = useRouter();

  return ctx as T;
}
