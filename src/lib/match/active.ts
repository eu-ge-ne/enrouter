import { useMatch } from "./context.js";

export interface UseActiveParams<T> {
  path: string;
  loose?: boolean;
  value: [T, T];
}

export function useActive<T>({ path, loose, value }: UseActiveParams<T>): T {
  const match = useMatch(path);

  const isActive = loose ? match !== undefined : Boolean(match?.isExact);

  return isActive ? value[0] : value[1];
}
