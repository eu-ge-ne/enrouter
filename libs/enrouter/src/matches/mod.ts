import { createLog } from "#log.js";

import type { RouteHandler } from "#handlers/mod.js";

const log = createLog("matches");

export interface RouteMatch {
  handler: RouteHandler;
  params: Record<string, string>;
  next?: RouteMatch;
}

interface MatchRoutesParams {
  handlers: RouteHandler;
  location: string;
}

export function matchRoutes({
  handlers,
  location,
}: MatchRoutesParams): RouteMatch[] {
  log("Matching routes for location %s", location);

  const matches: RouteMatch[] = [];

  recur([handlers], location, matches);

  for (let i = 0; i < matches.length; i += 1) {
    const match = matches[i]!;
    match.next = matches[i + 1];
  }

  log("Matched routes %O", matches);

  return matches;
}

function recur(
  handlers: RouteHandler[],
  location: string,
  matches: RouteMatch[],
): void {
  let matchResults = handlers
    .map((x) => [x, x.test?.pattern.exec(location)] as const)
    .filter((x): x is [RouteHandler, RegExpExecArray] => Boolean(x[1]));

  if (matchResults.length === 0) {
    return;
  }

  // TODO: improve
  if (matchResults.length > 1) {
    matchResults = matchResults.filter((x) => x[0].test?.keys.length === 0);
  }

  const [handler, matchParams] = matchResults[0]!;

  const params: Record<string, string> = {};
  {
    const keys = handler.test.keys;
    for (let i = 0; i < keys.length; i += 1) {
      const val = matchParams[i + 1]!;
      params[keys[i]!] = val;
    }
  }

  matches.push({ params, handler });

  if (handler.children) {
    recur(handler.children, location, matches);
  }
}
