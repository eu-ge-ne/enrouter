import { logger } from "#lib/debug.js";

import type { Route } from "#lib/route/mod.js";

const log = logger("match");

/**
 * Represents matched `Route` instance.
 */
export interface RouteMatch {
  route: Route;

  location: string;
  params: Record<string, string>;
  isFull: boolean;

  next?: RouteMatch;
  last?: RouteMatch;
}

export interface MatchRoutesParams {
  routes: Route;
  location: string;
}

export function matchRoutes({
  routes,
  location,
}: MatchRoutesParams): RouteMatch[] {
  log("Matching routes for location %s", location);

  const matches: RouteMatch[] = [];

  recur([routes], location, matches);

  const last = matches.at(-1);
  matches.forEach((x, i) => {
    x.next = matches[i + 1];
    x.last = last;
  });

  log("Matched routes: %o", matches);

  return matches;
}

function recur(routes: Route[], location: string, matches: RouteMatch[]): void {
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

  const matchedLocation = results[0] || "/";

  matches.push({
    route,
    location: matchedLocation,
    params,
    isFull: matchedLocation === location,
  });

  if (route.tree) {
    recur(route.tree, location, matches);
  }
}
