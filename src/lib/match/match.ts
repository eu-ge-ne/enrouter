import type { Route } from "#lib/route/mod.js";
import { logger } from "#lib/debug.js";
import { getRouteTree } from "#lib/route/tree.js";
import { loadRoutes } from "#lib/route/load.js";

const log = logger("match");

export interface Match {
  route: Route;
  isExact: boolean;
  location: string;
  params: Record<string, string>;
}

export async function matchLocation(location: string): Promise<Match[]> {
  const matches: Match[] = [];

  recur([getRouteTree()], location, matches);

  await loadRoutes(matches.map((x) => x.route));

  log("matched: %o", matches);

  return matches;
}

function recur(routes: Route[], location: string, matches: Match[]): void {
  const match = matchOneOf(routes, location);
  if (!match) {
    return;
  }

  log(`path: "%s", location: "%s"`, match.route.path, match.location);

  matches.push(match);

  if (match.route.tree) {
    recur(match.route.tree, location, matches);
  }
}

function matchOneOf(routes: Route[], location: string): Match | undefined {
  let matched = routes
    .map((route) => {
      const execs = route.test.pattern.exec(location);
      if (execs) {
        return { route, execs };
      }
    })
    .filter((x) => x !== undefined);

  if (matched.length === 0) {
    return;
  }

  // TODO: improve

  if (matched.length > 1) {
    matched = matched.filter((x) => x.route.test.keys.length === 0);
  }

  if (matched.length !== 1) {
    throw new Error("Found >1 match");
  }

  const { route, execs } = matched[0]!;
  const loc = execs[0] || "/";

  return {
    route,
    isExact: loc === location,
    location: loc,
    params: Object.fromEntries(
      route.test.keys.map((key, i) => [key, execs![i + 1]!] as const),
    ),
  };
}