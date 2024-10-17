import type { Route } from "#lib/route/mod.js";
import type { Match } from "./mod.js";
import { logger } from "#lib/debug.js";

const log = logger("match");

export interface MatchRoutesParams {
  routes: Route;
  location: string;
}

export function matchRoutes({ routes, location }: MatchRoutesParams): Match[] {
  log("Matching routes for location %s", location);

  const matches: Match[] = [];

  recur([routes], location, matches);

  matches.forEach((x, i) => {
    x.fist = matches[0];
    x.next = matches[i + 1];
  });

  log("Matched routes: %o", matches);

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

  const matchedLocation = results[0] || "/";

  matches.push({
    route,

    isFull: matchedLocation === location,
    location: matchedLocation,
    params,
  });

  if (route.tree) {
    recur(route.tree, location, matches);
  }
}
