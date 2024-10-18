import type { ReactElement } from "react";

import type { Match } from "./mod.js";
import { loadRoutes } from "#lib/route/load.js";
import { MatchProvider } from "./context.js";

export async function load(matches: Match[]) {
  await loadRoutes(matches.map((x) => x.route).filter((x) => x !== undefined));

  matches
    .filter((x) => x.elements === undefined)
    .forEach((x) => {
      x.elements = {
        layout: wrap(x, x.route?.elements.layout),
        index: wrap(x, x.route?.elements.index),
        notFound: wrap(x, x.route?.elements.notFound),
      };
    });
}

function wrap(
  match: Match,
  els: Record<string, ReactElement> | undefined,
): Record<string, ReactElement> | undefined {
  if (!els) {
    return;
  }

  return Object.fromEntries(
    Object.entries(els).map(([key, children]) => [
      key,
      <MatchProvider key={key} value={match}>
        {children}
      </MatchProvider>,
    ]),
  );
}
