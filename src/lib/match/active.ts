import { useMatches } from "./context.js";

export interface UseActiveParams<T> {
  path: string;
  loose?: boolean;
  value: [T, T];
}

export function useActive<T>({
  path,
  loose,
  value: [yes, no],
}: UseActiveParams<T>): T {
  const matches = useMatches();

  const match = matches.find((x) => x.route?.path === path);

  if (!match?.route) {
    return no;
  }

  if (loose) {
    return yes;
  }

  if (match !== matches.at(-1)) {
    return no;
  }

  return match?.route ? yes : no;
}
