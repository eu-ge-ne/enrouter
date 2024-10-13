import type { ReactElement } from "react";

import { logger } from "#lib/debug.js";
import { RouteRenderContext } from "./context.js";
import { NotFound } from "./notFound.js";

import type { RouteMatch } from "#lib/match/mod.js";

const log = logger("render");

export interface RouteNodes {
  match: RouteMatch;

  layout?: Record<string, ReactElement>;
  index?: Record<string, ReactElement>;

  prev?: RouteNodes;
  next?: RouteNodes;
  last?: RouteNodes;
}

export function renderMatches(matches: RouteMatch[]): ReactElement[] {
  log("Rendering matches");

  let nodes = matches.map(createRouteNodes);

  // 404?
  if (!nodes.at(-1)?.match.isFull) {
    log("404: %o", nodes);

    const i = nodes.findLastIndex((x) => x.match.route.notFound);
    if (i === -1) {
      return [<NotFound />];
    }

    nodes = nodes.slice(0, i + 1);

    const node = nodes[i]!;
    node.index = node.match.route.notFound;
  }

  const last = nodes.at(-1);
  nodes.forEach((x, i) => {
    x.prev = nodes[i - 1];
    x.next = nodes[i + 1];
    x.last = last;
  });

  log("Matches rendered");

  return Object.values(nodes[0]?.layout ?? {});
}

function createRouteNodes(match: RouteMatch): RouteNodes {
  const nodes: RouteNodes = {
    match,
  };

  function wrapChildren([key, children]: [string, ReactElement]) {
    const el = (
      <RouteRenderContext.Provider key={key} value={nodes}>
        {children}
      </RouteRenderContext.Provider>
    );
    return [key, el];
  }

  // do not render if match.next !== undefined
  if (!match.next && match.route.index) {
    nodes.index = Object.fromEntries(
      Object.entries(match.route.index).map((entry) => {
        log(
          'Rendering index component "%s" for match "%s"',
          entry[0],
          match.route.path,
        );
        return wrapChildren(entry);
      }),
    );
  }

  if (match.route.layout) {
    nodes.layout = Object.fromEntries(
      Object.entries(match.route.layout).map((entry) => {
        log(
          'Rendering layout component "%s" for match "%s"',
          entry[0],
          match.route.path,
        );
        return wrapChildren(entry);
      }),
    );
  }

  return nodes;
}
