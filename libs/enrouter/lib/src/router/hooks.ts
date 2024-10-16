import { useRouter } from "./context.js";

export function useLocation(): string {
  const { location } = useRouter();

  return location;
}
