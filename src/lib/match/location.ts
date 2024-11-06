import type { Route } from "#lib/route/mod.js";
import type { Match } from "./mod.js";
import { logger } from "#lib/debug.js";
import { getRouteTree } from "#lib/route/tree.js";
import { loadRoutes } from "#lib/route/load.js";

const log = logger("matchLocation");

export async function matchLocation(
  location: string,
): Promise<Match | undefined> {
  const matches: Match[] = [];

  recur([getRouteTree()], location, matches);

  await loadRoutes(matches.map((x) => x.route));

  link(matches);

  log("matched: %o", matches);

  return matches[0];
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
    isVoid: false,
    route,
    isExact: loc === location,
    location: loc,
    params: Object.fromEntries(
      route.test.keys.map((key, i) => [key, execs![i + 1]!] as const),
    ),
  };
}

function link(matches: Match[]): void {
  const lastVoidIndex = matches.findLastIndex((x) => x.route.elements._void);

  const first = matches[0];
  const last = matches.at(-1);

  matches.forEach((x, i) => {
    x.isVoid = i === lastVoidIndex;

    x.first = first;
    x.prev = matches[i - 1];
    x.next = matches[i + 1];
    x.last = last;
  });
}
