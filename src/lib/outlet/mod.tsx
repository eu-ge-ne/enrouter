import type { ReactNode, ReactElement } from "react";

import {
  MatchIndexProvider,
  useMatches,
  useMatchIndex,
  useMatch,
} from "#lib/match/context.js";

export interface OutletProps {
  name?: string;
}

export function Outlet({ name }: OutletProps): ReactNode {
  const matches = useMatches();
  const matchIndex = useMatchIndex();
  const match = useMatch();
  if (!match) {
    return;
  }

  const nextMatch = matches[matchIndex + 1];
  const lastMatch = matches.at(-1);

  if (match === lastMatch && match.isExact) {
    return pick(match.route.elements._content, name);
  }

  if (!lastMatch?.isExact) {
    if (match.isVoid) {
      return pick(match.route.elements._void, name);
    }
  }

  if (nextMatch) {
    const { _layout, _content } = nextMatch.route.elements;

    return (
      <MatchIndexProvider value={matchIndex + 1}>
        {pick(_layout ?? _content, name)}
      </MatchIndexProvider>
    );
  }
}

function pick(
  els: Record<string, ReactElement> | undefined,
  name?: string,
): ReactElement | undefined {
  if (els) {
    return name ? els[name] : Object.values(els)[0];
  }
}
