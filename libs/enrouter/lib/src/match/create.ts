import type { Route } from "#lib/route/mod.js";
import type { Match } from "./mod.js";
import { logger } from "#lib/debug.js";
import { loadRoutes } from "#lib/route/load.js";

const log = logger("match/create");

export interface CreateMatchParams {
  routes: Route;
  location: string;
}

export async function createMatch({
  routes,
  location,
}: CreateMatchParams): Promise<Match | undefined> {
  const matches: Match[] = [];

  recur([routes], location, matches);

  await loadRoutes(matches.map((x) => x.route));

  trim(matches);
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
    route,
    isFull: loc === location,
    location: loc,
    params: Object.fromEntries(
      route.test.keys.map((key, i) => [key, execs![i + 1]!] as const),
    ),
  };
}

function trim(matches: Match[]): void {
  const rootIndex = matches.findLastIndex((x) => x.route.elements._root);
  if (rootIndex >= 0) {
    matches.splice(0, rootIndex);
  }

  if (!matches.at(-1)?.isFull) {
    const voidIndex = matches.findLastIndex(
      ({
        route: {
          elements: { _void, __void },
        },
      }) => _void || __void,
    );

    if (voidIndex >= 0) {
      if (matches[voidIndex]?.route.elements.__void) {
        const match = matches[voidIndex];
        matches.splice(0, matches.length);
        matches.push(match);
      } else {
        matches.splice(voidIndex + 1);
      }
    }
  }
}

function link(matches: Match[]): void {
  const first = matches[0];
  const last = matches.at(-1);

  matches.forEach((x, i) => {
    x.first = first;
    x.next = matches[i + 1];
    x.last = last;
  });
}
