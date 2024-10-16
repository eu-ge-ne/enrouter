import type { Route } from "#lib/route/mod.js";
import type { Match } from "./mod.js";

export interface MatchParams {
  routes: Route;
  location: string;
}

export function match({ routes, location }: MatchParams): Match[] {
  const matches: Match[] = [];

  recur([routes], location, matches);

  if (matches.at(-1)?.location !== location) {
    matches.push({ isFull: true, location, params: {} });
  }

  matches.forEach((x, i) => {
    x.fist = matches[0];
    x.next = matches[i + 1];
  });

  return matches;
}

function recur(routes: Route[], location: string, matches: Match[]): void {
  let matched = routes
    .map((x) => [x, x.test.pattern.exec(location)] as const)
    .filter((x): x is [Route, RegExpExecArray] => Boolean(x[1]));

  if (matched.length === 0) {
    return;
  }

  // TODO: improve
  if (matched.length > 1) {
    matched = matched.filter((x) => x[0].test.keys.length === 0);
  }

  const [route, results] = matched[0]!;

  const params = Object.fromEntries(
    route.test.keys.map((key, i) => {
      return [key, results![i + 1]!] as const;
    }),
  );

  const loc = results[0] || "/";

  matches.push({
    route,
    isFull: loc === location,
    location: loc,
    params,
  });

  if (route.tree) {
    recur(route.tree, location, matches);
  }
}
