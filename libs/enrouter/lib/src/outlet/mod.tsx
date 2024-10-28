import type { ReactNode, ReactElement } from "react";
import { isValidElement } from "react";

import type { Match } from "#lib/match/mod.js";
import { MatchProvider, useMatch } from "#lib/match/context.js";

export interface OutletProps {
  name?: string;
  root?: boolean;
}

export function Outlet({ name, root }: OutletProps): ReactNode {
  const match = useMatch();
  if (!match) {
    return;
  }

  if (root) {
    return pickLayoutOrContent(match, name);
  }

  if (match.isVoid) {
    return pick(match.route.elements._void, name);
  }

  if (match.next) {
    return (
      <MatchProvider value={match.next}>
        {pickLayoutOrContent(match.next, name)}
      </MatchProvider>
    );
  }

  // TODO:

  if (match.isFull) {
    return pick(match.route.elements._content, name);
  }
}

function pick(
  els: ReactElement | Record<string, ReactElement> | undefined,
  name?: string,
): ReactElement | undefined {
  if (!name && isValidElement(els)) {
    return els;
  }

  if (name && els) {
    return (els as Record<string, ReactElement>)[name];
  }
}

function pickLayoutOrContent(
  match: Match,
  name?: string,
): ReactElement | undefined {
  const { _layout, _content } = match.route.elements;

  return pick(_layout ?? _content, name);
}
