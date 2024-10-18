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
  const matched = matchOneOf(routes, location);

  if (!matched) {
    return;
  }

  const { route, execs } = matched;

  const params = Object.fromEntries(
    route.test.keys.map((key, i) => {
      return [key, execs![i + 1]!] as const;
    }),
  );

  const loc = execs[0] || "/";

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

function matchOneOf(
  routes: Route[],
  location: string,
): { route: Route; execs: RegExpExecArray } | undefined {
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

  return matched[0];
}
