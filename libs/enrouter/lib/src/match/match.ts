import { logger } from "#lib/debug.js";
import type { Route } from "#lib/route/mod.js";
import type { Match } from "./mod.js";

const log = logger("match");

export interface MatchParams {
  routes: Route;
  location: string;
}

export function match({ routes, location }: MatchParams): Match[] {
  const matches: Match[] = [];

  recur([routes], location, matches, 0);

  if (matches.at(-1)?.location !== location) {
    matches.push({ isFull: true, location, params: {} });
  }

  matches.forEach((x, i) => {
    x.fist = matches[0];
    x.next = matches[i + 1];
  });

  return matches;
}

function recur(
  routes: Route[],
  location: string,
  matches: Match[],
  i: number,
): void {
  const match = matchOneOf(routes, location);
  if (!match) {
    return;
  }

  log(`location: "%s"; path: "%s"`, location, match.route?.path);

  matches[i] = match;

  if (match?.route?.tree) {
    recur(match.route.tree, location, matches, i + 1);
  }
}

function matchOneOf(routes: Route[], location: string): Match | undefined {
  let matched = routes
    .map((route) => {
      const execs = route.test.pattern.exec(location);
      if (!execs) {
        return;
      }
      return { route, execs };
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
    isFull: loc === location,
    location: loc,
    params: Object.fromEntries(
      route.test.keys.map((key, i) => [key, execs![i + 1]!] as const),
    ),
  };
}
